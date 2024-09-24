import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./transaction.scss";
import TransactionsTable from "./TransactionsTable";
import axios from "../../../../utils/axios";
// import instance from "../../../../utils/axios";
// import instance from "../../../../utils/axios";

const Transaction = () => {
  const [searchTransactions, setSearchTransactions] = useState("");

  // const fetchTransactions = async () => {
  //   try {
  //     const response = await axios.get("/user");
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);
  return (
    <div className="transaction-container">
      <div className="title">
        <h3>Transactions</h3>
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
              value={searchTransactions}
              onChange={(e) => setSearchTransactions(e.target.value)}
            />
            <button>
              <Icon icon="ic:outline-search" width={24} height={24} />
            </button>
          </div>
          <div className="filter-trans">
            <label>Filter by:</label>
            <select>
              <option>All Transactions</option>
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
      <TransactionsTable />
    </div>
  );
};

export default Transaction;
