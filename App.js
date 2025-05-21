import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ServiceCategoryDetailPage from './pages/ServiceCategoryDetailPage/ServiceCategoryDetailPage';
import TechnicianProfilePage from './pages/TechnicianProfilePage/TechnicianProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import HelpCenterPage from './pages/HelpCenterPage/HelpCenterPage';
import './App.css'; // Main App CSS

// Placeholder components for pages not yet created
const Placeholder = ({ title }) => <div style={{ padding: '20px', textAlign: 'center' }}><h2>{title}</h2><p>This page is under construction.</p></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:categoryId" element={<ServiceCategoryDetailPage />} />
            <Route path="/technician/:technicianId" element={<TechnicianProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

