import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import CartTable from './CartTable';
import PaymentSection from './PaymentSection';
import { products } from './products';
import './pos.scss';

const TAX_PERCENTAGE = 7.5;

const Pos = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove item from cart
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const calculatePriceWithTax = (price) => {
    return price + (price * TAX_PERCENTAGE / 100);
  };

  const totalAmount = cart.reduce((acc, item) => 
    acc + calculatePriceWithTax(item.price) * item.quantity, 0
  );

  return (
    <div className="pos-container">
      <ProductSelector products={products} onAddToCart={handleAddToCart} />
      <CartTable
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}  // Pass the remove function to CartTable
      />
      <PaymentSection totalAmount={totalAmount.toFixed(2)} />
    </div>
  );
};

export default Pos;
