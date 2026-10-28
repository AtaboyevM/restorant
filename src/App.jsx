import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './i18n/i18n';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { Reservations } from './pages/Reservations/Reservations';
import { Favorites } from './pages/Favorites/Favorites';
import { SignIn } from './pages/SignIn/SignIn';
import { Login } from './pages/Login/Login';
import { RestaurantDetails } from './pages/RestaurantDetails/RestaurantDetails';
import { exportProjectZip } from './services/zipExporter';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default function App() {
  const handleDownloadZip = () => {
    exportProjectZip();
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0c0d10] text-[#f3f4f6]">
          {/* Universal Header across all pages */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
              <Route path="/restaurants/:id" element={<RestaurantDetails />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Universal Footer across all pages */}
          <Footer onDownloadZip={handleDownloadZip} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
