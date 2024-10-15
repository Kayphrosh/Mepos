import React, { useState } from "react";
import "./AddNewPurchase.scss";
import BasicInformation from "./BasicInformation";
import { useForm } from "react-hook-form";
import ProductsInformation from "./ProductsInformation";
import PaymentInformation from "./PaymentInformation";
import { toast } from "react-toastify";
import axios from "../../../../utils/axios";

const AddNewPurchase = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storeId = localUser.store._id;
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

  // const onsubmit = async (formData) => {
  //   const purchaseData = {
  //     supplier: formData.supplier,
  //     referenceNo: formData.referenceNo,
  //     purchaseDate: formData.purchaseDate,
  //     purchaseStatus: formData.purchaseStatus,
  //     purchaseAmount: formData.purchaseAmount,
  //     paymentAmount: formData.paymentAccount,
  //     paymentDate: formData.paymentDate,
  //     paymentMethod: formData.paymentMethod,
  //     note: formData.note,
  //     productFile: formData.product[0],
  //   };
  //   console.log(purchaseData);

  //   try {
  //     const response = await axios.post(`/${storeId}/purchase`, purchaseData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log(response);
  //     if (response.status === 201) {
  //       console.log(response.data.data);
  //       toast.success("Purchase data stored successfully!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message);
  //   } finally {
  //     setActiveTab(1);
  //     reset();
  //   }
  // };

  const onsubmit = async (formData) => {
    try {
      // Prepare FormData to handle both text and file input
      const purchaseData = new FormData();
      purchaseData.append("supplier", formData.supplier);
      purchaseData.append("referenceNo", formData.referenceNo);
      purchaseData.append("purchaseDate", formData.purchaseDate);
      purchaseData.append("purchaseStatus", formData.purchaseStatus);
      purchaseData.append("purchaseAmount", formData.purchaseAmount);
      purchaseData.append("paymentAmount", formData.paymentAccount);
      purchaseData.append("paymentDate", formData.paymentDate);
      purchaseData.append("paymentMethod", formData.paymentMethod);
      purchaseData.append("note", formData.note);

      // Append the first file from the product array
      if (formData.product && formData.product[0]) {
        purchaseData.append("productFile", formData.product[0]);
      }

      console.log("Purchase Data:", purchaseData);

      // Make the API call
      const response = await axios.post(`/${storeId}/purchase`, purchaseData, {
        headers: {
          "Content-Type": "multipart/form-data", // Optional: Axios will set this automatically
        },
      });

      console.log("Response:", response);

      // Handle success response
      if (response.status === 201) {
        console.log("Stored Data:", response.data.data);
        toast.success("Purchase data stored successfully!");
      }
    } catch (error) {
      // Handle and log the error
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      // Reset the form and switch tabs
      setActiveTab(1);
      reset();
      console.log("Form reset and tab switched");
    }
  };

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
