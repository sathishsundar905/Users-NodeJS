const express = require("express");
const app = express();
const userRoutes =  require("./routes/users.routes");
const loginRoutes =  require("./routes/login.routes");
const mongodb =  require("./mongodb/mongodb.connect");
const cors =  require("cors");

mongodb.connect();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use("/users",userRoutes);
app.use("/login",loginRoutes);

app.get("/",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json("hello world");
});


app.use((error,req,res,next)=>{
    res.status(500).json({message:error.message});
});


module.exports = app;