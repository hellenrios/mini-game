import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import LevelSelectionModal from './LevelSelectionModal';
import Button from './Button';
import Sequence from './Sequence';
import ProgressBar from './ProgressBar';
import Feedback from './Feedback';
import Ranking from './Ranking';
import { useMiniGameLogic, levels } from '../hooks/useMiniGameLogic';
import { saveHighScore } from '../utils/localStorage';
import '../styles/MiniGame.css';

const MiniGame = () => {
  const [showLevelModal, setShowLevelModal] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const mainRef = useRef(null);

  const {
    sequence,
    currentKeyIndex,
    timeLeft,
    gameActive,
    feedback,
    errorIndex,
    score,
    startGame,
    resetGame,
  } = useMiniGameLogic(selectedLevel);

  useEffect(() => {
    if (showMiniGame) {
      gsap.fromTo(mainRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 });
    }
  }, [showMiniGame]);

  useEffect(() => {
    if (selectedLevel) {
      startGame();
    }
  }, [selectedLevel, startGame]);

  useEffect(() => {
    if (!gameActive && feedback === 'Wrong key! Game over.') {
      saveHighScore(score); 
    }
  }, [gameActive, feedback, score]);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    gsap.to('.level-selection-modal', {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => {
        setShowLevelModal(false);
        setShowMiniGame(true);
      }
    });
  };

  const handleOpenLevelModal = () => {
    setShowLevelModal(true);
    setShowMiniGame(false);
    setShowCloseButton(true);
  };

  const handleCloseLevelModal = () => {
    gsap.to('.level-selection-modal', {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => {
        setShowLevelModal(false);
        setShowMiniGame(true);  // Mantém o mini-game visível
      }
    });
  };

  return (
    <div>
      {showLevelModal && (
        <LevelSelectionModal
          onSelectLevel={handleLevelSelect}
          onClose={handleCloseLevelModal}
          isOpen={showLevelModal}
          showCloseButton={showCloseButton}
        />
      )}
      {showMiniGame && (
        <section className="mini-game" ref={mainRef}>
          <h1 className="mini-game__title">TypeRush</h1>
          <div className="mini-game__buttons">
            <Button onClick={resetGame}>Reset</Button>
            <Button onClick={handleOpenLevelModal}>Nível</Button>
          </div>
          <div className="mini-game__level">Nível: {selectedLevel}</div>
          <div className="mini-game__score">Score: {score}</div>
          <Sequence sequence={sequence} currentKeyIndex={currentKeyIndex} errorIndex={errorIndex} />
          <ProgressBar timeLeft={timeLeft} totalTime={levels[selectedLevel]} />
          <Feedback feedback={feedback} />
          <div className='w-full'>
            <Ranking />
          </div>
        </section>
      )}
    </div>
  );
};

export default MiniGame;