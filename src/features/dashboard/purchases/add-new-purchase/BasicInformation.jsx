import React from "react";
import SelectOption from "../../../../components/ui/select/select";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

const BasicInformation = ({
  register,
  errors,
  setValue,
  watch,
  localUser,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  const purchaseStatusOptions = [
    {
      name: "Delivered",
      _id: "1",
    },
    {
      name: "Pending",
      _id: "2",
    },
  ];

  const supplierOptions = [
    {
      name: "Ali Express",
      _id: "1",
    },
    {
      name: "Jumia",
      _id: "2",
    },
    {
      name: "Zendrop",
      _id: "3",
    },
  ];
  return (
    <div className="basic-info">
      <div>
        <SelectOption
          label="Supplier"
          required={true}
          placeholder="Name"
          value={watch("supplier")}
          name="supplier"
          options={supplierOptions}
          setValue={setValue}
          error={errors.supplier}
          errorMessage="Select a supplier"
          register={register}
        />
      </div>
      <div>
        <Input
          label="Reference No"
          type="text"
          name="referenceNo"
          placeholder="ABCD1234"
          required={true}
          register={register("referenceNo", {
            required: "Reference Number is required",
          })}
          error={errors.referenceNo}
        />
      </div>
      <div>
        <Input
          label="Purchase Date"
          type="date"
          name="purchaseDate"
          placeholder="ABCD1234"
          required={true}
          register={register("purchaseDate", {
            required: "Purchase Date is required",
          })}
          error={errors.purchaseDate}
        />
      </div>
      <div>
        <SelectOption
          label="Purchase Status"
          required={true}
          placeholder="Select status"
          value={watch("purchaseStatus")}
          name="purchaseStatus"
          options={purchaseStatusOptions}
          setValue={setValue}
          error={errors.purchaseStatus}
          errorMessage="Select a purchaseStatus"
          register={register}
        />
      </div>
      <div className="cta">
        <button className="cancel" onClick={() => navigate("/purchases-list")}>
          Cancel
        </button>
        <Button
          type="button"
          onClick={() => setActiveTab(2)}
          className="submit-basic-info"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default BasicInformation;
