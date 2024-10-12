import React from 'react';
import { Icon } from '@iconify/react';

const SuppliersTable = ({ suppliers = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Supplier Name</th>
          <th>Rep Name</th>
          <th>Contact Rep</th>
          <th>Last Inventory</th>
          <th>Total Purchase Due</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.supplierID}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.repName}</td>
              <td>{supplier.contactRep}</td>
              <td>{supplier.lastInventory}</td>
              <td>{supplier.totalPurchase}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No suppliers available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SuppliersTable;
