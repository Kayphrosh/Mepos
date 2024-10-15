import React, { useState } from "react";
import "./add-new-product.scss";
import BasicInformation from "./basic-information";
import SupplierInformation from "./supplier-information";
import PricesAndTaxes from "./prices-and-taxes";
import { useForm } from "react-hook-form";
import axios from "../../../../utils/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewProduct = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storeId = localUser.store._id;
  const [savingProduct, setSavingProduct] = useState(false);
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
    setValue,
    watch,
    reset,
  } = useForm({ mode: "onTouched" });

  const onsubmit = async (formData) => {
    const productsData = {
      name: formData.productName,
      sku: formData.sku,
      unit: formData.unit,
      category: formData.category,
      warranty: formData.warranty,
      companyName: formData.companyName,
      supplierName: formData.supplierName,
      contactInformation: formData.contactInformation,
      unitPurchasePrice: formData.unitPurchasePrice,
      sellingPrice: formData.sellingPrice,
    };
    console.log(productsData);
    setSavingProduct(true);
    try {
      const response = await axios.post(`/${storeId}/products/`, productsData);
      console.log(response);
      if (response.status === 201) {
        console.log(response.data.data);
        toast.success('Product added successfully!');
        setActiveTab(1);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding product. Please try again.');
    } finally {
      setSavingProduct(false);
    }
  };

  return (
    <div className="add-product-container">
      <ToastContainer />
      <h3>Add New Product</h3>
      <div className="tab_heading">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id && "active"}`}
            // onClick={() => setActiveTab(tab.id)}
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
            localUser={localUser}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 2 && (
          <SupplierInformation
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 3 && (
          <PricesAndTaxes
            register={register}
            errors={errors}
            setActiveTab={setActiveTab}
            savingProduct={savingProduct}
          />
        )}
      </form>
    </div>
  );
};

export default AddNewProduct;
