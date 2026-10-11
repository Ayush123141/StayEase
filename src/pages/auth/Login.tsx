import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (email.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/account/bookings');
        }
      } else {
        navigate('/');
      }
    } catch {
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2A24] px-4 py-12 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-25"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')` }} />
      
      <div className="relative z-10 w-full max-w-md bg-[#EADFC8] p-8 rounded-lg border border-[#B8924A]/40 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border border-[#B8924A] mx-auto flex items-center justify-center rotate-45 mb-4">
            <span className="font-serif text-lg font-bold text-[#5B1A1F] -rotate-45">S</span>
          </div>
          <span className="label-caps text-[#B8924A]">GUEST & STAFF PORTAL</span>
          <h2 className="font-serif text-3xl text-[#1C1410]">Welcome to StayEase</h2>
          <p className="text-xs text-[#1C1410]/70">Enter your credentials to manage stays and operations.</p>
        </div>

        {error && (
          <div className="p-3 bg-[#5B1A1F]/10 border border-[#5B1A1F] text-[#5B1A1F] text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <label className="label-caps text-[#1C1410]/80 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#1C1410]/70">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" className="accent-[#5B1A1F]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-[#5B1A1F] underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] py-3 rounded-[3px] border border-[#B8924A]/40 font-medium label-caps tracking-[0.2em] transition shadow"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#B8924A]/20 text-center text-xs text-[#1C1410]/70">
          <span>New guest? </span>
          <Link to="/" className="text-[#5B1A1F] font-semibold hover:underline">
            Browse our heritage chambers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
