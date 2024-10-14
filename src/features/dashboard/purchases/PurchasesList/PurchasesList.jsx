import React from "react";
import "./PurchasesList.scss";
import { Icon } from "@iconify/react";
import { ExportIcon } from "../../../../assets/images/icons";
import PurchasesListTable from "./PurchasesListTable";

const PurchasesList = () => {
  return (
    <div className="purchase-list-container">
      <div className="title">
        <h3>Purchases</h3>
        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="Export" />
            Export as .csv
          </button>
        </div>
      </div>
      <div className="filters">
        <div className="main">
          <div className="search-trans">
            <input
              type="search"
              placeholder="Search"
              // onChange={handleSearchChange}
            />
            <button>
              <Icon icon="ic:outline-search" width={24} height={24} />
            </button>
          </div>
          <div className="filter-trans">
            <label>Filter by:</label>
            <select
            //  onChange={handleFilterChange} value={filter}
            >
              <option>All Purchases</option>
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
      <PurchasesListTable
      // products={filteredProducts}
      // loadingProducts={loadingProducts}
      />
    </div>
  );
};

export default PurchasesList;
