// Login.js
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [memberNumber, setMemberNumber] = useState('');
  const [nickname, setNickname] = useState('');

  const handleLogin = () => {
    // Validate memberNumber and nickname, and check for AD prefix
    if (memberNumber.startsWith('AD')) {
      // Perform any additional validation if needed
      // If validation is successful, call the onLogin function with the provided data
      onLogin({ memberNumber, nickname });
    } else {
      alert('Invalid Member Number. It should start with AD.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="AssetDash Member Number"
        value={memberNumber}
        onChange={(e) => setMemberNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
