import React from "react";
import "./input.scss";
import Eye from "../../../assets/images/icons/eye.svg";
import EyeClosed from "../../../assets/images/icons/eye-slash.svg";

const Input = ({
  name,
  label,
  type,
  placeholder,
  required,
  register,
  error,
  showCreatePassword,
  setShowCreatePassword,
  showConfirmPassword,
  setShowConfirmPassword,
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
          {...register}
          className={`${error && "error"}`}
        />
        {name === "createPassword" && (
          <img
            src={showCreatePassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => setShowCreatePassword(!showCreatePassword)}
          />
        )}
        {name === "confirmPassword" && (
          <img
            src={showConfirmPassword ? EyeClosed : Eye}
            width={20}
            height={20}
            alt="See password"
            onClick={() => !setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Input;