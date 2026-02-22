import { Routes, Route } from "react-router-dom";
import EmailOtp from "./components/EmailOtp";
import Home from "./components/home";
import AboveSSCForm from "./components/AboveSSCForm";
import BelowSSCForm from "./components/BelowSSCForm";
import CitizenForm from "./components/CitizenForm";
import TraceDetails from "./components/TraceDetails";
import UpdateDetails from "./components/UpdateDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailOtp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/above-ssc" element={<AboveSSCForm />} />
      <Route path="/below-ssc" element={<BelowSSCForm />} />
      <Route path="/citizen-form" element={<CitizenForm />} />
      <Route path="/trace-details" element={<TraceDetails />} />
      <Route path="/update-details" element={<UpdateDetails />} />
    </Routes>
  );
}

export default App;