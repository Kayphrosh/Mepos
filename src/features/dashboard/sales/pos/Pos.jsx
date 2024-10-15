import React, { useState, useEffect } from 'react';
import ProductSelector from './ProductSelector';
import CartTable from './CartTable';
import PaymentSection from './PaymentSection';
import { fetchProducts } from './products';
import './pos.scss';
import axios from '../../../../utils/axios';

const TAX_PERCENTAGE = 7.5;

const Pos = () => {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem('cart')) || [],
  );
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem('searchTerm') || '',
  );
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem('selectedCustomer');
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });
  const [paymentMethod, setPaymentMethod] = useState(
    () => localStorage.getItem('paymentMethod') || 'cash',
  );
  const [paymentAmounts, setPaymentAmounts] = useState(
    () =>
      JSON.parse(localStorage.getItem('paymentAmounts')) || {
        cash: 0,
        pos: 0,
        bankTransfer: 0,
      },
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('searchTerm', searchTerm);
    if (selectedCustomer)
      localStorage.setItem(
        'selectedCustomer',
        JSON.stringify(selectedCustomer),
      );
    localStorage.setItem('paymentMethod', paymentMethod);
    localStorage.setItem('paymentAmounts', JSON.stringify(paymentAmounts));
  }, [cart, searchTerm, selectedCustomer, paymentMethod, paymentAmounts]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== itemId);
      if (newQuantity > 0) {
        const updatedItem = prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item,
        );
        return updatedItem;
      }
      return updatedCart;
    });
  };

  const handleSelectProduct = (newProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === newProduct._id,
      );
      if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        return prevCart.map((item) =>
          item._id === newProduct._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // If it's a new product, add it to the cart
        return [...prevCart, { ...newProduct, quantity: 1 }];
      }
    });
  };

  const calculatePriceWithTax = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice)
      ? 0
      : numericPrice + (numericPrice * TAX_PERCENTAGE) / 100;
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0,
  );
  const tax = subtotal * (TAX_PERCENTAGE / 100);
  const totalAmount = subtotal + tax;

  
const [completedTransactionId, setCompletedTransactionId] = useState(null);

const handleCompleteSale = async () => {
  const storeId = localStorage.getItem('storeId');
  const transactionItems = cart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));
  const transactionData = {
    transactionItems,
    paymentMethod,
    status: 'completed',
    amount: totalAmount,
  };

  try {
    const response = await axios.post(
      `/${storeId}/transactions/`,
      transactionData,
    );
    console.log('Transaction posted successfully:', response.data);
    if (response.data.status) {
      const { _id: transactionId, invoiceId } = response.data.data;
      // Store the TransactionId after a successful transaction
      setCompletedTransactionId(transactionId);
      setCart([]); // Clear the cart after successful transaction
      alert(`Transaction completed successfully! Invoice ID: ${invoiceId}`);
    } else {
      throw new Error(response.data.message || 'Transaction failed');
    }
  } catch (error) {
    console.error('Error posting transaction:', error);
    alert(`Failed to post transaction: ${error.message}`);
  }
};
  return (
    <div className="pos-container">
      <ProductSelector
        products={products}
        cart={cart}
        onSelectProduct={handleSelectProduct}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <CartTable
        cart={cart}
        handleQuantityChange={handleQuantityChange}
        calculatePriceWithTax={calculatePriceWithTax}
      />
      <PaymentSection
        totalAmount={totalAmount}
        onCompleteSale={handleCompleteSale}
        onSuspendSale={() => alert('Sale suspended!')}
        onPrintReceipt={() => alert('Printing receipt...')}
        transactionId={completedTransactionId} // Pass TransactionId to PaymentSection
        cart={cart}
        selectedCustomer={selectedCustomer}
        paymentMethod={paymentMethod}
        clearCart={() => setCart([])}
      />
    </div>
  );
};

export default Pos;


