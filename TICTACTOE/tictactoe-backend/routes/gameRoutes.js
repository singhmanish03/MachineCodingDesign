const express = require("express")
const router = express.Router();
const { createGame, getGame, updateGame } = require("../controllers/gameController")

router.post("/create",createGame);
router.get("/:id",getGame);
router.put("/:id", updateGame);

module.exports = router;
