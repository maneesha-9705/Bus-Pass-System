import { Routes, Route } from "react-router-dom";
import EmailOtp from "./components/EmailOtp";
import Home from "./components/home";
import AboveSSCForm from "./components/AboveSSCForm";
import BelowSSCForm from "./components/BelowSSCForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailOtp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/above-ssc" element={<AboveSSCForm />} />
      <Route path="/below-ssc" element={<BelowSSCForm />} />
    </Routes>
  );
}

export default App;