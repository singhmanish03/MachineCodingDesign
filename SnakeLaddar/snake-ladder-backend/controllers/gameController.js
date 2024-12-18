const Player = require("../models/Player");

let players = [] ;
let currentTurn = 0 ;
let gameOver = false; 
const boardSize = 100; 

const snakes = { 99: 54, 70: 55, 52: 42, 25: 2 };
const ladders = { 6: 25, 11: 40, 60: 85, 46: 90 };

//intialisze the game 

const initializeGame = (req,res) => {
    const {playerNames} = req.body;

    if(!playerNames || playerNames.length < 2) {
        return res.status(400).send('At least two players required to start the game');
    }

    players = playerNames.map((name) => new Player(name));
    currentTurn = 0;
    gameOver = false;   // Reset game over flag on game initialization 
    res.send("Game Initialized") ;
};

//roll dice 

const rollDice = (req,res) => {

    if (gameOver) {  // Check if the game is already over
        return res.status(400).send('Game Over! No more moves can be made.');
    }

    const diceValue = Math.floor(Math.random() * 6) + 1 ;
    const player = players[currentTurn];

    const result = player.move(diceValue,boardSize,snakes,ladders,gameOver);

      // Check if the player has won
  if (player.position === boardSize) {
    gameOver = true; // Set the game as over when a player wins
    return res.json({ diceValue, playerName: player.name, message: `${player.name} wins the game!` });
  }
  
    currentTurn = (currentTurn + 1) % players.length;

    res.json({diceValue, playerName : player.name , message: result});
};

module.exports = {initializeGame , rollDice};

