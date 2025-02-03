import { useState } from 'react';
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

const SignInForm = () => (
  <form className="login-sign-in-form">
    <h2 className="login-title">Sign in</h2>
    <div className="login-card-image">
      <i className="fas fa-user-circle login-card-icon" style={{ textAlign: 'center', fontSize: "200px", color: "white" }} />
    </div>
    <div className="login-input-field">
      <i className="fas fa-user" />
      <input type="text" placeholder="Username" />
    </div>
    <div className="login-input-field">
      <i className="fas fa-lock" />
      <input type="password" placeholder="Password" />
    </div>
    <input type="submit" value="Login" className="login-btn login-solid" />
    <p className="login-social-text">Or Sign in with social platforms</p>
    <LoginSocialIcons />
  </form>
);

const SignUpForm = () => (
  <form className="login-sign-up-form">
    <h2 className="login-title">Sign up</h2>
    <div className="login-card-image">
      <i className="fas fa-user-circle login-card-icon" style={{ textAlign: 'center', fontSize: "125px", color: "white" }} />
    </div>
    <div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-user" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="text" 
    placeholder="Username" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>
<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-envelope" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="email" 
    placeholder="Email" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>
<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-lock" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="password" 
    placeholder="Password" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>
<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-wallet" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="text" 
    placeholder="Budget" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>
<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-chart-line" style={{ fontSize: '18px', marginRight: '8px' }} />
  <select 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%', border: 'none', color: '#ababab', background: 'transparent', outline: 'none', cursor: 'pointer' }}
    defaultValue=""
  >
    <option value="" disabled hidden>Select any one</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>


<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-globe" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="text" 
    placeholder="Country" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>
<div className="login-input-field" style={{ height: '35px', display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-hourglass" style={{ fontSize: '18px', marginRight: '8px' }} />
  <input 
    type="text" 
    placeholder="Holdtime" 
    style={{ height: '100%', fontSize: '14px', padding: '0 8px', width: '100%' }} 
  />
</div>

    <input type="submit" className="login-btn" value="Sign up" />
  </form>
);

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