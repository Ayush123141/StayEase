-- =========================================================================
-- Hotel Booking System (StayEase) - Seed Data
-- =========================================================================

-- Insert Room Types
insert into public.room_types (id, name, description) values
  ('11111111-1111-1111-1111-111111111111', 'Deluxe Heritage Room', 'Spacious room with vintage colonial furnishings, teak wood accents, and high ceilings.'),
  ('22222222-2222-2222-2222-222222222222', 'Executive Palace Suite', 'Expansive suite featuring a separate parlor, antique chandeliers, and panoramic courtyard views.'),
  ('33333333-3333-3333-3333-333333333333', 'Royal Presidential Suite', 'The pinnacle of luxury with private butler service, dining area, and hand-crafted brass fixtures.'),
  ('44444444-4444-4444-4444-444444444444', 'Courtyard Classic', 'Charming and serene room overlooking the quiet heritage fountain gardens.')
on conflict (name) do nothing;

-- Insert Amenities
insert into public.amenities (id, name, icon) values
  ('a1111111-1111-1111-1111-111111111111', 'High-Speed Wi-Fi', 'Wifi'),
  ('a2222222-2222-2222-2222-222222222222', 'Climate Control AC', 'Wind'),
  ('a3333333-3333-3333-3333-333333333333', 'Swimming Pool Access', 'Waves'),
  ('a4444444-4444-4444-4444-444444444444', 'Complimentary Breakfast', 'Coffee'),
  ('a5555555-5555-5555-5555-555555555555', 'Spa & Wellness', 'Sparkles'),
  ('a6666666-6666-6666-6666-666666666666', 'King Size Bed', 'BedDouble'),
  ('a7777777-7777-7777-7777-777777777777', '24/7 Room Service', 'Utensils'),
  ('a8888888-8888-8888-8888-888888888888', 'Heritage Balcony', 'Sun')
on conflict (name) do nothing;

-- Insert Sample Rooms
insert into public.rooms (id, room_number, title, description, room_type_id, price_per_night, capacity, beds, size_sqft, images, is_active) values
  (
    'e1111111-1111-1111-1111-111111111111',
    '101',
    'The Victoria Heritage Chamber',
    'Restored colonial chamber featuring original 19th-century mahogany woodwork, warm ambient sconces, and Egyptian cotton linens.',
    '11111111-1111-1111-1111-111111111111',
    6500.00,
    2,
    1,
    420,
    ARRAY[
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  ),
  (
    'e2222222-2222-2222-2222-222222222222',
    '201',
    'The Maharajah Grand Suite',
    'An expansive heritage suite with hand-woven silk tapestries, private veranda overlooking royal gardens, and marble ensuite soaking tub.',
    '22222222-2222-2222-2222-222222222222',
    12500.00,
    3,
    2,
    750,
    ARRAY[
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  ),
  (
    'e3333333-3333-3333-3333-333333333333',
    '301',
    'Imperial Governor Penthouse',
    'The crown jewel of StayEase. 360-degree estate views, private terrace, vintage gramophone lounge, and dedicated round-the-clock butler service.',
    '33333333-3333-3333-3333-333333333333',
    24000.00,
    4,
    2,
    1200,
    ARRAY[
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  ),
  (
    'e4444444-4444-4444-4444-444444444444',
    '102',
    'Courtyard Garden Retreat',
    'Quiet and intimate ground-level chamber opening directly onto the historic stone courtyard fountain and jasmine arbors.',
    '44444444-4444-4444-4444-444444444444',
    4800.00,
    2,
    1,
    350,
    ARRAY[
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  ),
  (
    'e5555555-5555-5555-5555-555555555555',
    '103',
    'Colonial Deluxe Twin',
    'Elegantly appointed twin-bed room ideal for family or companions, equipped with writing desk, lounge chairs and garden vistas.',
    '11111111-1111-1111-1111-111111111111',
    6800.00,
    2,
    2,
    450,
    ARRAY[
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  ),
  (
    'e6666666-6666-6666-6666-666666666666',
    '202',
    'Heritage Royal Residence',
    'Double-ceiling suite with hand-carved rosewood poster bed, private balcony, and ambient vintage copper reading lights.',
    '22222222-2222-2222-2222-222222222222',
    11000.00,
    3,
    1,
    680,
    ARRAY[
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80'
    ],
    true
  )
on conflict (room_number) do nothing;

-- Associate Amenities with Rooms
insert into public.room_amenities (room_id, amenity_id)
select r.id, a.id from public.rooms r, public.amenities a
where r.room_number in ('101', '102', '103', '201', '202', '301')
on conflict do nothing;
