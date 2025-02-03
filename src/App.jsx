import { Routes, Route } from "react-router-dom";
import Land from "./pages/land";  // Landing Page
import Login from "./pages/login";  // Login Page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Land />} /> {/* Renders Land page */}
      <Route path="/login" element={<Login />} /> {/* Renders Login page */}
    </Routes>
  );
};

export default App;