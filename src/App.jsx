import React from 'react';
import MiniGame from './components/MiniGame';
import Footer from './components/Footer';
import '../src/index.css'

const App = () => {
  return (
    <div className="page-container">
      <main className="main-content">
        <div className="mini-game-container">
          <MiniGame />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
