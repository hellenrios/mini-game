import '../styles/ProgressBar.css';

const ProgressBar = ({ timeLeft, totalTime }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__progress" style={{ width: `${(timeLeft / totalTime) * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
