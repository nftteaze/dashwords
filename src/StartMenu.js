import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';

function StartMenu() {
  useEffect(() => {
    const starContainer = document.getElementById('stars-container');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Set random initial position for stars
      star.style.left = `${Math.floor(Math.random() * 100)}vw`;
      star.style.top = `${Math.floor(Math.random() * 100)}vh`;

      // Set random animation duration and delay for stars
      star.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random duration between 5s and 15s
      star.style.animationDelay = `${Math.random() * 5}s`; // Random delay between 0s and 5s

      starContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="start-menu">
      <h1 className="title">
        Dash<span className="highlight">Words</span>
      </h1>
      <div className="how-to-play-box">
        <h2>How to Play</h2>
        <div className="how-to-play-content">
          <p>
            You have five attempts to guess a five-letter word.
          </p>
          <p>
            Feedback is provided for each guess using colored tiles:
          </p>
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
          <p>Can you guess the word and earn the highest score?</p>
        </div>
      </div>
      <Link to="/game" className="start-button" style={{ textDecoration: 'none' }}>
        Start Game
      </Link>
      <div id="stars-container"></div>
    </div>
  );
}

export default StartMenu;
