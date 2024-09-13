// ImportOpeningStock.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadIcon, fileIcon } from '../../../../assets/images/icons';
import './import-opening-stock.scss';

const ImportOpeningStock = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="import-opening-stock-container">
      <h1>Import Opening Stock</h1>
      <div className="download-template">
        <Link to="/download-template">
          <img src={downloadIcon} alt="Download" />
          Download .csv file template
        </Link>
      </div>
      <div className="table-header">
        <div>SKU</div>
        <div>Product</div>
        <div>Shelf Number</div>
        <div>Selling Price</div>
        <div>Available Location</div>
        <div>Category</div>
        <div>Brand</div>
      </div>
      <div className="content-container">
        <div className="instructions">
          <h2>Instructions</h2>
          <ul>
            <li>Upload sales data in excel format</li>
            <li>Choose respective sales fields for each column</li>
            <li>Either customer email id or phone number required</li>
            <li>Either product name (for single and combo only) or product sku required</li>
            <li>Date time format should be "Y-m-d H:i:s" (2020-07-15 17:45:32)</li>
            <li>Other fields are Invoice No,Customer name, Product Unit, Unit Price, Item Tax, Item Discount, Item Description, Order Total</li>
          </ul>
        </div>
        <div 
          className="file-upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <img src={fileIcon} alt="File" />
          <p>Drag and drop your excel file here or <label htmlFor="file-upload">Browse</label></p>
          <input 
            type="file" 
            id="file-upload" 
            onChange={handleFileChange} 
            style={{display: 'none'}}
          />
          {file && <p>Selected file: {file.name}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImportOpeningStock;
