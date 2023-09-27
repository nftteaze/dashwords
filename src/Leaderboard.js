// Leaderboard.js

import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // Fetch leaderboard data from your backend API
    fetch('/api/leaderboard') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setLeaderboardData(data.leaderboard);
        setUserPosition(data.userPosition);
        setUserPoints(data.userPoints);
      })
      .catch((error) => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="user-info">
        <p>Your Points: {userPoints}</p>
        {userPosition && <p>Your Position: {userPosition}</p>}
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nickname</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.nickname}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

