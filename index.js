import express, { response } from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
  })
)

app.get('/', (reqest,response) =>{
    console.log(reqest);
    return response.status(234).send(`Welcome to ${PORT} World`)
});

app.use('/books', booksRoute)


mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("Database Connected Sucessfully");
        app.listen(PORT,() =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })