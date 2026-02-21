import React from "react";

const Sidebar = ({ cart, onRemoveItem }) => {
  const BASE_URL = "http://localhost:3000";
  // calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  //function to remove particular item
  async function handleRemoveBtn(product) {
    onRemoveItem(product.cartItemId);
  }

  return (
    <aside className="w-72 h-screen bg-white shadow-[0_0_25px_rgba(0,0,0,0.25)] flex flex-col justify-between border-l border-red-100">
      {/* Top Section */}
      <h2 className="text-2xl font-semibold tracking-wide text-red-600 p-1 border-b border-red-200">
        Cart
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1 p-2">
        {cart.map((prod) => (
          <div
            key={prod.cartItemId}
            className="bg-gradient-to-red from-red-50 to-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-medium text-gray-900 tracking-wide">
              {prod.name}
            </h3>
            <p className="text-sm text-gray-600">Color: {prod.selectedColor}</p>
            <p className="text-sm text-gray-600">Size: {prod.selectedSize}</p>
            <p className="text-sm text-gray-600">Qty: {prod.quantity}</p>
            <p className="font-semibold text-red-600 mt-1">
              Price: ₹{prod.price * prod.quantity}
            </p>
            <span
              className="border p-1 rounded-lg bg-black text-white cursor-pointer"
              type="button"
              onClick={() => handleRemoveBtn(prod)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-5 border-t border-red-100 bg-gradient-to-red from-white to-red-50">
        <p className="flex justify-between text-sm text-gray-700 mb-1 tracking-wide">
          <span>Total Items</span>
          <span>{cart.length}</span>
        </p>

        <p className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span className="text-red-600">₹{totalPrice}</span>
        </p>

        <button className="w-full mt-4 py-2.5 rounded-lg bg-gradient-to-red from-red-500 to-red-600 text-black font-medium tracking-wide hover:from-red-600 hover:to-red-700 transition shadow-md">
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
