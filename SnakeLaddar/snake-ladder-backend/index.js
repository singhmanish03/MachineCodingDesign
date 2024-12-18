const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const gameRoutes = require("../snake-ladder-backend/routes/gameRoutes")


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/game',gameRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
