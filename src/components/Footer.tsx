import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F2A24] text-[#F6EFE2] border-t border-[rgba(184,146,74,0.45)] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[rgba(217,188,130,0.15)]">
          {/* Col 1: Hotel Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-[#B8924A] flex items-center justify-center rotate-45">
                <span className="font-serif text-sm font-bold text-[#D9BC82] -rotate-45">S</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#F6EFE2]">STAYEASE</span>
            </div>
            <p className="text-sm text-[#CFC6B4] font-light leading-relaxed">
              Established in 1962. A sanctuary of timeless colonial refinement, quiet courtyards, and world-class hospitality.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="label-caps text-[#D9BC82] mb-4">EXPLORE</h4>
            <ul className="space-y-2.5 text-sm text-[#F6EFE2]/80">
              <li>
                <Link to="/" className="hover:text-[#D9BC82] transition">The Estate</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-[#D9BC82] transition">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/styleguide" className="hover:text-[#D9BC82] transition">Design Styleguide</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D9BC82] transition">Staff & Administration</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge */}
          <div>
            <h4 className="label-caps text-[#D9BC82] mb-4">CONCIERGE</h4>
            <ul className="space-y-3 text-sm text-[#CFC6B4]">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D9BC82] shrink-0 mt-1" />
                <span>Heritage Boulevard, Civil Lines, Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D9BC82] shrink-0" />
                <span>+91 (20) 2612-8900</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D9BC82] shrink-0" />
                <span>reservations@stayease-heritage.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Inquiries */}
          <div>
            <h4 className="label-caps text-[#D9BC82] mb-4">PRIVATE INVITATIONS</h4>
            <p className="text-xs text-[#CFC6B4] mb-3">
              Subscribe to receive private seasonal offerings and salon invitations.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-black/20 border border-[rgba(217,188,130,0.3)] text-xs text-[#F6EFE2] px-3 py-2 w-full focus:outline-none focus:border-[#B8924A]"
              />
              <button className="bg-[#5B1A1F] hover:bg-[#782329] text-xs uppercase tracking-wider text-[#F6EFE2] px-4 border border-[#B8924A]/40 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#CFC6B4]/70">
          <p>© 2026 StayEase Heritage Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <span>Security Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
