import React, { useState } from "react";
import "./add-new-user.scss";
import Input from "../../../components/ui/input/Input";
import { useForm } from "react-hook-form";

const RolesAndPermission = ({ formData, handleInputChange, handleNext }) => {
  const [allowLogin, setAllowLogin] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  return (
    <div className="form-container">
      <div className="permission-input">
        <input
          type="checkbox"
          id="allow-login"
          checked={allowLogin}
          onChange={() => setAllowLogin(!allowLogin)}
        />
        <label htmlFor="allowLogin">Allow user to login?</label>
      </div>

      {allowLogin && (
        <>
          <Input
            type="text"
            label="User Name"
            name="userName"
            placeholder="User Name"
            required={true}
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />

          <Input
            label="Create Password"
            type="password"
            name="createPassword"
            placeholder="************"
            required={true}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </>
      )}

      <div className="form-input">
        <label htmlFor="role">Role</label>
        <select
          value={formData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
          required={true}
        >
          <option value="">Select Role</option>
          <option value="66ded5bed44ac40ea384c3ee">Receptionist</option>
          <option value="66ded5bed44ac40ea384c3ff">Manager</option>
          <option value="66ded5bed44ac40ea384c3gg">Cashier</option>
        </select>
      </div>

      <div className="form-cta">
        <div>Cancel</div>
        <div id="save" onClick={handleNext}>
          Save and Continue
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermission;
