import React, { useState } from 'react';
import './product-list.scss';
import { ExportIcon, searchIcon } from '../../../assets/images/icons';
import ProductTable from './product-table';

const ProductList = () => {
  const [filter, setFilter] = useState('All Transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(300);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  return (
    <div className="product-list-container">
      <div className="title">
        <h3>Products List</h3>
        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="Export" />
            Export as .csv
          </button>
        </div>
      </div>
      <div className="filter-container">
        <div className="search">
          <input 
            type="search" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className="filter">
          <div className="label">Filter by:</div>
          <select value={filter} onChange={handleFilterChange}>
            <option value="All Transactions">All Transactions</option>
            <option value="Category">Category</option>
            <option value="Brand">Brand</option>
            <option value="Location">Location</option>
          </select>
        </div>
        <button className="more-filter">More filter</button>
      </div>
      <ProductTable />
      <div className="pagination">
        <div className="show-entries">
          <span>Show</span>
          <select value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
          </select>
          <span>entries</span>
        </div>
        <div className="page-numbers">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>...</button>
          <button>30</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
