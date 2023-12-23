// *********** DEPENDENCIES

require("dotenv").config() // this is how we make use of our .env variables
require("./config/db.js") // bring in our db config
const express = require("express")
const morgan = require("morgan") // logger
const methodOveride = require("method-override")

const app = express()
const { PORT = 3013 } = process.env; // destructing but same as yesterdays

// Bring in our MODEL
const Book = require("./models/Book.js")

// ************ MIDDLEWARE
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))
app.use(methodOveride("_method")) // key word to pass to method override lets us use DELETE PUT HTTP verbs

// ************* ROUTES & ROUTER

// *INDEX - GET render all of the books 
app.get("/books", async (req, res) => {
    // find all of the books
    let books = await Book.find({})
    res.render("index.ejs", {
        books: books.reverse()
    })
    // render all of the books to index.ejs
})
// *NEW - GET for the form to create a new book
app.get("/books/new", (req, res) => {
    res.render("new.ejs") // render the file
})

// * DELETE 
app.delete("/books/:id", async (req, res) => {
   try {
        // Find a book and then delete
        let deletedBook = await Book.findByIdAndDelete(req.params.id)
        console.log(deletedBook)
        // redirect back to the index
        res.redirect("/books")

   } catch (error) {
    res.status(500).send("Somehting went wrong when deleting")
   }
})



//* UPDATE
app.put("/books/:id", async (req, res) =>{
    try{// handle our checkbox
        if(req.body.completed === "on")  {
            req.body.completed = true
        } else {
            req.body.completed = false
        }
        // Then find by id and update with the req.body
        // findByIdAndUpdate - id, data to update, options obj
        let updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new: true
            }
        )
        // redirect to the show route with the updated book
        res.redirect(`/books/${updatedBook._id}`)
    } catch (error) {
        res.send("something went wrong")
    }
})




// *CREATE - POST
app.post("/books", async (req, res) => {
    try {
        if(req.body.completed === "on") {
            //if checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
    
        }
        let newBook = await Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
})

//* EDIT 
app.get("/books/edit/:id", async (req, res) => {
    try {
        //find the book and edit
        let foundBook = await Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("hello from the errerrereerer")
    }
})
// *SHOW - GET rendering only one book
app.get("/books/:id", async (req, res) => {
    // find book by _id
    let foundBook = await Book.findById(req.params.id) // this is the request params object
    console.log(foundBook)
    // render show.ejs with the found book
    res.render("show.ejs", {
        book: foundBook
    })
})

// ************** SERVER LISTENER 

app.listen(PORT, () => { console.log(`is this thing really on? ${PORT}`)})
