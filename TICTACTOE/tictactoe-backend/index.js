const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config();
const gameRoutes = require("./routes/gameRoutes");

const app = express();
app.use(cors());

app.use(express.json());

//connect to database 
mongoose
    .connect(process.env.MONGO_URI,{
    useNewUrlParser:true, useUnifiedTopology:true
    })
    .then(() => console.log("DataBase connected successfully"))
    .catch((err) => console.log)


//routes
app.use('/api/games' , gameRoutes);


//server 
const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`server running on PORT ${PORT}`) ) ;
