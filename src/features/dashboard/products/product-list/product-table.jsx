import React from "react";
import { Icon } from "@iconify/react";

const ProductTable = ({ products, loadingProducts }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <div>
                SKU
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Product
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Selling Price
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Available Location
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Category
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Unit
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.companyName}</td>
              <td>{product.category?.name}</td>
              <td>{product.unit?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loadingProducts && <p className="loading">Loading...</p>}
      {products.length === 0 && !loadingProducts && (
        <p className="loading">Product is not available</p>
      )}
    </>
  );
};

export default ProductTable;
