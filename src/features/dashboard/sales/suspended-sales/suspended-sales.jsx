import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Warning from "../../../../assets/images/warning.svg";
import "./suspended-sales.scss";
import SuspendedSalesTable from "./suspended-sales-table";

const SuspendedSales = () => {
  const [suspendedSales, setSuspendedSales] = useState("");
  return (
    <div className="suspended-sales-container">
      <h3>Suspended Sales</h3>
      <div className="warning">
        <div className="information">
          <img src={Warning} alt="" />
          <p>
            All suspended sales will be automatically deleted after 24 hours
          </p>
        </div>
        <button>
          <Icon icon="foundation:page-export-csv" />
          <p>Export as .csv</p>
        </button>
      </div>
      <div className="filters">
        <div className="main">
          <div className="search-trans">
            <input
              type="search"
              placeholder="Search"
              value={suspendedSales}
              onChange={(e) => setSuspendedSales(e.target.value)}
            />
            <button>
              <Icon icon="ic:outline-search" width={24} height={24} />
            </button>
          </div>
          <div className="filter-trans">
            <label>Filter by:</label>
            <select>
              <option>All Suspended Sales</option>
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

      <SuspendedSalesTable />
    </div>
  );
};

export default SuspendedSales;
