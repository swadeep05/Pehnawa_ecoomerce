import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProductCards from "./ProductCards";
import axios from "axios";

const MainLayout = () => {
  const [cart, setCart] = useState([]);

  const BASE_URL = "http://localhost:3000";

  // Loading cart initially
  async function getCart() {
    const res = await axios.get(BASE_URL + "/cart");
    setCart(res.data);
  }

  //function to remove item from cart
  async function handleRemoveItem(cartItemId) {
  await axios.delete(`${BASE_URL}/cart/${cartItemId}`);

  setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
}

  useEffect(() => {
    getCart();
  }, []);

  // Add to cart function
  async function addToCart(product) {
    const res = await axios.post(BASE_URL + "/cart", product);
    setCart(res.data.cart);
  }

  return (
    <div className="min-h-screen bg-red-50">
      <Navbar />

      <div className="flex gap-6 p-6">
        <div className="w-72">
          <Sidebar cart={cart} onRemoveItem={handleRemoveItem} />
        </div>

        <div className="flex-1">
          <ProductCards addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
