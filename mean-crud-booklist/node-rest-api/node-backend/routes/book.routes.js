const express = require('express');
const app = express();
 
const bookRoute = express.Router();
let Book = require('../model/Book');
 
// Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find().then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
  })
})



// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send('Book not found');
      }
      console.log('Book deleted successfully.');
      res.status(200).send('Book deleted successfully.');
    })
    .catch((error) => {
      console.error(`Could not delete book: ${error}`);
      res.status(500).send('Error deleting book.');
    });
});

bookRoute.route('/get-book/:id').get((req, res) => {
  Book.findById(req.params.id)
      .then(book => {
          if (!book) {
              return res.status(404).send('Book not found');
          }
          res.status(200).json(book);
      })
      .catch(err => res.status(500).send('Error retrieving book.'));
});

// Update a book
bookRoute.route('/edit-book/:id').put((req, res) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(book => {
      if (!book) {
        return res.status(404).send({
          message: "Book not found with id " + req.params.id
        });
      }
      res.status(200).json(book);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Book not found with id " + req.params.id
        });                
      }
      return res.status(500).send({
        message: "Error updating book with id " + req.params.id
      });
    });
});
module.exports = bookRoute;