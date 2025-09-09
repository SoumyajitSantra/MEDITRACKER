import React, { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  BarChart3,
  Filter,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import Summary from "./Summary";
const ShowDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("expiry");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Dummy data (no backend, no local storage)
  const sampleData = [
    {
      id: "1",
      name: "Paracetamol",
      barcode: "123456789",
      batchNumber: "B001",
      category: "Painkiller",
      quantity: 20,
      price: 5,
      expiryDate: "2025-12-01",
      branchId: "Main Store",
      supplier: "ABC Pharma",
      storageLocation: "Shelf A1",
    },
    {
      id: "2",
      name: "Amoxicillin",
      barcode: "987654321",
      batchNumber: "B002",
      category: "Antibiotic",
      quantity: 5,
      price: 12,
      expiryDate: "2024-11-15",
      branchId: "Branch A",
      supplier: "XYZ Pharma",
      storageLocation: "Fridge B2",
    },
    {
      id: "3",
      name: "Cough Syrup",
      barcode: "654987321",
      batchNumber: "B003",
      category: "Syrup",
      quantity: 50,
      price: 8,
      expiryDate: "2026-03-10",
      branchId: "Branch B",
      supplier: "MediCare Ltd",
      storageLocation: "Rack C3",
    },
  ];

  useEffect(() => {
    setMedicines(sampleData);
    setFilteredMedicines(sampleData);
  }, []);

  useEffect(() => {
    let filtered = [...medicines];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicine.barcode?.includes(searchQuery)
      );
    }

    // Filter by category
    if (filterCategory !== "All") {
      filtered = filtered.filter(
        (medicine) => medicine.category === filterCategory
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "expiry":
          return (
            new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        case "quantity":
          return a.quantity - b.quantity;
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredMedicines(filtered);
  }, [medicines, filterCategory, sortBy, searchQuery]);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0)
      return { color: "bg-red-100 text-red-800", text: "Expired" };
    if (days < 30)
      return { color: "bg-orange-100 text-orange-800", text: `${days} days` };
    if (days < 90)
      return { color: "bg-yellow-100 text-yellow-800", text: `${days} days` };
    return { color: "bg-green-100 text-green-800", text: `${days} days` };
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0)
      return { color: "bg-red-100 text-red-800", text: "Out of Stock" };
    if (quantity < 10)
      return { color: "bg-orange-100 text-orange-800", text: "Low Stock" };
    if (quantity < 50)
      return { color: "bg-yellow-100 text-yellow-800", text: "Medium Stock" };
    return { color: "bg-green-100 text-green-800", text: "Good Stock" };
  };

  const categories = ["All", ...new Set(medicines.map((m) => m.category))];
  const totalValue = filteredMedicines.reduce(
    (sum, med) => sum + med.quantity * med.price,
    0
  );
  const expiredMedicines = filteredMedicines.filter(
    (med) => getDaysUntilExpiry(med.expiryDate) < 0
  );
  const lowStockMedicines = filteredMedicines.filter((med) => med.quantity < 10);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inventory Details
        </h1>
        <p className="text-gray-600">
          Complete overview of your medicine inventory
        </p>
      </div>

     <Summary/>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <span className="font-medium text-gray-700">
                Filters & Search
              </span>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="expiry">Sort by Expiry</option>
                <option value="name">Sort by Name</option>
                <option value="quantity">Sort by Quantity</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medicine Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => {
                const expiryStatus = getExpiryStatus(medicine.expiryDate);
                const stockStatus = getStockStatus(medicine.quantity);

                return (
                  <tr
                    key={medicine.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {medicine.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Barcode: {medicine.barcode}
                        </div>
                        <div className="text-sm text-gray-500">
                          Batch: {medicine.batchNumber}
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {medicine.category}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Qty: {medicine.quantity}
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                      >
                        {stockStatus.text}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(medicine.expiryDate).toLocaleDateString()}
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expiryStatus.color}`}
                      >
                        {expiryStatus.text}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${medicine.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: ${(medicine.price * medicine.quantity).toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {medicine.branchId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {medicine.supplier}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="mr-1 text-purple-500" size={16} />
                        {medicine.storageLocation || "Not specified"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No medicines found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
