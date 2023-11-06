import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StartMenu from './StartMenu'; // Import your StartMenu component
import GameMenu from './GameMenu'; // Import your GameMenu component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/game" element={<GameMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
