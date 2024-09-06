import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./transaction.scss";

const TransactionsTable = () => {
  const transactionData = [
    {
      invoiceId: "INV001",
      date: "2024-09-01",
      customerName: "John Doe",
      paymentMethod: "Credit Card",
      totalItems: 5,
      totalPaid: 150.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV002",
      date: "2024-09-02",
      customerName: "Jane Smith",
      paymentMethod: "PayPal",
      totalItems: 3,
      totalPaid: 75.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV003",
      date: "2024-09-03",
      customerName: "Sam Wilson",
      paymentMethod: "Bank Transfer",
      totalItems: 10,
      totalPaid: 500.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV004",
      date: "2024-09-04",
      customerName: "Sara Connor",
      paymentMethod: "Credit Card",
      totalItems: 2,
      totalPaid: 100.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV005",
      date: "2024-09-05",
      customerName: "Peter Parker",
      paymentMethod: "Cash",
      totalItems: 7,
      totalPaid: 175.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV006",
      date: "2024-09-06",
      customerName: "Tony Stark",
      paymentMethod: "Credit Card",
      totalItems: 12,
      totalPaid: 600.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV007",
      date: "2024-09-07",
      customerName: "Bruce Wayne",
      paymentMethod: "PayPal",
      totalItems: 6,
      totalPaid: 300.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV008",
      date: "2024-09-08",
      customerName: "Clark Kent",
      paymentMethod: "Credit Card",
      totalItems: 4,
      totalPaid: 200.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV009",
      date: "2024-09-09",
      customerName: "Diana Prince",
      paymentMethod: "Bank Transfer",
      totalItems: 8,
      totalPaid: 400.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV010",
      date: "2024-09-10",
      customerName: "Steve Rogers",
      paymentMethod: "Credit Card",
      totalItems: 9,
      totalPaid: 450.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV011",
      date: "2024-09-11",
      customerName: "Natasha Romanoff",
      paymentMethod: "Cash",
      totalItems: 11,
      totalPaid: 550.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV012",
      date: "2024-09-12",
      customerName: "Wanda Maximoff",
      paymentMethod: "PayPal",
      totalItems: 3,
      totalPaid: 150.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV013",
      date: "2024-09-13",
      customerName: "Scott Lang",
      paymentMethod: "Credit Card",
      totalItems: 7,
      totalPaid: 350.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV014",
      date: "2024-09-14",
      customerName: "Bruce Banner",
      paymentMethod: "Bank Transfer",
      totalItems: 6,
      totalPaid: 300.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV015",
      date: "2024-09-15",
      customerName: "Stephen Strange",
      paymentMethod: "Cash",
      totalItems: 5,
      totalPaid: 250.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV016",
      date: "2024-09-16",
      customerName: "Nick Fury",
      paymentMethod: "Credit Card",
      totalItems: 10,
      totalPaid: 500.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV017",
      date: "2024-09-17",
      customerName: "Carol Danvers",
      paymentMethod: "PayPal",
      totalItems: 9,
      totalPaid: 450.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV018",
      date: "2024-09-18",
      customerName: "T'Challa",
      paymentMethod: "Bank Transfer",
      totalItems: 8,
      totalPaid: 400.0,
      addedBy: "Admin",
      action: "View",
    },
    {
      invoiceId: "INV019",
      date: "2024-09-19",
      customerName: "Thor Odinson",
      paymentMethod: "Credit Card",
      totalItems: 4,
      totalPaid: 200.0,
      addedBy: "Manager",
      action: "View",
    },
    {
      invoiceId: "INV020",
      date: "2024-09-20",
      customerName: "Loki Laufeyson",
      paymentMethod: "Cash",
      totalItems: 3,
      totalPaid: 150.0,
      addedBy: "Admin",
      action: "View",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactionData.slice(
    indexOfFirstItem,
    indexOfLastItem
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
                Invoice ID{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Date{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Customer Name{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Payment Method{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Total Items{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Total Paid{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Added By{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Action{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.invoiceId}>
              <td>{transaction.invoiceId}</td>
              <td>{transaction.date}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.paymentMethod}</td>
              <td>{transaction.totalItems}</td>
              <td>{transaction.totalPaid.toFixed(2)}</td>
              <td>{transaction.addedBy}</td>
              <td>
                <select>
                  <option>{transaction.action}</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>
          Showing <span>{transactionData.length}</span> entries
        </p>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
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
