import React, { useState } from 'react';
import './discounts.scss';
import { ExportIcon, plusIcon, searchIcon } from '../../../../assets/images/icons';
import DiscountsTable from './discounts-table';
import { Link } from 'react-router-dom';

const Discounts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="role-container discounts-container">
      <div className="title">
        <h3>Discounts</h3>

        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="Export as CSV" />
            Export as .csv
          </button>
          <Link to="/users/add-new-user">
            <button>
              <img src={plusIcon} alt="Add new user" />
              Add new
            </button>
          </Link>
        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="filter">
          <div className="label">Filter by:</div>
          <select placeholder="Actions">
            <option>All Discounts</option>
            <option>View</option>
            <option>Edit</option>
            <option>Delete</option>
          </select>
        </div>
      </div>

      <DiscountsTable searchQuery={searchQuery} />
    </div>
  );
};

export default Discounts;
