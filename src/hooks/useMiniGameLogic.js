import { useState, useEffect, useCallback } from "react";
import { Howl } from "howler";
import useKeyPressHandler from "./useKeyPressHandler";
import { saveHighScore, clearHighScores } from "../utils/localStorage";

const generateRandomSequence = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  );
};

export const levels = {
  Fácil: 30,
  Intermediário: 15,
  Difícil: 8,
};

export const useMiniGameLogic = (selectedLevel) => {
  const [sequence, setSequence] = useState([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(levels[selectedLevel] || 0);
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [errorIndex, setErrorIndex] = useState(null);
  const [score, setScore] = useState(0);

  const playSound = (src) => {
    const sound = new Howl({
      src: [src],
    });
    sound.play();
  };

  const startGame = useCallback(() => {
    if (!selectedLevel || !levels[selectedLevel]) {
      console.error("Nível inválido:", selectedLevel);
      return;
    }
    const newSequence = generateRandomSequence(10);
    setSequence(newSequence);
    setCurrentKeyIndex(0);
    setTimeLeft(levels[selectedLevel]);
    setGameActive(true);
    setFeedback("");
    setErrorIndex(null);
  }, [selectedLevel]);

  const resetGame = useCallback(() => {
    if (!selectedLevel || !levels[selectedLevel]) {
      console.error("Nível inválido:", selectedLevel);
      return;
    }
    const newSequence = generateRandomSequence(10);
    setSequence(newSequence);
    setCurrentKeyIndex(0);
    setTimeLeft(levels[selectedLevel]);
    setGameActive(true);
    setFeedback("");
    setErrorIndex(null);
    setScore(0);
  }, [selectedLevel]);

  const handleKeyPress = useCallback(
    (event) => {
      if (!gameActive) return;

      const pressedKey = event.key.toUpperCase();
      if (pressedKey === sequence[currentKeyIndex]) {
        setCurrentKeyIndex((prevIndex) => prevIndex + 1);
        setFeedback("Correto!");
        playSound("/sounds/correct.mp3");
        setErrorIndex(null);
        setScore((prevScore) => prevScore + 1);

        if (currentKeyIndex + 1 === sequence.length) {
          startGame();
        }
      } else {
        setGameActive(false);
        setFeedback("Ops, tecla errada :/");
        playSound("/sounds/wrong.mp3");
        setErrorIndex(currentKeyIndex);
        saveHighScore(score);
        setScore(0);
      }
    },
    [gameActive, sequence, currentKeyIndex, startGame, score]
  );

  useKeyPressHandler(handleKeyPress, gameActive);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameActive(false);
          setFeedback("Tempo esgotado!");
          playSound("/sounds/timeup.mp3");
          clearInterval(timer);
          saveHighScore(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft, score]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearHighScores();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {
    sequence,
    currentKeyIndex,
    timeLeft,
    gameActive,
    feedback,
    errorIndex,
    score,
    startGame,
    resetGame,
  };
};
