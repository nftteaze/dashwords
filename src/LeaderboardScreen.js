import React from 'react';
import './LeaderboardScreen.css'; // Import your LeaderboardScreen CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LeaderboardScreen() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back one step in the navigation history
  };

  return (
    <div className="leaderboard-screen-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        {/* Table content here */}
      </table>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default LeaderboardScreen;

