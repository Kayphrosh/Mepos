import { Routes, Route } from "react-router-dom";
import Signup from "./features/authentication/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
}

export default App;
