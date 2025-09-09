import React, { useState } from "react";
import { Package, Scan, Plus, Check, MapPin } from "lucide-react";
// import { storageUtils } from "../utils/storage"; // if you ever use local storage

const AddStock = () => {
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
    price: "",
    branchId: "",
    supplier: "",
    category: "General",
    storageLocation: "", // NEW FIELD
  });

  const [success, setSuccess] = useState(false);

  const categories = [
    "General",
    "Antibiotics",
    "Pain Relief",
    "Vitamins",
    "Diabetes",
    "Heart",
    "Other",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMedicine = {
      id: Date.now().toString(),
      name: formData.name,
      barcode: formData.barcode,
      batchNumber: formData.batchNumber,
      expiryDate: formData.expiryDate,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      branchId: formData.branchId,
      supplier: formData.supplier,
      category: formData.category,
      storageLocation: formData.storageLocation || "Not specified",
      addedAt: new Date().toISOString(),
    };

    // 🔹 BACKEND INTEGRATION WILL GO HERE
    // Example (uncomment & adjust when backend ready):
    /*
    fetch("http://localhost:5000/api/medicines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMedicine),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved successfully:", data);
      })
      .catch((err) => {
        console.error("Error saving medicine:", err);
      });
    */

    // 🔹 For now, just log
    console.log("Medicine ready to send:", newMedicine);

    setSuccess(true);

    // Reset form
    setFormData({
      name: "",
      barcode: "",
      batchNumber: "",
      expiryDate: "",
      quantity: "",
      price: "",
      branchId: "",
      supplier: "",
      category: "General",
      storageLocation: "",
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="mb-10 ">
        <h1 className="text-4xl font-bold text-gray-900">Stock Entry</h1>
        <p className="text-gray-500 mt-2">
          Add new medicines to your inventory system
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm">
          <Check className="mr-2" size={20} />
          Medicine added successfully!
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Barcode Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Scan className="mr-2 text-blue-600" size={22} />
              Barcode
            </h3>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              placeholder="Scan or enter barcode"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Place cursor here and scan with barcode scanner
            </p>
          </div>

          {/* Medicine Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="mr-2 text-green-600" size={22} />
              Medicine Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number *
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Stock Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Unit ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch ID *
                </label>
                <input
                  type="text"
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleInputChange}
                  placeholder="e.g., BR001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier *
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>

              {/* Storage Location - NEW */}
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="mr-2 text-purple-600" size={18} />
                  Storage Location
                </label>
                <input
                  type="text"
                  name="storageLocation"
                  value={formData.storageLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., Rack A3, Cold Storage Room, Shelf B2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
            >
              <Plus size={20} />
              <span>Add Medicine to Stock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
