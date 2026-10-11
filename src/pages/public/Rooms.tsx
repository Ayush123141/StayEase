import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import type { Room } from '../../types/database';
import { formatCurrency } from '../../lib/format';

const SAMPLE_ROOMS: Room[] = [
  {
    id: 'e1111111-1111-1111-1111-111111111111',
    room_number: '101',
    title: 'The Victoria Heritage Chamber',
    description: 'Restored colonial chamber featuring original 19th-century mahogany woodwork, warm ambient sconces, and Egyptian cotton linens.',
    room_type_id: '1',
    price_per_night: 6500,
    capacity: 2,
    beds: 1,
    size_sqft: 420,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
    is_active: true,
    created_at: new Date().toISOString(),
    room_type: { id: '1', name: 'Deluxe Heritage Room', description: '' }
  },
  {
    id: 'e2222222-2222-2222-2222-222222222222',
    room_number: '201',
    title: 'The Maharajah Grand Suite',
    description: 'An expansive heritage suite with hand-woven silk tapestries, private veranda overlooking royal gardens, and marble ensuite soaking tub.',
    room_type_id: '2',
    price_per_night: 12500,
    capacity: 3,
    beds: 2,
    size_sqft: 750,
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'],
    is_active: true,
    created_at: new Date().toISOString(),
    room_type: { id: '2', name: 'Executive Palace Suite', description: '' }
  },
  {
    id: 'e3333333-3333-3333-3333-333333333333',
    room_number: '301',
    title: 'Imperial Governor Penthouse',
    description: 'The crown jewel of StayEase. 360-degree estate views, private terrace, vintage gramophone lounge, and dedicated butler service.',
    room_type_id: '3',
    price_per_night: 24000,
    capacity: 4,
    beds: 2,
    size_sqft: 1200,
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'],
    is_active: true,
    created_at: new Date().toISOString(),
    room_type: { id: '3', name: 'Royal Presidential Suite', description: '' }
  },
  {
    id: 'e4444444-4444-4444-4444-444444444444',
    room_number: '102',
    title: 'Courtyard Garden Retreat',
    description: 'Quiet and intimate ground-level chamber opening directly onto the historic stone courtyard fountain and jasmine arbors.',
    room_type_id: '4',
    price_per_night: 4800,
    capacity: 2,
    beds: 1,
    size_sqft: 350,
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'],
    is_active: true,
    created_at: new Date().toISOString(),
    room_type: { id: '4', name: 'Courtyard Classic', description: '' }
  }
];

const Rooms: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>(SAMPLE_ROOMS);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(30000);

  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '1';

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        if (checkIn && checkOut) {
          const { data, error } = await supabase.rpc('available_rooms', {
            p_check_in: checkIn,
            p_check_out: checkOut,
            p_guests: parseInt(guests) || 1,
          });
          if (!error && data && data.length > 0) {
            setRooms(data);
          } else {
            setRooms(SAMPLE_ROOMS);
          }
        } else {
          const { data, error } = await supabase
            .from('rooms')
            .select('*, room_type:room_types(*)')
            .eq('is_active', true);
          if (!error && data && data.length > 0) {
            setRooms(data);
          } else {
            setRooms(SAMPLE_ROOMS);
          }
        }
      } catch {
        setRooms(SAMPLE_ROOMS);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [checkIn, checkOut, guests]);

  const filteredRooms = rooms.filter((room) => {
    return room.price_per_night <= maxPrice;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="label-caps text-[#B8924A]">FILTERED SELECTION</span>
          <h1 className="font-serif text-3xl text-[#1C1410]">Available Heritage Chambers</h1>
          {checkIn && checkOut && (
            <p className="text-xs text-[#1C1410]/70 mt-1">
              Dates: <span className="font-semibold text-[#5B1A1F]">{checkIn}</span> to <span className="font-semibold text-[#5B1A1F]">{checkOut}</span> ({guests} guest{parseInt(guests) > 1 ? 's' : ''})
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-[#1C1410]">
            <span>Max Price:</span>
            <span className="font-semibold text-[#5B1A1F]">{formatCurrency(maxPrice)}</span>
          </div>
          <input
            type="range"
            min="4000"
            max="30000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-[#5B1A1F] cursor-pointer"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#B8924A] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs uppercase tracking-wider text-[#B8924A] mt-3">Consulting Chamber Registers...</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="py-20 text-center glass-ivory p-8 border border-[#B8924A]/30 rounded">
          <h3 className="font-serif text-2xl text-[#1C1410]">No Chambers Available</h3>
          <p className="text-sm text-[#1C1410]/70 mt-2">
            Try adjusting your budget or selecting alternate dates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#EADFC8] rounded-lg p-5 border border-[#B8924A]/30 space-y-4 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="overflow-hidden arched-frame border border-[#B8924A]/40 h-64 bg-black/10">
                  <img
                    src={room.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                    alt={room.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="label-caps text-[#B8924A]">Chamber {room.room_number}</span>
                    <span className="text-xs text-[#1C1410]/60">{room.capacity} Guests · {room.beds} Bed</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1C1410] mt-1">{room.title}</h3>
                  <p className="text-xs text-[#1C1410]/70 mt-2 line-clamp-3 leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B8924A]/25 flex items-center justify-between">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#5B1A1F] lining-nums">
                    {formatCurrency(room.price_per_night)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1C1410]/60 block -mt-1">Per Night · Excl. Taxes</span>
                </div>

                <Link
                  to={`/rooms/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                  className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] px-4 py-2.5 rounded-[3px] border border-[#B8924A]/40 transition"
                >
                  Reserve
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
