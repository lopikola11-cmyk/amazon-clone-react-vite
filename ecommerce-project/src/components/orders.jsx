import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import '../styles/pages/orders.css';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { Header } from './utils/header';

export function Order({ checkouts, quantity, setQuantity }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      let response = await axios.get('/api/orders?expand=products');

      console.log("Raw backend orders:", response.data);

      // ❌ FILTER OUT the 2 default backend orders
      const DEFAULT_ORDER_IDS = [
        "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
        "b6b6c212-d30e-4d4a-805d-90b52ce6b37d"
      ];

      const filtered = response.data.filter(
        order => !DEFAULT_ORDER_IDS.includes(order.id)
      );

      console.log("Filtered orders:", filtered);
      setOrders(filtered);
    }

    loadOrders();
  }, []);

  // ⭐ Reset only the UI (not the backend)
  function resetOrdersUI() {
    setOrders([]);
  }

  return (
    <>
      <title>Orders</title>

      <Header checkouts={checkouts} quantity={quantity} setQuantity={setQuantity} />

      <div className="orders-page">
        <div className="page-title">
          Your Orders
          <button
            style={{
              marginLeft: "20px",
              background: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={resetOrdersUI}
          >
            Reset Orders
          </button>
        </div>

        <div className="orders-grid">
          {orders.length === 0 ? (
            <div>No orders yet.</div>
          ) : (
            orders.map(orderItem => (
              <div className="order-container" key={orderItem.id}>

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(orderItem.orderTimeMs).format("D MMMM")}</div>
                    </div>

                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${(orderItem.totalCostCents / 100).toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{orderItem.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">

                  {orderItem.products.map(productItem => (
                    <Fragment key={productItem.productId}>
                      <div className="product-image-container">
                        <img src={productItem.product.image} />
                      </div>

                      <div className="product-details">
                        <div className="product-name">{productItem.product.name}</div>
                        <div className="product-delivery-date">
                          Arriving on: {dayjs(productItem.estimatedDeliveryTimeMs).format("D MMMM")}
                        </div>

                        <div className="product-quantity">
                          Quantity: {productItem.quantity}
                        </div>

                        <button className="buy-again-button button-primary">
                          <img className="buy-again-icon" src="images/icons/buy-again.png" />
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <Link to={`/tracking?productId=${productItem.productId}`}>
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </Link>
                      </div>
                    </Fragment>
                  ))}

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
