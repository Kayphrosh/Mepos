import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/ui/input/Input";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import "./login.scss";
import Button from "../../../components/ui/button/Button";
import { useForm } from "react-hook-form";
import POS from "../../../assets/images/POS.svg";

const Login = () => {
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Validate the form data
    // if (errors.username || errors.passwordCreated) {
    //   return; // Handle validation errors
    // }
    console.log(data);
    navigate("/home");

    // Simulate backend validation and authentication
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
                  label="Username"
                  type="text"
                  name="usernameLogin"
                  placeholder="Enter Username"
                  required={true}
                  register={register("usernameLogin", {
                    required: "Enter your username",
                  })}
                  error={errors.usernameLogin}
                />
              </div>
              <div>
                <Input
                  label="Create Password"
                  type={showCreatePassword ? "text" : "password"}
                  name="enterPassword"
                  placeholder="************"
                  required={true}
                  register={register("enterPassword", {
                    required: "Enter your password",
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
              <Button type="submit">Login</Button>
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
