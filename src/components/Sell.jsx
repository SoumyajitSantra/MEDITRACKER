import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  AlertTriangle,
  Plus,
  X,
  ClipboardList,
} from "lucide-react";
import Summary from "./Summary";
import Swal from "sweetalert2";

const Sell = ({ isLoggedIn }) => {
  const [medicines, setMedicines] = useState([
    { id: "1", name: "Paracetamol", quantity: 100, price: 5.0, expiryDate: "2025-12-01", branchId: "A1" },
    { id: "2", name: "Amoxicillin", quantity: 50, price: 12.5, expiryDate: "2025-10-15", branchId: "A1" },
    { id: "3", name: "Cough Syrup", quantity: 30, price: 8.75, expiryDate: "2025-09-20", branchId: "B1" },
    { id: "4", name: "Ibuprofen", quantity: 75, price: 6.2, expiryDate: "2026-03-10", branchId: "A1" },
    { id: "5", name: "Cetirizine", quantity: 60, price: 9.1, expiryDate: "2024-08-05", branchId: "B1" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Changed USD → INR
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = medicines.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      results.sort(
        (a, b) =>
          new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      );
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, medicines]);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0)
      return {
        color: "text-red-700 bg-red-100",
        text: "Expired",
        icon: <AlertTriangle size={16} />,
      };
    if (days < 30)
      return {
        color: "text-orange-700 bg-orange-100",
        text: `${days} days left`,
        icon: <AlertTriangle size={16} />,
      };
    return { color: "text-green-700 bg-green-100", text: `${days} days left` };
  };

  const addToCart = (medicine) => {
    if (getDaysUntilExpiry(medicine.expiryDate) < 0) {
      Swal.fire({
        icon: "error",
        title: "Cannot Add Expired Medicine",
        text: `${medicine.name} has expired and cannot be sold.`,
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    const alreadyInCart = cart.find((item) => item.id === medicine.id);
    if (alreadyInCart) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, sellQuantity: String(parseInt(item.sellQuantity) + 1) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, sellQuantity: "1" }]);
    }

    setSearchQuery("");
    setShowSuggestions(false);
  };

  const updateQuantity = (id, value) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, sellQuantity: value } : item
      )
    );
  };

  const commitQuantity = (id, value) => {
    const qty = parseInt(value, 10);
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, sellQuantity: isNaN(qty) || qty < 1 ? "1" : String(qty) }
          : item
      )
    );
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const handleSale = () => {
    if (cart.length === 0) {
      setError("Please add at least one medicine to complete the sale.");
      return;
    }
    if (!phone && !email) {
      setError("Please provide a phone number or email address.");
      return;
    }

    const updatedMeds = medicines.map((m) => {
      const soldItem = cart.find((c) => c.id === m.id);
      return soldItem
        ? { ...m, quantity: m.quantity - parseInt(soldItem.sellQuantity) }
        : m;
    });
    setMedicines(updatedMeds);

    setCart([]);
    setPhone("");
    setEmail("");
    setError("");
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);

    Swal.fire({
      icon: "success",
      title: "Sale Completed!",
      text: "The medicines have been sold successfully.",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * (parseInt(item.sellQuantity) || 0),
    0
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Process Sale
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Add medicines to the customer’s cart, confirm details, and finalize
          the transaction.
        </p>
      </div>

      <Summary isLoggedIn={isLoggedIn} />

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Sale Entry Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
        {/* Medicine Search */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Search className="text-blue-500" size={22} />
            Find Medicine
          </h2>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine name or scan barcode..."
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-20 mt-1 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((medicine) => {
                    const expiryStatus = getExpiryStatus(medicine.expiryDate);
                    return (
                      <div
                        key={medicine.id}
                        className="p-4 border-b last:border-b-0 flex justify-between items-center hover:bg-blue-50 cursor-pointer"
                      >
                        <div>
                          <div className="font-medium">{medicine.name}</div>
                          <div className="text-sm text-gray-600">
                            Stock:{" "}
                            <span className="font-semibold">
                              {medicine.quantity}
                            </span>{" "}
                            | Price:{" "}
                            <span className="font-semibold">
                              {formatCurrency(medicine.price)}
                            </span>
                          </div>
                          <div
                            className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${expiryStatus.color}`}
                          >
                            {expiryStatus.icon}
                            {expiryStatus.text}
                          </div>
                        </div>

                        {/* Add button */}
                        <div>
                          <button
                            onClick={() => addToCart(medicine)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-1"
                            disabled={
                              medicine.quantity === 0 ||
                              getDaysUntilExpiry(medicine.expiryDate) < 0
                            }
                          >
                            <Plus size={16} />
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm italic">
                    No matching medicines found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-dashed" />

        {/* Cart */}
        {cart.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <ShoppingCart className="text-green-600" size={22} />
              Items in Cart
            </h2>

            <div className="space-y-6">
              {cart.map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                return (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 relative"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <X size={18} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="text-sm text-gray-600">
                          Medicine Name
                        </label>
                        <p className="text-lg font-semibold">{item.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">
                          Available Stock
                        </label>
                        <p className="font-medium">{item.quantity}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">
                          Price per Unit
                        </label>
                        <p className="font-medium">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Expiry</label>
                        <p
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${expiryStatus.color}`}
                        >
                          {expiryStatus.icon}
                          {expiryStatus.text}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="w-40">
                        <label className="block text-sm text-gray-600 mb-1">
                          Quantity to Sell
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={item.sellQuantity}
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                          onBlur={(e) =>
                            commitQuantity(item.id, e.target.value)
                          }
                          min="1"
                          className="w-full px-3 py-2 border rounded-lg text-center"
                        />
                      </div>
                      <div className="text-right">
                        <label className="block text-sm text-gray-600 mb-1">
                          Item Total
                        </label>
                        <p className="text-2xl font-bold text-indigo-700">
                          {formatCurrency(
                            item.price * (parseInt(item.sellQuantity) || 0)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +91 98765 43210"
                  className="w-full px-4 py-2 border rounded-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., customer@example.com"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Grand Total */}
            <div className="mt-8 pt-6 border-t flex justify-between items-center">
              <span className="text-xl font-semibold">Grand Total:</span>
              <span className="text-3xl font-extrabold text-green-700">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            {/* Complete Sale */}
            <div className="mt-8">
              <button
                onClick={handleSale}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-lg font-bold text-xl hover:from-green-600 hover:to-teal-700"
              >
                <ShoppingCart className="inline mr-2" size={22} />
                Complete Sale
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center gap-3">
            <ClipboardList className="h-16 w-16 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700">
              Your sale cart is empty
            </h3>
            <p className="text-gray-500">
              Search for medicines above and click "Add" to include them in this
              transaction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;
