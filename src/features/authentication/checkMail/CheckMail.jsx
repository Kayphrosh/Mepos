import { useNavigate } from "react-router-dom";
import MEPOSLogo from "../../../assets/images/icons/email.png";
import "./checkMail.scss";
import Button from "../../../components/ui/button/Button";
import POS from "../../../assets/images/POS.svg";

const CheckMail = () => {
  const navigate = useNavigate();
  return (
    <div className="check-mail">
      <div className="container">
        <div className="login">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <div className="text">
              <h3>Check Your Mail!</h3>
              <h4>We’ve sent you a link to reset your password</h4>
            </div>
          </div>
          <Button type="submit" onClick={() => navigate("/reset-password")}>
            Back to Login
          </Button>
        </div>
        <div className="home-image">
          <img src={POS} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
