import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';

function StartMenu() {
  useEffect(() => {
    const starContainer = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      const sizes = ['small', 'medium', 'large'];
      star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

      star.style.left = `${Math.floor(Math.random() * 100)}vw`;
      star.style.top = `${Math.floor(Math.random() * 100)}vh`;

      star.style.animationDuration = `${Math.random() * 15 + 5}s`;

      starContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="start-menu">
      <div className="stars" id="stars-container"></div>

      <div className="title">
        <span className="dash">Dash</span>
        <span className="words">Words</span>
      </div>

      <div className="how-to-play-box">
        <h2>How to Play</h2>
        <div className="how-to-play-content">
          <p>You have five attempts to guess a five-letter word.</p>
          <p>Feedback is provided for each guess using colored tiles:</p>
          <ul>
            <li>
              <span className="tile gray"></span> - Wrong character
            </li>
            <li>
              <span className="tile orange"></span> - Correct character in the wrong position
            </li>
            <li>
              <span className="tile green"></span> - Correct character in the correct position
            </li>
          </ul>
        </div>
      </div>
      <div className="auth-box">
        <Link to="/game" className="button" style={{ textDecoration: 'none' }}>
          Play Game
        </Link>
      </div>
    </div>
  );
}

export default StartMenu;
