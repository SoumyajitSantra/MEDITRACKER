import { Link } from "react-router-dom";
import { Package, ShoppingCart, AlertTriangle } from "lucide-react";
import Summary from "./Summary";
import somuImg from "../assets/somu.png";
import souravImg from "../assets/sourav.jpg";
import soumikImg from "../assets/soumik.jpg";

const Home = ({ isLoggedIn }) => {
  const developers = [
    {
      name: "Soumyajit Santra",
      role: "Full Stack Developer",
      github: "https://github.com/soumyajitsantra",
      linkedin: "https://www.linkedin.com/in/soumyajit-santra-548312301/",
      image: somuImg,
    },
    {
      name: "Sourav Pradhan",
      role: "Full Stack Developer",
      github: "https://github.com/Sourav721448",
      linkedin: "https://www.linkedin.com/in/sourav-pradhan-018591341/",
      image: souravImg,
    },
    {
      name: "Soumik Sannigrahi",
      role: "Full Stack Developer",
      github: "https://github.com/soumiksannigrahi",
      linkedin: "https://www.linkedin.com/in/soumik-sannigrahi-426727262",
      image: soumikImg,
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* Tagline */}
      <div className="mb-8 text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Simplify Inventory-
          </span>{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Amplify Efficiency
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Stay on top of stock, sales, and insights with ease—so you can focus
          on growing your business.
        </p>
      </div>

      {/* Hero Section - Desktop */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-md border-l-4 border-cyan-400 min-h-[390px] hidden lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="src/assets/Generated_Pharmacy_Video_Content.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-gray-800/60 to-gray-700/60"></div>
        <div className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-12 h-full text-gray-100">
          <div className="mb-8 lg:mb-0 max-w-xl">
            <h2 className="text-4xl font-bold mb-4">
              Streamline Your Pharmacy Operations
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Streamline your inventory, track sales, and automate reorders with
              our modern solution.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-medium">
                Easy Inventory Management
              </span>
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-medium">
                Smart Auto-Reorder
              </span>
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-medium">
                Real-time Analytics
              </span>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-6xl font-extrabold text-white drop-shadow-lg">
              <span>Medi</span>
              <span>Tracker</span>
            </div>
            <div className="text-cyan-300 text-xl mt-2">
              Your Digital Partner
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-md border-l-4 border-cyan-400 min-h-[280px] block lg:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="src/assets/Generated_Pharmacy_Video_Content.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-gray-800/60 to-gray-700/60"></div>
        <div className="relative flex flex-col items-center justify-center px-4 py-8 h-full text-gray-100 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Streamline Your Pharmacy Operations
          </h2>
          <p className="text-sm text-gray-200 mb-4">
            Streamline your inventory, track sales, and automate reorders with
            our modern solution.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
              Easy Inventory
            </span>
            <span className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
              Smart Auto-Reorder
            </span>
            <span className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
              Real-time Analytics
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white drop-shadow-lg">
              MediTracker
            </div>
            <div className="text-cyan-300 text-sm mt-1">
              Your Digital Partner
            </div>
          </div>
        </div>
      </div>

      {/* Summary / Stats */}
      <Summary isLoggedIn={isLoggedIn} />

      {/* Quick Actions (only for logged-in users) */}
      {isLoggedIn && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add Stock */}
            <Link to="/add-stock">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Add New Stock
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quickly add medicines to inventory
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Process Sale */}
            <Link to="/sell">
              <div className="group cursor-pointer bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-2 border-transparent hover:border-green-200 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <ShoppingCart className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Process Sale
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sell medicines and update inventory
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Check Alerts */}
            <Link to="/inventory">
              <div className="group cursor-pointer bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-transparent hover:border-orange-200 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <AlertTriangle className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Check Alerts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Review low stock and expiry alerts
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Developers Section */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Meet the Developers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((dev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition hover:scale-105"
            >
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {dev.name}
                  </h3>
                  <p className="text-gray-600">{dev.role}</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      GitHub
                    </a>
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section (guests only) */}
      {!isLoggedIn && (
        <div className="bg-gray-100 py-16 mt-16 text-center rounded-lg shadow">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simplify Inventory. Amplify Care.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Sign up today and unlock a world of curated features, smart
            inventory, and real-time alerts to keep your pharmacy running
            smoothly.
          </p>
          <Link to="/auth">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
              Get Started with MediTracker
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
