import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import Land from "./pages/land";
import Login from "./pages/login";
import Home from "./pages/home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/api/feed" element={<Feed />} />
      <Route path="/api/login" element={<Login />} />
      <Route path="/api/home" element={<Home />} />
    </Routes>
  );
};

export default App;
