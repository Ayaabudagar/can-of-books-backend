// const axios = require('axios');
const port = process.env.PORT;
require(`dotenv`).config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });


module.exports= userCollection;
module.exports= getbooksHandler;

module.exports= deleteBookHandler;




const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    image_url:String

});

const userSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const myuserModel = mongoose.model('User', userSchema);
const mybookModel = mongoose.model('Book', BookSchema);


function userCollection() {
    const Aya = new myuserModel({
        email: 'ayahusam18@gmail.com',
        books: [
            {
                name: 'Cleanness',
                description: 'The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.',
                status: 'LIFE-CHANGING',
                image_url: 'https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg'
            },
            {
                name: 'The Monocle Book of Gentle Living‏',
                description: 'is a handbook to help you think about how to reconnect, make good things happen, to do something you care about and discover nice places and',
                status: 'RECOMMENDED TO ME',
                image_url: 'https://img.monocle.com/product/monocle-gentle-book-03-09-2022-5f5fd697e10c4.jpg?w=760&h=570&g=center&q=80'
            }
        ]

    })

    Aya.save();
}
userCollection();
function deleteBookHandler(req,res){
    const {email} = req.query;
    const index = Number(req.params.book_Index);
    myuserModel.find({email:email},(err,userData)=>{
        // filter the books for the owner and remove the one that matches the index
        const newBookArr = userData[0].books.filter((book,idx)=>{
            if(idx !== index) {
                return book;
            }
        })
        userData[0].books = newBookArr;
        userData[0].save();
        res.send(userData[0].books);
    
    
    })
    
    }
    deleteBookHandler();



function getbooksHandler(req,res){
let requestedUserEmail = req.query.email;
myuserModel.find({email:requestedUserEmail },function(err,userData){
    if(err){
        console.log('something went wrong');
    }
    else
    {
        //   console.log(userData[0].books);
          res.send(userData[0].books);
    }
})
}
getbooksHandler();

function addBookHandler(req,res){

    // we need to get the email of the person and the book(name,descrpition,...) to add to that person
    
        const{name,description,status,image_url,email}=req.body;
        myuserModel.find({email:email},(err,userData)=>{
            if(err){
                res.send('we have an error');
            }
            else{
                console.log('before pushing',userData[0])
                userData[0].books.push({
                    name: name,
                    description:description,
                    status:status,
                    image_url:image_url,
                })
                userData[0].save();
                res.send(userData[0].books)
    
            }
        })
    }
    addBookHandler();
   



