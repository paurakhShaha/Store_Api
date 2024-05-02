require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connection');
const express = require('express');
const app = express();
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');
const product = require('./routes/products');


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

//Routes
app.use('/api/v1/products', product);
//error middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
  })
  } catch (error) {
    console.log(error);
    
  }
  
}

start();
