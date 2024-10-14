import React from "react";
import "./add-new-user.scss";
import Input from "../../../components/ui/input/Input";
const MoreInformation = ({ formData, handleInputChange, handleNext }) => {
  return (
    <div className="form-container">
      <Input
        type="date"
        label="Date of Birth"
        name="dateOfBirth"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
      />

      <div className="form-input">
        <label htmlFor="RelationshipStatus">Relationship Status</label>
        <select
          value={formData.relationshipStatus}
          onChange={(e) =>
            handleInputChange("relationshipStatus", e.target.value)
          }
        >
          <option value="">Select Relationship Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="in_relationship">In a Relationship</option>
        </select>
      </div>
      <Input
        type="tel"
        label="Mobile Number"
        name="mobileNumber"
        placeholder="+234"
        value={formData.phoneNumber}
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
      />
      <Input
        type="text"
        label="NIN Slip Number"
        name="NIN"
        placeholder="Enter NIN Slip Number"
        required={true}
        value={formData.ninNumber}
        onChange={(e) => handleInputChange("ninNumber", e.target.value)}
      />

      <div className="form-cta">
        <div>Cancel</div>
        <div id="save" onClick={handleNext}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default MoreInformation;
