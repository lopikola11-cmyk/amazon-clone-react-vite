# 🛒 Amazon Clone (React + Vite + Backend API Integration)

This project started as an assignment where I was given static HTML pages.  
I rebuilt the entire project using **React (Vite)** with a clean component structure, dynamic routing, backend API integration, and real data rendering.

This version includes both **frontend (React)** and **backend API** running locally and communicating together.

---

## 🚀 Features

### 🎨 Frontend (React + Vite)
- Converted **HTML → JSX** with reusable components.
- Organized into a clean folder structure.
- Implemented **React Router** for:
  - Home Page  
  - Checkout Page  
  - Orders Page  
  - Tracking Page  
- Displayed product data dynamically using URL query parameters.
- Integrated **day.js** for formatting backend timestamps.
- Managed global state by lifting it into `App.jsx`.
- Rendered product name, quantity, and image dynamically from backend data.
- Prevented empty image warnings with conditional rendering.

### 🖥 Backend (Node API)
- Provides REST-style endpoints:
  - `/api/orders?expand=products`
  - `/api/cart-items?expand=products`
- Integrated with the frontend using **Axios**.
- Sends product details, order details, timestamps, and quantities.
- Runs on **Node + Express** with mock JSON-style data.
- Used locally during development alongside the frontend.

---

## 📸 Screenshots

### 🏠 Home Page  
![Home Page](./screenshots/React.app.HomePage.PNG)

### 🧾 Orders Page  
![Orders Page](./screenshots/React.app.Orders.PNG)

### 💳 Checkout Page  
![Checkout Page](./screenshots/React.app.Checkout.PNG)

### 🚚 Tracking Page  
![Tracking Page](./screenshots/React.app.Tracking.PNG)

---

## 🧠 What I Learned

### 🔧 React Skills
- Converting static HTML into React components
- React Router setup (navigation + dynamic params)
- State management and lifting state into parent components
- Working with nested backend JSON data
- Preventing rendering errors (conditional rendering)
- Using day.js to handle backend timestamps

### 🌐 Backend Integration
- Running backend + frontend together in VS Code
- Fetching real backend data using Axios
- Matching `productId` from URL with backend products
- Structuring state to share data across pages
- Debugging backend → frontend communication

### 🤖 AI-Assisted Development (Modern Coding Skill)
Used AI as a **learning and debugging assistant**, NOT as a copy-paste tool:
- Debugging backend → frontend issues  
- Fixing routing and state management problems  
- Understanding best React practices  
- Improving code architecture and project organization  

This reflects a modern workflow similar to how mid-level developers use AI.

---

## 📦 Technologies Used

### Frontend
- React (Vite)
- React Router
- Axios
- day.js
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express-style API endpoints
- JSON mock database

---

## 🛠 How to Run Locally

### 👉 1. Run the Frontend (React + Vite)

```bash
cd your-frontend-folder
npm install
npm run dev
