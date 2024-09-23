import React, { useState } from 'react';

const PaymentSection = ({ totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  return (
    <div className='payment-section pos-section'>
      <div className='payment-text'>
        <h4>Payment</h4>
        <div className='total'>
          <h5>Total Amount:</h5>
          <p>₦{totalAmount}</p>
        </div>
      </div>
      <label>
        <input
          type="radio"
          value="cash"
          checked={paymentMethod === 'cash'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash
      </label>
      <label>
        <input
          type="radio"
          value="pos"
          checked={paymentMethod === 'pos'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        POS
      </label>
      <label>
        <input
          type="radio"
          value="bank-transfer"
          checked={paymentMethod === 'bank-transfer'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Bank Transfer
      </label>
      <button>Complete Payment</button>
    </div>
  );
};

export default PaymentSection;
