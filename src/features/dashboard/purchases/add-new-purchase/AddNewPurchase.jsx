import React, { useState } from "react";
import "./AddNewPurchase.scss";
import BasicInformation from "./BasicInformation";
import { useForm } from "react-hook-form";
import ProductsInformation from "./ProductsInformation";
import PaymentInformation from "./PaymentInformation";

const AddNewPurchase = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Products Information" },
    { id: 3, title: "Payment Information" },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({ mode: "onTouched" });

  return (
    <div className="add-purchase-container">
      <h3>Add New Purchase</h3>
      <div className="tab_heading">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id && "active"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onsubmit)} className="content">
        {activeTab === 1 && (
          <BasicInformation
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            // localUser={localUser}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 2 && (
          <ProductsInformation
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 3 && (
          <PaymentInformation
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            setActiveTab={setActiveTab}
          />
        )}
      </form>
    </div>
  );
};

export default AddNewPurchase;
