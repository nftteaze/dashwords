import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';
import { getAuth, signInWithPopup, signOut, TwitterAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase"; // Import the initialized app instance
import logo from './wordeez.png'; // Import the image

function StartMenu() {
  const [user, setUser] = useState(null);

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

    const auth = getAuth(app);

    // Check if the user is already authenticated
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, set the user state
        setUser(currentUser);
      }
    });
  }, []);

  const handleTwitterLogin = async () => {
    const auth = getAuth(app);
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful login
      setUser(result.user);
      console.log('Login successful!');
    } catch (error) {
      // Handle errors, log detailed error message
      console.error('Error during Twitter login:', error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      // Handle successful sign-out
      setUser(null);
      console.log('Sign-out successful!');
    } catch (error) {
      // Handle errors, log detailed error message
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <div className="start-menu">
      {/* Replace the text title with the image logo */}
      <img src={logo} alt="Logo" className="image-logo" />

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
      <div className="auth-box">
        {user ? (
          <div>
            <p>Welcome @{user.displayName}</p>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
            <Link to="/game" className="start-button" style={{ textDecoration: 'none' }}>
              Start Game
            </Link>
          </div>
        ) : (
          <div>
            <button onClick={handleTwitterLogin} className="twitter-login-button">
              Login with Twitter
            </button>
          </div>
        )}
      </div>
      <div id="stars-container"></div>
    </div>
  );
}

export default StartMenu;
