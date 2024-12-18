import axios from 'axios';
import React,{useState} from 'react'

const StartGame = ({onGameStart}) => {
  const [playerNames, setPlayerNames] = useState('')

  const handleStart = async() => {
    try {
      const names = playerNames.split(',').map((name) => name.trim());
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/game/start`,{playerNames: names} );
      onGameStart(names);
    } catch (error) {
      alert('Error starting game: ' + error.message);
    }
  };

  return (
    <div>
      <input
       type="text"
       placeholder='Enter Player names '
      value={playerNames}
      onChange={(e) => setPlayerNames(e.target.value)}
      />

      <button onClick={handleStart}>Start Game</button>
    </div>
  )
}

export default StartGame;
