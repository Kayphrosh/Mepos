import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './transaction.scss';

const TransactionsTable = ({ transactions }) => {
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 10;

 const totalPages = Math.ceil(transactions.length / itemsPerPage);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentTransactions = transactions.slice(
   indexOfFirstItem,
   indexOfLastItem,
 );

 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <div>
                Invoice ID
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Date
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Customer Name
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Payment Method
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Total Items
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Total Paid
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Added By
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Action
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.invoiceId}</td>
              <td>{transaction.createdAt}</td>
              <td>{transaction.customerName || 'N/A'}</td>
              <td>{transaction.paymentMethod}</td>
              <td>{transaction.transactionItems.length}</td>
              <td>{transaction.amount.toFixed(2)}</td>
              <td>{transaction.addedBy || 'N/A'}</td>
              <td>
                <select>
                  <option>{transaction.status}</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <p>
          Showing <span>{transactions.length}</span> entries
        </p>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
