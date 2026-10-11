import React from 'react';
import { BedDouble, Users, CalendarCheck, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../lib/format';

const REVENUE_DATA = [
  { month: 'May', revenue: 420000 },
  { month: 'Jun', revenue: 480000 },
  { month: 'Jul', revenue: 530000 },
  { month: 'Aug', revenue: 610000 },
  { month: 'Sep', revenue: 590000 },
  { month: 'Oct', revenue: 720000 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <span className="label-caps text-[#B8924A]">OPERATIONS & PERFORMANCE</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1410]">Hotel Control Dashboard</h1>
        <p className="text-xs text-[#1C1410]/70">Today's occupancy, arrivals, and revenue metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#EADFC8] p-5 rounded-lg border border-[#B8924A]/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#1C1410]/70">
            <span className="label-caps text-[#B8924A]">TODAY'S ARRIVALS</span>
            <CalendarCheck className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1410]">8</div>
          <span className="text-[11px] text-green-700">4 checked in · 4 expected</span>
        </div>

        <div className="bg-[#EADFC8] p-5 rounded-lg border border-[#B8924A]/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#1C1410]/70">
            <span className="label-caps text-[#B8924A]">OCCUPANCY RATE</span>
            <BedDouble className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1410]">84%</div>
          <span className="text-[11px] text-[#1C1410]/60">16 of 19 chambers reserved</span>
        </div>

        <div className="bg-[#EADFC8] p-5 rounded-lg border border-[#B8924A]/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#1C1410]/70">
            <span className="label-caps text-[#B8924A]">MONTHLY REVENUE</span>
            <TrendingUp className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#5B1A1F]">{formatCurrency(720000)}</div>
          <span className="text-[11px] text-green-700">+18% vs preceding month</span>
        </div>

        <div className="bg-[#EADFC8] p-5 rounded-lg border border-[#B8924A]/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#1C1410]/70">
            <span className="label-caps text-[#B8924A]">REGISTERED PATRONS</span>
            <Users className="w-4 h-4 text-[#B8924A]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C1410]">342</div>
          <span className="text-[11px] text-[#1C1410]/60">46 royal tier members</span>
        </div>
      </div>

      {/* Recharts Revenue Trend Chart (styled with gold/oxblood/mist tones per §2A) */}
      <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="label-caps text-[#B8924A]">FINANCIAL LEDGER</span>
            <h3 className="font-serif text-2xl text-[#1C1410]">Revenue Inflow (6 Months)</h3>
          </div>
          <span className="text-xs text-[#1C1410]/60">Values in INR</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B8924A" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#B8924A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(184,146,74,0.15)" />
              <XAxis dataKey="month" stroke="#1C1410" fontSize={12} tickLine={false} />
              <YAxis stroke="#1C1410" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F2A24',
                  borderColor: '#B8924A',
                  color: '#F6EFE2',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
                formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#B8924A" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-[#EADFC8] p-6 rounded-lg border border-[#B8924A]/30 space-y-4">
        <h3 className="font-serif text-2xl text-[#1C1410]">Recent Chamber Reservations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1C1410]">
            <thead>
              <tr className="border-b border-[#B8924A]/30 text-[#B8924A] label-caps">
                <th className="py-2.5">Guest</th>
                <th className="py-2.5">Chamber</th>
                <th className="py-2.5">Dates</th>
                <th className="py-2.5">Total</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8924A]/15">
              <tr>
                <td className="py-3 font-medium">Lord Arthur Wellesley</td>
                <td className="py-3">The Maharajah Grand Suite (201)</td>
                <td className="py-3">01 Nov – 04 Nov</td>
                <td className="py-3 font-semibold text-[#5B1A1F]">₹42,000</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded border border-[#0F2A24] text-[#0F2A24] bg-[#0F2A24]/10 label-caps text-[9px]">
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Dr. Gayatri Sen</td>
                <td className="py-3">The Victoria Chamber (101)</td>
                <td className="py-3">03 Nov – 05 Nov</td>
                <td className="py-3 font-semibold text-[#5B1A1F]">₹14,560</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded border border-[#B8924A] text-[#B8924A] bg-[#B8924A]/10 label-caps text-[9px]">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Rajiv Singhania</td>
                <td className="py-3">Courtyard Garden Retreat (102)</td>
                <td className="py-3">28 Oct – 30 Oct</td>
                <td className="py-3 font-semibold text-[#5B1A1F]">₹10,752</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded border border-[#0F2A24] text-[#0F2A24] bg-[#0F2A24]/10 label-caps text-[9px]">
                    Checked In
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
