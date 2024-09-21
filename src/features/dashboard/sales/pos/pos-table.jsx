import React from 'react';
import '../../../../components/ui/table/table.scss';
import { itemsData } from './items-data';

const PosTable = ({ searchQuery }) => {
  const filteredItems = itemsData.filter((itemData) =>
    [itemData.itemName].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Products</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price + tax</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {filteredItems.map((itemData) => (
          <tr key={itemData.id}>
            <td>{itemData.itemName}</td>
            {/* <td>{itemData.quantity}</td> */}
            <td>{itemData.unit}</td>
            <td>{itemData.price}</td>
            <td>{itemData.subtotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PosTable;
