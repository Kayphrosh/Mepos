import React from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";

const PricesAndTaxes = ({ register, errors, setActiveTab, savingProduct }) => {
  const formatNumberWithCommas = (value) => {
    if (!value) return '';
    // Remove any existing commas and non-digit characters
    const cleanValue = value.replace(/[^\d.]/g, '');
    // Format the number with commas
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="prices-and-taxes">
      <div>
        <Input
          label="Unit Purchase Price"
          name="unitPurchasePrice"
          required={true}
          type="text"
          placeholder="0.00"
          register={register("unitPurchasePrice", {
            required: "Unit purchase price is required",
            setValueAs: (v) => v.replace(/,/g, ''),
            onChange: (e) => {
              e.target.value = formatNumberWithCommas(e.target.value);
            },
          })}
          error={errors.unitPurchasePrice}
        />
      </div>
      <div>
        <Input
          label="Selling Price"
          name="sellingPrice"
          required={true}
          type="text"
          placeholder="0.00"
          register={register("sellingPrice", {
            required: "Selling Price is required",
            setValueAs: (v) => v.replace(/,/g, ''),
            onChange: (e) => {
              e.target.value = formatNumberWithCommas(e.target.value);
            },
          })}
          error={errors.sellingPrice}
        />
      </div>
      <div>
        <Input
          label="Include Tax"
          name="includeTax"
          type="text"
          placeholder="0.00"
          register={register("includeTax", {
            setValueAs: (v) => v.replace(/,/g, ''),
            onChange: (e) => {
              e.target.value = formatNumberWithCommas(e.target.value);
            },
          })}
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
