import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./pages/feed";
import Land from "./pages/land";
import Roadmap from "./pages/roadmap";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NotPage from "./pages/not";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/home" element={<Home />} />
        <Route path="/api/nan" element={<NotPage />} />
        <Route path="/api/roadmap" element={<Roadmap />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/api/feed" element={<Feed />} />
          <Route path="/api/profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
