import React from "react";
import axios from 'axios'

const Navbar = () => {
  // async function handleTshirtFilter(){
  //   await axios.get()
  // }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between mb-3">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800">
        Pehnawa
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-lg px-3 py-1.5 w-1/3 focus:outline-none"
      />

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <button 
        className="hover:text-black"
        // onClick={handleTshirtFilter}
        >T-Shirts</button>
        <button className="hover:text-black">Shirts</button>
        {/* <button className="hover:text-black">Cart 🛒</button> */}
      </div>

    </nav>
  );
};

export default Navbar;
