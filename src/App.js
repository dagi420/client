import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [emojis, setEmojis] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    initializeGame();
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) endGame();
  }, [timeLeft]);

  const initializeGame = () => {
    const emojiSet = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍"];
    let randomEmojis = [...emojiSet];
    const duplicatedEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    randomEmojis.push(duplicatedEmoji);
    randomEmojis.sort(() => Math.random() - 0.5);
    randomEmojis = randomEmojis.slice(0, 16);

    setEmojis(randomEmojis);
    setSelectedEmojis([]);
  };

  const handleEmojiClick = (index) => {
    if (selectedEmojis.length < 2 && !selectedEmojis.includes(index)) {
      setSelectedEmojis([...selectedEmojis, index]);

      if (selectedEmojis.length === 1) {
        const firstEmoji = emojis[selectedEmojis[0]];
        const secondEmoji = emojis[index];
        if (firstEmoji === secondEmoji) {
          setScore(score + 1);
          initializeGame(); // Reset game for next round
        }
      }
    } else if (selectedEmojis.length === 2) {
      setSelectedEmojis([index]);
    }
  };

  const endGame = () => {
    alert(Time's up! Your score: ${score});
    setScore(0);
    setTimeLeft(60);
    initializeGame();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Emoji Matching Game</h1>
        <div>Score: {score}</div>
        <div>Time Left: {timeLeft}</div>
        <div className="emoji-grid">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className={emoji ${selectedEmojis.includes(index) ? 'selected' : ''}}
              onClick={() => handleEmojiClick(index)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;