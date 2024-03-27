const express = require("express");
const cors = require("cors");
const { connection } = require("./db");

require('dotenv');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("home");
})
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("connected to DB");
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log(error);
    }
})