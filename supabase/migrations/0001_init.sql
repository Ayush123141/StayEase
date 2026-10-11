-- =========================================================================
-- Hotel Booking System (StayEase) - Initial Migration
-- =========================================================================

-- Needed for the no-overlap constraint
create extension if not exists btree_gist;

-- ========== Enums ==========
create type user_role as enum ('guest', 'staff', 'admin');
create type booking_status as enum ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled');
create type payment_status as enum ('pending', 'paid', 'refunded', 'failed');

-- ========== Profiles (1:1 with auth.users) ==========
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role user_role not null default 'guest',
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ========== Catalog ==========
create table public.room_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,          -- Deluxe, Suite, Standard...
  description text
);

create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,          -- WiFi, AC, Pool...
  icon text                           -- lucide icon name
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  room_number text not null unique,
  title text not null,
  description text,
  room_type_id uuid references public.room_types(id),
  price_per_night numeric(10,2) not null check (price_per_night >= 0),
  capacity int not null check (capacity > 0),
  beds int not null default 1,
  size_sqft int,
  images text[] not null default '{}',   -- Supabase Storage public URLs
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.room_amenities (
  room_id uuid references public.rooms(id) on delete cascade,
  amenity_id uuid references public.amenities(id) on delete cascade,
  primary key (room_id, amenity_id)
);

-- ========== Bookings ==========
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  room_id uuid not null references public.rooms(id),
  check_in date not null,
  check_out date not null,
  guests int not null check (guests > 0),
  nights int generated always as (check_out - check_in) stored,
  total_price numeric(10,2) not null,
  status booking_status not null default 'confirmed',
  payment_status payment_status not null default 'pending',
  special_requests text,
  created_at timestamptz not null default now(),
  check (check_out > check_in),

  -- DOUBLE-BOOKING PREVENTION: same room cannot have overlapping active bookings
  constraint no_overlapping_bookings exclude using gist (
    room_id with =,
    daterange(check_in, check_out, '[)') with &&
  ) where (status in ('pending', 'confirmed', 'checked_in'))
);

create index if not exists idx_bookings_user_id on public.bookings (user_id);
create index if not exists idx_bookings_room_dates on public.bookings (room_id, check_in, check_out);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  room_id uuid not null references public.rooms(id),
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- ========== Availability search (RPC) ==========
create or replace function public.available_rooms(
  p_check_in date, p_check_out date, p_guests int default 1
) returns setof public.rooms
language sql stable as $$
  select r.* from public.rooms r
  where r.is_active
    and r.capacity >= p_guests
    and not exists (
      select 1 from public.bookings b
      where b.room_id = r.id
        and b.status in ('pending','confirmed','checked_in')
        and daterange(b.check_in, b.check_out, '[)') && daterange(p_check_in, p_check_out, '[)')
    );
$$;

-- ========== Secure Server-Side Booking Creation (RPC) ==========
create or replace function public.create_booking(
  p_room_id uuid,
  p_check_in date,
  p_check_out date,
  p_guests int,
  p_special_requests text default null
) returns public.bookings
language plpgsql security definer set search_path = public as $$
declare
  v_room public.rooms%rowtype;
  v_nights int;
  v_total_price numeric(10,2);
  v_new_booking public.bookings%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Unauthorized';
  end if;

  if p_check_out <= p_check_in then
    raise exception 'Check-out date must be after check-in date';
  end if;

  select * into v_room from public.rooms where id = p_room_id and is_active = true;
  if not found then
    raise exception 'Room not found or not active';
  end if;

  if p_guests > v_room.capacity then
    raise exception 'Guests exceed room capacity';
  end if;

  v_nights := p_check_out - p_check_in;
  v_total_price := v_room.price_per_night * v_nights;

  insert into public.bookings (
    user_id,
    room_id,
    check_in,
    check_out,
    guests,
    total_price,
    status,
    payment_status,
    special_requests
  ) values (
    auth.uid(),
    p_room_id,
    p_check_in,
    p_check_out,
    p_guests,
    v_total_price,
    'confirmed',
    'pending',
    p_special_requests
  ) returning * into v_new_booking;

  return v_new_booking;
end;
$$;

-- ========== Helper for RLS ==========
create or replace function public.current_role_is(variadic roles user_role[]) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = any(roles));
$$;

-- ========== Row Level Security ==========
alter table public.profiles       enable row level security;
alter table public.room_types     enable row level security;
alter table public.amenities      enable row level security;
alter table public.rooms          enable row level security;
alter table public.room_amenities enable row level security;
alter table public.bookings       enable row level security;
alter table public.reviews        enable row level security;

-- Catalog: anyone can read, only admin writes
create policy "catalog read"  on public.rooms          for select using (true);
create policy "catalog read"  on public.room_types     for select using (true);
create policy "catalog read"  on public.amenities      for select using (true);
create policy "catalog read"  on public.room_amenities for select using (true);
create policy "admin write rooms"   on public.rooms          for all using (public.current_role_is('admin')) with check (public.current_role_is('admin'));
create policy "admin write types"   on public.room_types     for all using (public.current_role_is('admin')) with check (public.current_role_is('admin'));
create policy "admin write amen"    on public.amenities      for all using (public.current_role_is('admin')) with check (public.current_role_is('admin'));
create policy "admin write ra"      on public.room_amenities for all using (public.current_role_is('admin')) with check (public.current_role_is('admin'));

-- Profiles: own row; staff/admin can read all. Users cannot change their own role.
create policy "own profile read"   on public.profiles for select using (id = auth.uid() or public.current_role_is('staff','admin'));
create policy "own profile update" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "admin manage profiles" on public.profiles for all using (public.current_role_is('admin'));

-- Bookings: guests see/create their own; staff/admin see/manage all
create policy "own bookings read"   on public.bookings for select using (user_id = auth.uid() or public.current_role_is('staff','admin'));
create policy "own bookings insert" on public.bookings for insert with check (user_id = auth.uid());
create policy "own bookings cancel" on public.bookings for update using (user_id = auth.uid()) with check (user_id = auth.uid() and status = 'cancelled');
create policy "staff manage bookings" on public.bookings for all using (public.current_role_is('staff','admin'));

-- Reviews: public read; only the author writes
create policy "reviews read"  on public.reviews for select using (true);
create policy "reviews write" on public.reviews for insert with check (user_id = auth.uid());
