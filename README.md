# 🛒 Amazon Clone — React + Vite + Node Backend API

This project was originally built from static HTML pages. I rebuilt everything using **React (Vite)** for the frontend and Node.js for the backend. The application includes routing, dynamic rendering, backend data, real cart functionality, orders, and package tracking.

---

## 🚀 Features

### Frontend (React + Vite)
- Converted all static HTML pages into reusable JSX components  
- Component-based architecture  
- React Router navigation (Home, Checkout, Orders, Tracking)  
- Dynamic tracking routes: `/tracking/:orderId/:productId`  
- Axios for backend communication  
- day.js for delivery date formatting  
- Full cart system:
  - Add to cart (POST)
  - Update quantity (PUT)
  - Delete item (DELETE)
  - Select delivery option (PUT)
- Auto-updating payment summary  
- Global state lifted into App.jsx  
- Dynamic rendering of nested JSON from backend  
- No page reload — everything updates through React re-rendering  

### Orders System
- Place Order button triggers:
  - POST /api/orders  
  - Backend empties the cart automatically  
- Orders page displays:
  - Product info  
  - Quantity  
  - Delivery date  
  - Order totals  
- Buy Again feature:
  - Re-adds an order item to the cart  
  - Redirects user to checkout  
  - Cart updates instantly  

### Tracking Page
- Displays real tracking data based on URL parameters  
- Correct product name, image, quantity, and delivery status  
- Smooth navigation from order to tracking page  

---

## 📸 Screenshots

Home Page  
![Home Page](./screenshots/React.app.HomePage.PNG)

Orders Page  
![Orders Page](./screenshots/React.app.Orders.PNG)

Checkout Page  
![Checkout Page](./screenshots/React.app.Checkout.PNG)

Tracking Page  
![Tracking Page](./screenshots/React.app.Tracking.PNG)

---

## 🧠 What I Learned

### React
- JSX component structure  
- Props, state lifting, and rendering flows  
- React Router (with dynamic parameters)  
- How React re-renders components without page reload  
- How React diffs and selectively updates the DOM  
- Handling async backend data safely  
- Conditional rendering  
- Formatting timestamps with day.js  

### Backend Integration
- Full CRUD operations using Axios  
- Understanding REST API routes:
  - POST / PUT / DELETE / GET  
- Keeping frontend UI synchronized with backend state  
- Debugging API errors and request flows  
- Using URL parameters to fetch specific data  

### AI-Assisted Development
- Problem-solving  
- Architectural improvements  
- Clean code structure  
- Learning professional patterns  
- Accelerating development while understanding the underlying concepts  

---

## 📦 Technologies Used

Frontend:  
React (Vite), React Router, Axios, day.js, JavaScript (ES6), CSS  

Backend:  
Node.js, Express-style routing, JSON mock database  

---

# 🛠 How to Run Locally

## Start the Frontend

cd frontend
npm install
npm run dev


App runs at:  
http://localhost:5173/

---

## Start the Backend

cd backend
npm install
npm run dev

Backend runs at:  
http://localhost:3000/

Useful endpoints:  
http://localhost:3000/api/orders?expand=products  
http://localhost:3000/api/cart-items?expand=product  

> Frontend must be connected to backend for data to appear.

---

## 📌 Project Status
Complete and functional.

Future improvements:
- Authentication system  
- Persistent database  
- Deployment (frontend + backend)  
- Better UI design  
- Search & filter system  

---

## 👤 Author

**Zerouali Abderrahmane (@lopikola11-cmyk)**  
React Developer • Building Real Projects


