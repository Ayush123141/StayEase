import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../api/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  
  const redirectTo = searchParams.get('redirect') || '/';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        // Sign Up with Supabase Auth + profile metadata
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        // If user is returned and session exists, ensure profile created
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            phone: phone,
            role: 'guest',
          });
          await refreshProfile();
          
          if (data.session) {
            navigate(redirectTo);
          } else {
            setSuccessMsg('Account created! Please check your email to confirm registration or sign in directly.');
            setIsSignUp(false);
          }
        }
      } else {
        // Sign In with Supabase Auth
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        if (data.session) {
          await refreshProfile();
          navigate(redirectTo);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error encountered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2A24] px-4 py-12 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')` }}
      />

      <div className="relative z-10 w-full max-w-md bg-[#EADFC8] p-8 rounded-lg border border-[#B8924A]/40 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border border-[#B8924A] mx-auto flex items-center justify-center rotate-45 mb-4">
            <span className="font-serif text-lg font-bold text-[#5B1A1F] -rotate-45">S</span>
          </div>
          <span className="label-caps text-[#B8924A]">
            {isSignUp ? 'CREATE GUEST PATRON ACCOUNT' : 'GUEST & STAFF PORTAL'}
          </span>
          <h2 className="font-serif text-3xl text-[#1C1410]">
            {isSignUp ? 'Join StayEase' : 'Welcome to StayEase'}
          </h2>
          <p className="text-xs text-[#1C1410]/70">
            {isSignUp
              ? 'Register to book chambers and manage your heritage itineraries.'
              : 'Enter your credentials to manage your stays and reservations.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#5B1A1F]/10 border border-[#5B1A1F] text-[#5B1A1F] text-xs rounded flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-700 text-emerald-800 text-xs rounded flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="label-caps text-[#1C1410]/80 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sahil Patil"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>

              <div>
                <label className="label-caps text-[#1C1410]/80 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 00000"
                  className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
                />
              </div>
            </>
          )}

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
              minLength={6}
              className="w-full bg-[#F6EFE2] border border-[#B8924A]/40 rounded-[3px] text-[#1C1410] px-3 py-2 text-sm focus:outline-none focus:border-[#5B1A1F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] py-3 rounded-[3px] border border-[#B8924A]/40 font-medium label-caps tracking-[0.2em] transition shadow"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Patron Account' : 'Sign In'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#B8924A]/20 text-center text-xs text-[#1C1410]/70 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccessMsg('');
            }}
            className="text-[#5B1A1F] font-semibold hover:underline"
          >
            {isSignUp ? 'Already registered? Sign In' : 'New patron? Sign Up'}
          </button>

          <Link to="/" className="text-gray-600 hover:text-[#1C1410]">
            Back to Hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
