const express  = require("express");

const {initializeGame , rollDice} = require("../controllers/gameController");
const router = express.Router();

router.post('/start' , initializeGame);
router.post('/roll',rollDice);

module.exports = router;
