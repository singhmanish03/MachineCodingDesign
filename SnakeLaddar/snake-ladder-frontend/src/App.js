import React, { useState } from 'react'
import StartGame from '../src/components/StartGame' ;
import GameBoard from './components/GameBoard';
import './App.css'


const App = () => {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameStart = (playerNames) => {
    setPlayers(playerNames);
    setIsGameStarted(true);
  }

  return (
    <div className='App'>
      {
        !isGameStarted ? (<StartGame onGameStart={handleGameStart} />) : (<GameBoard players={players} />)
      }
    </div>
  )
}

export default App
