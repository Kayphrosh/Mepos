import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/input/Input';
import MEPOSLogo from '../../../assets/images/icons/MEPOS logo.svg';
import './login.scss';
import Button from '../../../components/ui/button/Button';
import { useForm } from 'react-hook-form';
import axios from '../../../utils/axios';

const Login = () => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (errors.username || errors.passwordCreated) {
      return; // Handle validation errors
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await axios.post(
        '/users/login',
        {
          username: data.username,
          password: data.passwordCreated,
        },
      );


      const { token, user } = response.data;

      localStorage.setItem('token', token);

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setApiError(
        error.response?.data?.message ||
          'An error occurred. Please try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <div className="text">
              <h3>Welcome back!</h3>
              <h4>
                Login to your account with your registered username and password
              </h4>
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
                  label="Password"
                  type={showCreatePassword ? 'text' : 'password'}
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
                  showCreatePassword={showCreatePassword}
                  setShowCreatePassword={setShowCreatePassword}
                  error={errors.passwordCreated}
                />
              </div>
              <div className="forgot">
                <Link to="/forgot-password">
                  <p>Forgot your password?</p>
                </Link>
              </div>
              {apiError && <div className="error-message">{apiError}</div>}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
