'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// const userCollection = require('./myModal/schemamodel');
const getbooksHandler = require('./myModal/schemamodel');



app.get('/',homeHandler);
app.get('/books', getbooksHandler);

function homeHandler(req,res){
    res.send('Home Route');
}


    app.listen(PORT, () => {
        console.log(`listen on ${PORT}`);
    })





    