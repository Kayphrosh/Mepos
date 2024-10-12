import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportIcon, plusIcon, searchIcon } from '../../../../assets/images/icons';
import CustomerGroupsTable from './customerGroupTable'; // Replace with your component name

const CustomerGroups = () => {
  const [customerGroupsData, setCustomerGroupsData] = useState([]); // Data to be managed locally
  const [filter, setFilter] = useState('All groups'); // State for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  // Placeholder for static or locally managed data, can be updated as needed.
  const mockCustomerGroupsData = [
    { id: 1, name: 'Group 1', status: 'Active' },
    { id: 2, name: 'Group 2', status: 'Inactive' },
    // Add more mock data as necessary
  ];

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = mockCustomerGroupsData.filter(group =>
      group.name.toLowerCase().includes(searchTerm)
    );
    setCustomerGroupsData(filteredData);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    const filteredData = selectedFilter === 'All groups'
      ? mockCustomerGroupsData
      : mockCustomerGroupsData.filter(group => group.status === selectedFilter);
    setCustomerGroupsData(filteredData);
  };

  return (
    <div className="role-container users-container customers-container">
      <div className="title">
        <h3>Customer Groups</h3>

        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="" />
            Export as .csv
          </button>

        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            onChange={handleSearch} // Search handler
          />
          <button>
            <img src={searchIcon} alt="" />
          </button>
        </div>

        <div className="filter">
          <div className="label">Filter by:</div>
          <select value={filter} onChange={handleFilterChange}>
            <option>All groups</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <CustomerGroupsTable customerGroupsData={customerGroupsData} setCustomerGroupsData={setCustomerGroupsData} />
    </div>
  );
};

export default CustomerGroups;
