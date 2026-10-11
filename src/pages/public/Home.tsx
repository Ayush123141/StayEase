import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Search } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="space-y-24">
      <section className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center px-4"
               style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A24]/60 via-[#0F2A24]/75 to-[#0F2A24]/90" />
        
        <div className="absolute w-96 h-96 rounded-full bg-[#B8924A]/20 blur-[100px] pointer-events-none -top-10 left-1/4" />
        <div className="absolute w-80 h-80 rounded-full bg-[#5B1A1F]/25 blur-[90px] pointer-events-none bottom-10 right-1/4" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-10">
          <div className="space-y-4">
            <span className="label-caps text-[#D9BC82] tracking-[0.3em] inline-block">
              EST. 1962 · CIVIL LINES, PUNE
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#F6EFE2] leading-[1.08] tracking-tight">
              A stay worth <span className="italic text-[#D9BC82] font-normal">remembering</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-[#CFC6B4] text-base sm:text-lg font-light leading-relaxed">
              Step across the stone threshold into quiet colonial courtyards, teak-paneled suites, and bespoke hospitality crafted over sixty years.
            </p>
          </div>

          <div className="glass p-5 sm:p-6 max-w-4xl mx-auto border-gold-hairline shadow-2xl">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end text-left">
              <div>
                <label className="label-caps text-[#D9BC82] block mb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Check-In</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-black/30 border border-[#B8924A]/40 rounded-[3px] text-[#F6EFE2] px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9BC82]"
                />
              </div>

              <div>
                <label className="label-caps text-[#D9BC82] block mb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Check-Out</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-black/30 border border-[#B8924A]/40 rounded-[3px] text-[#F6EFE2] px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9BC82]"
                />
              </div>

              <div>
                <label className="label-caps text-[#D9BC82] block mb-1.5 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#0F2A24] border border-[#B8924A]/40 rounded-[3px] text-[#F6EFE2] px-3 py-2.5 text-sm focus:outline-none focus:border-[#D9BC82]"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] py-2.5 px-4 rounded-[3px] border border-[#B8924A]/50 font-medium label-caps tracking-[0.18em] transition shadow-lg flex items-center justify-center space-x-2 h-[42px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Availability</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#B8924A]/30 pb-6 mb-12">
          <div>
            <span className="label-caps text-[#B8924A] tracking-[0.25em]">ACCOMMODATIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1410] mt-1">
              Historic Chambers & <span className="italic text-[#B8924A]">Royal Suites</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/rooms')}
            className="text-xs uppercase tracking-[0.18em] font-medium text-[#5B1A1F] hover:text-[#782329] mt-4 md:mt-0 flex items-center space-x-1"
          >
            <span>View All Chambers</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#EADFC8] rounded-lg p-5 border border-[#B8924A]/30 space-y-4 hover:shadow-xl transition-shadow duration-500">
            <div className="overflow-hidden arched-frame border border-[#B8924A]/40 h-64 bg-black/10">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                alt="Victoria Chamber"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="label-caps text-[#B8924A]">DELUXE CHAMBER</span>
              <h3 className="font-serif text-2xl text-[#1C1410]">The Victoria Heritage Chamber</h3>
              <p className="text-xs text-[#1C1410]/70 mt-1 line-clamp-2">
                Restored 19th-century mahogany woodwork, warm ambient sconces, and Egyptian cotton linens.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#B8924A]/20 pt-3">
                <span className="font-serif text-xl font-bold text-[#5B1A1F]">₹6,500 <span className="text-xs font-sans font-normal text-[#1C1410]/60">/ night</span></span>
                <button
                  onClick={() => navigate('/rooms')}
                  className="text-xs uppercase font-medium tracking-wider text-[#1C1410] hover:text-[#5B1A1F]"
                >
                  Details →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#EADFC8] rounded-lg p-5 border border-[#B8924A]/30 space-y-4 hover:shadow-xl transition-shadow duration-500">
            <div className="overflow-hidden arched-frame border border-[#B8924A]/40 h-64 bg-black/10">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
                alt="Maharajah Grand Suite"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="label-caps text-[#B8924A]">PALACE SUITE</span>
              <h3 className="font-serif text-2xl text-[#1C1410]">The Maharajah Grand Suite</h3>
              <p className="text-xs text-[#1C1410]/70 mt-1 line-clamp-2">
                Hand-woven silk tapestries, private veranda overlooking royal gardens, and marble ensuite soaking tub.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#B8924A]/20 pt-3">
                <span className="font-serif text-xl font-bold text-[#5B1A1F]">₹12,500 <span className="text-xs font-sans font-normal text-[#1C1410]/60">/ night</span></span>
                <button
                  onClick={() => navigate('/rooms')}
                  className="text-xs uppercase font-medium tracking-wider text-[#1C1410] hover:text-[#5B1A1F]"
                >
                  Details →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#EADFC8] rounded-lg p-5 border border-[#B8924A]/30 space-y-4 hover:shadow-xl transition-shadow duration-500">
            <div className="overflow-hidden arched-frame border border-[#B8924A]/40 h-64 bg-black/10">
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                alt="Governor Penthouse"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="label-caps text-[#B8924A]">PRESIDENTIAL RESIDENCE</span>
              <h3 className="font-serif text-2xl text-[#1C1410]">Imperial Governor Penthouse</h3>
              <p className="text-xs text-[#1C1410]/70 mt-1 line-clamp-2">
                Estate views, private terrace, vintage gramophone lounge, and dedicated round-the-clock butler service.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#B8924A]/20 pt-3">
                <span className="font-serif text-xl font-bold text-[#5B1A1F]">₹24,000 <span className="text-xs font-sans font-normal text-[#1C1410]/60">/ night</span></span>
                <button
                  onClick={() => navigate('/rooms')}
                  className="text-xs uppercase font-medium tracking-wider text-[#1C1410] hover:text-[#5B1A1F]"
                >
                  Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F2A24] text-[#F6EFE2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#B8924A]/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="label-caps text-[#D9BC82] tracking-[0.25em]">EXPERIENCES & COMFORTS</span>
            <h2 className="font-serif text-3xl sm:text-4xl">
              An Atmosphere of <span className="italic text-[#D9BC82]">Quiet Grandeur</span>
            </h2>
            <p className="text-sm text-[#CFC6B4]">
              Every amenity at StayEase is curated to echo the unhurried elegance of an earlier era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden border border-[#B8924A]/40 h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
                alt="Courtyard pool"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="label-caps text-[#D9BC82]">HERITAGE COURTYARDS</span>
              <h3 className="font-serif text-3xl text-[#F6EFE2]">
                Afternoon Tea & The Colonial Courtyard
              </h3>
              <p className="text-sm text-[#CFC6B4] leading-relaxed">
                Enjoy single-estate Darjeeling teas and artisanal pastries served under century-old banyan trees, accompanied by classical sitar echoes as twilight falls.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/rooms')}
                  className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-[3px] border border-[#B8924A]/40 transition"
                >
                  Plan Your Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pb-12">
        <div className="w-10 h-10 border border-[#B8924A] mx-auto flex items-center justify-center rotate-45">
          <span className="font-serif text-xl text-[#B8924A] -rotate-45">“</span>
        </div>
        <blockquote className="font-serif text-2xl sm:text-3xl italic text-[#1C1410] leading-snug">
          "StayEase feels like stepping onto the set of a vintage period film. The attention to teak woodwork, quiet service, and morning courtyard light is unmatched anywhere in the state."
        </blockquote>
        <div className="text-xs uppercase tracking-widest text-[#B8924A] font-medium">
          — Lady Constance & Sir Alistair, London
        </div>
      </section>
    </div>
  );
};

export default Home;
