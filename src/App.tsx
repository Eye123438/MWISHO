import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Auth
import Auth from './pages/Auth';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import Marketplace from './pages/customer/Marketplace';
import Rides from './pages/customer/Rides';

// Seller Pages
import SellerDashboard from './pages/seller/Dashboard';

// Driver Pages
import DriverDashboard from './pages/driver/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/marketplace" element={<Marketplace />} />
            <Route path="/customer/rides" element={<Rides />} />
            
            {/* Seller Routes */}
            <Route path="/seller" element={<SellerDashboard />} />
            
            {/* Driver Routes */}
            <Route path="/driver" element={<DriverDashboard />} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;