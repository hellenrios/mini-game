import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
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
    setShowLevelModal(false);
  };

  const handleOpenLevelModal = () => {
    setShowLevelModal(true);
  };

  const handleCloseLevelModal = () => {
    setShowLevelModal(false);
  };

  const fadeProps = useSpring({ opacity: gameActive ? 1 : 0 });

  return (
    <section className="mini-game">
      {showLevelModal && (
        <LevelSelectionModal
          onSelectLevel={handleLevelSelect}
          onClose={handleCloseLevelModal}
        />
      )}
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
      <animated.div style={fadeProps}></animated.div>

      <div className='w-full' >
        <Ranking />
      </div>
    </section>    
  );
};

export default MiniGame;
