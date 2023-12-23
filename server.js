// *********** DEPENDENCIES

require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan") // logger
const methodOveride = require("method-override")
const bookRouter = require("./routes/books")

const app = express()
const { PORT = 3013 } = process.env; // destructing but same as yesterdays
const seedData = require("./models/seed.js")

// Bring in our MODEL
const Book = require("./models/Book.js")

// ************ MIDDLEWARE

app.use((req, res, next) => {
    req.model = {
        Book
    }
    console.log("this is middleware")
    
    // go to the next app method
    next()
})

app.use(morgan("dev")) // logging
app.use(express.urlencoded({extended: true})) // body parser this is how we get access to req.body
app.use(methodOveride("_method")) // key word to pass to method override lets us use DELETE PUT HTTP verbs
app.use("/public", express.static("public")) // this will serve up our public directory the url prefix of /public.styles.css

// ************* ROUTES & ROUTER

// app.use(prefix url. router to execute)
app.use("/books", bookRouter) // everything we use after this starts with this string 

// ************** SERVER LISTENER 

app.listen(PORT, () => { console.log(`is this thing really on? ${PORT}`)})
