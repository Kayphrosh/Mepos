import React from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";

const SupplierInformation = ({ errors, register }) => {
  return (
    <div className="supplier-info">
      <div>
        <Input
          label="Company Name"
          type="text"
          name="companyName"
          placeholder="Production company name"
          required={true}
          register={register("companyName", {
            required: "Company Name is required",
          })}
          error={errors.companyName}
        />
      </div>
      <div>
        <Input
          label="Distributor (if applicable)"
          type="text"
          name="distributorCompanyName"
          placeholder="Distribution company name"
          register={register("distributionCompanyName")}
        />
      </div>
      <div>
        <Input
          label="Supplier Name"
          type="text"
          name="supplierName"
          placeholder="Main supplier name"
          required={true}
          register={register("supplierName", {
            required: "Supplier Name is required",
          })}
          error={errors.supplierName}
        />
      </div>
      <div>
        <Input
          label="Contact Information"
          type="text"
          name="contactInformation"
          placeholder="Email Address or phone number"
          required={true}
          register={register("contactInformation", {
            required: "Company Name is required",
          })}
          error={errors.contactInformation}
        />
      </div>
      <div className="cta">
        <button className="cancel">Cancel</button>
        <Button type="submit" className="submit-supplier-info">
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default SupplierInformation;
