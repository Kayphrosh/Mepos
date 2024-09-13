import React, { useState } from 'react';
import './import-products.scss';
import { downloadIcon, fileIcon } from '../../../../assets/images/icons';

const ImportProducts = () => {
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
    <div className="import-products-container">
      <div className="header">
        <h1>Import Products</h1>
        <button className="download-btn">
          <img src={downloadIcon} alt="Download" />
          Download .csv file template
        </button>
      </div>

      <div className="table-header">
        <div>SKU ↓</div>
        <div>Product ↓</div>
        <div>Unit Purchase Price ↓</div>
        <div>Selling Price ↓</div>
        <div>Store Location ↓</div>
        <div>Category ↓</div>
        <div>Brand ↓</div>
      </div>

      <div className="content">
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
          className="file-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <img src={fileIcon} alt="File" />
          <p>Drag and drop your excel file here or <label htmlFor="file-input">Browse</label></p>
          <input 
            type="file" 
            id="file-input" 
            onChange={handleFileChange} 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            style={{display: 'none'}}
          />
          {file && <p>Selected file: {file.name}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImportProducts;
