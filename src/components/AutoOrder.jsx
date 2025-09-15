import React, { useState, useEffect } from "react";
import { RotateCcw, Mail, AlertTriangle, Send, Check } from "lucide-react";
import Summary from "./Summary"; // make sure path is correct

const AutoOrder = ({ isLoggedIn }) => {
  const dummyMedicines = [
    { id: 1, name: "Paracetamol", quantity: 5, price: 10, category: "Tablet", supplier: "ABC Pharma" },
    { id: 2, name: "Amoxicillin", quantity: 2, price: 15, category: "Capsule", supplier: "XYZ Pharma" },
    { id: 3, name: "Cough Syrup", quantity: 0, price: 8, category: "Syrup", supplier: "HealthCorp" },
  ];

  const [lowStockMedicines, setLowStockMedicines] = useState(dummyMedicines);
  const [orderItems, setOrderItems] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const initialOrderItems = {};
    dummyMedicines.forEach((medicine) => {
      initialOrderItems[medicine.id] = {
        medicineId: medicine.id,
        medicineName: medicine.name,
        currentQuantity: medicine.quantity,
        reorderQuantity: Math.max(50 - medicine.quantity, 20),
        supplierEmail: `orders@${medicine.supplier.toLowerCase().replace(/\s+/g, "")}.com`,
      };
    });
    setOrderItems(initialOrderItems);
  }, []);

  const updateOrderQuantity = (id, qty) => {
    setOrderItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], reorderQuantity: Math.max(1, qty) },
    }));
  };

  const updateSupplierEmail = (id, email) => {
    setOrderItems((prev) => ({ ...prev, [id]: { ...prev[id], supplierEmail: email } }));
  };

  const sendOrder = (id) => {
    const item = orderItems[id];
    if (!item || !item.supplierEmail) return;
    console.log(`Sending order for ${item.medicineName} to ${item.supplierEmail}`);
    setSuccessMessage(`Order request sent for ${item.medicineName}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const sendAllOrders = () => {
    Object.values(orderItems).forEach((item) => {
      console.log(`Batch order: ${item.medicineName} to ${item.supplierEmail}`);
    });
    setSuccessMessage(`${Object.values(orderItems).length} order requests sent!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getUrgencyLevel = (qty) => {
    if (qty === 0) return { text: "Critical", color: "bg-red-100 text-red-800" };
    if (qty < 3) return { text: "Urgent", color: "bg-orange-100 text-orange-800" };
    return { text: "Low Priority", color: "bg-blue-100 text-blue-800" };
  };

  const totalValue = Object.values(orderItems).reduce((sum, item) => {
    const med = lowStockMedicines.find((m) => m.id === item.medicineId);
    return sum + (med ? med.price * item.reorderQuantity : 0);
  }, 0);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Auto Reorder System
          </span>
        </h1>
        <p className="text-gray-600">Manage low stock medicines and automate reorder process</p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-center sm:justify-start">
          <Check className="mr-2" size={20} /> {successMessage}
        </div>
      )}

      {/* Render Summary */}
      <Summary isLoggedIn={isLoggedIn} />

      {/* Low Stock Medicines */}
      <div className="bg-white rounded-xl shadow-lg mt-6">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">Low Stock Medicines</h2>
          <button
            onClick={sendAllOrders}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Send size={18} /> <span>Send All Orders</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {lowStockMedicines.map((med) => {
            const item = orderItems[med.id];
            const urgency = getUrgencyLevel(med.quantity);
            if (!item) return null;

            return (
              <div
                key={med.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
              >
                {/* Medicine Info */}
                <div>
                  <h3 className="text-lg font-semibold">{med.name}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${urgency.color}`}
                  >
                    {urgency.text}
                  </span>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p>Stock: {med.quantity}</p>
                    <p>Price: ${med.price}</p>
                    <p>Category: {med.category}</p>
                    <p>Supplier: {med.supplier}</p>
                  </div>
                </div>

                {/* Order Inputs & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-3 sm:space-y-0">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Reorder Qty</label>
                    <input
                      type="number"
                      value={item.reorderQuantity}
                      onChange={(e) => updateOrderQuantity(med.id, parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-2 border rounded-lg text-center"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Supplier Email</label>
                    <input
                      type="email"
                      value={item.supplierEmail}
                      onChange={(e) => updateSupplierEmail(med.id, e.target.value)}
                      className="w-full sm:w-64 px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end space-x-0 sm:space-x-0 space-y-2 sm:space-y-2">
                    <p className="text-lg font-bold text-green-600">
                      ${(med.price * item.reorderQuantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => sendOrder(med.id)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
                    >
                      <Send size={16} /> <span>Send Order</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AutoOrder;
