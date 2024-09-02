import React from 'react'
import "../add-new-user/add-new-user.scss"
import './add-new-role.scss'
import Input from '../../../components/ui/input/Input';
const BasicInformation = ({handleNext}) => {
  return (
    <div className="form-container">
      <Input
        type="text"
        label="Role Name"
        placeholder="e.g: Cashier"
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
}

export default BasicInformation