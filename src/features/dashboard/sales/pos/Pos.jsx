import React, { useState, useEffect } from 'react';
import ProductSelector from './ProductSelector';
import CartTable from './CartTable';
import PaymentSection from './PaymentSection';
import { products } from './products';
import './pos.scss';

const TAX_PERCENTAGE = 7.5;

const Pos = () => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    // Retrieve search term from localStorage if available
    return localStorage.getItem('searchTerm') || '';
  });

  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    // Retrieve selected customer from localStorage if available
    const savedCustomer = localStorage.getItem('selectedCustomer');
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    // Retrieve payment method from localStorage if available
    return localStorage.getItem('paymentMethod') || 'cash';
  });

  const [paymentAmounts, setPaymentAmounts] = useState(() => {
    // Retrieve payment amounts from localStorage if available
    const savedPaymentAmounts = localStorage.getItem('paymentAmounts');
    return savedPaymentAmounts ? JSON.parse(savedPaymentAmounts) : { cash: 0, pos: 0, bankTransfer: 0 };
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Save searchTerm to localStorage whenever it changes
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    // Save selectedCustomer to localStorage whenever it changes
    if (selectedCustomer) {
      localStorage.setItem('selectedCustomer', JSON.stringify(selectedCustomer));
    }
  }, [selectedCustomer]);

  useEffect(() => {
    // Save paymentMethod to localStorage whenever it changes
    localStorage.setItem('paymentMethod', paymentMethod);
  }, [paymentMethod]);

  useEffect(() => {
    // Save paymentAmounts to localStorage whenever they change
    localStorage.setItem('paymentAmounts', JSON.stringify(paymentAmounts));
  }, [paymentAmounts]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const calculatePriceWithTax = (price) => {
    return price + (price * TAX_PERCENTAGE / 100);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * (TAX_PERCENTAGE / 100);
  const totalAmount = subtotal + tax;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = () => {
    setSelectedCustomer({ name: "Store1 customer" });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentAmountChange = (method, amount) => {
    setPaymentAmounts(prev => ({ ...prev, [method]: parseFloat(amount) || 0 }));
  };

  const totalPaid = Object.values(paymentAmounts).reduce((sum, amount) => sum + amount, 0);
  const changeAmount = totalPaid - totalAmount;

  const handleSuspendSale = () => {
    console.log("Sale suspended");
  };

  const handlePrintReceipt = () => {
    console.log("Printing receipt");
  };

  return (
    <div className="pos-container">
      <ProductSelector 
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <CartTable
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        subtotal={subtotal}
        tax={tax}
        total={totalAmount}
      />
      <PaymentSection
        totalAmount={totalAmount}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={handleCustomerSelect}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={handlePaymentMethodChange}
        paymentAmounts={paymentAmounts}
        onPaymentAmountChange={handlePaymentAmountChange}
        changeAmount={changeAmount}
        onSuspendSale={handleSuspendSale}
        onPrintReceipt={handlePrintReceipt}
      />
    </div>
  );
};

export default Pos;
