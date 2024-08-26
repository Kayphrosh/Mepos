import { Routes, Route } from "react-router-dom";
import Login from "./features/authentication/login/Login";
import ForgotPassword from "./features/forgotPassword/ForgotPassword";
import CheckMail from "./features/authentication/checkMail/CheckMail";
import RegisterStore from "./features/authentication/register-store/RegisterStore";
import ResetPassword from "./features/authentication/reset-password/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register-store" element={<RegisterStore />} />
      <Route path="/check-mail" element={<CheckMail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
