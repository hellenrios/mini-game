import '../styles/Sequence.css';

const Sequence = ({ sequence, currentKeyIndex, errorIndex }) => (
    <div className="sequence">
      {sequence.map((char, index) => (
        <div className="sequence__item-container" key={index}>
          <span 
            className={`sequence__item ${index < currentKeyIndex ? 'sequence__item--correct' : (index === currentKeyIndex ? 'sequence__item--current' : '')}`}
          >
            {char}
          </span>
          {index === errorIndex && <span className="sequence__item--error">X</span>}
        </div>
      ))}
    </div>
  );

export default Sequence;