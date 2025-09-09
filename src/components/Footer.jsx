import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 w-full mt-12 ">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 ">

                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">MediTracker</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            A modern pharmacy management solution to streamline inventory, sales, and alerts.
                            Manage your store efficiently with real-time insights.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/home" className="hover:text-yellow-300 transition">Dashboard</Link></li>
                            <li><Link to="/add-stock" className="hover:text-yellow-300 transition">Add Stock</Link></li>
                            <li><Link to="/sales" className="hover:text-yellow-300 transition">Sales</Link></li>
                            <li><Link to="/inventory" className="hover:text-yellow-300 transition">Inventory</Link></li>
                            <li><Link to="/auto-order" className="hover:text-yellow-300 transition">Auto Order</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/documentation" className="hover:text-yellow-300 transition">Documentation</Link></li>
                            <li><Link to="/api" className="hover:text-yellow-300 transition">API Reference</Link></li>
                            <li><Link to="/support" className="hover:text-yellow-300 transition">Support</Link></li>
                            <li><Link to="/community" className="hover:text-yellow-300 transition">Community</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <p className="text-sm mb-2">📧 support@meditracker.com</p>
                        <p className="text-sm mb-4">📞 +91 98765 43210</p>
                        <div className="flex space-x-4 text-lg">
                            <a href="https://www.meditracker.com" className="hover:text-yellow-300 transition">🌐</a>
                            <a href="https://twitter.com/meditracker" className="hover:text-yellow-300 transition">🐦</a>
                            <a href="https://linkedin.com/company/meditracker" className="hover:text-yellow-300 transition">💼</a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} <span className="font-semibold text-white">PharmaCare</span>. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
