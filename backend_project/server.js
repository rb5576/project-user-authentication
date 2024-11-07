// const express = require('express')
import express from "express";
import userRouter from "./userRoutes/userRoutes.js";
import mongoDb from './db/dbConnect.js';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';


dotenv.config(); // access variable from env
const server = express();
server.use(cors());
// server.use(logger('dev'));

mongoDb();

server.use(express.json());
server.use('/', userRouter);





// server.get("/alluser",(req,res)=>{
//     res.send("hello from the get")
// })
// server.get("/get2",(req,res)=>{
//     res.send("hello from the get2")
// })
// server.post("/get",(req,res)=>{
//     res.send("hello from the post")
// })
// server.post("/post",(req,res)=>{
//     res.send("hello from the post")
// })
// server.put("/put",(req,res)=>{
//     res.send("hello from the put")
// })
// server.delete("/delete",(req,res)=>{
//     res.send("hello from the delete")
// })

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log("server connected");
});

// server.listen(3000, () => {
//     console.log("server connected");
// });