import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MEPOSLogo from '../../../assets/images/icons/MEPOS logo.svg';
import Input from '../../../components/ui/input/Input';
import Button from '../../../components/ui/button/Button';
import './ResetPassword.scss';
import { useForm } from 'react-hook-form';
import POS from '../../../assets/images/POS.svg';
import axios from '../../../utils/axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Assuming the token is in the URL
  const [email, setEmail] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    // Fetch the email from the backend using the token
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`/users/reset-password/${token}`);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching email:', error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchEmail();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      await axios.post(`/users/reset-password`, {
        password: data.newPassword,
        email,
        passwordToken: token,
      });
      navigate('/');
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="reset-password">
      <div className="container">
        <div className="reset-password">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <h3>Reset Password</h3>
            <p>Create a new strong password for your account</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="************"
                required={true}
                register={register('newPassword', {
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
                showNewPassword={showNewPassword}
                setShowNewPassword={setShowNewPassword}
                error={errors.newPassword}
              />
            </div>
            <div>
              <Input
                label="Confirm Password"
                type={showConfirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                placeholder="************"
                required={true}
                register={register('confirmNewPassword', {
                  required: 'Confirm your password',
                  validate: (value) =>
                    value === getValues('newPassword') ||
                    "Passwords don't match",
                })}
                error={errors.confirmNewPassword}
                showConfirmNewPassword={showConfirmNewPassword}
                setShowConfirmNewPassword={setShowConfirmNewPassword}
              />
            </div>
            <Button type="submit">Reset Password</Button>
          </form>
        </div>
        <div className="home-image">
          <img src={POS} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
