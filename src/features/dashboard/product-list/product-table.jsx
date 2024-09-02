import React from 'react';
import '../../../components/ui/table/table.scss';
import { productsData } from './product-data';

const ProductTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU <span>↓</span></th>
          <th>Product <span>↓</span></th>
          <th>Shelf Number <span>↓</span></th>
          <th>Selling Price <span>↓</span></th>
          <th>Available Location <span>↓</span></th>
          <th>Category <span>↓</span></th>
          <th>Brand <span>↓</span></th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((product, index) => (
          <tr key={index}>
            <td>{product.sku}</td>
            <td>{product.product}</td>
            <td>{product.shelfNumber}</td>
            <td>{product.sellingPrice}</td>
            <td>{product.availableLocation}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
