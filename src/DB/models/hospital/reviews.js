const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema({
  idUser: String,
  idBook:String,
  review: String,
  rating:Intl,
});

module.exports = Review = mongoose.model("reviews", reviewSchema);
