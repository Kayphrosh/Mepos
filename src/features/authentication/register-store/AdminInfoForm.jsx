import React from "react";
import Input from "../../../components/ui/input/Input";
import Button from "../../../components/ui/button/Button";

const AdminInfoForm = ({
  register,
  errors,
  getValues,
  showCreatePassword,
  setShowCreatePassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  return (
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
              value === getValues("passwordCreated") || "Passwords don't match",
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
  );
};

export default AdminInfoForm;
