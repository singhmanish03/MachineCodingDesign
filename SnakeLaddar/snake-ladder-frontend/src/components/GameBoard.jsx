import React, { useState } from 'react';
import axios from 'axios';

// Snakes and Ladders configuration
const snakes = { 99: 54, 70: 55, 52: 42, 25: 2 };
const ladders = { 6: 25, 11: 40, 60: 85, 46: 90 };

const GameBoard = ({ players }) => {
  const [diceValue, setDiceValue] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameMessage, setGameMessage] = useState('');
  const [playerPositions, setPlayerPositions] = useState(
    players.map((player) => ({ name: player, position: 0 }))
  );
  const [gameOver, setGameOver] = useState(false);

  const rollDice = async () => {
    try {
      const currentPlayer = players[currentPlayerIndex];
      const response = await axios.post('http://localhost:5000/game/roll');
      const { diceValue, playerName, message } = response.data;

      setDiceValue(diceValue);
      setCurrentPlayer(playerName);
      setGameMessage(message);

      setPlayerPositions((prev) => {
        return prev.map((player) => {
          if (player.name === playerName && !gameOver) {
            // Calculate the new position based on the dice roll
            let newPosition = player.position + diceValue;

            // If the new position exceeds 100, don't move the player
            if (newPosition > 100) {
              newPosition = player.position; // Stay at the current position
              setGameMessage(`${playerName} rolled a ${diceValue}. ${playerName} cannot move beyond 100.`);
            } else {
              // Check for snake or ladder at the new position
              if (snakes[newPosition]) {
                newPosition = snakes[newPosition]; // Move to the snake's tail
                setGameMessage(`${playerName} rolled a ${diceValue}. ${playerName} hit a snake! Now at position ${newPosition}.`);
              } else if (ladders[newPosition]) {
                newPosition = ladders[newPosition]; // Move to the ladder's top
                setGameMessage(`${playerName} rolled a ${diceValue}. ${playerName} climbed a ladder! Now at position ${newPosition}.`);
              } else {
                setGameMessage(`${playerName} rolled a ${diceValue}. ${playerName} is now at position ${newPosition}.`);
              }
            }

            // Check if the player has won the game
            if (newPosition === 100) {
              setGameOver(true);
              setGameMessage(`${playerName} wins the game!`);
            }

            return { ...player, position: newPosition }; // Update the player's position
          }
          return player; // Return the player unchanged if the name doesn't match


        });
      });

       // Move to the next player
       setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);

    } catch (err) {
      alert('Error rolling dice: ' + err.message);
    }
  };

  return (
    <div>
      <h3>Players </h3>
      <p>{players[currentPlayerIndex]}'s turn to roll the dice!</p>
    
        {playerPositions.map((player) => (
          <li key={player.name}>
            {player.name}: Position {player.position}
          </li>
        ))}
     

      <button onClick={rollDice} disabled={gameOver}>Roll Dice</button>
      {diceValue !== null && (
        <p>
          {currentPlayer} rolled a {diceValue}. {gameMessage}
        </p>
      )}

    {gameOver && <div> <h2>Game Over! And Winner is  <span> {currentPlayer}</span> </h2> </div>}
    </div>
  );
};

export default GameBoard;
