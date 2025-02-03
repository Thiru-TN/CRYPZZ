import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './css/login.css';
import logSvg from '/src/assets/log.svg';
import registerSvg from '/src/assets/register.svg';
import { useNavigate } from "react-router-dom";

const LoginCard = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [randomText, setRandomText] = useState('');
  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))];
  const randomString = length => Array.from(Array(length)).map(randomChar).join("");
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setRandomText(randomString(2650));
  };

  return (
    <div 
      className="login-card" 
      onMouseMove={handleMouseMove}
      onTouchMove={(e) => handleMouseMove(e.touches[0])}
    >
      {children}
      <div className="login-card-gradient" />
      <div 
        className="login-card-letters"
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`
        }}
      >
        {randomText}
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  children: PropTypes.node.isRequired,
};

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        input: "login",
        username: formData.username,
        password: formData.password
      });

      console.log("Login Successful", response.data);
      // Handle success (e.g., navigate to dashboard, store JWT in localStorage)
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form className="login-sign-in-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Sign in</h2>
      <div className="login-card-image">
        <i className="fas fa-user-circle login-card-icon" style={{ textAlign: 'center', fontSize: "200px", color: "white" }} />
      </div>
      <div className="login-input-field">
        <i className="fas fa-user" />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-lock" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="submit" value="Login" className="login-btn login-solid" />
    </form>
  );
};

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    budget: '',
    risk: '',
    holdtime: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        input: "signup",
        ...formData
      });

      console.log("Signup Successful", response.data);
      // Handle success (e.g., navigate to login, show success message)
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form className="login-sign-up-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Sign up</h2>
      <div className="login-input-field">
        <i className="fas fa-user" />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-envelope" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-lock" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-wallet" />
        <input type="number" name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-chart-line" />
        <select name="risk" style={{backgroundColor:'whitesmoke', borderRadius:"20px", color:"#cacaca"}} value={formData.risk} onChange={handleChange} required>
          <option value="" disabled hidden>Select risk level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="login-input-field">
        <i className="fas fa-globe" />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
      </div>
      <div className="login-input-field">
        <i className="fas fa-hourglass" />
        <input type="number" name="holdtime" placeholder="Holdtime (days)" value={formData.holdtime} onChange={handleChange} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="submit" value="Sign up" className="login-btn" />
    </form>
  );
};

const LoginSocialIcons = () => (
  <div className="login-social-media">
    {['facebook-f', 'twitter', 'google', 'linkedin-in'].map((platform) => (
      <a key={platform} href="#" className="login-social-icon">
        <i className={`fab fa-${platform}`} />
      </a>
    ))}
  </div>
);

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`login-container ${isSignUpMode ? 'login-sign-up-mode' : ''}`}>
      <div className="login-forms-container">
        <div className="login-card-track">
          <div className="login-card-wrapper">
            <LoginCard>
              <SignInForm />
              <SignUpForm />
            </LoginCard>
          </div>
        </div>
      </div>
      <div className="login-panels-container">
        <div className="login-panel login-left-panel">
          <div className="login-content">
            <h3>One of us ?</h3>
            <p>
              Ready to pick up where you left off? Log in to access your personalized crypto insights, track analyst performance, and stay ahead of the market.
            </p>
            <button 
              className="login-btn login-transparent" 
              style={{ marginRight: "20px" }} 
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button 
              className="login-btn login-transparent" 
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src={logSvg} className="login-image" alt="platform illustration" />
        </div>
        <div className="login-panel login-right-panel">
          <div className="login-content">
            <h3>New here ?</h3>
            <p>
              Create your free account to access data-driven credibility ratings, connect with analysts, and gain the insights you need to navigate the crypto market with confidence. Join our community of informed investors today!
            </p>
            <button 
              className="login-btn login-transparent" 
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
            <button 
              className="login-btn login-transparent" 
              style={{ marginLeft: "20px" }} 
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <img src={registerSvg} className="login-image" alt="platform illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;