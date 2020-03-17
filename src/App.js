// This project was created by Martin Henry the 17/03/2020 for a Docler interview.

import React from 'react';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <Game
        suitLength = {5}
        gridSize = {50}
      />
    </div>
  );
}

export default App;
