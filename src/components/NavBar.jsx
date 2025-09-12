import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  RotateCcw,
  LogOut,
} from "lucide-react";

// Import your actual logo file
import MyLogoFile from "../assets/mylogo.svg";

const NavBar = ({ onLogout }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "add-stock", label: "Add Stock", icon: Package },
    { id: "sell", label: "Sell", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: FileText },
    { id: "auto-order", label: "Auto Order", icon: RotateCcw },
  ];

  return (
    <header className="relative z-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 animate-navbar">
        <div className="grid grid-cols-3 items-center h-16 pr-4 sm:pr-6 lg:pr-8">
          {/* Left Column: Brand (Logo + Text) */}
          <div className="flex items-center gap-2">
            <img
              src={MyLogoFile}
              alt="MediTracker Logo"
              className="h-12 w-auto"
            />
            <div>
              <div className="text-xl lg:text-2xl font-extrabold leading-tight whitespace-nowrap">
                <span className="medi-text-blue">Medi</span>
                <span className="tracker-text-green">Tracker</span>
              </div>
              <div className="hidden md:block text-sm text-gray-500">
                Pharmacy & Inventory
              </div>
            </div>
          </div>

          {/* Center Column: Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavLink
                key={id}
                to={`/${id}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-400 text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-800 hover:shadow-sm hover:scale-105"
                  }`
                }
              >
                <Icon className="nav-icon" size={20} />
                <span className="text-lg whitespace-nowrap">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Column: Logout Button */}
          <div className="flex justify-end col-start-3">
            <button
              onClick={onLogout}
              className="border border-red-500 text-red-500 font-semibold shadow-sm hover:bg-red-500 hover:text-white hover:scale-105 transform transition flex items-center justify-center rounded-full p-2 sm:px-4 sm:py-2"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline text-lg ml-2">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav (bottom) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-white/95 backdrop-blur-md border border-gray-300 shadow-2xl rounded-3xl px-3 py-2 flex justify-between items-center z-50">
        {navItems.map(({ id, label, icon: Icon }) => (
          <NavLink
            key={id}
            to={`/${id}`}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-400 text-white shadow-md scale-105"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-800 hover:shadow-sm hover:scale-105"
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[11px]">{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-navbar {
            background: linear-gradient(90deg, #ffffff, #f9fafb, #ffffff);
            background-size: 200% 200%;
            animation: navbarShimmer 8s ease infinite;
          }
          @keyframes navbarShimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .medi-text-blue {
            background: linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShiftBlue 6s linear infinite;
          }
          @keyframes gradientShiftBlue {
            to { background-position: 200% center; }
          }

          .tracker-text-green {
            background: linear-gradient(90deg, #059669, #10b981, #34d399);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShiftGreen 6s linear infinite;
          }
          @keyframes gradientShiftGreen {
            to { background-position: 200% center; }
          }
        `}
      </style>
    </header>
  );
};

export default NavBar;
