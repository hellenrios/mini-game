import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Button from './Button';
import { gameTexts } from '../constants';
import '../styles/LevelSelectionModal.css';

const LevelSelectionModal = ({ onSelectLevel, onClose, isOpen, showCloseButton }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(modalRef.current, { opacity: 1, y: 0, duration: 0.3, display: 'flex' });
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        onComplete: () => {
          modalRef.current.style.display = 'none';
        }
      });
    }
  }, [isOpen]);

  return (
    <div ref={modalRef} className="level-selection-modal">
      <div className="level-selection-modal__content">
        {showCloseButton && (
          <button className="level-selection-modal__close" onClick={onClose}>X</button>
        )}
        <h1 className="level-selection-modal__game-title">{gameTexts.title}</h1>
        <h2 className="level-selection-modal__title">{gameTexts.levelSelect}</h2>
        <div className="level-selection-modal__buttons">
          <Button onClick={() => onSelectLevel('Fácil')}>{gameTexts.easy}</Button>
          <Button onClick={() => onSelectLevel('Intermediário')}>{gameTexts.intermediate}</Button>
          <Button onClick={() => onSelectLevel('Difícil')}>{gameTexts.hard}</Button>
        </div>
        <hr className="level-selection-modal__separator" />
        <div className="level-selection-modal__explanation">
          <h3>{gameTexts.explanationTitle}</h3>
          <p>{gameTexts.explanationText}</p>
          <ul>
            {gameTexts.explanationLevels.map((level, index) => (
              <li key={index}><strong>{level.label}:</strong> {level.description}</li>
            ))}
          </ul>
          <p>{gameTexts.explanationClosing}</p>
        </div>
      </div>
    </div>
  );
};

export default LevelSelectionModal;