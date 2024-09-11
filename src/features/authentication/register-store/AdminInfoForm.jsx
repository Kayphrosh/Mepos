import React from 'react';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';

const AdminInfoForm = ({
  register,
  errors,
  getValues,
  showCreatePassword,
  setShowCreatePassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setStep,
}) => {
  return (
    <div>
      <div>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter first name"
          required={true}
          register={register('firstName', {
            required: 'First name is required',
          })}
          error={errors.firstName}
        />
      </div>
      <div>
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter last name"
          required={true}
          register={register('lastName', { required: 'Last name is required' })}
          error={errors.lastName}
        />
      </div>
      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter Admin email address"
          required={true}
          register={register('email', {
            required: 'Email Address is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email address',
            },
          })}
          error={errors.email}
        />
      </div>
      <div>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter Username"
          required={true}
          register={register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters',
            },
          })}
          error={errors.username}
        />
      </div>
      <div>
        <Input
          label="Create Password"
          type={showCreatePassword ? 'text' : 'password'}
          name="createPassword"
          placeholder="************"
          required={true}
          register={register('passwordCreated', {
            required: 'Create a password',
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
          showCreatePassword={showCreatePassword}
          setShowCreatePassword={setShowCreatePassword}
          error={errors.passwordCreated}
        />
      </div>
      <div>
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="************"
          required={true}
          register={register('confirmPassword', {
            required: 'Confirm your password',
            validate: (value) =>
              value === getValues('passwordCreated') || "Passwords don't match",
          })}
          error={errors.confirmPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      </div>
      <div>
        <Input
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          placeholder="Enter mobile number"
          register={register('mobileNumber')}
        />
      </div>
      <div>
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          required={true}
          register={register('dateOfBirth', {
            required: 'Date of Birth is required',
          })}
          error={errors.dateOfBirth}
        />
      </div>

      <div>
        <Input
          label="NIN Number"
          type="text"
          name="ninNumber"
          placeholder="Enter NIN number"
          required={true}
          register={register('ninNumber', {
            required: 'NIN Number is required',
          })}
          error={errors.ninNumber}
        />
      </div>

      <div>
        <label>Gender</label>
        <select
          name="gender"
          {...register('gender', { required: 'Gender is required' })}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label>Relationship Status</label>
        <select
          name="relationshipStatus"
          {...register('relationshipStatus', {
            required: 'Relationship Status is required',
          })}
        >
          <option value="single">single</option>
          <option value="married">married</option>
        </select>
        {errors.relationshipStatus && (
          <p>{errors.relationshipStatus.message}</p>
        )}
      </div>

      <Button type="button" onClick={() => setStep(2)}>
        Next
      </Button>
    </div>
  );
};

export default AdminInfoForm;
