const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.get('/', (req,res) => {
    res.send('Brand Company Is Running')
  })
  
  app.listen(port, () => {
    console.log(`Brand company use this port : ${port}`)
  })

