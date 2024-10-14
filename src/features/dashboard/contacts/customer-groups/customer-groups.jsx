import React, { useState, useEffect } from 'react';
import { ExportIcon, searchIcon } from '../../../../assets/images/icons';

const CustomerGroupsTable = ({ customerGroupsData }) => {
  return (
    <table className="customer-groups-table">
      <thead>
        <tr>
          <th>Customer Group Name</th>
          <th>Calculation Percentage</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {customerGroupsData.length > 0 ? (
          customerGroupsData.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.percentage}</td>
              <td>{group.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No customer groups found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const CustomerGroups = () => {
  const [customerGroupsData, setCustomerGroupsData] = useState([]);
  const [filter, setFilter] = useState('All groups');
  const [searchQuery, setSearchQuery] = useState('');

  const mockCustomerGroupsData = [
    { id: 1, name: 'Gold Member', status: 'Active', percentage: '10%' },
    { id: 2, name: 'Silver Member', status: 'Inactive', percentage: '5%' },
    { id: 3, name: 'Platinum Member', status: 'Active', percentage: '15%' },
    { id: 4, name: 'Basic Member', status: 'Inactive', percentage: '2%' },
  ];

  useEffect(() => {
    setCustomerGroupsData(mockCustomerGroupsData);
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);
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

  const handleExportCSV = () => {
    // Export logic...
  };

  return (
    <div className="customer-groups-container">
      <div className="title">
        <h3>Customer Groups</h3>
        <div className="cta">
          <button id="export-csv" onClick={handleExportCSV}>
            <img src={ExportIcon} alt="Export" />
            Export as .csv
          </button>
        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search groups"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="filter">
          <div className="label">Filter by:</div>
          <select value={filter} onChange={handleFilterChange}>
            <option value="All groups">All groups</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <CustomerGroupsTable customerGroupsData={customerGroupsData} />
    </div>
  );
};

export default CustomerGroups;
