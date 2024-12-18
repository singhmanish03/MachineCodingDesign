class Player {
    constructor(name) {
      this.name = name;
      this.position = 0;
    }
    
    move(diceValue, boardSize, snakes, ladders,gameOver){
        let newPosition = this.position + diceValue;

        if (gameOver) {  // Access global gameOver flag
            return `${this.name} cannot move, the game is already over.`;
          }
      
        if(newPosition === boardSize) {
          gameOver = true; // Mark the game as over
          return `${this.name} Wins the game`
        }  

        if(newPosition > boardSize){
            newPosition = this.position;
            return `${this.name} rolled ${diceValue} , but cannot move beyond ${boardSize}`;
        }

        let message = `${this.name} rolled ${diceValue} and moved to position ${newPosition}`;
        
        //for one check 
        // if(snakes[newPosition]){
        //     newPosition = snakes[newPosition];
        // }else if(ladders[newPosition]) {
        //     newPosition = ladders[newPosition];
        // }
         // Handle snakes and ladders recursively
        while (snakes[newPosition] || ladders[newPosition]) {
            if (snakes[newPosition]) {
            newPosition = snakes[newPosition];
            message += `, but got bitten by a snake and slid to position ${newPosition}`;
            } else if (ladders[newPosition]) {
            newPosition = ladders[newPosition];
            message += `, but climbed a ladder to position ${newPosition}`;
            }
        }

        this.position = newPosition;

        if(this.position === boardSize) {
            gameOver = true; 
            return `${this.name} Wins the Game !!` ;
        }

        message += `. ${this.name} is now at position ${this.position}`;

        return message;
    }
   
  }
  
module.exports = Player;
  