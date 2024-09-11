import React, { useState } from "react";
import "./add-new-product.scss";
import BasicInformation from "./basic-information";
import SupplierInformation from "./supplier-information";
import PricesAndTaxes from "./prices-and-taxes";
import { useForm } from "react-hook-form";

const AddNewProduct = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Supplier Information" },
    { id: 3, title: "Prices and Taxes" },
  ];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    if (activeTab === 1) {
      setActiveTab(2);
    } else if (activeTab === 2) {
      setActiveTab(3);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
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

      <form onSubmit={handleSubmit(onSubmit)} className="content">
        {activeTab === 1 && (
          <BasicInformation register={register} errors={errors} />
        )}
        {activeTab === 2 && (
          <SupplierInformation register={register} errors={errors} />
        )}
        {activeTab === 3 && <PricesAndTaxes />}
      </form>
    </div>
  );
};

export default AddNewProduct;
