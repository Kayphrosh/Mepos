import React from 'react';
import { selectedProducts } from './product-label-data';

const ProductLabelList = () => {
  return (
    <div className="product-label-list">
      <div className="list-header">
        <span>Products</span>
        <span>Selling Price</span>
        <span>Number of Labels</span>
      </div>
      {selectedProducts.map((product, index) => (
        <div key={index} className="list-item">
          <span>{product.name}</span>
          <span>{product.price}</span>
          <div className="quantity-control">
            <button className="decrease">-</button>
            <input type="number" value={product.quantity} readOnly />
            <button className="increase">+</button>
          </div>
          <button className="remove">×</button>
        </div>
      ))}
    </div>
  );
};

export default ProductLabelList;
