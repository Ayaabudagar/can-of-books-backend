'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/',homeHandler);
app.get('/books',booksHandler)
function homeHandler(req,res){
    res.send('Home Route');
}

function booksHandler(req,res){
    let userEmail = req.query.email;
    booksModel.find({email:userEmail},function(err,userData){
        if(err){
            console.log('something went wrong');
        }
        else
        {
            console.log(userData[0].books);
            res.send(userData[0].books);
        }
    })
}
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
// const userSchema = new mongoose.Schema({
//    email : String,
//    books :  [bookSchema]
// });
// const userModel = mongoose.model('user', userSchema);

// function seedUserCollection (){
//     const userInfo  = new  userModel({
//         email : 'ayahusam18@gmail.com'
//     })
//     userInfo.save();
// }
// seedUserCollection();





    
    // const bookSchema = new mongoose.Schema({
    //     name: String ,
    //     description:String,
    //     img:String,
    //     status: String 
        
    //  });
    //  const bookModel = mongoose.model('book', bookSchema);
    
const BooksSchema = new mongoose.Schema({  // create
    email: String,
    books:Array,
  });

const booksModel = mongoose.model('Books', BooksSchema);

function seedBooks(){
    const user = new booksModel({
        email: 'ayahusam18@gmail.com',
        books: [{
            name: 'The Silent Patient', 
            description: 'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.', 
            status: 'LIFE-CHANGING'
        },{
            name: 'The Hitchhickers Guide To The Gallaxy.',
            description: 'earth is destroyed and folks try to determine the ultimate question to the universe and everything',
            status: 'RECOMMENDED TO ME'
        }], 
       });
       console.log(user); // 'Silence'
       user.save();
    }

    seedBooks();









app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})