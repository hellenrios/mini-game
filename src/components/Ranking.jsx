import { getHighScores } from '../utils/localStorage';
import '../styles/Ranking.css';

const Ranking = () => {
  const highScores = getHighScores();

  return (
    <div className="ranking">
      <h2>High Scores</h2>
      {highScores.length > 0 ? (
        <ol>
          {highScores.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ol>
      ) : (
        <p>No high scores yet.</p>
      )}
    </div>
  );
};

export default Ranking;
