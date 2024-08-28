import React from 'react';
import { transactions } from './home-data';
import './home.scss'
import '../../../components/ui/table/table.scss';

const SaleTables = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Date</th>
          <th>Customer name</th>
          <th>Payment method</th>
          <th>Total Items</th>
          <th>Total Paid</th>
          <th>Added by</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.invoiceId}>
            <td>{transaction.invoiceId}</td>
            <td>{transaction.date}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.paymentMethod}</td>
            <td>{transaction.totalItems}</td>
            <td>{transaction.totalPaid}</td>
            <td>{transaction.addedBy}</td>
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
