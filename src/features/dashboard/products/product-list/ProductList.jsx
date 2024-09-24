import React, { useEffect, useState } from "react";
import "./product-list.scss";
import { ExportIcon } from "../../../../assets/images/icons";
import ProductTable from "./product-table";
import { Icon } from "@iconify/react";
import axios from "../../../../utils/axios";

const ProductList = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storeId = localUser.store._id;
  const [filter, setFilter] = useState("All Transactions");
  // const [entriesPerPage, setEntriesPerPage] = useState(300);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchProducts, setSearchProducts] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchProducts(e.target.value);
  };

  // const handleEntriesChange = (e) => {
  //   setEntriesPerPage(parseInt(e.target.value));
  // };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await axios.get(`/${storeId}/products/`);
        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    getProducts();
  }, [storeId]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="title">
        <h3>Products List</h3>
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
              onChange={handleSearchChange}
            />
            <button>
              <Icon icon="ic:outline-search" width={24} height={24} />
            </button>
          </div>
          <div className="filter-trans">
            <label>Filter by:</label>
            <select onCHange={handleFilterChange} value={filter}>
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
      <ProductTable
        products={filteredProducts}
        loadingProducts={loadingProducts}
      />
      {/* <div className="pagination">
        <div className="show-entries">
          <span>Show</span>
          <select value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
          </select>
          <span>entries</span>
        </div>
        <div className="page-numbers">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>...</button>
          <button>30</button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductList;
