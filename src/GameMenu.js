import React, { useState, useEffect, useRef } from 'react';
import './GameMenu.css';
import wordList from './wordList';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component
import { useNavigate } from 'react-router-dom';
import guessWordsArray from './GuessWords';
import Confetti from 'react-confetti';

function GameMenu() {

  const [selectedWord, setSelectedWord] = useState('');
  const [feedback, setFeedback] = useState(['', '', '', '', '']);
  const [guesses, setGuesses] = useState([['', '', '', '', '']]);
  const [guessCount, setGuessCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const inputRefs = useRef([]);

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex].toUpperCase();
    setSelectedWord(randomWord);
  }, []);

  const handleInput = (row, index, value) => {
    if (!gameOver) {
      const newGuesses = [...guesses];
      const newInput = [...guesses[row]];
  
      if (value === '') {
        // Handle delete key press
        if (index > 0) {
          newInput[index] = ''; // Clear the current input
          inputRefs.current[row][index - 1].focus(); // Focus on the previous input
        } else if (index === 0 && row > 0) {
          // Clear the last character in the previous row's last box
          const prevRow = row - 1;
          const lastIndex = newGuesses[prevRow].length - 1;
          newGuesses[prevRow][lastIndex] = '';
          if (inputRefs.current[prevRow][lastIndex]) {
            inputRefs.current[prevRow][lastIndex].focus();
          }
        } else if (index === 0 && row === 0) {
          // Clear the first character of the first row
          newInput[index] = '';
        }
      } else {
        newInput[index] = value.toUpperCase();
      }
  
      newGuesses[row] = newInput;
      setGuesses(newGuesses);
  
      if (index < newInput.length - 1 && value !== '') {
        if (inputRefs.current[row][index + 1]) {
          inputRefs.current[row][index + 1].focus();
        }
      }
    }
  };
  
  const handleRestart = () => {
    setGuesses([['', '', '', '', '']]);
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex].toUpperCase();
    setSelectedWord(randomWord);
    setFeedback(['', '', '', '', '']);
    setGuessCount(0);
    setGameOver(false);
    setPoints(0);
  };

  const handleSubmit = (row) => {
    if (gameOver || guesses[row].some(letter => letter === '')) return; // Don't allow submissions if the game is over or if any box is empty
    const guess = guesses[row].join('').toUpperCase(); // Convert guess to uppercase
    const correctWord = selectedWord;
  
    // Add these console.log statements
    console.log('guessWordsArray:', guessWordsArray);
    console.log('guess:', guess);
  
    if (!guessWordsArray.includes(guess.toLowerCase())) {
      // Display a message to the user
      alert('This is not a real word.');
      return;
    }
  
    // Check if the guess is correct
    if (guess === correctWord) {
      // You've guessed the word correctly
      setGameOver(true);
      setPoints((5 - guessCount) * 5);
      setShowConfetti(true);
  
      // Create a newFeedback array with all 'green' values for the entire row
      const newFeedback = [...feedback];
      for (let i = row * 5; i < (row + 1) * 5; i++) {
        newFeedback[i] = 'green';
      }
  
      setFeedback(newFeedback);
      return;
    }
  
    // Initialize newFeedback for the current row
    const newFeedback = [...feedback];
    for (let i = row * 5; i < (row + 1) * 5; i++) {
      newFeedback[i] = '';
    }
  
    const matchedIndices = Array(correctWord.length).fill(false);
  
    // Check for correct letters in the correct position (green)
    for (let i = 0; i < correctWord.length; i++) {
      if (guess[i] === correctWord[i]) {
        newFeedback[i + row * 5] = 'green';
        matchedIndices[i] = true;
      }
    }
  
    // Check for correct letters in the wrong position (orange)
    for (let i = 0; i < correctWord.length; i++) {
      if (!matchedIndices[i] && guess.includes(correctWord[i])) {
        const indexInGuess = guess.indexOf(correctWord[i]);
        if (newFeedback[indexInGuess + row * 5] !== 'green') {
          newFeedback[indexInGuess + row * 5] = 'orange';
          matchedIndices[i] = true;
        }
      }
    }
  
    // Check for letters not in the word (gray)
    for (let i = 0; i < guess.length; i++) {
      if (!matchedIndices[i] && !correctWord.includes(guess[i])) {
        newFeedback[i + row * 5] = '';
      }
    }
  
    setFeedback(newFeedback);
  
    if (guessCount + 1 < 5) {
      // Only add a new row if all boxes in the current row are filled
      setGuesses([...guesses, ['', '', '', '', '']]);
      setGuessCount(guessCount + 1);
    } else {
      // You've used all your guesses, game over
      setGameOver(true);
    }
  };
  
  
  
  const handleKeyPress = (row, e) => {
    if (e.key === 'Enter') {
      handleSubmit(row);
    }
  };

  return (
    <div className="game-menu">
      <h1 className="title">
        Dash<span className="highlight">Words</span>
      </h1>
      <div className="word-grid">
        {guesses.map((guess, rowIndex) =>
          guess.map((letter, index) => (
            <input
              key={index}
              type="text"
              value={letter}
              onChange={(e) => handleInput(rowIndex, index, e.target.value)}
              maxLength={1}
              ref={(inputRef) => {
                if (!inputRefs.current[rowIndex]) {
                  inputRefs.current[rowIndex] = [];
                }
                inputRefs.current[rowIndex][index] = inputRef;
              }}
              autoFocus={index === 0 && rowIndex === guesses.length - 1}
              onKeyPress={(e) => handleKeyPress(rowIndex, e)}
              style={{
                backgroundColor: feedback[index + rowIndex * 5],
                pointerEvents: gameOver ? 'none' : 'auto',
              }}
            />
          ))
        )}
      </div>
      <div>
        {gameOver ? (
          <div>
            {points > 0 ? (
              <div>
                <p>Congratulations! You've won {points} points!</p>
                {showConfetti && (
  <Confetti
    width={window.innerWidth}
    height={600} // You can adjust the height as needed
    numberOfPieces={400} // Increased the number of pieces to 400
    recycle={false}
    colors={['#FF5733', '#33FF57', '#5733FF']}
    gravity={0.5}
    wind={0} // Set wind to 0
  />
)}


              </div>
            ) : (
              <p>Sorry, you lost. The word was: {selectedWord}</p>
            )}
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
            <button
              className="leaderboard-button"
              onClick={() => navigate('/leaderboard')}
            >
              Leaderboard
            </button>
          </div>
        ) : (
          <div>
            <button
              className="submit-button"
              onClick={() => {
                const lastGuess = guesses[guesses.length - 1];
                if (lastGuess.every((letter) => letter !== '')) {
                  handleSubmit(guesses.length - 1);
                }
              }}
              disabled={
                guessCount === 4 &&
                guesses[guesses.length - 1].some((letter) => letter === '')
              }
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameMenu