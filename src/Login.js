import React from 'react';
import './Login.css'; // Import your Login CSS

function Login() {
  return (
    <div className="login-container">
      <a
        href="http://localhost:53134/auth/discord" // Update this URL if needed
        className="discord-signin-button"
      >
        Login with Discord
      </a>
    </div>
  );
}

export default Login;
