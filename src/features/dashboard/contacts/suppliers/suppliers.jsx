import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './suppliers.scss';
import SuppliersTable from './suppliers-table';
import { suppliersData } from './suppliers-data';


const Suppliers = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchSuppliers, setSearchSuppliers] = useState('');

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  const handleSearchChange = (e) => {
    setSearchSuppliers(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const filteredSuppliers = suppliersData.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchSuppliers.toLowerCase()) ||
    supplier.supplierName.toLowerCase().includes(searchSuppliers.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredSuppliers.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredSuppliers.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="transaction-container suppliers-container">
      <div className="title">
        <h3>Suppliers</h3>
        <button id="export-csv">
          <Icon icon="foundation:page-export-csv" />
          Export as .csv
        </button>
      </div>
      <div className="filters">
        <div className="main">
          <div className="search-trans">
            <input
              type="search"
              placeholder="Search"
              value={searchSuppliers}
              onChange={handleSearchChange}
            />
            <button>
              <Icon icon="ic:outline-search" width={24} height={24} />
            </button>
          </div>
          <div className="filter-trans">
            <label>Filter by:</label>
            <select>
              <option>All Suppliers</option>
              <option>View</option>
              <option>Edit</option>
              <option>Delete</option>
            </select>
            <Icon icon="mdi:chevron-down" width={20} height={20} />
          </div>
        </div>
        <button className="more-filter">
          <Icon icon="mdi:chevron-down" width={20} height={20} />
          <p>More filter</p>
        </button>
      </div>
      <SuppliersTable suppliers={currentEntries} />
      <div className="pagination">
        <div className="show-entries">
          <span className='entry'>Show</span>
          <select className='entry' value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <span className='entry'>entries</span>
        </div>
        <div className="page-numbers">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
