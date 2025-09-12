import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  AlertTriangle,
  Plus,
  X,
  ClipboardList,
  FlaskConical, // ✨ NEW: Icon for page header
} from "lucide-react";
import Summary from "./Summary";
import Swal from "sweetalert2";

const Sell = () => {
  const [medicines, setMedicines] = useState([
    { id: "1", name: "Paracetamol", quantity: 100, price: 5.00, expiryDate: "2025-12-01", branchId: "A1" },
    { id: "2", name: "Amoxicillin", quantity: 50, price: 12.50, expiryDate: "2025-10-15", branchId: "A1" },
    { id: "3", name: "Cough Syrup", quantity: 30, price: 8.75, expiryDate: "2025-09-20", branchId: "B1" },
    { id: "4", name: "Ibuprofen", quantity: 75, price: 6.20, expiryDate: "2026-03-10", branchId: "A1" },
    { id: "5", name: "Cetirizine", quantity: 60, price: 9.10, expiryDate: "2024-08-05", branchId: "B1" }, // ✨ Added one with closer expiry
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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

  const addToCart = (medicine) => {
    // Check if the medicine is already expired
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
            ? { ...item, sellQuantity: Math.min(item.sellQuantity + 1, medicine.quantity) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, sellQuantity: 1 }]);
    }
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, sellQuantity: Math.max(1, Math.min(qty, item.quantity)) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSale = () => {
    if (cart.length === 0) {
      setError("Please add at least one medicine to complete the sale.");
      return;
    }

    if (!phone && !email) { // ✨ Changed logic: require at least one contact method
      setError("Please provide a phone number or email address for the customer.");
      return;
    }

    const updatedMeds = medicines.map((m) => {
      const soldItem = cart.find((c) => c.id === m.id);
      return soldItem
        ? { ...m, quantity: m.quantity - soldItem.sellQuantity }
        : m;
    });
    setMedicines(updatedMeds);
    window.scrollTo({ top: 0, behavior: "smooth" });

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
      customClass: {
        popup: 'shadow-xl rounded-lg',
        confirmButton: 'bg-green-500 hover:bg-green-600'
      }
    });
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    // Set time to 00:00:00 for accurate day difference
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { color: "text-red-700 bg-red-100", text: "Expired", icon: <AlertTriangle size={16} /> }; // ✨ Added icon
    if (days < 30) return { color: "text-orange-700 bg-orange-100", text: `${days} days left`, icon: <AlertTriangle size={16} /> }; // ✨ Added icon
    return { color: "text-green-700 bg-green-100", text: `${days} days left` };
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.sellQuantity,
    0
  );

  return (
    // ✨ NEW: Overall page background color for a softer look
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* ✨ NEW: Enhanced Page Header */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center mb-2">
            <FlaskConical className="mr-3 h-10 w-10 text-blue-200" /> {/* ✨ Pharmacy-related icon */}
            Process Sale
          </h1>
          <p className="text-blue-100 text-lg">Efficiently manage customer transactions and inventory updates.</p>
        </div>
        <ShoppingCart className="h-12 w-12 text-blue-200 opacity-75" /> {/* ✨ Decorative icon */}
      </div>

      <Summary /> {/* Assuming Summary is styled internally or with external CSS */}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2 shadow-sm">
          <AlertTriangle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 mt-8"> {/* ✨ Increased spacing and shadow */}
        {/* Search Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center"> {/* ✨ Larger, bolder title */}
            <Search className="mr-3 text-blue-500" size={24} /> {/* ✨ Colored icon */}
            Find Medicine
          </h3>

          <div className="flex relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine name or scan barcode..."
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-200 shadow-sm" // ✨ Enhanced input style
            />

            {/* Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-xl z-20 mt-1 max-h-60 overflow-y-auto transform -translate-y-px"> {/* ✨ Better shadow and overlap */}
                {searchResults.length > 0 ? (
                  searchResults.map((medicine) => {
                    const expiryStatus = getExpiryStatus(medicine.expiryDate);
                    return (
                      <div
                        key={medicine.id}
                        className="p-4 border-b last:border-b-0 flex justify-between items-center hover:bg-blue-50 transition-colors duration-150 cursor-pointer" // ✨ Hover effect
                      >
                        <div>
                          <div className="font-medium text-gray-900">{medicine.name}</div>
                          <div className="text-sm text-gray-600 mt-0.5">
                            Stock: <span className="font-semibold">{medicine.quantity}</span> | Price: <span className="font-semibold">{formatCurrency(medicine.price)}</span>
                          </div>
                          <div
                            className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${expiryStatus.color}`}
                          >
                            {expiryStatus.icon} {/* ✨ Display expiry icon */}
                            {expiryStatus.text}
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(medicine)}
                          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1 shadow-md hover:shadow-lg" // ✨ Button style
                          disabled={medicine.quantity === 0 || getDaysUntilExpiry(medicine.expiryDate) < 0} // ✨ Disable if out of stock or expired
                        >
                          <Plus size={16} />
                          <span>Add</span>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm italic">No matching medicines found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✨ NEW: A more prominent visual separator */}
        <div className="border-t-2 border-dashed border-gray-200 my-8"></div>

        {/* Cart Section */}
        {cart.length > 0 ? (
          <div className="pt-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ShoppingCart className="mr-3 text-green-600" size={24} /> {/* ✨ Colored icon */}
              Items in Cart
            </h3>
            <div className="space-y-6"> {/* ✨ Increased spacing between cart items */}
              {cart.map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative hover:shadow-lg transition-shadow duration-200" // ✨ Enhanced cart item card design
                  >
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 z-10" // ✨ Stylish remove button
                        aria-label="Remove item from cart"
                    >
                        <X size={20} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Medicine Name</label>
                        <div className="mt-1 text-xl font-bold text-gray-900">{item.name}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Available Stock</label>
                        <div className="mt-1 text-lg font-semibold text-gray-800">{item.quantity}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Price per Unit</label>
                        <div className="mt-1 text-lg font-semibold text-gray-800">{formatCurrency(item.price)}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Expiry Status</label>
                        <div className={`mt-1 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${expiryStatus.color}`}>
                           {expiryStatus.icon}
                           {expiryStatus.text}
                        </div>
                      </div>
                    </div>

                    {getDaysUntilExpiry(item.expiryDate) < 30 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3 mb-4">
                        <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <div className="text-orange-800 font-semibold">Short Expiry Alert</div>
                          <div className="text-orange-700 text-sm">
                            This medicine expires soon ({new Date(item.expiryDate).toLocaleDateString()}). Prioritize this sale.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-end justify-between gap-4">
                      <div className="w-40"> {/* Fixed width for quantity input */}
                        <label htmlFor={`qty-${item.id}`} className="block text-sm font-medium text-gray-700 mb-2">Quantity to Sell</label>
                        <input
                          id={`qty-${item.id}`}
                          type="number"
                          value={item.sellQuantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          max={item.quantity}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-medium"
                        />
                      </div>

                      <div className="text-right">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Item Total</label>
                        <div className="text-3xl font-extrabold text-indigo-700">
                          {formatCurrency(item.price * item.sellQuantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Phone & Email Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100 shadow-inner"> {/* ✨ Styled customer info section */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +1 (555) 123-4567"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., customer@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Grand Total */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-700">Grand Total:</span>
              <span className="text-4xl font-extrabold text-green-700">{formatCurrency(grandTotal)}</span>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSale}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-lg font-bold text-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-103 disabled:opacity-60 disabled:transform-none flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={24} />
                <span>Complete Sale</span>
              </button>
            </div>
          </div>
        ) : (
          // ✨ NEW: More engaging Empty Cart Placeholder with icon and message
          <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-inner">
            <ClipboardList className="h-16 w-16 text-gray-400 opacity-70" />
            <h3 className="text-2xl font-semibold text-gray-700">Your sale cart is empty</h3>
            <p className="text-md text-gray-500 max-w-md">
              Start by searching for medicines in the "Find Medicine" section above. Once found, click 'Add' to include them in the current transaction.
            </p>
            {/* Optional: Add a visual illustration of an empty cart */}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;