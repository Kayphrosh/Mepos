import React from 'react';
import './add-new-user.scss';
import Input from '../../../components/ui/input/Input';

const BasicInformation = ({ handleNext }) => {
  return (
    <div className="form-container">
      <div className="form-input">
        <label htmlFor="Gender">Gender</label>
        <select placeholder="Actions">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-input">
        <label htmlFor="Prefix">Prefix</label>
        <select placeholder="Actions">
          <option>Mr</option>
          <option>Mrs</option>
          <option>Ms</option>
        </select>
      </div>
      <Input
        type="text"
        label="First Name"
        placeholder="First Name"
        required={true}
      />
      <Input
        type="text"
        label="Last Name"
        placeholder="Last Name"
        required={true}
      />
      <Input
        type="text"
        label="Email"
        placeholder="Enter user email"
        required={true}
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
