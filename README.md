# Pehnawa-Shop

**Pehnawa-Shop** is a full-stack **mini e-commerce application** built with **React (Vite)** frontend and **Express.js** backend. Users can browse products, select variants (color/size), add them to a cart, update quantities, and remove items. The project demonstrates a complete **cart management system with variant support** and responsive UI styling using **Tailwind CSS**.

---

## 🛠 Features

### Frontend (React + Vite)
- **Product Cards**:
  - Show product name, price, available colors, sizes, and stock.
  - Users can select color and size before adding to cart.
  - Hover effects and responsive layout with Tailwind CSS.
- **Cart Sidebar**:
  - Displays all cart items with selected color, size, quantity, and subtotal.
  - Dynamic calculation of total items and total price.
  - Remove individual items safely using **unique `cartItemId`**.
- **Axios HTTP requests**:
  - Fetch product list from backend.
  - Add items to cart.
  - Remove cart items.

### Backend (Express.js)
- **Products API**: `/products`
  - Returns product list with colors, sizes, and images.
- **Cart API**: `/cart`
  - POST: Add a product variant to cart (handles duplicate variants by incrementing quantity).
  - GET: Retrieve all cart items.
  - DELETE: Remove specific cart item using **`cartItemId`**.
- **Variant-safe logic**:
  - Each cart item has `cartItemId` to uniquely identify variants.
  - Ensures proper quantity management and safe removal.

### Additional Features
- Handles **default color/size** if user does not select.
- Supports **multiple product variants**.
- Fully styled using **Tailwind CSS**.
- Frontend uses **Vite** for fast development.

---

## 📁 Project Structure


pehnawa-shop/
│
├─ backend/
│ ├─ server.js # Express.js API for products & cart
│ └─ package.json
│
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ ProductCards.jsx # Product display & add-to-cart
│ │ │ └─ Sidebar.jsx # Cart sidebar with remove functionality
│ │ ├─ assets/ # Local product images
│ │ └─ App.jsx
│ ├─ package.json
│ └─ vite.config.js
│
└─ README.md


---

## ⚡ Functionality Overview

### Product Cards
- Each product includes:
  - `id`, `name`, `price`, `colors`, `sizes`, `stock`, `images`
- Users can choose color and size before adding to cart.
- Default selections applied if none are chosen.

### Cart Management
- When adding a product:
  - Backend checks if the **same variant exists**:
    - Yes → increase quantity.
    - No → create new cart item with unique `cartItemId`.
- Each cart item tracks **color, size, quantity, and subtotal**.
- React keys use `cartItemId` to avoid duplicate warnings.

### Removing Cart Items
- Remove button only deletes the **exact variant**.
- Cart updates dynamically in frontend after removal.
- Backend ensures variant-safe deletion via `cartItemId`.

---

## 🖼 Images
- Product images can be **local assets** or **online URLs**.
- Example usage:

```jsx
<img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />

Six sample t-shirts used for demo.

🛠 Tech Stack

Frontend: React, Vite, Tailwind CSS, Axios

Backend: Node.js, Express.js

State Management: React useState

HTTP Requests: Axios

⚙️ Installation
Backend
cd backend
npm install
node server.js
Frontend
cd frontend
npm install
npm run dev

Make sure backend runs on http://localhost:3000 and BASE_URL in frontend matches.

🚀 Future Enhancements

Quantity increment/decrement buttons in cart.

Checkout/payment flow integration.

User authentication to save cart per user.

Store products & cart in a database instead of memory.

Add carousel for multiple product images per product.

📂 References

React Documentation

Vite

Express.js

Tailwind CSS
