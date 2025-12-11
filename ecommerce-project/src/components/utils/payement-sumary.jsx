export function PayementSummary({ checkouts, delivery, onPlaceOrder }) {

  if (!delivery) return null;

  return (
    <div className="payment-summary">

      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div>Items ({checkouts.length})</div>
        <div className="payment-summary-money">
          ${(delivery.productCostCents / 100).toFixed(2)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ${(delivery.shippingCostCents / 100).toFixed(2)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ${(delivery.totalCostBeforeTaxCents / 100).toFixed(2)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          ${(delivery.taxCents / 100).toFixed(2)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ${(delivery.totalCostCents / 100).toFixed(2)}
        </div>
      </div>

      <button className="place-order-button button-primary" onClick={onPlaceOrder}>
        Place your order
      </button>
    </div>
  );
}
