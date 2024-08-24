import { Routes, Route } from "react-router-dom";
import Login from "./features/authentication/login/Login";

import Signup from "./features/authentication/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register-store" element={<Signup />} />
    </Routes>
  );
}

export default App;
