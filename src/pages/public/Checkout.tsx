import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { formatCurrency, calculateNights } from '../../lib/format';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../api/supabaseClient';
import type { Room } from '../../types/database';

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = searchParams.get('roomId') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');

  const [room, setRoom] = useState<Room | null>(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch actual room data from Supabase
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) {
        setLoadingRoom(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*, room_type:room_types(*)')
          .eq('id', roomId)
          .single();

        if (!error && data) {
          setRoom(data as Room);
        }
      } catch (err) {
        console.error('Error fetching room for checkout:', err);
      } finally {
        setLoadingRoom(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const nights = calculateNights(checkIn, checkOut) || 1;
  const rate = room?.price_per_night || 6500;
  const subtotal = rate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      // Direct insertion or RPC into Supabase bookings table
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          room_id: roomId || room?.id,
          check_in: checkIn,
          check_out: checkOut,
          guests: guests,
          total_price: total,
          status: 'confirmed',
          payment_status: 'pending',
          special_requests: specialRequests || null,
        })
        .select()
        .single();

      if (error) {
        // Double-booking exclusion constraint error
        if (error.code === '23P01' || error.message.includes('overlapping') || error.message.includes('no_overlapping_bookings')) {
          setErrorMessage('Sorry, this chamber is already reserved for these dates. Please choose other dates or select another chamber.');
        } else {
          setErrorMessage(error.message);
        }
      } else {
        const bookingId = data?.id;
        navigate(`/booking/${bookingId}/confirmed?room=${encodeURIComponent(room?.title || 'Selected Chamber')}&checkIn=${checkIn}&checkOut=${checkOut}&total=${total}`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error creating reservation.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingRoom) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#B8924A] border-t-transparent rounded-full mx-auto" />
        <p className="text-xs uppercase tracking-wider text-[#B8924A] mt-3">Preparing Chamber Voucher...</p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <span className="label-caps text-[#B8924A]">SECURE RESERVATION</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">Finalize Your Stay</h1>
        <p className="text-xs text-[#1C1410]/70">Confirm guest details and payment settlement.</p>
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Guest Name"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>

              <div>
                <label className="label-caps text-[#1C1410]/80 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@example.com"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>
            </div>

            <div>
              <label className="label-caps text-[#1C1410]/80 block mb-1">Contact Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            className="w-full bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] py-3.5 rounded-[3px] border border-[#B8924A]/50 font-medium label-caps tracking-[0.2em] transition shadow-lg text-center cursor-pointer"
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
                <span className="font-serif text-lg text-[#F6EFE2]">{room?.title || 'Selected Chamber'}</span>
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
                <span>Taxes & Heritage Fee (12%)</span>
                <span className="text-[#F6EFE2]">{formatCurrency(taxes)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#B8924A]/30 text-sm text-[#F6EFE2] font-bold">
                <span>Total Due</span>
                <span className="font-serif text-lg text-[#D9BC82]">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#CFC6B4]/80">
              <ShieldCheck className="w-4 h-4 text-[#D9BC82] shrink-0" />
              <span>Double-booking protected by database constraint.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
