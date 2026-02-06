import './App.css';
import { Checkout } from '../components/checkout.tsx';
import { HomePage } from '../components/HomePage.tsx';
import { Order } from '../components/orders.tsx';
import { Routes, Route } from 'react-router';
import { Traking } from '../components/tracking.tsx';
import { useEffect} from 'react';
import {useCartStore} from '../store/cartStore.jsx';



function App() {


  const getCheckouts=useCartStore((state)=>state.getCheckouts);
 

  

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
           
          />
          
        }
      />

      {/* CHECKOUT PAGE */}
      <Route
        path="/cheackout"
        element={
          <Checkout
     
          />
        }
      />

      {/* ORDERS PAGE */}
      <Route
        path="/order"
        element={
          <Order
             // ⭐ IMPORTANT
          />
        }
      />

      {/* TRACKING PAGE */}
      <Route
        path="/tracking/:orderId/:productId"
        element={
          <Traking/>
        }
      />

    </Routes>
  );
}

export default App;
