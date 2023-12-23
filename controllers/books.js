// ********** DEPENDENCIES



// No middleware - remove the req.model. infront of book
// const book = require("../models/Book")
// * EXPORT
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    show,
    seed
}


// ROUTE CONTROLLERS

async function index(req, res) {
    // find all of the books
    let books = await req.model.Book.find({})
    // render all of the books to index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
}
async function newForm(req, res) {
    res.render("new.ejs") // render the file
}
async function destroy(req, res) {
    try {
         // Find a book and then delete
         let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
         console.log(deletedBook)
         // redirect back to the index
         res.redirect("/books")
 
    } catch (error) {
     res.status(500).send("Somehting went wrong when deleting")
    }
 }
async function update(req, res) {
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
}
async function create(req, res) {
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
}
async function edit(req, res) {
    try {
        //find the book and edit
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("hello from the errerrereerer")
    }
}
async function seed(req, res) {

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
}
async function show(req, res) {
    // find book by _id
    let foundBook = await req.model.Book.findById(req.params.id) // this is the request params object
    console.log(foundBook)
    // render show.ejs with the found book
    res.render("show.ejs", {
        book: foundBook
    })
}