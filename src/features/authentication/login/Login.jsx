import { React, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Input from '../../../components/ui/input/Input';
import MEPOSLogo from '../../../assets/images/icons/MEPOS logo.svg';
import './login.scss';
import Button from '../../../components/ui/button/Button';
import { useForm } from 'react-hook-form';
import POS from '../../../assets/images/POS.svg';
import axios from '../../../utils/axios';

const Login = () => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { storeId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (errors.email || errors.passwordCreated) {
      return; // Handle validation errors
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await axios.post(`${storeId}/users/login`, {
        email: data.email,
        password: data.enterPassword,
      });

      console.log('data', response.data);

      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
            // localStorage.setItem('storeId', user.store);

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
    <div className="login-auth">
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
                  label="Email"
                  type="text"
                  name="Email"
                  placeholder="Enter Username"
                  required={true}
                  register={register('email', {
                    required: 'Email is required',
                    minLength: {
                      value: 3,
                      message: 'Username should be at least 3 characters',
                    },
                  })}
                  error={errors.email}
                />
              </div>
              <div>
                <Input
                  label="Create Password"
                  type={showCreatePassword ? 'text' : 'password'}
                  name="enterPassword"
                  placeholder="************"
                  required={true}
                  register={register('enterPassword', {
                    required: 'Enter your password',
                  })}
                  showCreatePassword={showCreatePassword}
                  setShowCreatePassword={setShowCreatePassword}
                  error={errors.enterPassword}
                />
              </div>
              <div className="forgot">
                <p>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </p>
              </div>
              {apiError && <div className="error-message">{apiError}</div>}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
        <div className="home-image">
          <img src={POS} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
