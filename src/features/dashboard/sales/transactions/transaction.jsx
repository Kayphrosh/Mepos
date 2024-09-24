import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import './transaction.scss';
import TransactionsTable from './TransactionsTable';
import axios from '../../../../utils/axios';

const Transaction = () => {
  const { storeId } = useParams(); // Get storeId from URL params
  const [searchTransactions, setSearchTransactions] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!storeId) {
        setApiError('Store ID is missing in the URL');
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`/${storeId}/transactions`);
        const data = response.data.data;

        if (!data || data.length === 0) {
          setApiError('No transactions found');
        } else {
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setApiError(
          error.response?.data?.message || 'Failed to fetch transactions',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [storeId]);

  if (!storeId) {
    return <p>Store ID is missing. Please check the URL.</p>;
  }

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
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : apiError ? (
        <p className="error-message">{apiError}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default Transaction;
