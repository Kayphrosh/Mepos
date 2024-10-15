import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios'; // Adjust the import based on your project structure
import './home.scss';
import '../../../components/ui/table/table.scss';
import moment from 'moment'; // Ensure moment.js is imported for date manipulation

const SaleTables = ({ storeId }) => {
  // Pass storeId as a prop if needed
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/${storeId}/transactions/`, {
          params: {
            // Include any necessary query parameters here
          },
        });
        // Set the transactions from the response data
        setTransactions(response.data.data || []); // Adjust based on your API response structure
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [storeId]); // Fetch when storeId changes

  // Sort and get the 4 most recent transactions
  const recentTransactions = transactions
    .sort((a, b) => moment(b.date) - moment(a.date)) // Sort in descending order
    .slice(0, 4); // Get the 4 most recent transactions

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (error) {
    return <div>{error}</div>; // Handle error state
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Payment Method</th>
          <th>Total Items</th>
          <th>Total Paid</th>
          <th>Added By</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {recentTransactions.map((transaction) => (
          <tr key={transaction.invoiceId}>
            <td>{transaction.invoiceId}</td>
            <td>
              {moment(transaction.date).format('YYYY-MM-DD HH:mm:ss')}
            </td>{' '}
            {/* Format date as needed */}
            <td>{transaction.customerName || 'N/A'}</td>
            <td>{transaction.paymentMethod}</td>
            <td>{transaction.transactionItems.length}</td>
            <td>{transaction.amount.toFixed(2)}</td>
            <td>{transaction.addedBy || 'N/A'}</td>
            <td>
              <select placeholder="Actions">
                <option>Action</option>
                <option>View</option>
                <option>Edit</option>
                <option>Delete</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SaleTables;
