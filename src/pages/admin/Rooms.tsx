import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { formatCurrency } from '../../lib/format';
import { supabase } from '../../api/supabaseClient';
import type { Room } from '../../types/database';

const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCapacity, setNewCapacity] = useState('2');
  const [newDesc, setNewDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*, room_type:room_types(*)')
        .order('room_number', { ascending: true });

      if (!error && data) {
        setRooms(data as Room[]);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('rooms').insert({
        room_number: newNumber,
        title: newTitle,
        description: newDesc || 'Heritage appointed chamber with classical woodwork and courtyard views.',
        price_per_night: Number(newPrice),
        capacity: Number(newCapacity),
        beds: 1,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
        is_active: true,
      });

      if (!error) {
        setModalOpen(false);
        setNewTitle('');
        setNewNumber('');
        setNewPrice('');
        setNewDesc('');
        fetchRooms();
      } else {
        alert('Could not add room: ' + error.message);
      }
    } catch (err: any) {
      alert('Error: ' + err?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to remove this room from the live database?')) return;
    try {
      const { error } = await supabase.from('rooms').delete().eq('id', roomId);
      if (!error) {
        setRooms(rooms.filter((r) => r.id !== roomId));
      } else {
        alert('Could not delete room: ' + error.message);
      }
    } catch (err: any) {
      alert('Error: ' + err?.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="label-caps text-[#B8924A]">INVENTORY REPOSITORY</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">Chambers & Suites Catalog</h1>
          <p className="text-xs text-[#1C1410]/70">Live chamber inventory stored directly in your Supabase database.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] px-4 py-2.5 rounded-[3px] border border-[#B8924A]/40 flex items-center space-x-2 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Chamber</span>
        </button>
      </div>

      <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#B8924A] uppercase tracking-wider">
            Loading Live Chambers...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1C1410]">
              <thead>
                <tr className="border-b border-[#B8924A]/30 text-[#B8924A] label-caps">
                  <th className="py-2.5">Number</th>
                  <th className="py-2.5">Chamber Title</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Price / Night</th>
                  <th className="py-2.5">Capacity</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B8924A]/15">
                {rooms.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 font-mono font-bold text-[#5B1A1F]">{r.room_number}</td>
                    <td className="py-3 font-medium">{r.title}</td>
                    <td className="py-3 text-[#1C1410]/70">{r.room_type?.name || 'Chamber'}</td>
                    <td className="py-3 font-semibold text-[#5B1A1F]">{formatCurrency(r.price_per_night)}</td>
                    <td className="py-3">{r.capacity} Guests</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] label-caps border border-[#0F2A24] text-[#0F2A24] bg-[#0F2A24]/10">
                        {r.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteRoom(r.id)}
                        className="text-[#5B1A1F] hover:text-[#782329] cursor-pointer"
                        title="Delete Chamber"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#EADFC8] border border-[#B8924A]/40 rounded-lg p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#B8924A]/30 pb-3">
              <h3 className="font-serif text-2xl text-[#1C1410]">Add Chamber to Catalog</h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-[#1C1410]/70" />
              </button>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="label-caps text-[#1C1410] block mb-1">Chamber Number</label>
                <input
                  type="text"
                  required
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="e.g. 203"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="label-caps text-[#1C1410] block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Rosewood Veranda Suite"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-[#1C1410] block mb-1">Price / Night (INR)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="9500"
                    className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="label-caps text-[#1C1410] block mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="label-caps text-[#1C1410] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Chamber chronicles, view, features..."
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#1C1410]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] px-5 py-2 text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Chamber'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
