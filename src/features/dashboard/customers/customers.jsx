import React, { useState } from 'react';
import './customers.scss';
import CustomersTable from './customers-table';
import { searchIcon } from '../../../assets/images/icons';
import { customersData } from './customers-data';

const Customers = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const filteredData = customersData.filter(
    (customer) =>
      customer.customerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.membership.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry,
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="customers-container users-container">
      <div className="title">
        <h3>Customers</h3>
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
          <select placeholder="Actions">
            <option>All Customers</option>
            <option>View</option>
            <option>Edit</option>
            <option>Delete</option>
          </select>
        </div>
      </div>

      <CustomersTable customers={currentEntries} />

      <div className="pagination">
        <div className="show-entries">
          <span>Show</span>
          <select value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <span>entries</span>
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

export default Customers;
