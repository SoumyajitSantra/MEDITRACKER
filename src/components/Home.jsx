 import {Link} from "react-router-dom";
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import somuImg from '../assets/somu.jpg';
import souravImg from '../assets/sourav.jpg';


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
      linkedin: "https://linkedin.com/in/soumyajit",
      image: somuImg
    },
    {
      name: "Sourav Pradhan",
      role: "Full Stack Developer",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      image: souravImg
    },
    {
      name: "Jane Smith",
      role: "Full Stack Developer",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      image: "https://via.placeholder.com/80"
    }
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
    { title: 'Total Medicines', value: totalMedicines, icon: Package, color: 'bg-blue-500', trend: '+12% from last month' },
    { title: 'Total Stock', value: totalStock, icon: TrendingUp, color: 'bg-green-500', trend: 'Updated today' },
    { title: "Today's Sales", value: todaysSales, icon: ShoppingCart, color: 'bg-orange-500', trend: '+5% from yesterday' },
    { title: 'Low Stock Alert', value: lowStockItems, icon: AlertTriangle, color: 'bg-red-500', trend: 'Needs attention' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <b>home</b>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your pharmacy management system</p>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 via-gray-700 to-gray-600 rounded-2xl p-8 mb-8 text-gray-100 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between">

          {/* Left Content */}
          <div className="mb-6 lg:mb-0 max-w-lg">
            <h2 className="text-4xl font-bold mb-4 text-cyan">Manage Your Pharmacy</h2>
            <p className="text-lg text-gray-400 mb-6">
              Streamline your inventory, track sales, and automate reorders with our modern solution.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">Easy Inventory Management</span>
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">Smart Auto-Reorder</span>
              <span className="bg-cyan-400/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium">Real-time Analytics</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-right">
            <div className="text-5xl font-bold text-gray-100">MediTracker</div>
            <div className="text-cyan-300 text-lg mt-1">Your Digital Partner</div>
          </div>

        </div>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">{stat.title}</h3>
            <p className="text-sm text-gray-500">{stat.trend}</p>
          </div>
        ))}
      </div>

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
                <p className="text-gray-600 text-sm">Quickly add medicines to inventory</p>
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
                <p className="text-gray-600 text-sm">Sell medicines and update inventory</p>
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
                <p className="text-gray-600 text-sm">Review low stock and expiry alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meet the Developers</h2>
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
                  <h3 className="text-lg font-semibold text-gray-900">{dev.name}</h3>
                  <p className="text-gray-600">{dev.role}</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">GitHub</a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 


    </div>
  )
}

export default Home