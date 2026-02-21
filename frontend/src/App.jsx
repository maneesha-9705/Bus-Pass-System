import {Routes, Route} from "react-router-dom";
import EmailOtp from "./components/EmailOtp";
import Home from "./components/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmailOtp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;