import React, { useState, useEffect } from 'react';

const PaymentSection = ({ totalAmount }) => {
  const [customer, setCustomer] = useState('Store1 customer');
  const [cashAmount, setCashAmount] = useState(0);
  const [posAmount, setPosAmount] = useState(0);
  const [bankTransferAmount, setBankTransferAmount] = useState(0);
  const [change, setChange] = useState(0);

  // Calculate total paid and change when any payment method is updated
  useEffect(() => {
    const totalPaid = Number(cashAmount) + Number(posAmount) + Number(bankTransferAmount);
    const changeAmount = totalPaid > totalAmount ? (totalPaid - totalAmount).toFixed(2) : 0;
    setChange(changeAmount);
  }, [cashAmount, posAmount, bankTransferAmount, totalAmount]);

  const handleSuspendSale = () => {
    alert("Sale suspended!");
    // Implement suspend sale logic here
  };

  const handlePrintReceipt = () => {
    alert("Printing receipt...");
    // Implement print receipt logic here
  };

  return (
    <div className='payment-section pos-section'>
      <div className='payment-text'>
        <h4>Payment</h4>
        <div className='total'>
          <h5>Total Amount:</h5>
          <p>₦{totalAmount}</p>
        </div>
      </div>

      <div className="customer-input">
        {/* <label htmlFor="customer">Customer:</label> */}
        <input
          type="text"
          id="customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div className="payment-methods">
        <h5>Payment method</h5>

        <div className="payment-method">
          <input
            type="radio"
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={Number(cashAmount) > 0}
            onChange={() => {
              setCashAmount(totalAmount);
              setPosAmount(0);
              setBankTransferAmount(0);
            }}
          />
          <label htmlFor="cash">Cash</label>
          <div className='payment-option'>
            <p>{cashAmount}</p>
            <span className="currency">₦</span>
          </div>
          
        </div>

        <div className="payment-method">
          <input
            type="radio"
            id="pos"
            name="paymentMethod"
            value="pos"
            checked={Number(posAmount) > 0}
            onChange={() => {
              setPosAmount(totalAmount);
              setCashAmount(0);
              setBankTransferAmount(0);
            }}
          />
          <label htmlFor="pos" className='label'>POS</label>
            <div className='payment-option'>
              <p>{posAmount}</p>
              <span className="currency">₦</span>
            </div>
        </div>

        <div className="payment-method">
          <input
            type="radio"
            id="bankTransfer"
            name="paymentMethod"
            value="bankTransfer"
            checked={Number(bankTransferAmount) > 0}
            onChange={() => {
              setBankTransferAmount(totalAmount);
              setCashAmount(0);
              setPosAmount(0);
            }}
          />
          <label htmlFor="bankTransfer">Bank Transfer</label>
            <div className='payment-option'>
              <p>{bankTransferAmount}</p>
            <span className="currency">₦</span>
          </div>
        </div>
      </div>

      <div className="change-amount">
        <label>Change:</label>
        <span>₦{change}</span>
      </div>

      

      <div className="payment-actions">
        <button onClick={handleSuspendSale} className='pay-button'>Suspend Sale</button>
        <button onClick={handlePrintReceipt} className='pay-button'>Print Receipt</button>
      </div>
    </div>
  );
};

export default PaymentSection;
