import React from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";
import SelectOption from "../../../../components/ui/select/select";

const SupplierInformation = ({
  errors,
  register,
  watch,
  setValue,
  setActiveTab,
}) => {
  return (
    <div className="supplier-info">
      {/* <div>
        <SelectOption
          label="Brand"
          required={true}
          placeholder="Select brand"
          value={watch("brand")}
          name="brand"
          // options={brandOptions}
          setValue={setValue}
          error={errors.brand}
          errorMessage="Select a brand"
          register={register}
        />
      </div> */}
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
        <button className="cancel" onClick={() => setActiveTab(1)}>
          Cancel
        </button>
        <Button
          type="submit"
          onClick={() => setActiveTab(3)}
          className="submit-supplier-info"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default SupplierInformation;
