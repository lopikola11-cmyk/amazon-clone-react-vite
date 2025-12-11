import './App.css';
import axios from 'axios';
import { Checkout } from './components/checkout.jsx';
import { HomePage } from './components/HomePage.jsx';
import { Order } from './components/orders.jsx';
import { Routes, Route } from 'react-router';
import { Traking } from './components/tracking.jsx';
import { useEffect, useState } from 'react';

function App() {

  const [quantity, setQuantity] = useState(null);
  const [checkouts, setCheckouts] = useState(null);

  async function getCheckouts() {
    let response = await axios.get('https://amazon-backend-dkf4.onrender.com/api/cart-items?expand=product');
    setCheckouts(response.data);
  }

  useEffect(() => {
    getCheckouts();
  }, []);

  return (
    <Routes>

      {/* HOME PAGE */}
      <Route
        index
        element={
          <HomePage
            checkouts={checkouts}
            quantity={quantity}
            setQuantity={setQuantity}
            getCheckouts={getCheckouts}
          />
        }
      />

      {/* CHECKOUT PAGE */}
      <Route
        path="/cheackout"
        element={
          <Checkout
            checkouts={checkouts}
            getCheckouts={getCheckouts}
          />
        }
      />

      {/* ORDERS PAGE */}
      <Route
        path="/order"
        element={
          <Order
            checkouts={checkouts}
            quantity={quantity}
            setQuantity={setQuantity}
            getCheckouts={getCheckouts}   // ⭐ IMPORTANT
          />
        }
      />

      {/* TRACKING PAGE */}
      <Route
        path="/tracking/:orderId/:productId"
        element={
          <Traking checkouts={checkouts} quantity={quantity} setQuantity={setQuantity} />
        }
      />

    </Routes>
  );
}

export default App;
