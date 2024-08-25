import { Routes, Route } from "react-router-dom";
import Login from "./features/authentication/login/Login";
import Signup from "./features/authentication/signup/Signup";
import ForgotPassword from "./features/forgotPassword/ForgotPassword";
import CheckMail from "./features/authentication/checkMail/CheckMail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register-store" element={<Signup />} />
      <Route path="/check-mail" element={<CheckMail />} />
    </Routes>
  );
}

export default App;
