import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import NewsletterSignup from './components/NewsletterSignup';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminProducts from './components/Admin/AdminProducts';
import AdminOrders from './components/Admin/AdminOrders';
import AdminNewsletter from './components/Admin/AdminNewsletter';
import ProductDetails from './components/ProductDetails';
import PrivateRoute from './components/PrivateRoute';
import Success from './components/Success';
import Cancel from './components/Cancel';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Storefront */}
       <Route
          path="/"
          element={
            <div>
              <div className="hero-section">
                <h1 className="site-logo">POSTXENO</h1>
                <h1 className="site-title">Wear Bold. Live Loud. Be You.</h1>
                <p className="tagline">Unisex streetwear designed for the unapologetic generation.<br />
  No labels. No limits. Just style that speaks your language.</p>
              </div>
              
              <ProductList />
              <NewsletterSignup />
            </div>
          }
        />


        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* 🔒 Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="newsletter" element={<AdminNewsletter />} />

        </Route>
        
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

      </Routes>
    </Router>
  );
}

export default App;