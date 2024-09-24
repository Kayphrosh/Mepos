import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import Check from "../../../assets/images/icons/checkmark.svg";
import RegisterScreenImage from "../../../assets/images/register-store.svg";
import "./register-store.scss";
import { useForm } from "react-hook-form";
import AdminInfoForm from "./AdminInfoForm";
import StoreInfoForm from "./StoreInfoForm";
import axios from "../../../utils/axios";

const RegisterStore = () => {
  const [step, setStep] = useState(1);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const requestData = {
      location: formData.location,
      name: formData.storeName,
      owner: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.passwordCreated,
        phoneNumber: formData.mobileNumber,
        dateOfBirth: formData.dateOfBirth,
        ninNumber: formData.ninNumber,
        gender: formData.gender,
        relationshipStatus: formData.relationshipStatus,
      },
    };

    console.log(requestData);
    setLoading(true);
    try {
      const response = await axios.post("/stores", requestData);
      if (response.status === 201) {
        console.log("response data", response.data.data);
        const storeId = response.data.data.store._id;
        console.log("Store created successfully");
        setSuccess("Store created successfully");
        navigate(`/${storeId}/auth`);
      } else {
        console.log("Unexpected response:", response);
        setError("An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error creating store:", error);
      setError("An error occurred while creating the store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="super-admin">
      <div className="container">
        <div className="register-store">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <h3>Register Store</h3>
            <div className="progress_container">
              <div className="step">
                <div
                  className={step === 1 ? "circle active" : "circle complete"}
                >
                  {step === 1 ? 1 : <img src={Check} alt="Check" />}
                </div>
              </div>
              <div
                className={step === 1 ? "progress" : "progress active"}
              ></div>
              <div className="step">
                <div className={step === 1 ? "circle" : "circle active"}>2</div>
              </div>
            </div>
            <div className="progress_desc">
              <span className="active">Admin Info</span>
              <div></div>
              <span className={step === 2 ? "active" : ""}>Store Info</span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <AdminInfoForm
                showCreatePassword={showCreatePassword}
                setShowCreatePassword={setShowCreatePassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                register={register}
                errors={errors}
                getValues={getValues}
                setStep={setStep}
              />
            )}
            {step === 2 && (
              <StoreInfoForm register={register} errors={errors} />
            )}
          </form>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <div className="home-image">
          <img src={RegisterScreenImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;
