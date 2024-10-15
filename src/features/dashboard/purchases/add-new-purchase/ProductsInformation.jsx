import React from "react";
import { Icon } from "@iconify/react";
import Button from "../../../../components/ui/button/Button";

const ProductsInformation = ({ setActiveTab, register }) => {
  return (
    <div className="product-info">
      <div className="file-container">
        <div className="file">
          <input
            type="file"
            id="excelfile"
            accept=".csv"
            {...register("product")}
          />
          <label>
            <Icon icon="mdi:file" width="38.5px" height="38.5px" />
            <p>
              Drag and drop your excel file here or{" "}
              <label htmlFor="excelfile" className="browse">
                Browse
              </label>
            </p>
          </label>
          <button className="download" type="button">
            <Icon icon="tabler:download" width="20px" height="20px" />
            Download .csv file template
          </button>
        </div>
      </div>
      <div className="cta">
        <button className="cancel" onClick={() => setActiveTab(1)}>
          Cancel
        </button>
        <Button
          type="button"
          onClick={() => setActiveTab(3)}
          className="submit-product-info"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default ProductsInformation;
