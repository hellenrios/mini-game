import { getHighScores } from '../utils/localStorage';
import '../styles/Ranking.css';

const Ranking = () => {
  const highScores = getHighScores();

  return (
    <div className="ranking">
    <hr className="ranking__separator" />
      <h2>High Scores:</h2>
      {highScores.length > 0 ? (
        <ol>
          {highScores.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ol>
      ) : (
        <p>Ainda não há nenhuma pontuação.</p>
      )}
    </div>
  );
};

export default Ranking;