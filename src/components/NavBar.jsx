// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Package,
//   ShoppingCart,
//   FileText,
//   RotateCcw,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import MyLogoFile from "../assets/mylogo.svg";

// const NavBar = ({ onLogout, isLoggedIn }) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navItems = [
//     { id: "home", label: "Home", icon: Home, path: "/" },
//     { id: "add-stock", label: "Add Stock", icon: Package, path: "/add-stock" },
//     { id: "sell", label: "Sell", icon: ShoppingCart, path: "/sell" },
//     { id: "inventory", label: "Inventory", icon: FileText, path: "/inventory" },
//     { id: "auto-order", label: "Auto Order", icon: RotateCcw, path: "/auto-order" },
//   ];

//   // helper to handle click when not logged in
//   const handleClick = (e, path) => {
//     if (!isLoggedIn && path !== "/" && path !== "/home") {
//       e.preventDefault();
//       window.location.href = "/auth";
//     }
//   };

//   return (
//     <header className="relative z-50">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 animate-navbar">
//         <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
//           {/* Left Column: Brand */}
//           <div className="flex items-center gap-2">
//             <img src={MyLogoFile} alt="MediTracker Logo" className="h-12 w-auto" />
//             <div>
//               <div className="text-xl lg:text-2xl font-extrabold leading-tight whitespace-nowrap">
//                 <span className="medi-text-blue">Medi</span>
//                 <span className="tracker-text-green">Tracker</span>
//               </div>
//               <div className="hidden md:block text-sm text-gray-500">
//                 Pharmacy & Inventory
//               </div>
//             </div>
//           </div>

//           {/* Center Column: Desktop Nav */}
//           <div className="hidden md:flex items-center justify-center gap-1 lg:gap-4 flex-1">
//             {navItems.map(({ id, label, icon: Icon, path }) => (
//               <NavLink
//                 key={id}
//                 to={path}
//                 onClick={(e) => handleClick(e, path)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-blue-400 text-white shadow-md scale-105"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-gray-800 hover:shadow-sm hover:scale-105"
//                   }`
//                 }
//               >
//                 <Icon size={20} />
//                 <span className="text-lg whitespace-nowrap">{label}</span>
//               </NavLink>
//             ))}
//           </div>

//           {/* Right Column: Auth + Hamburger (Mobile) */}
//           <div className="flex items-center gap-2">
//             {isLoggedIn ? (
//               <button
//                 onClick={onLogout}
//                 className="hidden md:flex border border-red-500 text-red-500 font-semibold shadow-sm hover:bg-red-500 hover:text-white hover:scale-105 transform transition rounded-full p-2 sm:px-4 sm:py-2"
//               >
//                 <LogOut size={20} />
//                 <span className="hidden sm:inline text-lg ml-2">Logout</span>
//               </button>
//             ) : (
//               <NavLink
//                 to="/auth"
//                 className="hidden md:flex border border-blue-500 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white hover:scale-105 transform transition rounded-full p-2 sm:px-4 sm:py-2"
//               >
//                 Sign Up
//               </NavLink>
//             )}

//             {/* Hamburger button */}
//             <button
//               className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col p-4 space-y-3 animate-slide-down">
//           {navItems.map(({ id, label, icon: Icon, path }) => (
//             <NavLink
//               key={id}
//               to={path}
//               onClick={(e) => {
//                 handleClick(e, path);
//                 setMenuOpen(false);
//               }}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-300 ${
//                   isActive
//                     ? "bg-blue-400 text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`
//               }
//             >
//               <Icon size={18} />
//               <span>{label}</span>
//             </NavLink>
//           ))}

//           {/* Auth in dropdown */}
//           <div className="border-t pt-3">
//             {isLoggedIn ? (
//               <button
//                 onClick={onLogout}
//                 className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 font-semibold shadow-sm hover:bg-red-500 hover:text-white rounded-md px-3 py-2"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             ) : (
//               <NavLink
//                 to="/auth"
//                 className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white rounded-md px-3 py-2"
//               >
//                 Sign Up
//               </NavLink>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Animations */}
//       <style>
//         {`
//           .animate-navbar {
//             background: linear-gradient(90deg, #ffffff, #f9fafb, #ffffff);
//             background-size: 200% 200%;
//             animation: navbarShimmer 8s ease infinite;
//           }
//           @keyframes navbarShimmer {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }

//           .medi-text-blue {
//             background: linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6);
//             background-size: 200% auto;
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             animation: gradientShiftBlue 6s linear infinite;
//           }
//           @keyframes gradientShiftBlue {
//             to { background-position: 200% center; }
//           }

//           .tracker-text-green {
//             background: linear-gradient(90deg, #059669, #10b981, #34d399);
//             background-size: 200% auto;
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             animation: gradientShiftGreen 6s linear infinite;
//           }
//           @keyframes gradientShiftGreen {
//             to { background-position: 200% center; }
//           }

//           .animate-slide-down {
//             animation: slideDown 0.3s ease-out forwards;
//           }
//           @keyframes slideDown {
//             from { opacity: 0; transform: translateY(-10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </header>
//   );
// };

// export default NavBar;





import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  RotateCcw,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import MyLogoFile from "../assets/mylogo.svg";

const NavBar = ({ onLogout, isLoggedIn, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "add-stock", label: "Add Stock", icon: Package, path: "/add-stock" },
    { id: "sell", label: "Sell", icon: ShoppingCart, path: "/sell" },
    { id: "inventory", label: "Inventory", icon: FileText, path: "/inventory" },
    { id: "auto-order", label: "Auto Order", icon: RotateCcw, path: "/auto-order" },
  ];

  // ✅ derive values safely
  const displayName =
    user?.username || user?.displayName || (user?.email ? user.email.split("@")[0] : "");
  const displayEmail = user?.email || "";

  // ✅ Avatar: photo > first letter of username > first letter of email > ?
  const avatarLetter =
    displayName?.charAt(0)?.toUpperCase() ||
    displayEmail?.charAt(0)?.toUpperCase() ||
    "?";

  const handleClick = (e, path) => {
    if (!isLoggedIn && path !== "/" && path !== "/home") {
      e.preventDefault();
      window.location.href = "/auth";
    }
  };

  return (
    <header className="relative z-50">
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 animate-navbar">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src={MyLogoFile} alt="MediTracker Logo" className="h-12 w-auto" />
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-4 flex-1">
            {navItems.map(({ id, label, icon: Icon, path }) => (
              <NavLink
                key={id}
                to={path}
                onClick={(e) => handleClick(e, path)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-400 text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-800 hover:shadow-sm hover:scale-105"
                  }`
                }
              >
                <Icon size={20} />
                <span className="text-lg whitespace-nowrap">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Avatar + Profile */}
          <div className="flex items-center gap-2 relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400 overflow-hidden"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-700 font-bold">{avatarLetter}</span>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border animate-slide-down">
                    <div className="p-3 border-b">
                      <p className="font-semibold">
                        {displayName || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {displayEmail || "No email provided"}
                      </p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/auth"
                className="hidden md:flex border border-blue-500 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white hover:scale-105 transform transition rounded-full p-2 sm:px-4 sm:py-2"
              >
                Sign Up
              </NavLink>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col p-4 space-y-3 animate-slide-down">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <NavLink
              key={id}
              to={path}
              onClick={(e) => {
                handleClick(e, path);
                setMenuOpen(false);
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-400 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          {/* ❌ Removed logout from here */}
          {!isLoggedIn && (
            <div className="border-t pt-3">
              <NavLink
                to="/auth"
                className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white rounded-md px-3 py-2"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
