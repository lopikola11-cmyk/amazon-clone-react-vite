/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { Link } from "react-router";

export function Header({ checkouts, quantity, setQuantity }) {

  useEffect(() => {
    if (checkouts === null) return;

    if (checkouts.length === 0) {
      setQuantity(0);
      return;
    }

    let total = 0;
    checkouts.forEach(item => {
      total += item.quantity;
    });

    setQuantity(total);

  }, [checkouts]);

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">

          {/* 👇 Replace image logo with text */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "1px"
            }}
          >
            Abdou Artist
          </div>

        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/order">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/cheackout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">
            {quantity === null ? "" : quantity}
          </div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
