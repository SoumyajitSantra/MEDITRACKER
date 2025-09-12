import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddStock from "./components/AddStock";
import Sell from "./components/Sell";
import Inventory from "./components/Inventory";
import AutoOrder from "./components/AutoOrder";
import MyLogoFile from "./assets/mylogo.svg";
import "./App.css"; // make sure it's imported

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000); // start fade out
    const timer2 = setTimeout(() => setLoading(false), 2800); // remove splash
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen bg-white transition-all ${fadeOut ? "animate-fadeOut" : "animate-fadeIn"
          }`}
      >
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img
            src={MyLogoFile}
            alt="Logo"
            className="w-20 h-20 animate-bounce"
          />

          {/* Text beside logo */}
          <div>
            <h1 className="text-4xl font-extrabold flex space-x-2">
              <span className="medi-text-blue animate-slideInLeft">Medi</span>
              <span className="tracker-text-green animate-slideInRight">Tracker</span>
            </h1>

          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-amber-50">
      <div className="flex-grow pt-20 pb-20">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/add-stock" element={<AddStock />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/auto-order" element={<AutoOrder />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
