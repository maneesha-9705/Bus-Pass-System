import { Routes, Route } from "react-router-dom";
import EmailOtp from "./components/EmailOtp";
import Home from "./components/home";
import CitizenForm from "./components/CitizenForm";
import TraceDetails from "./components/TraceDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailOtp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/citizen-form" element={<CitizenForm />} />
      <Route path="/trace-details" element={<TraceDetails />} />
    </Routes>
  );
}

export default App;