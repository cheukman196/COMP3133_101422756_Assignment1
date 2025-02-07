require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server'); 
const { expressMiddleware } = require('@apollo/server');

const userRouter = require('./routes/userRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')
const errorHandler = require('./middleware/errorHandler.js')
const SERVER_PORT = process.env.PORT || 3000;

// configure environment (based on current .env)
var nodeEnv = process.env.NODE_ENV || "development";
require('dotenv').config({ path: `.env.${nodeEnv}`});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }};

async function run() {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Connected to database successfully.')
    
    app.get('/', (req, res) => {
        res.send('Welcome to Assignment 1');
    })

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/emp',employeeRouter);

    app.use(errorHandler);

    app.listen(SERVER_PORT, () => { console.log('Server is running...') });


  } finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir); 

