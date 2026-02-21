import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ProductCards = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  // const [cartProduct, setCartProduct] = useState({});
  const [selectedOpt, setSelectedOpt] = useState({});

  const BASE_URL = "http://localhost:3000";

  async function getAllProducts() {
    const response = await axios.get(BASE_URL + "/products");
    setProducts(response.data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  //add to cart function
  function handleAddToCart(product) {
    const selected = selectedOpt[product.id];
  
    const body = {
      id: product.id,
      name: product.name,
      price: product.price,
      selectedColor: selected?.color || product.colors[0] ,
      selectedSize: selected?.size || product.sizes[0],
      quantity: 1,
    };
    // console.log();
    addToCart(body);
  }

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-red-50 min-h-screen">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-64 bg-white rounded-2xl shadow-lg shadow-black/20 overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {/* Product Image */}
          <div className="h-40 w-full bg-gray-100">
            <img
              // src={`https://loremflickr.com/300/200/clothes?lock=${product.id}`}
              src={`https://loremflickr.com/300/200/tshirt?random=${product.id}`}
              // src={`https://picsum.photos/300/200?random=${product.id}`}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="p-4">
            {/* Name */}
            <h2 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h2>

            {/* Price */}
            <p className="text-red-600 font-bold text-md mt-1">
              ₹{product.price}
            </p>

            {/* Colors */}
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium text-gray-900">Colors:</span>{" "}
              <select
                onChange={(e) =>
                  setSelectedOpt({
                    ...selectedOpt,
                    [product.id]: {
                      ...selectedOpt[product.id],
                      color: e.target.value,
                    },
                  })
                }
              >
                {product.colors.map((color) => (
                  <option value={color} key={color}>
                    {color}
                  </option>
                ))}
              </select>
            </p>

            {/* Sizes */}
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Sizes:</span>{" "}
              <select
                onChange={(e) =>
                  setSelectedOpt({
                    ...selectedOpt,
                    [product.id]: {
                      ...selectedOpt[product.id],
                      size: e.target.value,
                    },
                  })
                }
              >
                {product.sizes.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            </p>

            {/* Add to Cart Button */}
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 cursor-pointer rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-md shadow-black/20"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
