import '../styles/pages/checkout-header.css';
import '../styles/pages/checkout.css';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { PayementSummary } from './utils/payement-sumary';

export function Checkout({checkouts,setCheckouts}) {

  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    async function checkOut() {
      let response = await axios.get('api/cart-items?expand=product');
      setCheckouts(response.data);
      response = await axios.get('api/payment-summary');
      setDelivery(response.data);
    }
    checkOut()
  }, []);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          {/* ⭐ ORDER SUMMARY — correct parent for .map() */}
          <div className="order-summary">

            {checkouts.map((Item) => (
              <div className="cart-item-container" key={Item.id}>

                <div className="delivery-date">
                  Delivery date: {dayjs(Item.updatedAt).format('dddd MMMM D, YYYY')}
                </div>

                <div className="cart-item-details-grid">

                  {/* Product Image */}
                  <img className="product-image" src={Item.product.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{Item.product.name}</div>

                    <div className="product-price">
                      ${(Item.product.priceCents / 100).toFixed(2)}
                    </div>

                    <div className="product-quantity">
                      Quantity:
                      <span className="quantity-label">{Item.quantity}</span>

                      <span className="update-quantity-link link-primary">Update</span>
                      <span className="delete-quantity-link link-primary">Delete</span>
                    </div>
                  </div>

                  {/* ⭐ DELIVERY OPTIONS */}
                  <div className="delivery-options">

                    <div className="delivery-options-title">Choose a delivery option:</div>
                    
                    <div className="delivery-option">
                      <input 
                        value='1'
                        type="radio"
                        className="delivery-option-input"
                        name={`delivery-option-${Item.product.id}`}
                    defaultChecked={Item.deliveryOptionId === "1"}
                      
                      />
                      <div>
                        <div className="delivery-option-date">Tuesday, June 21</div>
                        <div className="delivery-option-price">FREE Shipping</div>
                      </div>
                    </div>

                    <div className="delivery-option">
                      <input
                     value='2'
                        type="radio"
                        className="delivery-option-input"
                        name={`delivery-option-${Item.product.id}`}
                         defaultChecked={Item.deliveryOptionId === "2"}
                
                        
                       
                      />
                      <div>
                        <div className="delivery-option-date">Wednesday, June 15</div>
                        <div className="delivery-option-price">$4.99 - Shipping</div>
                      </div>
                    </div>

                    <div className="delivery-option">
                      <input
                      value='3'
                        type="radio"
                        className="delivery-option-input"
                        name={`delivery-option-${Item.product.id}`}
                         defaultChecked={Item.deliveryOptionId === "3"}
                        
                   
                     
                      />
                      <div>
                        <div className="delivery-option-date">Monday, June 13</div>
                        <div className="delivery-option-price">$9.99 - Shipping</div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* PAYMENT SUMMARY */}
         <PayementSummary checkouts={checkouts} delivery={delivery}/>

        </div>
      </div>
    </>
  );
}
