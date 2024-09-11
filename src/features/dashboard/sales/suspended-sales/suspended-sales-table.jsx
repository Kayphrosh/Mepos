import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Edit from "../../../../assets/images/icons/edit.svg";
import Delete from "../../../../assets/images/icons/delete.svg";

const SuspendedSalesTable = () => {
  const SuspendedSalesData = [
    {
      invoiceId: "INV001",
      dateTime: "2024-09-01 10:30 AM",
      addedBy: "Admin",
      itemsList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      totalItems: 5,
      totalPaid: 150.0,
      action: "View",
    },
    {
      invoiceId: "INV002",
      dateTime: "2024-09-02 02:00 PM",
      addedBy: "Manager",
      itemsList: ["Item A", "Item B", "Item C", "Item D", "Item E", "Item F"],
      totalItems: 6,
      totalPaid: 175.0,
      action: "View",
    },
    {
      invoiceId: "INV003",
      dateTime: "2024-09-03 09:15 AM",
      addedBy: "Admin",
      itemsList: [
        "Product X",
        "Product Y",
        "Product Z",
        "Product W",
        "Product V",
        "Product U",
      ],
      totalItems: 6,
      totalPaid: 250.0,
      action: "View",
    },
    {
      invoiceId: "INV004",
      dateTime: "2024-09-04 01:45 PM",
      addedBy: "Admin",
      itemsList: ["Item M", "Item N", "Item O"],
      totalItems: 3,
      totalPaid: 95.0,
      action: "View",
    },
    {
      invoiceId: "INV005",
      dateTime: "2024-09-05 08:20 AM",
      addedBy: "Manager",
      itemsList: [
        "Product A",
        "Product B",
        "Product C",
        "Product D",
        "Product E",
      ],
      totalItems: 5,
      totalPaid: 200.0,
      action: "View",
    },
    {
      invoiceId: "INV006",
      dateTime: "2024-09-06 11:45 AM",
      addedBy: "Admin",
      itemsList: ["Item P", "Item Q", "Item R", "Item S"],
      totalItems: 4,
      totalPaid: 130.0,
      action: "View",
    },
    {
      invoiceId: "INV007",
      dateTime: "2024-09-07 04:30 PM",
      addedBy: "Admin",
      itemsList: ["Product F", "Product G", "Product H", "Product I"],
      totalItems: 4,
      totalPaid: 175.0,
      action: "View",
    },
    {
      invoiceId: "INV008",
      dateTime: "2024-09-08 09:10 AM",
      addedBy: "Admin",
      itemsList: ["Item X", "Item Y", "Item Z"],
      totalItems: 3,
      totalPaid: 120.0,
      action: "View",
    },
    {
      invoiceId: "INV009",
      dateTime: "2024-09-09 10:00 AM",
      addedBy: "Manager",
      itemsList: ["Product J", "Product K", "Product L"],
      totalItems: 3,
      totalPaid: 140.0,
      action: "View",
    },
    {
      invoiceId: "INV010",
      dateTime: "2024-09-10 01:30 PM",
      addedBy: "Admin",
      itemsList: ["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"],
      totalItems: 5,
      totalPaid: 210.0,
      action: "View",
    },
    {
      invoiceId: "INV011",
      dateTime: "2024-09-11 02:00 PM",
      addedBy: "Manager",
      itemsList: ["Product M", "Product N", "Product O", "Product P"],
      totalItems: 4,
      totalPaid: 160.0,
      action: "View",
    },
    {
      invoiceId: "INV012",
      dateTime: "2024-09-12 08:00 AM",
      addedBy: "Admin",
      itemsList: ["Item 11", "Item 12", "Item 13"],
      totalItems: 3,
      totalPaid: 110.0,
      action: "View",
    },
    {
      invoiceId: "INV013",
      dateTime: "2024-09-13 10:20 AM",
      addedBy: "Admin",
      itemsList: ["Item 14", "Item 15", "Item 16", "Item 17"],
      totalItems: 4,
      totalPaid: 180.0,
      action: "View",
    },
    {
      invoiceId: "INV014",
      dateTime: "2024-09-14 09:15 AM",
      addedBy: "Admin",
      itemsList: ["Product Q", "Product R", "Product S", "Product T"],
      totalItems: 4,
      totalPaid: 170.0,
      action: "View",
    },
    {
      invoiceId: "INV015",
      dateTime: "2024-09-15 03:00 PM",
      addedBy: "Manager",
      itemsList: ["Item 18", "Item 19", "Item 20", "Item 21"],
      totalItems: 4,
      totalPaid: 200.0,
      action: "View",
    },
    {
      invoiceId: "INV016",
      dateTime: "2024-09-16 11:45 AM",
      addedBy: "Admin",
      itemsList: ["Product U", "Product V", "Product W"],
      totalItems: 3,
      totalPaid: 100.0,
      action: "View",
    },
    {
      invoiceId: "INV017",
      dateTime: "2024-09-17 02:30 PM",
      addedBy: "Manager",
      itemsList: ["Item 22", "Item 23", "Item 24", "Item 25"],
      totalItems: 4,
      totalPaid: 190.0,
      action: "View",
    },
    {
      invoiceId: "INV018",
      dateTime: "2024-09-18 12:00 PM",
      addedBy: "Admin",
      itemsList: ["Product X", "Product Y", "Product Z"],
      totalItems: 3,
      totalPaid: 150.0,
      action: "View",
    },
    {
      invoiceId: "INV019",
      dateTime: "2024-09-19 04:10 PM",
      addedBy: "Manager",
      itemsList: ["Item 26", "Item 27", "Item 28"],
      totalItems: 3,
      totalPaid: 115.0,
      action: "View",
    },
    {
      invoiceId: "INV020",
      dateTime: "2024-09-20 09:30 AM",
      addedBy: "Admin",
      itemsList: ["Item 29", "Item 30", "Item 31", "Item 32"],
      totalItems: 4,
      totalPaid: 170.0,
      action: "View",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(SuspendedSalesData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuspendedSales = SuspendedSalesData.slice(
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
                Datetime{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Added by{" "}
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Items List{" "}
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
              <div>Action </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSuspendedSales.map((sale) => (
            <tr key={sale.invoiceId}>
              <td>{sale.invoiceId}</td>
              <td>{sale.dateTime}</td>
              <td>{sale.addedBy}</td>
              <td className="items-list">{sale.itemsList.join(", ")}</td>
              <td>{sale.totalItems}</td>
              <td>{sale.totalPaid.toFixed(2)}</td>
              <td>
                <div className="action">
                  <img src={Edit} alt="" />
                  <img src={Delete} alt="" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>
          Showing <span>{SuspendedSalesData.length}</span> entries
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

export default SuspendedSalesTable;
