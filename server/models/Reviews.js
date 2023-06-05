//! reviews for music, each one will be associated with the music, so essentially this will be linked to the music model as well.

const { model, Schema } = require("mongoose");
const musicSchema = require('./Music')

const reviewSchema = new Schema({
  reviewId: {
    type: String,
  },
  movieTitle: musicSchema,
  reviewAuthor: {
    type: String,
  },
  reviewText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Review = model("Review", reviewSchema);

module.exports = reviewSchema;