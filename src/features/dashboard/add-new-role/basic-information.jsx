import React from 'react';
import '../add-new-user/add-new-user.scss';
import './add-new-role.scss';
import Input from '../../../components/ui/input/Input';

const BasicInformation = ({ handleNext, updateRoleData, roleData }) => {
  const handleInputChange = (e) => {
    updateRoleData({ name: e.target.value }); // Update the role name in the state
  };

  return (
    <div className="form-container">
      <Input
        type="text"
        name="roleName" // Give the input a name
        label="Role Name"
        placeholder="e.g: Cashier"
        required={true}
        value={roleData.name} // Control the input value
        onChange={handleInputChange} // Handle changes
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
