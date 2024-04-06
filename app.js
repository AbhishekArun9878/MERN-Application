const express = require('express');
const morgan = require('morgan');
require ('dotenv').config();
require('./db/connection');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');

const app = express();
const cors = require('cors')

//for deploymment
const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));

app.use(morgan('dev'));
app.use(cors())

app.use('/api', userRoute)
app.use('/api', postRoute)

app.get('/*', function(req, res) { 
  res.sendFile(path.join(__dirname, '/build/index.html')); 
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
