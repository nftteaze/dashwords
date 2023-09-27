import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';

function StartMenu() {
  const [memberNumber, setMemberNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (!memberNumber.startsWith('AD') || memberNumber.length !== 12) {
      alert('Invalid AssetDash Member Number. It should start with AD and be 12 characters long.');
      return;
    }
  
    if (nickname.trim() === '') {
      alert('Please enter a nickname.');
      return;
    }
  
    // Perform your login logic here
    setLoggedIn(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  return (
    <div className="start-menu">
      <h1 className="title">
        Dash<span className="highlight">Words</span>
      </h1>
      {!loggedIn ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="AssetDash Member Number"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      ) : (
        <Link to="/game">
          <button className="start-button">Start Game</button>
        </Link>
      )}
    </div>
  );
}

export default StartMenu;

