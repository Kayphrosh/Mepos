import React from "react";
import Input from "../../../components/ui/input/Input";
import Button from "../../../components/ui/button/Button";

const StoreInfoForm = ({ register, errors }) => {
  return (
    <div className="">
      <div>
        <Input
          label="Store Name"
          type="text"
          name="storeName"
          placeholder="Enter store name"
          required={true}
          register={register("storeName", {
            required: "Store Name is required",
            minLength: {
              value: 3,
              message: "Store name should be at least 3 characters.",
            },
          })}
          error={errors.storeName}
        />
      </div>
      <div>
        <Input
          label="Location"
          type="text"
          name="location"
          placeholder="City, Country"
          required={true}
          register={register("location", {
            required: "Location is required",
          })}
          error={errors.location}
        />
      </div>
      <Button type="submit">Register Store</Button>
    </div>
  );
};

export default StoreInfoForm;
