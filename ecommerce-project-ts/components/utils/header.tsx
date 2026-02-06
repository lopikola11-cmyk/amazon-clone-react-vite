import { useEffect } from "react";
import { Link } from "react-router";
import { useCartStore } from "../../store/cartStore";

export function Header() {
  const checkouts = useCartStore((state) => state.checkouts);
  const quantity = useCartStore((state) => state.quantity);
  const setQuantity = useCartStore((state) => state.setQuantity);

  useEffect(() => {
    if (!checkouts || checkouts.length === 0) {
      setQuantity(0);
      return;
    }

    let total = 0;
    checkouts.forEach((item) => {
      total += item.quantity;
    });

    setQuantity(total);
  }, [checkouts, setQuantity]);

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
              letterSpacing: "1px",
            }}
          >
            Abdou Artist
          </div>
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="search-button">
          <img
            className="search-icon"
            src="/images/icons/search-icon.png"
            alt="search"
          />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/order">
          <span className="orders-text">Orders</span>
        </Link>

        {/* CART */}
        <Link className="cart-link header-link" to="/cheackout">
          <img
            className="cart-icon"
            src="/images/icons/cart-icon.png"
            alt="cart"
          />

          {/* FIXED: always show 0 instead of empty */}
          <div className="cart-quantity">
            {quantity ?? 0}
          </div>

          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
