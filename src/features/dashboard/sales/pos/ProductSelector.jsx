import React, { useState } from 'react';
// import './_ProductSelector.scss';

const ProductSelector = ({ products, onAddToCart }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedProductId(productId);
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      onAddToCart({
        ...selectedProduct,
        quantity,
      });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    
    // Update the cart immediately when quantity changes
    if (selectedProductId) {
      const selectedProduct = products.find(product => product.id === selectedProductId);
      if (selectedProduct) {
        onAddToCart({
          ...selectedProduct,
          quantity: newQuantity,
        });
      }
    }
  };

  return (
    <div className="product-selector pos-section">
      <select id="product" onChange={handleProductChange}>
        <option value="All">Search</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      
    </div>
  );
};

export default ProductSelector;
