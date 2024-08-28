//Super Admin Registration Container
import { useState } from "react";
import MEPOSLogo from "../../../assets/images/icons/MEPOS logo.svg";
import Check from "../../../assets/images/icons/checkmark.svg";
import RegisterScreenImage from "../../../assets/images/resiter-screen-image.png";
import Ellipse1 from "../../../assets/images/Ellipse1.svg";
import Ellipse2 from "../../../assets/images/Ellipse2.png";
import "./register-store.scss";
import { useForm } from "react-hook-form";
import AdminInfoForm from "./AdminInfoForm";
import StoreInfoForm from "./StoreInfoForm";

const RegisterStore = () => {
  const [step, setStep] = useState(1);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      // handle register store logic here
      console.log(data);
    }
  };
  return (
    <div className="super-admin">
      <div className="container">
        <div className="register-store">
          <div className="heading">
            <img src={MEPOSLogo} alt="MEPOS logo" />
            <h3>Register Store</h3>
            <div className="progress_container">
              <div className="step">
                <div
                  className={`${
                    step === 1 ? "circle active" : "circle complete"
                  }  `}
                  // onClick={() => setStep(1)}
                >
                  {step === 1 ? 1 : <img src={Check} alt="Check" />}
                </div>
              </div>
              <div
                className={`${step === 1 ? "progress" : "progress active"} `}
              ></div>
              <div className="step">
                <div className={`${step === 1 ? "circle" : "circle active"}`}>
                  2
                </div>
              </div>
            </div>
            <div className="progress_desc">
              <span className="active">Admin Info</span>
              <div></div>
              <span className={`${step === 2 && "active"}`}>Store Info</span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <AdminInfoForm
                showCreatePassword={showCreatePassword}
                setShowCreatePassword={setShowCreatePassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                register={register}
                errors={errors}
                getValues={getValues}
              />
            )}
            {step === 2 && (
              <StoreInfoForm register={register} errors={errors} />
            )}
          </form>
        </div>
        <div className="home-image">
          <img src={RegisterScreenImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;
