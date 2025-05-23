require('dotenv').config({path:'./config/.env'});
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

const app = express();

connectDB();

app.use(cors()) //  allow all origin
// app.use(cors({origin:'http://localhost:5173'})) //  allow specific origin 5173
app.use(express.json()) // Middleware to parse json
app.use('/api/users',userRoutes)

app.get("/",(req,res)=>{
    res.send("Hello user");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server running at PORT : ${process.env.PORT}`);  
})