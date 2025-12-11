import '../styles/pages/checkout-header.css';
import '../styles/pages/checkout.css';
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { PayementSummary } from './utils/payement-sumary';

export function Checkout({ checkouts, getCheckouts }) {

  const [delivery, setDelivery] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkouts) return;

    async function loadSummary() {
      let response = await axios.get('/api/payment-summary');
      setDelivery(response.data);
    }

    loadSummary();
  }, [checkouts]);


  async function updateDelivery(productId, optionId) {
    await axios.put(`/api/cart-items/${productId}`, { deliveryOptionId: optionId });
    await getCheckouts();
  }

  async function deleteItem(productId) {
    await axios.delete(`/api/cart-items/${productId}`);
    await getCheckouts();
  }

  async function saveQuantity(productId) {
    const qty = Number(newQuantity);

    if (!qty || qty < 1 || !Number.isInteger(qty)) {
      alert("Quantity must be whole number ≥ 1");
      return;
    }

    await axios.put(`/api/cart-items/${productId}`, { quantity: qty });

    setEditingItemId(null);
    setNewQuantity("");

    await getCheckouts();
  }

  async function placeOrder() {
    let response = await axios.post("/api/orders");
    console.log("Order created:", response.data);

    await getCheckouts();
    navigate("/order");
  }


  return (
    <>
      <title>Checkout</title>

      {/* 🔥 CHECKOUT HEADER */}
      <div className="checkout-header">
        <div className="header-content">

          {/* LEFT SECTION — WHITE TEXT + GREEN BACKGROUND (Option 4) */}
          <div className="checkout-header-left-section">
            <Link to="/">
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "rgb(8, 79, 45)",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  letterSpacing: "1px",
                  display: "inline-flex",
                  alignItems: "center",
                  height: "26px",
                }}
              >
                Abdou Artist
              </div>
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link to="/">items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>




      {/* 🔥 CHECKOUT PAGE */}
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <div className="order-summary">
            {checkouts?.map((Item) => {
              const baseDate = dayjs(Item.updatedAt);
              const date1 = baseDate.format("dddd MMMM D, YYYY");
              const date2 = baseDate.add(7, "day").format("dddd MMMM D, YYYY");
              const date3 = baseDate.add(3, "day").format("dddd MMMM D, YYYY");

              return (
                <div className="cart-item-container" key={Item.productId}>

                  <div className="delivery-date">
                    Delivery date:
                    {Item.deliveryOptionId === "1" && date1}
                    {Item.deliveryOptionId === "2" && date2}
                    {Item.deliveryOptionId === "3" && date3}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" src={Item.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">{Item.product.name}</div>

                      <div className="product-price">
                        ${(Item.product.priceCents / 100).toFixed(2)}
                      </div>

                      <div className="product-quantity">
                        Quantity:
                        {editingItemId === Item.productId ? (
                          <>
                            <input
                              type="number"
                              className="quantity-input"
                              value={newQuantity}
                              onChange={(e) => setNewQuantity(e.target.value)}
                              min="1"
                            />

                            <span
                              className="link-primary"
                              onClick={() => saveQuantity(Item.productId)}
                            >
                              Save
                            </span>
                            <span
                              className="link-primary"
                              onClick={() => setEditingItemId(null)}
                            >
                              Cancel
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="quantity-label">{Item.quantity}</span>

                            <span
                              className="link-primary"
                              onClick={() => {
                                setEditingItemId(Item.productId);
                                setNewQuantity(Item.quantity);
                              }}
                            >
                              Update
                            </span>

                            <span
                              className="link-primary"
                              onClick={() => deleteItem(Item.productId)}
                            >
                              Delete
                            </span>
                          </>
                        )}
                      </div>
                    </div>


                    {/* DELIVERY OPTIONS */}
                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>

                      <div className="delivery-option">
                        <input
                          type="radio"
                          name={`delivery-${Item.product.id}`}
                          checked={Item.deliveryOptionId === "1"}
                          onChange={() => updateDelivery(Item.productId, "1")}
                        />
                        <div>
                          <div className="delivery-option-date">{date1}</div>
                          <div className="delivery-option-price">FREE Shipping</div>
                        </div>
                      </div>

                      <div className="delivery-option">
                        <input
                          type="radio"
                          name={`delivery-${Item.product.id}`}
                          checked={Item.deliveryOptionId === "2"}
                          onChange={() => updateDelivery(Item.productId, "2")}
                        />
                        <div>
                          <div className="delivery-option-date">{date2}</div>
                          <div className="delivery-option-price">$4.99 Shipping</div>
                        </div>
                      </div>

                      <div className="delivery-option">
                        <input
                          type="radio"
                          name={`delivery-${Item.product.id}`}
                          checked={Item.deliveryOptionId === "3"}
                          onChange={() => updateDelivery(Item.productId, "3")}
                        />
                        <div>
                          <div className="delivery-option-date">{date3}</div>
                          <div className="delivery-option-price">$9.99 Shipping</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>


          {/* PAYMENT SUMMARY */}
          <PayementSummary
            checkouts={checkouts || []}
            delivery={delivery}
            onPlaceOrder={placeOrder}
          />

        </div>
      </div>
    </>
  );
}
