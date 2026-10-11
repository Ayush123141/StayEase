# Hotel Booking Website — Build Spec for Google Antigravity

> **How to use this file:** Drop it in the root of an empty project folder (or save it as `AGENTS.md`), open the folder in Antigravity, and tell the agent:
> *"Read HOTEL_BOOKING_BUILD_SPEC.md and build it phase by phase. Stop after each phase and show me what to test."*

---

## 1. Goal

Build **StayEase** (placeholder name, change freely): a full-stack hotel booking website where guests can search rooms by date, book and manage reservations, and where hotel staff/admins can manage rooms, bookings, and revenue.

**Stack (fixed):**

| Layer | Choice |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Routing | react-router-dom v7 |
| Icons / Charts | lucide-react, recharts |
| HTTP/data | `@supabase/supabase-js` (no custom Express server) |
| Database / Auth / Storage | **Supabase** (Postgres, Auth, Storage, RLS) |
| Hosting | **Vercel** (static Vite build) |

---

## 2. Reuse the prototype's design format

The prototype is the **Gym Management System** (`Gym-management-system.zip`). Reuse its look, structure and conventions, but **not** its backend.

**Keep from the prototype**
- Vite + React 19 + TSX + Tailwind v4 setup (`@import "tailwindcss"` and `@theme` in `src/index.css`).
- Glassmorphism as a technique (but with the new look defined in **§2A**, which overrides the prototype's sky-blue/Outfit styling).
- Folder layout: `src/{api,components,context,hooks,layouts,pages}`.
- Pattern: `AuthContext` + `ProtectedRoute` + `MainLayout` with a `Sidebar` (for the admin area).
- Admin pages follow the prototype's page structure (table + search/filter + modal form + Recharts dashboard + CSV import/export with papaparse).

**Replace**
- Express + MySQL + bcrypt + JWT (`/server`) → **Supabase** (Auth + Postgres + RLS). Delete the `/server` folder entirely.
- `axios` calls in `src/api` → `supabase-js` queries.

**Change for hotel context**
- The prototype is admin-only. The hotel site needs a **public guest-facing site** (light, photo-heavy sections on top of the same dark glass theme is fine) **plus** the admin dashboard.
- Keep the prototype's optimistic-locking idea, but implement double-booking prevention in the database (see §5).

> Antigravity: first inspect the prototype's `src/index.css`, `src/layouts/MainLayout.tsx`, `src/components/Sidebar.tsx`, and one page (e.g. `src/pages/Members.tsx`) and match their style.

---

## 2A. Design direction (overrides the prototype's colors and fonts)

**Concept: a classic heritage hotel, rendered with real glassmorphism.** It should feel like a grand old hotel lobby: warm, hand-crafted, quiet and expensive. It should **not** look like a typical AI-generated SaaS template.

### Banned (the "generic AI website" look)
- Sky-blue / purple / pink-to-blue gradients, neon glows, gradient text on every heading.
- Emoji as icons, sparkles, rocket icons, "Powered by AI" language.
- The default 3-column grid of identical cards with a gradient icon on top.
- Giant pill buttons and 2rem radius on everything; bouncy or spring animations.
- Inter / Outfit / Poppins as the main font; stock gray-on-white dashboards.
- Placeholder copy like "Welcome to our amazing platform". Write real, specific hotel copy.

### Palette (define as `@theme` tokens in `src/index.css`)

| Token | Hex | Use |
|---|---|---|
| `--color-ivory` | `#F6EFE2` | Light page background |
| `--color-parchment` | `#EADFC8` | Alternate sections, cards |
| `--color-espresso` | `#1C1410` | Body text on light, deepest dark |
| `--color-bottle` | `#0F2A24` | Primary dark (hero overlays, footer, admin) |
| `--color-bottle-700` | `#17403A` | Hover / secondary dark |
| `--color-oxblood` | `#5B1A1F` | Accent for buttons, badges, highlights |
| `--color-gold` | `#B8924A` | Hairlines, ornaments, icons, links |
| `--color-gold-light` | `#D9BC82` | Gold on dark backgrounds |
| `--color-mist` | `#CFC6B4` | Muted text, borders on light |

Rules: one main accent (gold), one action color (oxblood). Never more than 3 colors on a screen besides neutrals. Text on glass must meet **WCAG AA (4.5:1)**.

### Typography (load from Google Fonts in `index.html`)
- **Display / headings:** `Cormorant Garamond` (500, 600, italic) — large, elegant, tight line-height (1.05–1.15).
- **Body / UI:** `Jost` or `Lato` (400, 500), 16px, line-height 1.7.
- **Labels, buttons, nav:** small caps feel — uppercase, 12–13px, `letter-spacing: 0.18em`, weight 500.
- Use italic Cormorant for accent words inside headings (e.g. "A stay worth *remembering*").
- Prices and numbers: Cormorant with `font-variant-numeric: lining-nums`.
- Fallbacks: `Georgia, serif` for display; `system-ui, sans-serif` for body.

### Shape, borders and ornament
- Radii are **modest**: 2–4px for buttons/inputs, 6–10px for cards, **arched top** (`border-radius: 999px 999px 0 0`) only for hero/room image frames as a signature motif.
- Borders are **gold hairlines** (`1px solid rgba(184,146,74,.45)`), sometimes doubled (outer line + 4px gap + inner line) on feature cards.
- Section dividers: a thin gold line with a small centered diamond (◆) or a small SVG flourish. Draw ornaments as inline SVG, never emoji.
- Optional very subtle repeating geometric/lattice pattern (inline SVG, 4–6% opacity) behind some dark sections.
- Add a faint paper/film **grain** overlay (SVG noise, 3–5% opacity) on the whole page for a tactile feel.

### Proper glassmorphism (this is the important part)
Glass only looks right when there is **rich, varied content behind it**. So:

1. **Use glass only over photography or deep colored backgrounds**: the hero, the sticky navbar over the hero, the floating search bar, the booking summary panel, modals, and the admin cards. Never put glass on a plain flat background.
2. **Hero:** full-bleed high-quality hotel photo (warm, dusk/golden-hour tone) with a bottle-green gradient overlay (`linear-gradient(180deg, rgba(15,42,36,.55), rgba(15,42,36,.85))`). The search bar floats on top as a glass panel.
3. **Glass recipe (create these as reusable classes in `index.css`):**

```css
.glass {
  background: linear-gradient(135deg, rgba(246,239,226,.14), rgba(246,239,226,.04));
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(217,188,130,.28);                 /* warm gold edge */
  border-top-color: rgba(255,255,255,.35);                 /* light catching the top-left edge */
  border-left-color: rgba(255,255,255,.25);
  box-shadow:
    0 20px 50px -20px rgba(0,0,0,.55),                     /* depth */
    inset 0 1px 0 rgba(255,255,255,.18),                   /* top highlight */
    inset 0 0 40px rgba(217,188,130,.04);                  /* faint inner glow */
  border-radius: 10px;
  color: var(--color-ivory);
}
.glass-dark   { background: linear-gradient(135deg, rgba(15,42,36,.55), rgba(15,42,36,.30)); /* same blur/borders */ }
.glass-ivory  { background: linear-gradient(135deg, rgba(246,239,226,.72), rgba(246,239,226,.50)); color: var(--color-espresso); }

@supports not (backdrop-filter: blur(1px)) {
  .glass, .glass-dark { background: rgba(15,42,36,.88); }   /* solid fallback */
}
```

4. **Layering:** put 2–3 soft blurred color blobs (gold, oxblood at 20–30% opacity, `blur(80px)`) behind glass areas so the blur has something to refract. Keep them subtle, not neon.
5. **Hierarchy:** at most **two glass layers stacked** (e.g. a glass panel containing solid or lightly tinted inner fields). Inputs inside glass are slightly more opaque (`rgba(255,255,255,.08)`) with a gold focus ring.
6. **Light sections** (ivory/parchment) use solid warm surfaces with gold hairlines, with soft shadows. Alternate: dark photo+glass section → ivory section → parchment section → dark footer.
7. Respect `prefers-reduced-transparency` and `prefers-reduced-motion`.

### Page-by-page look
- **Navbar:** transparent-to-glass on scroll; centered serif logo wordmark with a small crest/monogram SVG; small-caps links with a gold underline that draws in on hover.
- **Hero:** huge serif headline, one italic gold word, small-caps tagline above ("Est. 1962 · Pune"), arched image frame option, glass search bar (Check-in · Check-out · Guests · "Check Availability" oxblood button).
- **Rooms grid:** photo-first cards with arched or square image, room name in serif, small-caps type label, gold hairline, price as "₹8,500 *per night*", amenities as thin-line lucide icons (stroke 1.25).
- **Room details:** large gallery with thin gold frame, sticky glass booking panel on the right.
- **Amenities / dining / experiences:** editorial layout — alternating image + text rows with generous whitespace, not an icon grid.
- **Testimonials:** one large serif italic quote at a time, with a gold quotation mark.
- **Footer:** bottle green, 4 columns, gold hairline top border, small monogram.
- **Admin:** keep the prototype's sidebar layout, but recolor to bottle green + gold glass cards, serif page titles, Recharts in gold / oxblood / mist tones (no rainbow).
- **Forms, tables, badges:** status badges are quiet (gold outline for pending, bottle for confirmed, oxblood for cancelled), not bright green/red pills.

### Motion
- Slow, soft: fade + 12px upward reveal on scroll (600–800ms, `cubic-bezier(.22,.61,.36,1)`), subtle image zoom on hover (1.04 over 900ms), underline draw on links.
- No bounce, no parallax overload, no auto-playing carousels without pause controls.

### Imagery
- Use warm, natural, high-resolution hotel/room photography (Unsplash placeholders in seed data; leave a clear note to replace with the hotel's real photos). Consistent warm color grade; no cold blue stock photos.
- Always `object-fit: cover`, `loading="lazy"`, width/height set, and descriptive `alt` text.

> Antigravity: after building the Home page, **take a browser screenshot at 1440px and 390px width and compare it against this section**. Fix anything that looks like a generic template (blue gradients, uniform card grids, plain-white backgrounds, glass on flat color) before moving on.

---

## 3. Roles & features

### Guest (public, no login needed to browse)
- **Home**: hero with date/guests search bar, featured rooms, amenities, testimonials, location, footer.
- **Search results** (`/rooms`): filter by dates, guests, price range, room type, amenities; sort by price/rating. Only show rooms **available** for the chosen dates.
- **Room details** (`/rooms/:id`): image gallery, description, amenities, price per night, availability calendar, "Book now".
- **Booking checkout** (`/checkout`): summary (dates, nights, taxes, total), guest details, special requests. Requires login (redirect back after login).
- **Auth**: sign up / log in (email+password, optional Google), password reset.
- **My bookings** (`/account/bookings`): list upcoming/past, view details, **cancel** (if policy allows), download/print confirmation.
- **Profile** (`/account/profile`).
- Reviews: guests with a completed stay can rate/review a room.

### Admin / Staff (protected, `/admin/*`)
- **Dashboard**: today's check-ins/outs, occupancy %, revenue chart (Recharts), recent bookings.
- **Rooms**: CRUD, image upload (Supabase Storage), price, capacity, amenities, active/inactive.
- **Room types & amenities** management.
- **Bookings**: table with search/filter by status/date, change status (confirmed → checked_in → checked_out / cancelled), create manual booking, CSV export.
- **Guests**: list and booking history.
- **Reports**: revenue by month, occupancy by room type.
- Roles: `admin` (everything), `staff` (bookings and guests only).

### Payments
- Phase 1: "Pay at hotel" (booking status `confirmed`, payment status `pending`).
- Phase 2 (optional, last): Stripe Checkout (or Razorpay for India) via a Vercel serverless function with a webhook that marks payments `paid`.

---

## 4. Routes

```
/                       Home
/rooms                  Search + results
/rooms/:id              Room details
/checkout               Booking checkout (auth required)
/booking/:id/confirmed  Confirmation page
/login  /signup  /forgot-password  /reset-password
/account/bookings       My bookings (auth)
/account/profile        Profile (auth)

/admin                  Dashboard         (staff/admin)
/admin/rooms            Rooms CRUD        (admin)
/admin/bookings         Bookings          (staff/admin)
/admin/guests           Guests            (staff/admin)
/admin/reports          Reports           (admin)
```

Use two layouts: `PublicLayout` (navbar + footer) and `AdminLayout` (the prototype's `MainLayout` + `Sidebar`). Add `RequireAuth` and `RequireRole` wrappers.

---

## 5. Supabase database

Create as a migration file at `supabase/migrations/0001_init.sql` and run it in the Supabase SQL editor.

```sql
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
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end $$;

create trigger on_auth_user_created
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

create index on public.bookings (user_id);
create index on public.bookings (room_id, check_in, check_out);

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
create function public.available_rooms(
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

-- ========== Helper for RLS ==========
create function public.current_role_is(variadic roles user_role[]) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = any(roles));
$$;
```

### Row Level Security (enable on every table)

```sql
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
```

> Antigravity: after creating the SQL, **verify** that a normal guest cannot (a) set `role='admin'` on themselves, (b) read other users' bookings, (c) double-book a room. Write a short test script or manual checklist for this.

### Storage
- Create a **public** bucket `room-images`. Policy: public read; only admins can insert/update/delete.

### Seed data
Add `supabase/seed.sql` with: 4 room types, ~8 amenities, 8–12 sample rooms with placeholder image URLs (Unsplash), and a few sample bookings.

---

## 6. Frontend structure

```
src/
  api/            supabaseClient.ts, rooms.ts, bookings.ts, admin.ts
  components/     Navbar, Footer, SearchBar, RoomCard, RoomGallery, DateRangePicker,
                  BookingSummary, StatusBadge, Sidebar (admin), Modal, EmptyState, Spinner
  context/        AuthContext.tsx   (session + profile + role)
  hooks/          useRooms, useBookings, useAvailability
  layouts/        PublicLayout.tsx, AdminLayout.tsx
  pages/
    public/       Home, Rooms, RoomDetails, Checkout, BookingConfirmed
    auth/         Login, Signup, ForgotPassword, ResetPassword
    account/      MyBookings, Profile
    admin/        Dashboard, Rooms, Bookings, Guests, Reports
  types/          database.ts (generate with `supabase gen types typescript`)
  lib/            format.ts (currency/date), pricing.ts (nights, tax)
```

**Conventions**
- Strict TypeScript. No `any`; type the Supabase client with generated types.
- Every data screen has loading, empty, and error states.
- Fully responsive (mobile first). Accessible: labels, focus rings, keyboard navigation, `aria-*` on modals.
- Handle the overlap-constraint error (Postgres code `23P01`) with a friendly message: *"Sorry, this room was just booked for those dates. Please pick other dates."*
- Price calculation is shown on the client but **the final `total_price` must be validated server-side** (use a Postgres function `create_booking(...)` that recomputes price from `rooms.price_per_night × nights` and inserts; call it with `supabase.rpc`).
- Currency: configurable constant (default `INR`, format with `Intl.NumberFormat`).

---

## 7. Environment variables

`.env.local` (never commit; add to `.gitignore`):

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

Also create `.env.example` with the same keys and empty values.

> ⚠️ Only the **anon** key goes in the frontend. Never expose the `service_role` key in Vite (`VITE_*` variables are public in the browser bundle). Security comes from RLS.

> ⚠️ **Security note about the prototype zip:** it contains a `server/.env` file and a `.git` folder. Do **not** copy `.env` into the new project, and if those credentials were ever pushed to GitHub, **rotate them**.

---

## 8. Vercel deployment

1. Push the project to a GitHub repo (`.env.local` must be git-ignored).
2. On vercel.com → **Add New → Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Add the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Production + Preview).
5. Add `vercel.json` in the project root so React Router deep links don't 404:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

6. Deploy. Then in **Supabase → Authentication → URL Configuration** set:
   - **Site URL**: your Vercel production URL
   - **Redirect URLs**: add `https://YOUR-APP.vercel.app/**` and `http://localhost:5173/**`
7. Every push to `main` auto-deploys; pull requests get preview URLs (add the preview wildcard to Supabase redirect URLs if you need auth on previews).

---

## 9. Build phases (agent: stop and report after each)

**Phase 0 — Setup**
- Scaffold Vite React-TS project, install deps (`@supabase/supabase-js react-router-dom lucide-react recharts papaparse tailwindcss @tailwindcss/vite`).
- Implement the design system from §2A: color tokens, Google Fonts, `.glass` classes, grain overlay, ornament SVGs. Build a small `/styleguide` page showing buttons, inputs, cards, badges and glass panels so I can approve the look **before** building pages.
- Create `supabaseClient.ts`, `.env.example`, `vercel.json`, `.gitignore`.

**Phase 1 — Database**
- Write `0001_init.sql`, RLS policies, storage bucket notes, `seed.sql`, and the `create_booking` RPC.
- Output a checklist for me to run these in Supabase.

**Phase 2 — Auth**
- `AuthContext` (session, profile, role), Login/Signup/Reset, `RequireAuth`, `RequireRole`.

**Phase 3 — Public site**
- Home, Rooms search with availability RPC, Room details, calendar.

**Phase 4 — Booking flow**
- Checkout → `create_booking` RPC → Confirmation page → My Bookings (+ cancel).

**Phase 5 — Admin**
- Dashboard, Rooms CRUD with image upload, Bookings management, Guests, Reports, CSV export.

**Phase 6 — Polish**
- Reviews, SEO meta tags, 404 page, toasts, skeleton loaders, a11y pass, Lighthouse check.

**Phase 7 — Deploy**
- Walk me through the Vercel + Supabase redirect configuration, and run a production smoke test.

**Phase 8 (optional) — Online payments**
- Stripe/Razorpay via Vercel serverless function (`/api/create-checkout-session`, `/api/webhook`) using server-only env vars.

---

## 10. Acceptance checklist

- [ ] A guest can search by dates and only sees available rooms.
- [ ] Two users cannot book the same room for overlapping dates (DB-enforced).
- [ ] A guest cannot see other guests' bookings or make themselves admin.
- [ ] Admin can add a room with images and it appears on the public site immediately.
- [ ] Booking status changes in admin reflect in the guest's "My bookings".
- [ ] `npm run build` passes with no TypeScript errors.
- [ ] Deployed on Vercel; refreshing any deep link (e.g. `/rooms/123`) works.
- [ ] Mobile layout works at 360px width.
- [ ] Design matches §2A: serif typography, gold hairlines, warm palette, glass only over imagery, no blue/purple gradients or generic icon-card grids.
- [ ] Text on glass passes contrast (4.5:1) and a solid fallback exists without `backdrop-filter`.

---

## 11. Rules for the agent

- Ask me before installing anything outside the stack in §1.
- Don't invent features beyond this spec; propose them at the end instead.
- Commit after each phase with a clear message.
- Never hard-code secrets. Never use the `service_role` key in client code.
- Keep the code simple and readable. Add short comments only where the logic is non-obvious (RLS, overlap constraint, RPC).
