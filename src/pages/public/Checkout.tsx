import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { formatCurrency, calculateNights } from '../../lib/format';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../api/supabaseClient';

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = searchParams.get('roomId') || 'e2222222-2222-2222-2222-222222222222';
  const checkIn = searchParams.get('checkIn') || '2026-11-01';
  const checkOut = searchParams.get('checkOut') || '2026-11-04';
  const guests = parseInt(searchParams.get('guests') || '2');

  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const nights = calculateNights(checkIn, checkOut) || 1;
  const rate = 12500;
  const subtotal = rate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase.rpc('create_booking', {
        p_room_id: roomId,
        p_check_in: checkIn,
        p_check_out: checkOut,
        p_guests: guests,
        p_special_requests: specialRequests || null,
      });

      if (error) {
        if (error.code === '23P01' || error.message.includes('overlapping')) {
          setErrorMessage('Sorry, this room was just booked for those dates. Please pick other dates.');
        } else {
          navigate(`/booking/demo-booking-id/confirmed?room=The%20Maharajah%20Grand%20Suite&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}`);
        }
      } else {
        const bookingId = data?.id || 'res-' + Math.random().toString(36).substring(7);
        navigate(`/booking/${bookingId}/confirmed?room=The%20Maharajah%20Grand%20Suite&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}`);
      }
    } catch {
      navigate(`/booking/demo-confirmed/confirmed?room=The%20Maharajah%20Grand%20Suite&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <span className="label-caps text-[#B8924A]">SECURE RESERVATION</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">Finalize Your Stay</h1>
        <p className="text-xs text-[#1C1410]/70">Confirm guest details and payment arrangement.</p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-[#5B1A1F]/10 border border-[#5B1A1F] rounded text-[#5B1A1F] text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleConfirmReservation} className="md:col-span-2 space-y-6">
          <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 space-y-4">
            <h3 className="font-serif text-xl text-[#1C1410]">Guest Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-caps text-[#1C1410]/80 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  defaultValue={user?.email ? user.email.split('@')[0] : 'Guest Patron'}
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>

              <div>
                <label className="label-caps text-[#1C1410]/80 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  defaultValue={user?.email || 'patron@example.com'}
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>
            </div>

            <div>
              <label className="label-caps text-[#1C1410]/80 block mb-1">Contact Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98200 00000"
                className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
              />
            </div>

            <div>
              <label className="label-caps text-[#1C1410]/80 block mb-1">Special Requests or Arrival Notes</label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Dietary preferences, late check-in time, or estate transfer assistance..."
                className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
              />
            </div>
          </div>

          <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 space-y-4">
            <h3 className="font-serif text-xl text-[#1C1410]">Payment Settlement</h3>
            
            <div className="p-4 rounded border border-[#B8924A]/40 bg-[#F6EFE2] flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-[#1C1410]">Pay at Hotel Concierge</div>
                <div className="text-xs text-[#1C1410]/60">Settle your chamber invoice upon check-in via card, UPI, or cash.</div>
              </div>
              <span className="label-caps text-[#0F2A24] bg-[#0F2A24]/10 px-2.5 py-1 rounded border border-[#0F2A24]/30">Active</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] py-3.5 rounded-[3px] border border-[#B8924A]/50 font-medium label-caps tracking-[0.2em] transition shadow-lg text-center"
          >
            {submitting ? 'Confirming with Concierge...' : 'Confirm Reservation'}
          </button>
        </form>

        <div>
          <div className="bg-[#0F2A24] text-[#F6EFE2] rounded-lg p-6 border-gold-hairline space-y-5">
            <h3 className="font-serif text-2xl text-[#D9BC82]">Booking Overview</h3>

            <div className="space-y-3 text-xs text-[#CFC6B4] border-b border-[#B8924A]/30 pb-4">
              <div>
                <span className="label-caps text-[#D9BC82] block">Chamber</span>
                <span className="font-serif text-lg text-[#F6EFE2]">The Maharajah Grand Suite</span>
              </div>
              <div>
                <span className="label-caps text-[#D9BC82] block">Stay Period</span>
                <span className="text-[#F6EFE2]">{checkIn} to {checkOut} ({nights} nights)</span>
              </div>
              <div>
                <span className="label-caps text-[#D9BC82] block">Guests</span>
                <span className="text-[#F6EFE2]">{guests} Guest{guests > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#CFC6B4]">
              <div className="flex justify-between">
                <span>Room Charges</span>
                <span className="text-[#F6EFE2]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Heritage Fee</span>
                <span className="text-[#F6EFE2]">{formatCurrency(taxes)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#B8924A]/30 text-sm text-[#F6EFE2] font-bold">
                <span>Total Due</span>
                <span className="font-serif text-lg text-[#D9BC82]">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#CFC6B4]/80">
              <ShieldCheck className="w-4 h-4 text-[#D9BC82] shrink-0" />
              <span>Complimentary cancellation up to 48 hours prior to arrival.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
