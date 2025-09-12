import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import Summary from "./Summary";
import somuImg from "../assets/somu.png";
import souravImg from "../assets/sourav.jpg";
import soumikImg from "../assets/soumik.jpg";

const Home = () => {
  const totalMedicines = 120;
  const totalStock = 500;
  const todaysSales = 30;
  const lowStockItems = 5;

  const developers = [
    {
      name: "Soumyajit Santra",
      role: "Full Stack Developer",
      github: "https://github.com/soumyajit",
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

  const stats = [
    // {
    //   title: 'Total Medicines',
    //   value: totalMedicines,
    //   icon: Package,
    //   color: 'bg-blue-500',
    //   trend: '+12% from last month'
    // },
    // {
    //   title: 'Total Stock',
    //   value: totalStock,
    //   icon: TrendingUp,
    //   color: 'bg-green-500',
    //   trend: 'Updated today'
    // },
    // {
    //   title: "Today's Sales",
    //   value: todaysSales,
    //   icon: ShoppingCart,
    //   color: 'bg-orange-500',
    //   trend: '+5% from yesterday'
    // },
    // {
    //   title: 'Low Stock Alert',
    //   value: lowStockItems,
    //   icon: AlertTriangle,
    //   color: 'bg-red-500',
    //   trend: 'Needs attention'
    // }
    {
      title: "Total Medicines",
      value: totalMedicines,
      icon: Package,
      color: "bg-blue-500",
      trend: "+12% from last month",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: TrendingUp,
      color: "bg-green-500",
      trend: "Updated today",
    },
    {
      title: "Today's Sales",
      value: todaysSales,
      icon: ShoppingCart,
      color: "bg-orange-500",
      trend: "+5% from yesterday",
    },
    {
      title: "Low Stock Alert",
      value: lowStockItems,
      icon: AlertTriangle,
      color: "bg-red-500",
      trend: "Needs attention",
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* Crisp tagline only */}
      <div className="mb-8">
        <p className="text-gray-800 text-xl font-bold">
          Track. Manage. Reorder. Relax
        </p>
      </div>

      {/* Hero Section with Background Video */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-md border-l-4 border-cyan-400 min-h-[390px]">
        {/* Background Video */}
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

        {/* Overlay for readability (reduced opacity) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-gray-800/60 to-gray-700/60"></div>

        {/* Content */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-12 h-full text-gray-100 transition duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
          {/* Left Content */}
          <div className="mb-8 lg:mb-0 max-w-xl">
            <h2 className="text-4xl font-bold mb-4 text-cyan">
              Manage Your Pharmacy
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Streamline your inventory, track sales, and automate reorders
              with our modern solution.
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

          {/* Right Content */}
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

      <Summary />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add New Stock</h3>
                <p className="text-gray-600 text-sm">
                  Quickly add medicines to inventory
                </p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-2 border-transparent hover:border-green-200 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Process Sale</h3>
                <p className="text-gray-600 text-sm">
                  Sell medicines and update inventory
                </p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-transparent hover:border-orange-200 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Check Alerts</h3>
                <p className="text-gray-600 text-sm">
                  Review low stock and expiry alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
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
    </div>
  );
};

export default Home;
