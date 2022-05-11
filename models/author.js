const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, book) => {
    if (err) {
      next(err);
    } else if (book.length > 0) {
      next(new Error('This author has books still'));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Author', authorSchema);
