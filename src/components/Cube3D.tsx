import { useState, useEffect, useRef } from "react";
import "./cube.css";

const MESSAGES = [
  "You’re awesome!",
  "Keep it up!",
  "Wow, nice catch!",
  "Superb!",
  "Amazing skills!",
  "You rock!",
  "Fantastic!",
  "Great job!",
];

interface Star {
  id: number;
  x: number;
  y: number;
}

export default function CatchStarGame() {
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [basketX, setBasketX] = useState(140);

  // Ref to track latest basket position
  const basketXRef = useRef(basketX);

  // Update the ref whenever basketX changes
  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  // --------------------- Start / Reset Game ---------------------
  const startGame = () => {
    setStars([]);
    setScore(0);
    setLives(5);
    setMessages([]);
    setBasketX(140);
    setGameActive(true);
  };

  // --------------------- Basket Mouse Move ---------------------
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 30; // half basket width
    if (x >= 0 && x <= 240) setBasketX(x);
  };

  // --------------------- Main Game Loop ---------------------
  useEffect(() => {
    if (!gameActive) return;

    const starInterval = setInterval(() => {
      const newStar: Star = { id: Date.now(), x: Math.random() * 260 + 10, y: 0 };
      setStars((prev) => [...prev, newStar]);
    }, 1000);

    const fallInterval = setInterval(() => {
      setStars((prevStars) =>
        prevStars
          .map((s) => ({ ...s, y: s.y + 3 }))
          .filter((s) => {
            if (s.y >= 240 && s.x >= basketXRef.current - 10 && s.x <= basketXRef.current + 60) {
              setScore((score) => score + 0.5);
              const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
              setMessages((prev) => [...prev, msg].slice(-3));
              return false;
            }
            if (s.y > 260) {
              setLives((l) => Math.max(l - 0.5, 0));
              return false;
            }
            return true;
          })
      );
    }, 30);

    return () => {
      clearInterval(starInterval);
      clearInterval(fallInterval);
    };
  }, [gameActive]);

  // --------------------- Stop game when lives reach 0 ---------------------
  useEffect(() => {
    if (lives <= 0) {
      const timeout = setTimeout(() => setGameActive(false), 0);
      return () => clearTimeout(timeout);
    }
  }, [lives]);

  // --------------------- Render ---------------------
  return (
    <div className="game-wrapper">
      {!gameActive && (
        <button className="game-btn" onClick={startGame}>
          {lives <= 0 ? "Retry" : "Play"}
        </button>
      )}

      <div
        className="game-area"
        onMouseMove={handleMouseMove}
        data-no-cursor="true"
      >
        {stars.map((star) => (
          <div key={star.id} className="star" style={{ top: star.y, left: star.x }} />
        ))}

        <div className="basket" style={{ left: basketX }} />

        <div className="game-info">
          <p>Score: {score}</p>
          <p>Lives: {lives}</p>
          <div className="messages">
            {messages.map((m, i) => (
              <p key={i} className="msg">
                {m}
              </p>
            ))}
          </div>
        </div>

        {lives <= 0 && (
          <div className="game-over">
            <h2>Play Again!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
