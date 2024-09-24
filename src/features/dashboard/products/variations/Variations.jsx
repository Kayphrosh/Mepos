import React, { useState } from 'react';
import './variations.scss';
import { ExportIcon, searchIcon } from '../../../../assets/images/icons';
import VariationsTable from './variations-table';

const Variations = () => {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const toggleAddNew = () => setIsAddNewOpen(!isAddNewOpen);

  return (
    <div className="variations-container">
      <div className="header">
        <h1>Variations</h1>
        <button className="export-btn">
          <img src={ExportIcon} alt="Export" />
          Export as .csv
        </button>
      </div>

      <div className="add-new-section">
        <h2 onClick={toggleAddNew}>
          Add New Variation
          <span className={`arrow ${isAddNewOpen ? 'open' : ''}`}>▼</span>
        </h2>
        {isAddNewOpen && (
          <div className="add-new-form">
            {/* Add form fields here */}
          </div>
        )}
      </div>

      <div className="products-variations">
        <h2>Products Variations</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search variation" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><img src={searchIcon} alt="Search" /></button>
        </div>

        <VariationsTable />

        <div className="pagination">
          <div className="entries-per-page">
            <span>Show</span>
            <select 
              value={entriesPerPage} 
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="page-numbers">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variations;
