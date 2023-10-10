import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './StartMenu.css';
import {
  getAuth,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc
} from 'firebase/firestore';
import { app } from "./firebase";
import { useFirebase } from './FirebaseContext';
import logo from './wordeez.png';

function StartMenu() {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, 'users', currentUser.uid);

        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserStats(userDocSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserStats(null);
      }
    });
  }, []);  

  const handleTwitterLogin = async () => {
    const auth = getAuth(app);
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('Login successful!');
    } catch (error) {
      console.error('Error during Twitter login:', error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      console.log('Sign-out successful!');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <div className="start-menu">
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
          {user && (
            <div className="user-stats">
              <h3>User Stats</h3>
              <p>Highest Score: {userStats?.highestScore || 0}</p>
              <p>Total Games Played: {userStats?.totalGamesPlayed || 0}</p>
              <p>Total Points: {userStats?.totalPoints || 0}</p>
              <p>Win Streak: {userStats?.winStreak || 0}</p>
            </div>
          )}
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
