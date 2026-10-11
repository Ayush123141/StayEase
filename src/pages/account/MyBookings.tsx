import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { formatCurrency } from '../../lib/format';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../api/supabaseClient';
import type { Booking } from '../../types/database';

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, room:rooms(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data as Booking[]);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelStay = async (bookingId: string) => {
    if (!confirm('Are you sure you wish to cancel this reservation?')) return;
    setCancellingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (!error) {
        setBookings(bookings.map((b) => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      } else {
        alert('Could not cancel booking: ' + error.message);
      }
    } catch (err: any) {
      alert('Error: ' + err?.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <span className="label-caps text-[#B8924A]">PATRON ITINERARY</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">My Heritage Stays</h1>
        <p className="text-xs text-[#1C1410]/70">Review upcoming bookings and past reservations saved in your Supabase ledger.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#B8924A] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs uppercase tracking-wider text-[#B8924A] mt-3">Loading Patron Stays...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-[#EADFC8] p-10 rounded-lg border border-[#B8924A]/30 text-center space-y-4">
          <h3 className="font-serif text-2xl text-[#1C1410]">No Reservations on File</h3>
          <p className="text-xs text-[#1C1410]/70">You currently have no recorded chamber reservations.</p>
          <a
            href="/rooms"
            className="inline-block bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-wider px-5 py-2.5 rounded-[3px] border border-[#B8924A]/40 transition"
          >
            Explore Chambers
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'cancelled';
            return (
              <div
                key={booking.id}
                className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`label-caps px-2.5 py-0.5 rounded border text-[10px] ${
                        isCancelled
                          ? 'border-[#5B1A1F] text-[#5B1A1F] bg-[#5B1A1F]/10'
                          : 'border-[#0F2A24] text-[#0F2A24] bg-[#0F2A24]/10'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="font-mono text-xs text-gray-600">ID: {booking.id.slice(0, 8)}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#1C1410]">
                    {booking.room?.title || 'Heritage Chamber'}
                  </h3>
                  <p className="text-xs text-[#1C1410]/70">
                    Chamber {booking.room?.room_number || 'N/A'} · {booking.guests} Guests
                  </p>

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
                      className="text-xs uppercase tracking-wider text-[#1C1410] hover:text-[#5B1A1F] border border-[#B8924A]/40 px-3 py-1.5 rounded bg-[#F6EFE2] cursor-pointer"
                    >
                      Voucher
                    </button>
                    {!isCancelled && (
                      <button
                        disabled={cancellingId === booking.id}
                        onClick={() => handleCancelStay(booking.id)}
                        className="text-xs uppercase tracking-wider text-[#5B1A1F] hover:underline cursor-pointer"
                      >
                        {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Stay'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
