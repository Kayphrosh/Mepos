import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios'; // Adjust path as needed
import moment from 'moment';
import FinancialGraph from './financial-graph';

const FinancialData = ({ storeId }) => {
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/${storeId}/transactions/`);
        const transactions = response.data.data || []; // Update based on API structure
        transformData(transactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [storeId]);

  // Transform the transaction data into a format suitable for the graph
  const transformData = (transactions) => {
    const transformedData = transactions.map((transaction) => ({
      date: moment(transaction.date).format('YYYY-MM-DD'), // Format the date
      sales: transaction.totalPaid, // Assuming totalPaid represents the sales amount
      profit: calculateProfit(transaction), // You can define how profit is calculated
    }));
    setGraphData(transformedData);
  };

  // Define a function to calculate profit
  const calculateProfit = (transaction) => {
    // Example calculation: profit = totalPaid - totalItems * unitPurchasePrice
    // Adjust based on your transaction data structure
    return (
      transaction.totalPaid -
      transaction.totalItems * (transaction.unitPurchasePrice || 0)
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>{error}</div>; // Handle error state
  }

  return (
    <div>
      <h2>Financial Overview</h2>
      <FinancialGraph data={graphData} />
    </div>
  );
};

export default FinancialData;
