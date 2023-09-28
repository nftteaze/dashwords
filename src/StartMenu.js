import React from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';

function StartMenu() {
  return (
    <div className="start-menu">
      <h1 className="title">
        Dash<span className="highlight">Words</span>
      </h1>
      <div className="how-to-play-box">
        <h2>How to Play</h2>
        <div className="how-to-play-content">
          <p>
            Welcome to DashWords! In this game, you have five attempts to guess a five-letter word.
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
    </div>
  );
}

export default StartMenu;
