import React from "react";
import "./input.scss";
import Eye from "../../../assets/images/icons/eye.svg";
import EyeClosed from "../../../assets/images/icons/eye-slash.svg";
import Naira from "../../../assets/images/icons/naira.svg";
import { usePasswordToggle } from "../../../utils/usePasswordToggle";

const Input = ({
  name,
  label,
  type,
  placeholder,
  required,
  register,
  error,
  value,
  onChange,
  maxLength,
  // showCreatePassword,
  // setShowCreatePassword,
  // showConfirmPassword,
  // setShowConfirmPassword,
  // showNewPassword,
  // setShowNewPassword,
  // showConfirmNewPassword,
  // setShowConfirmNewPassword,
}) => {
  const [showPassword, togglePasswordVisibility] = usePasswordToggle();

  const renderPasswordToggleIcon = () => (
    <img
      src={showPassword ? EyeClosed : Eye}
      width={20}
      height={20}
      alt="See password"
      onClick={togglePasswordVisibility}
    />
  );

  return (
    <div className="form_input">
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      <div>
        <input
          maxLength={maxLength}
          type={name.includes("Password") && showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          {...register}
          value={value}
          className={`${error && "error"}`}
        />
        {name.includes("Password") && renderPasswordToggleIcon()}
        {(name === "unitPurchasePrice" ||
          name === "sellingPrice" ||
          name === "includeTax" ||
          name === "purchaseAmount") && (
          <div className="currency">
            <img src={Naira} alt="" />
          </div>
        )}
      </div>
      {error && <p>{error.message}</p>}
      {name === "rackNumber" && (
        <span className="rack_number">
          Products of the same category have the same rack number
        </span>
      )}
    </div>
  );
};

export default Input;
