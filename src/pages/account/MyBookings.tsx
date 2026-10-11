import React from 'react';
import { Calendar } from 'lucide-react';
import { formatCurrency } from '../../lib/format';

const MyBookings: React.FC = () => {
  const bookings = [
    {
      id: 'res-88291',
      room_title: 'The Maharajah Grand Suite',
      room_number: '201',
      check_in: '2026-11-01',
      check_out: '2026-11-04',
      guests: 2,
      total_price: 42000,
      status: 'confirmed',
      payment_status: 'pending'
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <span className="label-caps text-[#B8924A]">PATRON ITINERARY</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">My Heritage Stays</h1>
        <p className="text-xs text-[#1C1410]/70">Review upcoming bookings and past reservations.</p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="label-caps text-[#0F2A24] bg-[#0F2A24]/10 px-2.5 py-0.5 rounded border border-[#0F2A24]/30">
                  {booking.status}
                </span>
                <span className="font-mono text-xs text-gray-600">ID: {booking.id}</span>
              </div>

              <h3 className="font-serif text-2xl text-[#1C1410]">{booking.room_title}</h3>
              <p className="text-xs text-[#1C1410]/70">Chamber {booking.room_number} · {booking.guests} Guests</p>

              <div className="flex items-center space-x-4 text-xs text-[#1C1410] pt-2">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#B8924A]" />
                  <span>{booking.check_in} to {booking.check_out}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end border-t md:border-t-0 border-[#B8924A]/20 pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <div className="font-serif text-2xl font-bold text-[#5B1A1F]">
                  {formatCurrency(booking.total_price)}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#B8924A] font-medium block">
                  Payment: {booking.payment_status} (Pay at Concierge)
                </span>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="text-xs uppercase tracking-wider text-[#1C1410] hover:text-[#5B1A1F] border border-[#B8924A]/40 px-3 py-1.5 rounded bg-[#F6EFE2]"
                >
                  Voucher
                </button>
                <button
                  onClick={() => alert('Cancellation request submitted to concierge.')}
                  className="text-xs uppercase tracking-wider text-[#5B1A1F] hover:underline"
                >
                  Cancel Stay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
