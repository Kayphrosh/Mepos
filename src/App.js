import { Routes, Route } from "react-router-dom";
import RegisterStore from "./features/authentication/register-store/RegisterStore";
import Login from "./features/authentication/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/register-store" element={<RegisterStore />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
