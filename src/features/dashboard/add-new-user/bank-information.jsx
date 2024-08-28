import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './add-new-user.scss';
import Input from '../../../components/ui/input/Input';

const BankInformation = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    // Show success notification
    toast.success('User created successfully!');

    // Redirect to the /user page after a short delay
    setTimeout(() => {
      navigate('/users');
    }, 2000);
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <Input
        type="number"
        label="Account Number"
        placeholder="Account Number"
        required={true}
      />

      <div className="form-input">
        <label htmlFor="Bank Name">Bank Name</label>
        <select placeholder="Actions">
          <option>GTB</option>
          <option>First Bank</option>
          <option>Kuda</option>
          <option>UBA</option>
          <option>Opay</option>
        </select>
      </div>

      <Input
        type="text"
        label="Account Holder Name"
        placeholder="Account Holder Name"
        required={true}
      />

      <Input
        type="number"
        label="Bank Identifier Code "
        placeholder="Enter Bank Identifier Code "
        required={true}
      />

      <div className="form-cta">
        <div id="cancel">Cancel</div>
        <div id="save" onClick={handleCreate}>
          Create
        </div>
      </div>
    </div>
  );
};

export default BankInformation;
