import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-[rgba(217,188,130,0.25)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 border border-[#B8924A] flex items-center justify-center rotate-45 group-hover:bg-[#B8924A]/10 transition">
              <span className="font-serif text-lg font-bold text-[#D9BC82] -rotate-45">S</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#F6EFE2] block leading-none">
                STAYEASE
              </span>
              <span className="label-caps text-[9px] text-[#D9BC82] tracking-[0.25em] block mt-1">
                HERITAGE HOTEL & SUITES
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-[#F6EFE2]/90 hover:text-[#D9BC82] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B8924A] hover:after:w-full after:transition-all"
            >
              HOME
            </Link>
            <Link
              to="/rooms"
              className="text-sm font-medium text-[#F6EFE2]/90 hover:text-[#D9BC82] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B8924A] hover:after:w-full after:transition-all"
            >
              ROOMS & SUITES
            </Link>
            <Link
              to="/styleguide"
              className="text-sm font-medium text-[#D9BC82]/80 hover:text-[#D9BC82] transition-colors"
            >
              STYLEGUIDE
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/account/bookings"
                  className="flex items-center space-x-1.5 text-xs text-[#F6EFE2] hover:text-[#D9BC82] py-2 px-3 rounded border border-[#B8924A]/30 transition"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D9BC82]" />
                  <span>My Bookings</span>
                </Link>

                {(role === 'admin' || role === 'staff') && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1.5 text-xs bg-[#B8924A]/20 hover:bg-[#B8924A]/30 text-[#D9BC82] py-2 px-3 rounded border border-[#B8924A]/50 transition"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="p-2 text-[#CFC6B4] hover:text-[#F6EFE2] transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-xs uppercase tracking-wider text-[#F6EFE2] hover:text-[#D9BC82] px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/rooms"
                  className="text-xs font-semibold uppercase tracking-wider bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] px-5 py-2.5 rounded-[3px] border border-[#B8924A]/50 transition shadow-lg"
                >
                  Reserve a Room
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F6EFE2] hover:text-[#D9BC82] p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F2A24] border-b border-[#B8924A]/30 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#F6EFE2] border-b border-white/5"
          >
            HOME
          </Link>
          <Link
            to="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#F6EFE2] border-b border-white/5"
          >
            ROOMS & SUITES
          </Link>
          <Link
            to="/styleguide"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#D9BC82] border-b border-white/5"
          >
            STYLEGUIDE
          </Link>
          {user ? (
            <>
              <Link
                to="/account/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-[#F6EFE2]"
              >
                My Bookings
              </Link>
              {(role === 'admin' || role === 'staff') && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm text-[#D9BC82]"
                >
                  Admin Portal
                </Link>
              )}
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-sm text-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-sm text-[#F6EFE2] border border-[#B8924A]/40 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-sm bg-[#5B1A1F] text-[#F6EFE2] rounded"
              >
                Reserve a Room
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
