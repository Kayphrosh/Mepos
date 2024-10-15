import React, { useEffect, useState } from "react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import SelectOption from "../../../../components/ui/select/select";
import axios from "../../../../utils/axios";

const BasicInformation = ({
  register,
  errors,
  setValue,
  watch,
  localUser,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  // const barcodeOptions = ["Barcode1", "Barcode2", "Barcode3"];
  const [unitOptions, setUnitOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const warrantyOptions = [
    {
      name: "1 month",
      _id: "1",
    },
    {
      name: "2 months",
      _id: "2",
    },
    {
      name: "3 months",
      _id: "3",
    },
  ];

  useEffect(() => {
    const getUnits = async () => {
      try {
        const response = await axios.get(`/${localUser._id}/products/units`);
        console.log(response.data.data);
        setUnitOptions(response.data.data);
      } catch (error) {
        console.error("Error getting units", error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get(
          `/${localUser._id}/products/categories`
        );
        console.log(response.data.data);
        setCategoryOptions(response.data.data);
      } catch (error) {
        console.error("Error getting units", error);
      }
    };

    getUnits();
    getCategories();
  }, [localUser._id]);
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
      {/* <div>
        <SelectOption
          label="Barcode"
          required={true}
          placeholder="Select Barcode"
          value={watch("barcode")}
          name="barcode"
          // options={barcodeOptions}
          setValue={setValue}
          error={errors.barcode}
          errorMessage="Select a barcode"
          register={register}
        />
      </div> */}
      <div>
        <SelectOption
          label="Unit"
          required={true}
          placeholder="Select product count units"
          value={watch("unit")}
          name="unit"
          options={unitOptions}
          setValue={setValue}
          error={errors.unit}
          errorMessage="Select a unit"
          register={register}
        />
      </div>
      <div>
        <SelectOption
          label="Category"
          required={true}
          placeholder="Select Category"
          value={watch("category")}
          name="category"
          options={categoryOptions}
          setValue={setValue}
          error={errors.category}
          errorMessage="Select a category"
          register={register}
        />
      </div>
      {/* <div>
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
      </div> */}
      <div>
        <SelectOption
          label="Warranty"
          required={true}
          placeholder="Select warranty"
          value={watch("warranty")}
          name="warranty"
          options={warrantyOptions}
          setValue={setValue}
          error={errors.warranty}
          errorMessage="Select a warranty"
          register={register}
        />
      </div>
      {/* <div>
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
      </div> */}
      <div className="cta">
        <button className="cancel" onClick={() => navigate("/product-list")}>
          Cancel
        </button>
        <Button
          type="submit"
          // onClick={() => setActiveTab(2)}
          className="submit-basic-info"
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default BasicInformation;
