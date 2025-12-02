# 🛒 Amazon Clone (React + Vite + Backend API Integration)

This project started as an assignment where I was given static HTML pages.  
I rebuilt the entire project using **React (Vite)** with a clean component structure, dynamic routing, backend API integration, and real data rendering.

This version includes both **frontend (React)** and **backend (Node API)** running locally and communicating together.

---

## 🚀 Features

### 🎨 Frontend (React + Vite)
- Converted **HTML → JSX** with reusable components.
- Organized into a clean folder structure (`components`, `pages`, `utils`, etc.).
- Implemented **React Router** for:
  - Home Page
  - Checkout Page
  - Orders Page
  - Tracking Page
- Used **URL query parameters** to track each product dynamically.
- Implemented **conditional rendering** to prevent errors (image src, missing data, etc.)
- Integrated **day.js** for beautiful date formatting.
- Lifted state to `App.jsx` to share global data properly.
- Displayed full product information dynamically (name, image, quantity, delivery date).

### 🖥 Backend (Node + API)
- Local backend server provides:
  - `/api/orders?expand=products`
  - `/api/cart-items?expand=products`
  - product information  
- Connected frontend to backend using **Axios**.
- Rendered backend data on all pages (orders, tracking, quantities, dates).
- Fully working **order tracking system** using real backend timestamps.

---

## 🧠 What I Learned

### 🔧 React Skills
- Converting HTML to JSX components
- React Router (navigation + dynamic params)
- Lifting state and sharing data across pages
- Handling async data and loading states
- Working with nested API responses
- Avoiding common React errors (empty states, rendering issues)
- Building clean UI with reusable components

### 🌐 Backend Integration
- Running backend and frontend together in VS Code
- Fetching API data with Axios
- Matching backend product IDs to URL params
- Debugging backend → frontend data flow
- Rendering timestamps using day.js

### 🤖 AI-Assisted Development (Modern Skill)
Used AI as a **coding partner**, not a copy/paste tool:
- Debugging complex errors  
- Improving architecture  
- Fixing routing & state issues  
- Understanding best practices  
- Learning new npm packages  
- Structuring components properly  

This reflects real-world workflow used by Mid/Senior developers.

---

## 📦 Technologies Used

### Frontend
- React (Vite)
- React Router
- Axios
- day.js
- JavaScript (ES6)
- CSS / JSX

### Backend
- Node.js
- REST-style API endpoints
- JSON-based mock data

---

## 🛠 How to Run the Project

### 👉 Install dependencies

#### Frontend:
```bash
cd frontend-folder-name
npm install
npm run dev
