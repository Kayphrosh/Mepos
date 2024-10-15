import React, { useState } from 'react';
import {
  plusIcon2,
  minusIcon,
  editIcon,
} from '../../../../assets/images/icons';

const TAX_PERCENTAGE = 7.5;

const CartTable = ({
  cart = [],
  handleQuantityChange,
  calculatePriceWithTax,
}) => {
  const [discount, setDiscount] = useState(0); // State to handle discount input

  const renderUnit = (unit) => {
    if (typeof unit === 'object' && unit !== null) {
      return unit.name || unit.shortName || JSON.stringify(unit);
    }
    return unit;
  };

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? '0.00' : numericValue.toFixed(2);
  };

  const getTotalItems = () => {
    return cart.length; // Return the number of items in the cart
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0); // Calculate total quantity
  };

  const getTotalSubtotal = () => {
    return formatCurrency(
      cart.reduce(
        (total, item) =>
          total +
          calculatePriceWithTax(item.sellingPrice) * (item.quantity || 0),
        0,
      ),
    );
  };

  const getTotalAmount = () => {
    const subtotal = parseFloat(getTotalSubtotal());
    const discountAmount = parseFloat(discount) || 0;
    return formatCurrency(subtotal - discountAmount); // Calculate total amount after discount
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="cart-table pos-section">
        <div className="table-container">
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
            <div className="no-product">
              <p>NO PRODUCT IN CART!</p>
            </div>
          </table>
        </div>
        <div className="cart-summary">
          <div className="summary-item">
            <span>Items</span>
            <span>{getTotalItems()}</span>
          </div>
          <div className="summary-item">
            <span>Total Quantity</span>
            <span>{getTotalQuantity()}</span>
          </div>
          {/* <div className="summary-item">
          <span>Total Subtotal</span>
          <span>₦{getTotalSubtotal()}</span>
        </div> */}
          {/* <div className="summary-item discount">
          <span>Discount</span>
          <span>
            ₦
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0.00"
            />
            <img src={editIcon} alt="edit" />
          </span>
        </div> */}
          <div className="summary-item total-items">
            <span>Total Amount</span>
            <span id="total-amount">₦{getTotalAmount()}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-table pos-section">
      <div className="table-container">
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
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td className="quantity">
                  <button
                    className="quantity-button"
                    onClick={() => {
                      const newQuantity = (item.quantity || 0) - 1;
                      // Remove the item if quantity goes below 1
                      if (newQuantity < 1) {
                        handleQuantityChange(item._id, 0); // Remove item
                      } else {
                        handleQuantityChange(item._id, newQuantity); // Update quantity
                      }
                    }}
                  >
                    <img src={minusIcon} alt="minus" />
                  </button>
                  <p>{item.quantity || 0}</p>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(item._id, (item.quantity || 0) + 1)
                    }
                  >
                    <img src={plusIcon2} alt="plus" />
                  </button>
                </td>
                <td>{renderUnit(item.unit)}</td>
                <td>
                  ₦{formatCurrency(calculatePriceWithTax(item.sellingPrice))}
                </td>
                <td>
                  ₦
                  {formatCurrency(
                    calculatePriceWithTax(item.sellingPrice) *
                      (item.quantity || 0),
                  )}
                </td>
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
          <span>Total Quantity</span>
          <span>{getTotalQuantity()}</span>
        </div>
        {/* <div className="summary-item">
          <span>Total Subtotal</span>
          <span>₦{getTotalSubtotal()}</span>
        </div> */}
        {/* <div className="summary-item discount">
          <span>Discount</span>
          <span>
            ₦
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0.00"
            />
            <img src={editIcon} alt="edit" />
          </span>
        </div> */}
        <div className="summary-item total-items">
          <span>Total Amount</span>
          <span id="total-amount">₦{getTotalAmount()}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
