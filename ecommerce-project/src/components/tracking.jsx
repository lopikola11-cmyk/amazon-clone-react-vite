import '../styles/pages/tracking.css';
import '../styles/shared/header.css';
import { Header } from './utils/header';
import { Link } from 'react-router'; 
import { useSearchParams } from 'react-router-dom';
import dayjs from "dayjs";

export function Traking({ orders }) {

  // 1. Get productId from URL
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  // ============================
  // DEBUG LOGS TO FIND THE ISSUE (optional)
  // ============================
  console.log("🚀 Tracking Page Loaded");
  console.log("URL productId =", productId);
  console.log("orders prop =", orders);

  // 2. Find the matching product inside orders
  let foundProduct = null;

  if (orders && productId) {
    for (let order of orders) {
      const match = order.products.find(p => p.productId === productId);
      if (match) {
        foundProduct = match;
        break;
      }
    }
  }

  console.log("foundProduct =", foundProduct);

  return (
    <>
      <title>Tracking Page</title>
      <Header />

      <div className="tracking-page">
        <div className="order-tracking">

          {/* Back link */}
          <Link className="back-to-orders-link link-primary" to="/order">
            View all orders
          </Link>

          {/* CURRENT TIME (using dayjs) */}
          <div className="current-time">
            Current time: {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </div>

          {/* Delivery date (using dayjs) */}
          <div className="delivery-date">
            {foundProduct
              ? `Arriving on ${dayjs(foundProduct.estimatedDeliveryTimeMs).format("D MMMM YYYY")}`
              : "Arriving soon"}
          </div>

          {/* Product name */}
          <div className="product-info">
            {foundProduct ? foundProduct.product.name : "Product not found"}
          </div>

          {/* Quantity */}
          <div className="product-info">
            Quantity: {foundProduct ? foundProduct.quantity : "?"}
          </div>

          {/* Product image (render ONLY if found) */}
          {foundProduct && (
            <img
              className="product-image"
              src={foundProduct.product.image}
              alt="product"
            />
          )}

          {/* Status */}
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
