import React from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";

const PricesAndTaxes = ({ register, errors, setActiveTab, savingProduct }) => {
  return (
    <div className="prices-and-taxes">
      <div>
        <Input
          label="Unit Purchase Price"
          name="unitPurchasePrice"
          required={true}
          type="number"
          placeholder="0.00"
          register={register("unitPurchasePrice", {
            required: "Unit purchase price is required",
          })}
          error={errors.unitPurchasePrice}
        />
      </div>
      <div>
        <Input
          label="Selling Price"
          name="sellingPrice"
          required={true}
          type="number"
          placeholder="0.00"
          register={register("sellingPrice", {
            required: "Selling Price is required",
          })}
          error={errors.sellingPrice}
        />
      </div>
      <div>
        <Input
          label="Include Tax"
          name="includeTax"
          type="number"
          placeholder="0.00"
          register={register("includeTax")}
        />
      </div>
      <div className="cta">
        <button className="cancel" onClick={() => setActiveTab(2)}>
          Cancel
        </button>
        <Button type="submit" className="submit-prices-and-taxes">
          {savingProduct ? "Saving..." : "Save and Continue"}
        </Button>
      </div>
    </div>
  );
};

export default PricesAndTaxes;
