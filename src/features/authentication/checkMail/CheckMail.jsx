import { Link } from "react-router-dom";
import MEPOSLogo from "../../../assets/images/icons/email.png";
import "./checkMail.scss";
import Button from "../../../components/ui/button/Button";

const CheckMail = () => {
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
          <form>
            <div>
              <Link to="/">
                <Button type="submit">Back to Login</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
