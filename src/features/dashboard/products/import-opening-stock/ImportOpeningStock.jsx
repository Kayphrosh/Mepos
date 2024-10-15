import React from "react";
import "./ImportOpeningStock.scss";
import DownloadIcon from "../../../../assets/images/icons/download.svg";
import { Icon } from "@iconify/react";

const ImportOpeningStock = () => {
  return (
    <div className="import-sales-container">
      <div className="title">
        <h3>Import Opening Stock</h3>
        <button>
          <img src={DownloadIcon} alt="" />
          Download .csv fle template
        </button>
      </div>
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
        <tbody></tbody>
      </table>
      <div className="instructions">
        <div className="instruction">
          <h4>Instructions</h4>
          <ul>
            <li>Upload sales data in excel format</li>
            <li>Choose respective sales fields for each column</li>
            <li>Either customer email id or phone number required</li>
            <li>
              Either product name (for single and combo only) or product sku
              required{" "}
            </li>
            <li>
              Date time format should be "Y-m-d H:i:s" (2020-07-15 17:45:32)
            </li>
            <li>
              Other fields are Invoice No.Customer name, Product Unit, Unit
              Price, Item Tax, Item Discount, Item Description, Order Total
            </li>
          </ul>
        </div>
        <div className="file-container">
          <div className="file">
            <input type="file" id="excelfile" accept=".xls,.xlsx" />
            <label>
              <Icon icon="mdi:file" width="38.5px" height="38.5px" />
              <p>
                Drag and drop your excel file here or{" "}
                <label htmlFor="excelfile" className="browse">
                  Browse
                </label>
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportOpeningStock;
