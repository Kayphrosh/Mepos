import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Input from "../../../components/ui/input/Input";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import "./login.scss";
import Button from "../../../components/ui/button/Button";
import { useForm } from "react-hook-form";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Validate the form data
    if (errors.username || errors.passwordCreated) {
      return; // Handle validation errors
    }

    // Simulate backend validation and authentication
    if (data.username === 'validUser' && data.passwordCreated === 'validPassword') {
      // Handle successful login
      navigate('/home'); // Navigate to the "Home" page
    } else {
      // Handle failed login
      alert('Invalid username or password');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="register-store">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <div className='text'>
                <h3>Welcome back!</h3>
                <h4>Login to your account with your registered username and password</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  required={true}
                  register={register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username should be at least 3 characters",
                    },
                  })}
                  error={errors.username}
                />
              </div>
              <div>
                <Input
                  label="Create Password"
                  type={showCreatePassword ? "text" : "password"}
                  name="createPassword"
                  placeholder="************"
                  required={true}
                  register={register("passwordCreated", {
                    required: "Enter your password",
                    minLength: {
                      value: 8,
                      message: "Password should be more than 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/,
                      message:
                        "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  })}
                  showCreatePassword={showCreatePassword}
                  setShowCreatePassword={setShowCreatePassword}
                  error={errors.passwordCreated}
                />
              </div>
              <div className='forgot' >
                <Link to="/forgot-password"><p>Forgot your password?</p></Link>
              </div>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;