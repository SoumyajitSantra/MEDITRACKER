
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import './App.css'
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddStock from "./components/AddStock";
import Sell from './components/sell';
import Inventory from './components/Inventory';
import AutoOrder from "./components/AutoOrder";



function App() {
  const [count, setCount] = useState(0)
  return (
    
    <div className="flex-grow pt-20 pb-20">
      
      <NavBar/>
      <div className="flex-grow">
        <Routes>
          {/* Quick Links */}
          <Route path="/home" element={<Home />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/auto-order" element={<AutoOrder />} />


          {/* Default route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

