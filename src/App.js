import { Routes, Route } from "react-router-dom";
import Login from "./features/authentication/login/Login";
import ForgotPassword from "./features/authentication/forgotPassword/ForgotPassword";
import CheckMail from "./features/authentication/checkMail/CheckMail";
import RegisterStore from "./features/authentication/register-store/RegisterStore";
import ResetPassword from "./features/authentication/reset-password/ResetPassword";
import DashboardLayout from "./features/dashboard/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

    <Routes>
      <Route path="/:storeId/auth" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register-store" element={<RegisterStore />} />
      <Route path="/check-mail" element={<CheckMail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/*" element={<DashboardLayout />} />


    </Routes>
        </>
  );
}

export default App;
