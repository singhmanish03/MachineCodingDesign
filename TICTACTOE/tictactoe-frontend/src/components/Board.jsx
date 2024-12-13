import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameId, setGameId] = useState(null); // Track the game ID
  const [loading, setLoading] = useState(true); // Track loading state
  const [player1, setPlayer1] = useState("Player 1"); // Default Player 1 name
  const [player2, setPlayer2] = useState("Player 2"); // Default Player 2 name


  // useEffect to initialize the game when the component is mounted
  useEffect(() => {
    const initializeGame = async () => {
      try {
        // Create a new game
        const response = await axios.post(`${API_BASE_URL}/api/games/create`);
        const initialGame = response.data;
        setGameId(initialGame._id); // Store the game ID for future updates
        setBoard(initialGame.board); // Set the initial board
        setIsNext(initialGame.isNext); // Set who is the next player
        // setWinner(winner); // Set winner if any
        setLoading(false); // Set loading to false after the game is initialized
      } catch (error) {
        console.error("Error initializing game:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    initializeGame();
  }, []); // Run only once when the component mounts

  // Handle a move on the board
  const handleClick = async (index) => {
    if (board[index] || winner || loading) return; // Prevent overriding or clicking after game ends or when loading

    const newBoard = [...board];
    
    newBoard[index] = isNext ? "X" : "O";
    const gameWinner = checkWinner(newBoard);
    try {
      // Update the game state
      const response = await axios.put(`${API_BASE_URL}/api/games/${gameId}`, {
        board: newBoard,
        isNext: !isNext,
        winner: gameWinner || null, // Keep winner null until checked
        player1: player1, // Send player1 name
        player2: player2, // Send player2 name
      });

      const updatedGame = response.data;
      setBoard(updatedGame.board);
      console.log("update", gameWinner);
      setWinner(updatedGame.winner); // Check for winner after the move
      console.log(updatedGame.winner); 
      setIsNext(updatedGame.isNext);
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };
  useEffect(() => {
    if (winner) {
       
      // Clear the input fields when the game ends
      setPlayer1("");
      setPlayer2("");
    }
  }, [winner]);

  // Check if there is a winner or if the game is a draw
  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // setWinner(board[a]);
        return board[a]; 
      }
    }

    // Check for draw
    if (board.every((cell) => cell)) return "Draw";

    return null;
  };

  // Reset the game by creating a new game
  const resetGame = async () => {
    try {
      setLoading(true); // Start loading when resetting the game
      const response = await axios.post(`${API_BASE_URL}/api/games/create`);
      const newGame = response.data;
      setGameId(newGame._id); // Update the game ID
      setBoard(newGame.board); // Reset the board
      setIsNext(newGame.isNext); // Set who is the next player
      setWinner(newGame.winner); // Reset winner
      setLoading(false); // Set loading to false after game reset
    } catch (error) {
      console.error("Error restarting game:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message until the game is initialized
  }

  return (
    
    <>
    <div style={{ textAlign: "center" }}>
    <div>
        {/* Inputs for player names */}
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          onClick={(e) => setPlayer1("")}
          placeholder="Player 1 Name"
          style={{ margin: "8px" }}
        />
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          onClick={(e) => setPlayer2("")}
          placeholder="Player 2 Name"
          style={{ margin: "8px" }}
        />

    </div> 

      <div style={{ display: "grid",justifyContent:"center", gridTemplateColumns: "repeat(3, 100px)", gap: "5px" ,paddingTop:"10px"}}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      <h2>
        {winner ? (winner === "Draw" ? "It's a Draw!" : ` ${winner} Wins!`) : `Next Player: ${isNext ? player1+ " - X" : player2 + " - O"}`}
      </h2>

      <button onClick={resetGame} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Restart Game
      </button>

    </div>
    </>
  );
};

export default Board;
