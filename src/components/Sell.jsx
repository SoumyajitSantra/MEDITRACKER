import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, AlertTriangle, Check } from "lucide-react";
import Summary from "./Summary";
const Sell = () => {
  // 🔹 Dummy medicines
  const [medicines, setMedicines] = useState([
    {
      id: "1",
      name: "Paracetamol",
      quantity: 100,
      price: 5,
      expiryDate: "2025-12-01",
      branchId: "A1",
    },
    {
      id: "2",
      name: "Amoxicillin",
      quantity: 50,
      price: 12,
      expiryDate: "2025-10-15",
      branchId: "A1",
    },
    {
      id: "3",
      name: "Cough Syrup",
      quantity: 30,
      price: 8,
      expiryDate: "2025-09-20",
      branchId: "B1",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔹 Search filtering
  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = medicines.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      results.sort(
        (a, b) =>
          new Date(a.expiryDate).getTime() -
          new Date(b.expiryDate).getTime()
      );
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, medicines]);

  const selectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setSearchQuery(medicine.name);
    setShowSuggestions(false);
    setSellQuantity(1);
  };

  const handleSale = () => {
    if (
      !selectedMedicine ||
      sellQuantity <= 0 ||
      sellQuantity > selectedMedicine.quantity
    ) {
      return;
    }

    // 🔹 Update stock locally
    const updatedMeds = medicines.map((m) =>
      m.id === selectedMedicine.id
        ? { ...m, quantity: m.quantity - sellQuantity }
        : m
    );
    setMedicines(updatedMeds);

    setSuccess(true);
    setSelectedMedicine(null);
    setSearchQuery("");
    setSellQuantity(1);

    setTimeout(() => setSuccess(false), 3000);
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0)
      return { color: "text-red-600 bg-red-50", text: "Expired" };
    if (days < 30)
      return {
        color: "text-orange-600 bg-orange-50",
        text: `${days} days left`,
      };
    return {
      color: "text-green-600 bg-green-50",
      text: `${days} days left`,
    };
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sell Medicine
        </h1>
        <p className="text-gray-600">
          Search and sell medicines from your inventory
        </p>
      </div>
     <Summary/>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
          <Check className="mr-2" size={20} />
          Sale completed successfully!
        </div>
      )}


      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Search className="mr-2" size={20} />
            Find Medicine
          </h3>

          <div className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by medicine name or scan barcode..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Suggestions */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                  {searchResults.map((medicine) => {
                    const expiryStatus = getExpiryStatus(medicine.expiryDate);
                    return (
                      <div
                        key={medicine.id}
                        onClick={() => selectMedicine(medicine)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">
                              {medicine.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Stock: {medicine.quantity} | Price: $
                              {medicine.price}
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs ${expiryStatus.color}`}
                          >
                            {expiryStatus.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Medicine */}
        {selectedMedicine && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Medicine
            </h3>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medicine Name
                  </label>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedMedicine.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Stock
                  </label>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedMedicine.quantity}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price per Unit
                  </label>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    ${selectedMedicine.price}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Status
                  </label>
                  <div
                    className={`mt-1 px-3 py-1 rounded-full text-sm inline-block ${getExpiryStatus(
                      selectedMedicine.expiryDate
                    ).color}`}
                  >
                    {getExpiryStatus(selectedMedicine.expiryDate).text}
                  </div>
                </div>
              </div>

              {getDaysUntilExpiry(selectedMedicine.expiryDate) < 30 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertTriangle
                    className="text-orange-500 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <div className="text-orange-800 font-medium">
                      Short Expiry Alert
                    </div>
                    <div className="text-orange-700 text-sm">
                      This medicine expires soon. Please prioritize this
                      sale.
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Sell
                  </label>
                  <input
                    type="number"
                    value={sellQuantity}
                    onChange={(e) =>
                      setSellQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min="1"
                    max={selectedMedicine.quantity}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Amount
                  </label>
                  <div className="text-2xl font-bold text-gray-900">
                    $
                    {(selectedMedicine.price * sellQuantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSale}
                disabled={
                  sellQuantity <= 0 ||
                  sellQuantity > selectedMedicine.quantity
                }
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Complete Sale</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;
