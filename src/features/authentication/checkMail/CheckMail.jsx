import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Input from "../../../components/ui/input/Input";
import MEPOSLogo from "../../../assets/images/icons/email.png";
import "./checkMail.scss";
import Button from "../../../components/ui/button/Button";
import { useForm } from "react-hook-form";

const CheckMail = () => {
  const [step, setStep] = useState(1);

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
                <h3>Check Your Mail!</h3>
                <h4>We’ve sent you a link to reset your password</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Link to='/'><Button type="submit">Back to Login</Button></Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
