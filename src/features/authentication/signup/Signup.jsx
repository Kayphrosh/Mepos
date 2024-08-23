import { useState } from "react";
import Input from "../../../components/ui/input/Input";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import Check from "../../../assets/images/icons/checkmark.svg";
import "./signup.scss";
import Button from "../../../components/ui/button/Button";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      // handle register store logic here
      console.log(data);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="register-store">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <h3>Register Store</h3>
            <div className="progress_container">
              <div className="step">
                <div
                  className={`${
                    step === 1 ? "circle active" : "circle complete"
                  }  `}
                  onClick={() => setStep(1)}
                >
                  {step === 1 ? 1 : <img src={Check} alt="Check" />}
                </div>
              </div>
              <div
                className={`${step === 1 ? "progress" : "progress active"} `}
              ></div>
              <div className="step">
                <div className={`${step === 1 ? "circle" : "circle active"}`}>
                  2
                </div>
              </div>
            </div>
            <div className="progress_desc">
              <span className="active">Admin Info</span>
              <div></div>
              <span className={`${step === 2 && "active"}`}>Store Info</span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    name="FullName"
                    placeholder="Enter Admin Full Name"
                    required={true}
                    register={register("FullName", {
                      required: "Full Name is required",
                      pattern: {
                        value: /^([\w]{3,})+\s+([\w\s]{3,})+$/i,
                        message: "Invalid full name",
                      },
                    })}
                    error={errors.FullName}
                  />
                </div>
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter Admin email address"
                    required={true}
                    register={register("email", {
                      required: "Email Address is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                      },
                    })}
                    error={errors.email}
                  />
                </div>
                <div>
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    required={true}
                    register={register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username should be at least 3 characters",
                      },
                    })}
                    error={errors.username}
                  />
                </div>
                <div>
                  <Input
                    label="Create Password"
                    type={showCreatePassword ? "text" : "password"}
                    name="createPassword"
                    placeholder="************"
                    required={true}
                    register={register("passwordCreated", {
                      required: "Create a password",
                      minLength: {
                        value: 8,
                        message: "Password should be more than 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/,
                        message:
                          "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    })}
                    showCreatePassword={showCreatePassword}
                    setShowCreatePassword={setShowCreatePassword}
                    error={errors.passwordCreated}
                  />
                </div>
                <div>
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="************"
                    required={true}
                    register={register("confirmPassword", {
                      required: "Confirm your password",
                      validate: (value) =>
                        value === getValues("passwordCreated") ||
                        "Passwords don't match",
                    })}
                    error={errors.confirmPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                </div>
                <div>
                  <Input
                    label="Mobile Number"
                    type="tel"
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    register={register("mobileNumber")}
                  />
                </div>
                <Button type="submit">Save and Continue</Button>
              </div>
            )}
            {step === 2 && (
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
            )}
          </form>
        </div>
        <div className="home-image"></div>
      </div>
    </div>
  );
};

export default Signup;
