import React from "react";
import { Icon } from "@iconify/react";

const PurchasesListTable = ({ purchases, loadingPurchases }) => {
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
            {/* <th>
              <div>
                Action
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id}>
              <td>{purchase.referenceNo}</td>
              <td>{purchase.purchaseDate}</td>
              <td>{purchase.supplier}</td>
              <td>{purchase.purchaseStatus}</td>
              <td>{purchase.purchaseAmount}</td>
              {/* <td>{purchase.unit?.name}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {loadingPurchases && <p className="loading">Loading...</p>}
      {purchases.length === 0 && !loadingPurchases && (
        <p className="loading">Product is not available</p>
      )}
    </>
  );
};

export default PurchasesListTable;
