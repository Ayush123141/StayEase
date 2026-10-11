import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Printer } from 'lucide-react';
import { formatCurrency } from '../../lib/format';

const BookingConfirmed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const room = searchParams.get('room') || 'The Maharajah Grand Suite';
  const checkIn = searchParams.get('checkIn') || '2026-11-01';
  const checkOut = searchParams.get('checkOut') || '2026-11-04';
  const total = Number(searchParams.get('total')) || 42000;

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-[#EADFC8] p-8 sm:p-12 rounded-lg border border-[#B8924A]/40 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#0F2A24] text-[#D9BC82] mx-auto flex items-center justify-center border border-[#B8924A]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="label-caps text-[#B8924A]">RESERVATION CONFIRMED</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">We Look Forward to Welcoming You</h1>
          <p className="text-xs text-[#1C1410]/70">
            Booking Reference: <span className="font-mono font-bold text-[#5B1A1F]">{id || 'SE-89104'}</span>
          </p>
        </div>

        <div className="bg-[#F6EFE2] rounded p-6 border border-[#B8924A]/30 text-left space-y-4">
          <div className="flex justify-between items-start border-b border-[#B8924A]/20 pb-3">
            <div>
              <span className="label-caps text-[#B8924A]">Selected Chamber</span>
              <h3 className="font-serif text-xl text-[#1C1410]">{room}</h3>
            </div>
            <div className="text-right">
              <span className="label-caps text-[#B8924A]">Payment Status</span>
              <span className="block text-xs uppercase tracking-wider text-[#B8924A] font-medium">Pay at Concierge</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-[#1C1410]">
            <div>
              <span className="text-gray-500 block">Check-in Date:</span>
              <span className="font-semibold">{checkIn} (from 2:00 PM)</span>
            </div>
            <div>
              <span className="text-gray-500 block">Check-out Date:</span>
              <span className="font-semibold">{checkOut} (until 11:00 AM)</span>
            </div>
            <div>
              <span className="text-gray-500 block">Property Location:</span>
              <span className="font-semibold">Civil Lines, Pune 411001</span>
            </div>
            <div>
              <span className="text-gray-500 block">Total Invoice:</span>
              <span className="font-serif text-base font-bold text-[#5B1A1F]">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#1C1410] hover:text-[#5B1A1F] border border-[#B8924A]/40 px-5 py-2.5 rounded-[3px] bg-[#F6EFE2] transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Confirmation</span>
          </button>

          <Link
            to="/account/bookings"
            className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] px-6 py-2.5 rounded-[3px] border border-[#B8924A]/40 transition"
          >
            View My Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
