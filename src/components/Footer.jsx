import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import MyLogoFile from "../assets/MyLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#1b2735] text-gray-300 w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2">
              <img
                src={MyLogoFile}
                alt="MediTracker Logo"
                className="h-12 w-auto md:h-16"
              />
              <div>
                <div className="text-base font-bold">
                  <span className="text-blue-400">Medi</span>
                  <span className="text-green-400">Tracker</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  Pharmacy & Inventory
                </p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 max-w-xs">
              Seamless inventory, sales, and real-time alerts for your pharmacy.
            </p>
          </div>

          {/* Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <h3 className="text-sm font-semibold text-gray-200">Information</h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-blue-400">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-400">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <h3 className="text-sm font-semibold text-gray-200">
              Helpful Links
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link to="/services" className="hover:text-blue-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-400">
                  Supports
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + Contact (hidden on mobile) */}
          <div className="hidden sm:flex flex-col items-start text-left space-y-2 w-full max-w-sm mx-auto">
            <h3 className="text-sm font-semibold text-gray-200">
              Stay Updated
            </h3>

            <div className="flex w-full border border-gray-600 rounded-md overflow-hidden bg-gray-100">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 flex-1 bg-gray-100 text-gray-800 placeholder-gray-500 text-[12px] focus:outline-none"
              />
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-3 text-white text-[12px] font-medium w-auto">
                Subscribe
              </button>
            </div>

            <div className="text-[11px] text-gray-400 space-y-1 mt-1">
              <p>📞 +91 9999 999 999</p>
              <p>✉️ youremailid.com</p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-6 space-x-3">
          <a className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 text-[11px]">
            <FaFacebook />
          </a>
          <a className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 text-[11px]">
            <FaInstagramSquare />
          </a>
          <a className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 text-[11px]">
            <FaGithubSquare />
          </a>
          <a className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-700 text-gray-200 hover:bg-blue-500 text-[11px]">
            <FaTwitterSquare />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-3 mt-4 text-center text-[10px] text-gray-400">
          © {new Date().getFullYear()} Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
