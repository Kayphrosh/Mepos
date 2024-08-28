import React from 'react';
import './add-new-user.scss';
import Input from '../../../components/ui/input/Input';
const MoreInformation = ({ handleNext }) => {
  return (
    <div className="form-container">
      <Input
        type="date"
        label="Date of Birth"
        placeholder="Date of Birth"
        register={true}
      />
      <Input
        type="phone"
        label="Mobile Number"
        placeholder="+234"
        register={true}
      />

      <Input
        type="text"
        label="Next-of-kin Contact Number "
        placeholder="Enter full name"
      />
      <Input
        type="text"
        label="NIN Slip Number"
        placeholder="Enter NIN Slip Number"
        required={true}
      />
      <Input
        type="text"
        label="Permanent Address "
        placeholder="Enter Permanent Address "
        required={true}
      />
      <Input
        type="text"
        label="Current Address "
        placeholder="Enter Current Address "
        required={true}
      />
      <Input
        type="text"
        label="Social Media"
        placeholder="Enter social media link"
        required={true}
      />

      <div className="form-cta">
        <div>Cancel</div>
        <div id="save" onClick={handleNext}>Save and Continue</div>
      </div>
    </div>
  );
};

export default MoreInformation;
