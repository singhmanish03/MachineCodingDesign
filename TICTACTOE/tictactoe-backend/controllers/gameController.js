const Game = require("../models/gameModel");

//create a new game 
exports.createGame = async (req, res) => {
  try {
    const game = new Game(); // Create a new game instance
    await game.save(); // Save it to the database
    res.status(201).json(game); // Respond with the created game
  } catch (error) {
    console.error("Error creating game:", error); // Log the error to the console
    res.status(500).json({ message: "Error creating game", error: error.message }); // Include the error message in the response
  }
};

//get a game by ID 

exports.getGame = async (req,res) => {
    try {
        const game = await Game.findById(req.params.id);
        if(game) res.json(game);
        else res.status(404).json({message: "Game not Found"});
    } catch (error) {
        res.status(500).json({message:"Error fetching Game", error})
    }
};

//update game state 

exports.updateGame = async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      if (game) {
        // Update the game state (board and turn)
        game.board = req.body.board || game.board;
        game.isNext = req.body.isNext !== undefined ? req.body.isNext : game.isNext;
  
        // Check the winner and update game.winner with the player's name (player1 or player2)
        if (req.body.winner) {
          if (req.body.winner === "X") {
            game.winner = req.body.player1; // Player 1 is the winner
          } else if (req.body.winner === "O") {
            game.winner = req.body.player2; // Player 2 is the winner
          } else {
            game.winner = null; // If it's a draw or no winner, reset winner
          }
        } else {
          // If no winner, reset winner to null (in case of a draw or no winner yet)
          game.winner = null;
        }
        console.log("ggg" , game.winner)
  
        await game.save(); // Save the updated game state
        console.log("Winner after saving:", game.winner);
        res.json(game); // Send the updated game as the response
      } else {
        res.status(404).json({ message: "Game not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error in updating game", error: error.message });
    }
  };
  
