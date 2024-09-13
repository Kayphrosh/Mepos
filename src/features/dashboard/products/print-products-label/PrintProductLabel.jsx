import React, { useState } from 'react';
import './print-product-label.scss';
import { productList } from './product-label-data';
import ProductLabelList from './ProductLabelList';
import { searchIcon } from '../../../../assets/images/icons';

const PrintProductLabel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('All');

  const filteredProducts = productList.filter(product =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="print-product-label-container">
      <div className="product-selection">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><img src={searchIcon} alt="Search" /></button>
        </div>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="All">All</option>
          {filteredProducts.map((product, index) => (
            <option key={index} value={product}>{product}</option>
          ))}
        </select>
      </div>

      <h1>Print Products Label</h1>

      <ProductLabelList />

      <div className="preview-section">
        <h2>Preview:</h2>
        <div className="label-preview">
          <div className="product-name">NASCO Golden Morn (500mg)</div>
          <div className="barcode">
            {/* Insert barcode image here */}
            <img src="/path-to-barcode-image.png" alt="Barcode" />
          </div>
          <div className="price">₦1520.00</div>
        </div>
      </div>
    </div>
  );
};

export default PrintProductLabel;
