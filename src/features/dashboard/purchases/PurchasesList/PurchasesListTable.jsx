import React from "react";
import { Icon } from "@iconify/react";

const PurchasesListTable = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <div>
                Reference No
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
                Supplier
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Purchase Status
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Total Amount
                <Icon icon="radix-icons:caret-sort" width={24} height={24} />
              </div>
            </th>
            <th>
              <div>
                Action
                {/* <Icon icon="radix-icons:caret-sort" width={24} height={24} /> */}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {products.map((product) => (
            <tr key={product._id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.companyName}</td>
              <td>{product.category?.name}</td>
              <td>{product.unit?.name}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      {/* {loadingProducts && <p className="loading">Loading...</p>}
      {products.length === 0 && !loadingProducts && (
        <p className="loading">Product is not available</p>
      )} */}
    </>
  );
};

export default PurchasesListTable;
