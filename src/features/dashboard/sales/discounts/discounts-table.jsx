import React from 'react';
import '../../../components/ui/table/table.scss';
import { discountsData } from './discounts-data';
import { eyeIcon, editIcon, deleteIcon } from '../../../assets/images/icons';

const DiscountsTable = ({ searchQuery }) => {
  const filteredDiscounts = discountsData.filter((discountData) =>
    [discountData.discountName, discountData.start, discountData.end, discountData.percentage, discountData.products].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Starts At</th>
          <th>Ends At</th>
          <th>Discount(%)</th>
          <th>Products</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredDiscounts.map((discountData) => (
          <tr key={discountData.id}>
            <td>{discountData.discountName}</td>
            <td>{discountData.start}</td>
            <td>{discountData.end}</td>
            <td>{discountData.percentage}</td>
            <td>{discountData.products}</td>
            <td>{discountData.action}</td>
            <td>
              <div className="actions">
                <div>
                  <img src={eyeIcon} alt="View" />
                </div>
                <p>View</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default  DiscountsTable;
