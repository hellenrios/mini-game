// src/utils/localStorage.js

export const getHighScores = () => {
  const highScores = localStorage.getItem("highScores");
  return highScores ? JSON.parse(highScores) : [];
};

export const saveHighScore = (score) => {
  if (score === 0) return; // Não salva pontuações zeradas
  const highScores = getHighScores();

  // Verifica se a pontuação já existe
  if (!highScores.includes(score)) {
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Ordena de forma decrescente
    highScores.splice(5); // Mantém apenas os top 5 scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
};

export const clearHighScores = () => {
  localStorage.removeItem("highScores");
};
