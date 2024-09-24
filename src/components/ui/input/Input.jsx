import React from "react";
import "./input.scss";
import Eye from "../../../assets/images/icons/eye.svg";
import EyeClosed from "../../../assets/images/icons/eye-slash.svg";
import Naira from "../../../assets/images/icons/naira.svg";

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
  showCreatePassword,
  setShowCreatePassword,
  showConfirmPassword,
  setShowConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmNewPassword,
  setShowConfirmNewPassword,
}) => {
  return (
    <div className="form_input">
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          {...register}
          value={value}
          className={`${error && 'error'}`}
        />
        {name === 'createPassword' && (
          <img
            src={showCreatePassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => setShowCreatePassword(!showCreatePassword)}
          />
        )}
        {name === 'confirmPassword' && (
          <img
            src={showConfirmPassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => !setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
        {name === 'newPassword' && (
          <img
            src={showNewPassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => !setShowNewPassword(!showNewPassword)}
          />
        )}
        {name === 'confirmNewPassword' && (
          <img
            src={showConfirmNewPassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => !setShowConfirmNewPassword(!showConfirmNewPassword)}
          />
        )}
        {(name === "unitPurchasePrice" ||
          name === "sellingPrice" ||
          name === "includeTax") && (
          <div className="currency">
            <img src={Naira} alt="" />
          </div>
        )}
      </div>
      {error && <p>{error.message}</p>}
      {name === 'rackNumber' && (
        <span className="rack_number">
          Products of the same category have the same rack number
        </span>
      )}
    </div>
  );
};

export default Input;
