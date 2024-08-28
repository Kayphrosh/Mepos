import React, { useState } from 'react';
import './add-new-user.scss';
import Input from '../../../components/ui/input/Input';
import { useForm } from 'react-hook-form';

const RolesAndPermission = ({ handleNext }) => {
  const [allowLogin, setAllowLogin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

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
            placeholder="User Name"
            required={true}
          />

          <Input
            label="Create Password"
            type="password"
            name="createPassword"
            placeholder="************"
            required={true}
            register={register('passwordCreated', {
              required: 'Enter your password',
              minLength: {
                value: 8,
                message: 'Password should be more than 8 characters',
              },
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/,
                message:
                  'Password should contain at least one uppercase letter, one lowercase letter, one number and one special character',
              },
            })}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="************"
            required={true}
            register={register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) =>
                value === watch('passwordCreated') || 'Passwords do not match',
            })}
          />
        </>
      )}

      <div className="form-input">
        <label htmlFor="role">Role</label>
        <select placeholder="Actions" required={true}>
          <option>Receptionist</option>
          <option>Manager</option>
          <option>Cashier</option>
        </select>
      </div>

      <div className="form-input">
        <label htmlFor="accessLocation">Access Store Locations</label>
        <select placeholder="Actions">
          <option>Abuja</option>
          <option>Lagos</option>
          <option>Ibadan</option>
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
