import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import Land from "./pages/land";
import Login from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
