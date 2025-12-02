



export function PayementSummary ({checkouts,delivery}) {
    return ( 
        
         <div className="payment-summary" >
            
         

            
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items ({checkouts.length})</div>
              <div className="payment-summary-money">${delivery.productCostCents/100}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${delivery.shippingCostCents/100}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${delivery.totalCostBeforeTaxCents}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${delivery.taxCents}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${delivery.totalCostCents/100}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        
        
        
       
    )
}