export const getHighScores = () => {
  const highScores = localStorage.getItem("highScores");
  return highScores ? JSON.parse(highScores) : [];
};

export const saveHighScore = (score) => {
  if (score === 0) return;
  const highScores = getHighScores();

  if (!highScores.includes(score)) {
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
};

export const clearHighScores = () => {
  localStorage.removeItem("highScores");
};
