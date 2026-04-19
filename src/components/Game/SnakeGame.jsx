import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SnakeGame.css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const SPEED = 220; 

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("UP");
  const [gameOver, setGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Handle Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (!isStarted || gameOver) return;
      switch (e.key) {
        case "ArrowUp": if (direction !== "DOWN") setDirection("UP"); break;
        case "ArrowDown": if (direction !== "UP") setDirection("DOWN"); break;
        case "ArrowLeft": if (direction !== "RIGHT") setDirection("LEFT"); break;
        case "ArrowRight": if (direction !== "LEFT") setDirection("RIGHT"); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, isStarted, gameOver]);

  const moveSnake = useCallback(() => {
    if (gameOver || !isStarted) return;
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    // Boundary & Self Collision
    if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE || 
        newSnake.some(s => s.x === head.x && s.y === head.y)) {
      setGameOver(true); 
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    } else { 
      newSnake.pop(); 
    }
    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isStarted]);

  useEffect(() => {
    const interval = setInterval(moveSnake, SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setGameOver(false);
    setScore(0);
    setDirection("UP");
    setIsStarted(true);
  };

  return (
    <div className="game-wrapper">
      <div className="game-card">
        <div className="game-header">
          <button className="icon-btn" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i></button>
          <span className="score-text">Score: {score}</span>
          <button className="icon-btn" onClick={() => navigate("/")}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="grid">
          {/* Start Screen */}
          {!isStarted && !gameOver && (
            <div className="overlay">
              <button className="action-btn" onClick={() => setIsStarted(true)}>START GAME</button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="overlay">
              <h3>GAME OVER</h3>
              <p>{score} Points</p>
              <div className="btn-row">
                <button className="action-btn" onClick={resetGame}>Retry</button>
                <button className="action-btn exit" onClick={() => navigate("/")}>Exit</button>
              </div>
            </div>
          )}

          {/* ✅ RESOLVED: This section draws the game cells */}
          {[...Array(GRID_SIZE)].map((_, row) =>
            [...Array(GRID_SIZE)].map((_, col) => {
              const isHead = snake[0].x === col && snake[0].y === row;
              const isBody = snake.slice(1).some((s) => s.x === col && s.y === row);
              const isFood = food.x === col && food.y === row;

              return (
                <div
                  key={`${row}-${col}`}
                  className={`cell ${isHead ? "snake-head" : isBody ? "snake-body" : isFood ? "food" : ""}`}
                ></div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}