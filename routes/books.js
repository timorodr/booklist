// ******* DEPENDENCIES

const express = require("express")
const router = express.Router()

// bring in our controller
const bookController = require("../controllers/books.js")
// ****** ROUTES - INDUCESS





// *INDEX - GET render all of the books 
router.get("/", bookController.index)


// *NEW - GET for the form to create a new book
router.get("/new", bookController.newForm)



// * DELETE 
router.delete("/:id", bookController.destroy)



//* UPDATE
router.put("/:id", bookController.update) 




// *CREATE - POST
router.post("/", bookController.create)



//* EDIT 
router.get("/edit/:id", bookController.edit)



// * SEED - GET
router.get("/seed", bookController.seed)



// *SHOW - GET rendering only one book
router.get("/:id", bookController.show)


module.exports = router