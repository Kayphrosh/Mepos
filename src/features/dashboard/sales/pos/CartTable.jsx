import React from 'react';
// import './_CartTable.scss';

const TAX_PERCENTAGE = 7.5;

const CartTable = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const calculatePriceWithTax = (price) => {
    return price + (price * TAX_PERCENTAGE / 100);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(productId, newQuantity);
    } else {
      // Remove item if quantity is less than or equal to 0
      onRemoveItem(productId);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + calculatePriceWithTax(item.price) * item.quantity, 0).toFixed(2);
  };
  
  const discount = 0;

  return (
    <div className="cart-table pos-section">
      <div className='table-container'>
        <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price + Tax</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className='quantity'>
                    <button className='quantity-button' onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                      <p onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}>{item.quantity}</p>
                    <button className='quantity-button' onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>{item.unit}</td>
                  <td>₦{calculatePriceWithTax(item.price).toFixed(2)}</td>
                  <td>₦{(calculatePriceWithTax(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <div className="cart-summary">
        <div className="summary-item">
          <span>Items</span>
          <span>{getTotalItems()}</span>
        </div>
        <div className="summary-item">
          <span>Discount</span>
          <span>₦{discount.toFixed(2)}</span>
        </div>
        <div className="summary-item total-items">
          <span>Total Items</span>
          <span>₦{getTotalAmount()}</span>
        </div>
      </div>

    </div>
  );
};

export default CartTable;
