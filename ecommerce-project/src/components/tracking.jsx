import '../styles/pages/tracking.css';
import '../styles/shared/header.css';
import { Header } from './utils/header';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function Traking({ checkouts, quantity, setQuantity }) {

  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      let response = await axios.get(
  `https://amazon-backend-dkf4.onrender.com/api/orders/${orderId}?expand=products`
);

      setOrder(response.data);
    }
    loadOrder();
  }, [orderId]);

  if (!order) return <div>Loading order...</div>;

  const productItem = order.products.find(
    (p) => p.productId === productId
  );

  if (!productItem) {
    return <div>Product not found in this order.</div>;
  }

  const arrivalDate = dayjs(productItem.estimatedDeliveryTimeMs)
    .format("dddd, MMMM D");

  return (
    <>
      <title>Tracking Page</title>

      <Header
        checkouts={checkouts}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <div className="tracking-page">
        <div className="order-tracking">

          <Link className="back-to-orders-link link-primary" to="/order">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {arrivalDate}
          </div>

          <div className="product-info">{productItem.product.name}</div>
          <div className="product-info">Quantity: {productItem.quantity}</div>

          <img
            className="product-image"
            src={`/${productItem.product.image}`}
            alt="product"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>

        </div>
      </div>
    </>
  );
}
