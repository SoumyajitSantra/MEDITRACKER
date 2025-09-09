import React from "react";
import { Package, BarChart3, Calendar, AlertTriangle } from "lucide-react";

const Summary = () => {
  // Dummy data
  const filteredMedicines = new Array(120).fill(0);
  const totalValue = 5600.75;
  const expiredMedicines = new Array(5).fill(0);
  const lowStockMedicines = new Array(12).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      
      {/* Total Medicines */}
      <div className="bg-white rounded-xl shadow-lg p-6 relative group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Medicines</p>
            <p className="text-2xl font-bold text-gray-900">{filteredMedicines.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full relative group">
            <Package className="text-blue-500" size={32} />
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
              Total medicines in stock
            </span>
          </div>
        </div>
      </div>

      {/* Total Value */}
      <div className="bg-white rounded-xl shadow-lg p-6 relative group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full relative group">
            <BarChart3 className="text-green-500" size={32} />
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
              Total value of medicines
            </span>
          </div>
        </div>
      </div>

      {/* Expired Items */}
      <div className="bg-white rounded-xl shadow-lg p-6 relative group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Expired Items</p>
            <p className="text-2xl font-bold text-red-600">{expiredMedicines.length}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full relative group">
            <Calendar className="text-red-500" size={32} />
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
              Items that have expired
            </span>
          </div>
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-white rounded-xl shadow-lg p-6 relative group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Low Stock</p>
            <p className="text-2xl font-bold text-orange-600">{lowStockMedicines.length}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full relative group">
            <AlertTriangle className="text-orange-500" size={32} />
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
              Medicines running low in stock
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Summary;
