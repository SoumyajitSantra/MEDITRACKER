import React from "react";
import { Link } from "react-router-dom";
import MyLogoFile from "../assets/MyLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#1b2735] text-gray-300 w-full mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={MyLogoFile}
                alt="MediTracker Logo"
                className="h-14 w-auto"
              />
              <div>
                <div className="text-lg lg:text-xl font-bold leading-tight">
                  <span className="text-blue-400">Medi</span>
                  <span className="text-green-400">Tracker</span>
                </div>
                <p className="text-xs text-gray-400">Pharmacy & Inventory</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Seamless inventory, sales, and real-time alerts for your pharmacy.
            </p>

            <p className="text-xs mb-1">📞 +91 9999 999 999</p>
            <p className="text-xs">✉️ youremailid.com</p>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-200">
              Information
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-blue-400 transition">
                  More Search
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-blue-400 transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-400 transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-200">
              Helpful Links
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link to="/services" className="hover:text-blue-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-400 transition">
                  Supports
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-200">
              Subscribe
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="p-2 w-full rounded-l-md bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none text-xs"
              />
              <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-r-md text-white text-xs font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-3 mt-6">
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white transition text-xs"
          >
            f
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white transition text-xs"
          >
            in
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white transition text-xs"
          >
            🐦
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white transition text-xs"
          >
            ⓘ
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-4 pt-3 text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
