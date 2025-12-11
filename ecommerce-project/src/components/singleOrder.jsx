import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "./utils/header";

export function SingleOrder({ quantity, setQuantity, checkouts }) {
  const { orderId } = useParams(); // read ID from URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    loadOrder();
  }, [orderId]);

  if (order === null) return <div>Loading order...</div>;

  return (
    <>
      <title>Order Confirmation</title>

      <Header
        quantity={quantity}
        setQuantity={setQuantity}
        checkouts={checkouts}
      />

      <div className="orders-page">
        <div className="page-title">Order placed successfully!</div>

        <div className="orders-grid">
          <div className="order-container">

            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("D MMMM")}</div>
                </div>

                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              {order.products.map((item) => (
                <div key={item.productId} className="order-details">

                  <img
                    className="product-image"
                    src={item.product.image}
                    alt="product"
                  />

                  <div className="product-details">
                    <div className="product-name">{item.product.name}</div>

                    <div className="product-delivery-date">
                      Arriving on:{" "}
                      {dayjs(item.estimatedDeliveryTimeMs).format("D MMMM")}
                    </div>

                    <div className="product-quantity">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/order">
              <button className="button-primary" style={{ marginTop: "20px" }}>
                View All Orders
              </button>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}
