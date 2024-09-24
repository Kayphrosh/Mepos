import React, { useEffect, useState } from "react";
import "./select.scss";
import { Icon } from "@iconify/react";

const SelectOption = ({
  label,
  name,
  required,
  value,
  setValue,
  error,
  options,
  register,
  errorMessage,
  placeholder,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    register(name, { required });
  }, [name, register, required]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedName(option.name);
    setSelectedId(option._id);
    setShowDropdown(false);
    setValue(name, option._id, { shouldValidate: true });
  };

  return (
    <div className={`custom-select ${error ? "error" : ""}`}>
      <label htmlFor={name} className="select-label">
        {label} {required && <span>*</span>}
      </label>
      <div className="select-box" onClick={toggleDropdown}>
        <div className="select-input">
          {selectedName || placeholder}
          {showDropdown ? (
            <Icon
              icon="tabler:chevron-up"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          ) : (
            <Icon
              icon="tabler:chevron-down"
              width="24px"
              height="24px"
              color="#3C3B39"
            />
          )}
        </div>
      </div>
      <div className="dropdown-container">
        {showDropdown && (
          <div className="dropdown">
            {options?.map((option) => (
              <div
                key={option._id}
                className={`dropdown-item ${
                  value === option.name ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="error-message">{error.message || errorMessage}</p>
      )}
      {name === "brand" && <p className="add-brand">Add new brand</p>}
    </div>
  );
};

export default SelectOption;
