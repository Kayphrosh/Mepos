import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customers.scss';
import CustomersTable from './customers-table';
import { searchIcon, plusIcon } from '../../../assets/images/icons';
import Modal from '../../../components/ui/modal/modal';
import AddNewCustomerModal from './add-new-customer-modal';
import EditCustomerModal from './edit-cutomer-modal';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 const [isEditModalOpen, setEditModalOpen] = useState(false);
 const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    const storeId = localStorage.getItem('storeId');
    try {
      const response = await axios.get(`/${storeId}/customers/`);
      if (response.data.status && Array.isArray(response.data.data)) {
          console.log('All customer data:', response.data.data);
        setCustomers(
          response.data.data.map((customer) => ({
            id: customer._id,
            customerID: customer.customerId,
            name: `${customer.firstName || ''} ${
              customer.lastName || ''
            }`.trim(),
            email: customer.email || '',
            phone: customer.phoneNumber || '',
            gender: customer.gender || '',
            membership: customer.membershipStatus || '',
          })),
        );
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching customers');
    } finally {
      setIsLoading(false);
    }
  };
  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = customers.filter(
    (customer) =>
      (customer.customerID?.toString().toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      ) ||
      (customer.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (customer.email?.toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      ) ||
      (customer.phone?.toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      ) ||
      (customer.gender?.toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      ) ||
      (customer.membership?.toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      ),
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCustomerAdded = () => {
    fetchCustomers(); // Refresh the customer list
  };

    const handleEditCustomer = (customer) => {
      setSelectedCustomer(customer);
      setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
      setEditModalOpen(false);
      setSelectedCustomer(null);
    };

    const handleCustomerUpdated = () => {
      fetchCustomers(); // Refresh the customer list
    };

  const handleDeleteCustomer = async (customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        const storeId = localStorage.getItem('storeId');
        const response = await axios.delete(`/${storeId}/customers/${customer.id}`);
        
        if (response.data.status) {
          toast.success('Customer deleted successfully!');
          fetchCustomers(); // Refresh the customer list
        } else {
          toast.error(response.data.message || 'Failed to delete customer');
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            'An error occurred while deleting the customer'
        );
      }
    }
  };

  return (
    <div className="customers-container users-container">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="title">
        <h3>Customers</h3>
        <div className="cta">
          <button onClick={handleModalOpen}>
            <img src={plusIcon} alt="" />
            Add New Customer
          </button>
        </div>
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

      {/* <CustomersTable customers={currentEntries} /> */}

      {isLoading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <CustomersTable
          customers={currentEntries}
          onEditCustomer={handleEditCustomer}
          onDeleteCustomer={handleDeleteCustomer}
        />
      )}

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

      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
          <AddNewCustomerModal
            onClose={handleModalClose}
            onCustomerAdded={handleCustomerAdded}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} closeModal={handleEditModalClose}>
          <EditCustomerModal
            customer={selectedCustomer}
            onClose={handleEditModalClose}
            onCustomerUpdated={handleCustomerUpdated}
          />
        </Modal>
      )}
    </div>
  );
};

export default Customers;
