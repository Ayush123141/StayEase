import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BedDouble, CalendarCheck, Users, BarChart3, Home } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/rooms', label: 'Chambers & Suites', icon: BedDouble },
    { to: '/admin/bookings', label: 'Bookings Register', icon: CalendarCheck },
    { to: '/admin/guests', label: 'Guest Ledger', icon: Users },
    { to: '/admin/reports', label: 'Revenue & Occupancy', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0F2A24] text-[#F6EFE2] border-r border-[#B8924A]/30 min-h-screen p-5 flex flex-col justify-between">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center space-x-3 pb-4 border-b border-[#B8924A]/25">
          <div className="w-8 h-8 border border-[#B8924A] flex items-center justify-center rotate-45">
            <span className="font-serif text-sm font-bold text-[#D9BC82] -rotate-45">S</span>
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-wider text-[#F6EFE2] block leading-none">
              STAYEASE
            </span>
            <span className="label-caps text-[8px] text-[#D9BC82] tracking-[0.2em] block mt-1">
              ADMINISTRATION
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-[3px] text-xs uppercase tracking-wider font-medium transition ${
                    isActive
                      ? 'bg-[#B8924A]/20 text-[#D9BC82] border-l-2 border-[#B8924A]'
                      : 'text-[#CFC6B4] hover:bg-white/5 hover:text-[#F6EFE2]'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#D9BC82]" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-[#B8924A]/25">
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#D9BC82] hover:text-[#F6EFE2] transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Public Site</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
