import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Rooms from './pages/public/Rooms';
import RoomDetails from './pages/public/RoomDetails';
import Checkout from './pages/public/Checkout';
import BookingConfirmed from './pages/public/BookingConfirmed';
import Styleguide from './pages/public/Styleguide';
import Login from './pages/auth/Login';
import MyBookings from './pages/account/MyBookings';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRooms from './pages/admin/Rooms';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  if (loading) return <div className="p-8 text-center text-[#B8924A]">Loading registers...</div>;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Guest Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking/:id/confirmed" element={<BookingConfirmed />} />
            <Route path="/account/bookings" element={<MyBookings />} />
            <Route path="/styleguide" element={<Styleguide />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          {/* Admin & Staff Management Portal */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="bookings" element={<AdminDashboard />} />
            <Route path="guests" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
