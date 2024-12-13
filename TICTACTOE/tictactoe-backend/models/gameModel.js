const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    board : {
        type:[String],
        default: Array(9).fill(null)
    },
    isNext : {
        type: Boolean,
        default: true
    },
    winner : {
        type: String,
        default:null
    },
});

module.exports = mongoose.model("Game" , gameSchema);
