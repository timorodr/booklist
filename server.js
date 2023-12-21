// *********** DEPENDENCIES

require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan") // logger

const app = express()
const { PORT = 3013 } = process.env; // destructing but same as yesterdays

// Bring in our MODEL
const Book = require("./models/Book.js")

// ************ MIDDLEWARE
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))

// ************* ROUTES & ROUTER

// INDEX - GET render all of the books 

// NEW - GET for the form to create a new book

// CREATE - POST
app.post("/books", async (req, res) => {
    if(req.body.completed === "on") {
        //if checked
        req.body.completed = true
    } else {
        // if not checked
        req.body.completed = false

    }
    let newBook = await Book.create(req.body)
    res.send(newBook)
})
// SHOW - GET rendering only one book


// ************** SERVER LISTENER 

app.listen(PORT, () => { console.log(`is this thing really on? ${PORT}`)})
