import React, { useState } from "react";
import "./add-new-user.scss";
import Input from "../../../components/ui/input/Input";
import { useForm } from "react-hook-form";

const RolesAndPermission = ({
  formData,
  handleInputChange,
  handleNext,
  rolesData,
  loadingRoles,
  error,
}) => {
  const [allowLogin, setAllowLogin] = useState(false);
const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  console.log('RolesAndPermission props:', { rolesData, loadingRoles, error }); // Add this line for debugging


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
            type={showPassword ? 'text' : 'password'}
            label="Create Password"
            placeholder="************"
            required={true}
            name="createPassword"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </>
      )}

      <div className="form-input">
        <label htmlFor="role">Role</label>
        {loadingRoles ? (
          <p>Loading roles...</p>
        ) : error ? (
          <p>Error loading roles: {error}</p>
        ) : Array.isArray(rolesData) && rolesData.length > 0 ? (
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            required={true}
          >
            <option value="">Select Role</option>
            {rolesData.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No roles available. Please contact an administrator.</p>
        )}
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
