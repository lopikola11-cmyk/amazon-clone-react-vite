import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

import { Checkout } from './components/checkout.jsx'
import { HomePage } from './components/HomePage.jsx'
import { Order } from './components/orders.jsx'
import { Routes, Route } from 'react-router'
import { Traking } from './components/tracking.jsx'

function App() {
  const [checkouts, setCheckouts] = useState([]);
  const [productGrid, setProductGrid] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔥 Load ALL orders here (not in Order.jsx)
  useEffect(() => {
    async function loadOrders() {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    loadOrders();
  }, []);

  return (
    <Routes>

      <Route
        index
        element={<HomePage productGrid={productGrid} setProductGrid={setProductGrid} />}
      />

      <Route
        path="/cheackout"
        element={<Checkout checkouts={checkouts} setCheckouts={setCheckouts} />}
      />

      <Route
        path="/order"
        element={<Order orders={orders} />}
      />

      <Route
        path="/tracking"
        element={<Traking orders={orders} />}
      />

    </Routes>
  );
}

export default App;
