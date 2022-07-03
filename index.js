//Adding mongoose to our program 
const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')



const date = new Date().toString();
//console.log("Date : ",date)


//Create a new connection & create a new database
mongoose.connect("mongodb://localhost:27017/imdb")
.then(()=> console.log("Connection Successful"))
.catch((err)=> console.log(err))

//Create Schema
//Defines structure of a document
//Default values, validators, specify datatypes

const movieSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : 1,
        minLength : [3,"Enter atleast 3 letters"],
        maxLength : 15
    },
    genre : {
        type : String,
        enum : ["Action","Comedy"]
    },
    rating : {
        type : Number,
        validate(value)
        {
            if(value < 0 || value >10)
            {
                throw new Error("Enter Rating between 0-10");
            }
        }
    },
    released : Boolean,
    releasedDate : {
        type : Date,
        min : '2000-01-01',
        max : '2023-01-01'
    }
})


movieSchema.plugin(uniqueValidator);

//Creating collection
//Creating a model
const Movie = new mongoose.model("Movie",movieSchema);

//Create or Insert a single Document

const createDocument = async () => {
    try
    {
        const movie1 = new Movie({
            name : "Titanic",
            genre : "Action",
            rating : 9,
            released : true,
            releasedDate : "1999-12-28"
        })
        
        const result =await movie1.save();
        console.log(result)
    }
    catch(err)
    {
        console.log(err)
    }
}

createDocument();


//Create multiple documents 


const createDocuments = async () => {
    try
    {
        const movie3 = new Movie({
            name : "Avengers",
            genre : "Action",
            rating : 8,
            released : true,
            releasedDate : "2020-07-21"
        })

        const movie4 = new Movie({
            name : "Avatar",
            genre : "Action",
            rating : 7,
            released : true,
            releasedDate : "2005-02-15"
        })

        const movie5 = new Movie({
            name : "Deadpool",
            genre : "Comedy",
            rating : 10,
            released : true,
            releasedDate : "2019-01-11"
        })
        
        const result =await Movie.insertMany([movie3,movie4,movie5]);
        console.log(result)
    }
    catch(err)
    {
        console.log(err)
    }
}

//createDocuments();

//Read Documents

const getDocument = async () =>{
    try{

        const result = await Movie.find({})
        //.select({name : 1})
        .sort({ rating : -1 })
        .count()
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
}

//getDocument();

const updateDocument = async (_id) =>{
try{
    const result = await Movie.findByIdAndUpdate({_id},{$set : {rating : 7}})
    console.log(result)
}
catch(err)
{
    console.log(err)
}

}
//updateDocument("62c1acce3f9e8fd1b6d5e85c");


//Deleting document

const deleteDocument = async (_id) =>{
    try
    {
        const result = await Movie.findOneAndDelete({_id})
        console.log(result)
    }
    catch(err)
    {
        console.log(err)
    }
    
}

//deleteDocument("62c1a9f1ed23714fbc7d99b6");