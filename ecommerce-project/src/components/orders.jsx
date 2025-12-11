import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import '../styles/pages/orders.css';
import { Link, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { Header } from './utils/header';

export function Order({ checkouts, quantity, setQuantity }) {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function loadOrders() {
   let response = await axios.get(
  'https://amazon-backend-dkf4.onrender.com/api/orders?expand=products'
);

    setOrders(response.data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  // ⭐ BUY AGAIN — add product back to cart AND remove order from UI
  async function buyAgain(orderId, productId, qty) {

    // 1. Add back to cart
await axios.post(
  'https://amazon-backend-dkf4.onrender.com/api/cart-items',
  {
    productId,
    quantity: qty
  }
);


    // 2. Hide the order from UI (frontend only)
    setOrders(prev => prev.filter(o => o.id !== orderId));

    // 3. Navigate to checkout
    navigate('/cheackout');
  }

  return (
    <>
      <title>Orders</title>

      <Header checkouts={checkouts} quantity={quantity} setQuantity={setQuantity} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map(orderItem => (
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

                      <button
                        className="buy-again-button button-primary"
                        onClick={() =>
                          buyAgain(
                            orderItem.id,
                            productItem.productId,
                            productItem.quantity
                          )
                        }
                      >
                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <Link to={`/tracking/${orderItem.id}/${productItem.productId}`}>
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>

                  </Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
