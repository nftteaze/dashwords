import React, { useState, useEffect, useRef } from 'react';
import './GameMenu.css';
import wordList from './wordList';
import Leaderboard from './Leaderboard'; // Import the Leaderboard component
import { useNavigate } from 'react-router-dom';
import guessWordsArray from './GuessWords';
import Confetti from 'react-confetti';
import logo from './wordeez.png'; // Import the image

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

  const [submittedGuesses, setSubmittedGuesses] = useState([]);

  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
  }
  

  const handleInput = (row, index, value) => {
    if (!gameOver && !guesses.isSubmitted && row === guessCount) {
      const newGuesses = [...guesses];
      const newInput = [...guesses[row]];

      if (value === '') {
        // Handle delete key press
        if (index > 0) {
          newInput[index] = '';
          inputRefs.current[row][index - 1].focus();
        } else if (index === 0 && row > 0) {
          const prevRow = row - 1;
          const lastIndex = newGuesses[prevRow].length - 1;
          newGuesses[prevRow][lastIndex] = '';
          if (inputRefs.current[prevRow][lastIndex]) {
            inputRefs.current[prevRow][lastIndex].focus();
          }
        } else if (index === 0 && row === 0 && newInput[index] !== '') {
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
    // Generate a new random word here (replace getRandomWord with your word generation logic)
    const newWord = getRandomWord();
  
    setGuesses([Array(5).fill('')]);
    setFeedback(Array(25).fill(''));
    setGuessCount(0);
    setGameOver(false);
    setShowConfetti(false);
    setSelectedWord(newWord); // Set the new random word
  
    inputRefs.current.forEach((row, rowIndex) => {
      row.forEach((inputRef, columnIndex) => {
        if (inputRef && rowIndex === 0) {
          inputRef.value = '';
        }
      });
    });
  };
  

  const handleSubmit = (row) => {
    if (gameOver || guesses[row].some((letter) => letter === '')) return;
    const guess = guesses[row].join('').toUpperCase();
    const correctWord = selectedWord;

    if (!guessWordsArray.includes(guess.toLowerCase())) {
      alert('This is not a real word.');
      return;
    }

    if (guess === correctWord) {
      setGameOver(true);
      setPoints((5 - guessCount) * 5);
      setShowConfetti(true);

      const newFeedback = [...feedback];
      for (let i = row * 5; i < (row + 1) * 5; i++) {
        newFeedback[i] = 'green';
      }

      setFeedback(newFeedback);
      return;
    }

    const newFeedback = [...feedback];
    for (let i = row * 5; i < (row + 1) * 5; i++) {
      newFeedback[i] = '';
    }

    const matchedIndices = Array(correctWord.length).fill(false);

    for (let i = 0; i < correctWord.length; i++) {
      if (guess[i] === correctWord[i]) {
        newFeedback[i + row * 5] = 'green';
        matchedIndices[i] = true;
      }
    }

    for (let i = 0; i < correctWord.length; i++) {
      if (!matchedIndices[i] && guess.includes(correctWord[i])) {
        const indexInGuess = guess.indexOf(correctWord[i]);
        if (newFeedback[indexInGuess + row * 5] !== 'green') {
          newFeedback[indexInGuess + row * 5] = 'orange';
          matchedIndices[i] = true;
        }
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (!matchedIndices[i] && !correctWord.includes(guess[i])) {
        newFeedback[i + row * 5] = '';
      }
    }

    setFeedback(newFeedback);

    if (guessCount + 1 < 5) {
      setGuesses([...guesses, ['', '', '', '', '']]);
      setGuessCount(guessCount + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleKeyPress = (row, e) => {
    if (e.key === 'Enter') {
      handleSubmit(row);
    }
  };

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
    <div className="game-menu">
      <div id="stars-container"></div>
      {/* Replace the text title with the image logo */}
      <img src={logo} alt="Logo" className="image-logo" />

      <div className="word-grid">
        {guesses.map((guess, rowIndex) =>
          guess.map((letter, index) => (
            <input
              key={index}
              type="text"
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
                    height={600}
                    numberOfPieces={400}
                    recycle={false}
                    colors={['#FF5733', '#33FF57', '#5733FF']}
                    gravity={0.5}
                    wind={0}
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

export default GameMenu;
