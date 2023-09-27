import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StartMenu from './StartMenu'; // Import your StartMenu component
import GameMenu from './GameMenu'; // Import your GameMenu component
import LeaderboardScreen from './LeaderboardScreen'; // Import your LeaderboardScreen component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/game" element={<GameMenu />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
