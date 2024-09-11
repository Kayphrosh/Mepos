import React from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

const BasicInformation = ({ register, errors }) => {
  const navigate = useNavigate();
  return (
    <div className="basic-info">
      <div>
        <Input
          label="Product Name"
          type="text"
          name="productName"
          placeholder="Name"
          required={true}
          register={register("productName", {
            required: "Product Name is required",
          })}
          error={errors.productName}
        />
      </div>
      <div>
        <Input
          label="SKU"
          type="text"
          name="sku"
          placeholder="SKU"
          required={true}
          register={register("sku", {
            required: "SKU is required",
          })}
          error={errors.sku}
        />
      </div>
      <div>
        <Input
          label="Rack Number"
          type="number"
          name="rackNumber"
          placeholder="Rack number"
          required={true}
          register={register("rackNumber", {
            required: "Rack Number is required",
          })}
          error={errors.rackNumber}
        />
      </div>
      <div>
        <Input
          label="Alert Quantity"
          type="text"
          name="alertNumber"
          placeholder="Alert Quantity"
          required={true}
          register={register("alertQuantity", {
            required: "Alert Quantity is required",
          })}
          error={errors.alertQuantity}
        />
      </div>
      <div className="cta">
        <button className="cancel" onClick={() => navigate("/product-list")}>
          Cancel
        </button>
        <Button type="submit" className="submit-basic-info">
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default BasicInformation;
