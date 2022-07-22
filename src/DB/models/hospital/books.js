const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookSchema = new Schema({
  name: String,
  autor: String,
  rating: mongoose.Decimal128,
  description: String,
  countDownl: Intl,
  genre: String,
  img: String,
  type: String,
});

module.exports = Book = mongoose.model("books", bookSchema);
