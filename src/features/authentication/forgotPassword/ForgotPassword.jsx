import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/input/Input";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import Button from "../../../components/ui/button/Button";
import { useForm } from "react-hook-form";
import POS from "../../../assets/images/POS.svg";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Validate the form data
    console.log(data);
    navigate("/check-mail");
    // if (errors.username || errors.passwordCreated) {
    //   return; // Handle validation errors
    // }

    // // Simulate backend validation and authentication
    // if (
    //   data.username === "validUser" &&
    //   data.passwordCreated === "validPassword"
    // ) {
    //   // Handle successful login
    //   navigate("/home"); // Navigate to the "Home" page
    // } else {
    //   // Handle failed login
    //   alert("Invalid username or password");
    // }
  };
  return (
    <div className="forgot-password">
      <div className="container">
        <div className="login">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <div className="text">
              <h3>Forgot Password</h3>
              <h4>
                Enter your registered e-mail address to receive a password reset
                link
              </h4>
            </div>
          </div>
          <form className="forgot-password" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Input
                  label="E-mail Address"
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail address"
                  required={true}
                  register={register("email", {
                    required: "Enter your Email Address",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email}
                />
              </div>
              <Button type="submit">Send Password Reset Link</Button>
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

export default ForgotPassword;
