// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddStock from "./components/AddStock";
import Sell from "./components/Sell";
import Inventory from "./components/Inventory";
import AutoOrder from "./components/AutoOrder";
import MyLogoFile from "./assets/mylogo.svg";
import "./App.css";
import Auth from "./components/Auth";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // ✅ Restore login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Splash screen
  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000);
    const timer2 = setTimeout(() => setLoading(false), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen bg-white transition-all ${
          fadeOut ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      >
        <div className="flex items-center space-x-4">
          <img
            src={MyLogoFile}
            alt="Logo"
            className="w-20 h-20 animate-bounce"
          />
          <div>
            <h1 className="text-4xl font-extrabold flex space-x-2">
              <span className="medi-text-blue animate-slideInLeft">Medi</span>
              <span className="tracker-text-green animate-slideInRight">
                Tracker
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const showNavBarAndFooter = location.pathname !== "/auth";

  const PrivateRoute = ({ children }) =>
    isLoggedIn ? children : <Navigate to="/auth" replace />;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        location.pathname !== "/auth"
          ? "bg-gradient-to-br from-cyan-100 via-white to-blue-200"
          : "bg-transparent"
      }`}
    >
      {showNavBarAndFooter && (
        <NavBar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      )}
      <div
        className={`flex-grow ${
          location.pathname !== "/auth" ? "pt-20 pb-20" : "p-0"
        }`}
      >

         {/* ✅ Add this before your Routes */}
        <ScrollToTop />
        <Routes>
          
          {/* Public home */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />

          {/* Protected routes */}
          <Route
            path="/add-stock"
            element={
              <PrivateRoute>
                <AddStock />
              </PrivateRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <PrivateRoute>
                <Sell isLoggedIn={isLoggedIn} />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory isLoggedIn={isLoggedIn} />
              </PrivateRoute>
            }
          />
          <Route
            path="/auto-order"
            element={
              <PrivateRoute>
                <AutoOrder isLoggedIn={isLoggedIn} />
              </PrivateRoute>
            }
          />

          {/* Auth page */}
          <Route
            path="/auth"
            element={<Auth setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* Fallback */}
          <Route path="*" element={<Home isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>

      {showNavBarAndFooter && <Footer />}
    </div>
  );
}

export default App;
