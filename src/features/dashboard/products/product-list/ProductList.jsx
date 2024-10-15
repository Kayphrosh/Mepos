import React, { useEffect, useState } from 'react';
import './product-list.scss';
import { ExportIcon } from '../../../../assets/images/icons';
import ProductTable from './product-table';
import { Icon } from '@iconify/react';
import axios from '../../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles

const ProductList = () => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const storeId = localUser.store._id;
  const [filter, setFilter] = useState('All Transactions');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchProducts, setSearchProducts] = useState('');
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchProducts(e.target.value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await axios.get(`/${storeId}/products/`);
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
    product.name.toLowerCase().includes(searchProducts.toLowerCase()),
  );

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleProductDeleted = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
    toast.success('Product has been deleted successfully!'); // Show success notification
  };

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?',
    ); // Confirmation dialog
    if (confirmed) {
      try {
        await axios.delete(`/${storeId}/products/${productId}`);
        handleProductDeleted(productId);
      } catch (error) {
        handleError('Failed to delete the product.'); // Handle error appropriately
        toast.error('Failed to delete the product.'); // Show error notification
      }
    }
  };

  return (
    <div className="product-list-container">
      <ToastContainer /> {/* Render ToastContainer */}
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
            <select onChange={handleFilterChange} value={filter}>
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
        storeId={storeId}
        onProductDeleted={deleteProduct} // Pass the delete function to ProductTable
        onError={handleError}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProductList;
