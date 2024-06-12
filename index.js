import express, { response } from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const PORT = process.env.PORT || 5555

const app = express();

app.use(express.json());

// Allowlist for allowed origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://books-store-webapp.netlify.app'
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };
  
  app.use(cors(corsOptions));

app.get('/', (reqest,response) =>{
    console.log(reqest);
    return response.status(234).send(`Welcome to ${PORT} World`)
});

app.use('/books', booksRoute)


mongoose
    .connect(process.env.mongoDBURL)
    .then(() =>{
        console.log("Database Connected Sucessfully");
        app.listen(PORT,() =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })