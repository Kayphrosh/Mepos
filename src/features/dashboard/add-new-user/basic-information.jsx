import React from "react";
import "./add-new-user.scss";
import Input from "../../../components/ui/input/Input";

const BasicInformation = ({ formData, handleInputChange, handleNext }) => {
  return (
    <div className="form-container">
      <div className="form-input">
        <label htmlFor="Gender">Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <Input
        type="text"
        label="First Name"
        name="firstName"
        placeholder="First Name"
        required={true}
        value={formData.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />
      <Input
        type="text"
        label="Last Name"
        name="lastName"
        placeholder="Last Name"
        required={true}
        value={formData.lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        placeholder="Enter user email"
        required={true}
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />

      <div className="form-cta">
        <div>Cancel</div>
        <div id="save" onClick={handleNext}>
          Save and Continue
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
