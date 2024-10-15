import React, { useEffect, useState } from "react";
import "./PurchasesList.scss";
import { Icon } from "@iconify/react";
import { ExportIcon } from "../../../../assets/images/icons";
import PurchasesListTable from "./PurchasesListTable";
import axios from "../../../../utils/axios";

const PurchasesList = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storeId = localUser.store._id;
  const [filter, setFilter] = useState("All Purchases");
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  // const [searchPurchases, setSearchPurchases] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const handleSearchChange = (e) => {
  //   setSearchPurchases(e.target.value);
  // };

  // const filteredPurchases = purchases.filter((purchase) =>
  //   purchase.name.toLowerCase().includes(searchPurchases.toLowerCase())
  // );
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoadingPurchases(true);
        const response = await axios.get(`/${storeId}/purchase`);
        console.log(response.data.data);
        setPurchases(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPurchases(false);
      }
    };

    fetchPurchases();
  }, [storeId]);
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
            <select onChange={handleFilterChange} value={filter}>
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
        purchases={purchases}
        loadingPurchases={loadingPurchases}
      />
    </div>
  );
};

export default PurchasesList;
