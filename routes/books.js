// ******* DEPENDENCIES

const express = require("express")
const router = express.Router()


// ****** ROUTES - INDUCESS





// *INDEX - GET render all of the books 
router.get("/", async (req, res) => {
    // find all of the books
    let books = await req.model.Book.find({})
    res.render("index.ejs", {
        books: books.reverse()
    })
    // render all of the books to index.ejs
})


// *NEW - GET for the form to create a new book
router.get("/new", (req, res) => {
    res.render("new.ejs") // render the file
})



// * DELETE 
router.delete("/:id", async (req, res) => {
   try {
        // Find a book and then delete
        let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
        console.log(deletedBook)
        // redirect back to the index
        res.redirect("/books")

   } catch (error) {
    res.status(500).send("Somehting went wrong when deleting")
   }
})



//* UPDATE
router.put("/:id", async (req, res) =>{
    try{// handle our checkbox
        if(req.body.completed === "on")  {
            req.body.completed = true
        } else {
            req.body.completed = false
        }
        // Then find by id and update with the req.body
        // findByIdAndUpdate - id, data to update, options obj
        let updatedBook = await req.model.Book.findByIdAndUpdate(
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
router.post("/", async (req, res) => {
    try {
        if(req.body.completed === "on") {
            //if checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
    
        }
        let newBook = await req.model.Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
})



//* EDIT 
router.get("/edit/:id", async (req, res) => {
    try {
        //find the book and edit
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("hello from the errerrereerer")
    }
})



// * SEED - GET
router.get("/seed", async (req, res) => {

    try {
        // delete everything in the database
        await req.model.Book.deleteMany({})
        // Create data in the database
        await req.model.Book.create(
            req.model.seedData
        )
        // redirect back to the index
        res.redirect("/books")
    } catch (error) {
        res.send("Somefing went wrong with your seeds")
    }
})



// *SHOW - GET rendering only one book
router.get("/:id", async (req, res) => {
    // find book by _id
    let foundBook = await req.model.Book.findById(req.params.id) // this is the request params object
    console.log(foundBook)
    // render show.ejs with the found book
    res.render("show.ejs", {
        book: foundBook
    })
})


module.exports = router