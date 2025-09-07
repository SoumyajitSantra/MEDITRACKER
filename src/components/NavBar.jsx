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

const NavBar = ({ onLogout }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "add-stock", label: "Add Stock", icon: Package },
    { id: "sell", label: "Sell", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: FileText },
    { id: "auto-order", label: "Auto Order", icon: RotateCcw },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            MediTracker
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavLink
                key={id}
                to={`/${id}`}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50 hover:shadow transition-all duration-300"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dock Navigation */}
      <div className="md:hidden bg-white border-t shadow-lg fixed bottom-0 w-full flex justify-around py-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <NavLink
            key={id}
            to={`/${id}`}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-blue-700 font-semibold scale-105"
                  : "text-gray-500 hover:text-blue-600"
              }`
            }
          >
            <Icon size={22} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
