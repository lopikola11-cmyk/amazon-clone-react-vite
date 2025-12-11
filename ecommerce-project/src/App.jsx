import './App.css'
import axios from 'axios'
import { Checkout } from './components/checkout.jsx'
import { HomePage } from './components/HomePage.jsx'
import { Order } from './components/orders.jsx'
import { Routes, Route } from 'react-router'
import { Traking } from './components/tracking.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [quantity, setQuantity] = useState(null);
  const [checkouts, setCheckouts] = useState(null);

  async function getCheckouts() {
    let response = await axios.get('/api/cart-items?expand=product');
    console.log("Cart updated:", response.data); // DEBUG
    setCheckouts(response.data);
  }

  useEffect(() => {
    getCheckouts();
  }, []);

  return (
    <Routes>

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

      <Route
        path="/cheackout"
        element={
          <Checkout
            checkouts={checkouts}
            getCheckouts={getCheckouts}
          />
        }
      />

      <Route
        path="/order"
        element={
          <Order
            checkouts={checkouts}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        }
      />

      <Route
        path="/tracking/:orderId/:productId"
        element={<Traking checkouts={checkouts} />}
      />

    </Routes>
  );
}

export default App;
