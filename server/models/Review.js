//! reviews for music, each one will be associated with the music, so essentially this will be linked to the music model as well.

const { model, Schema } = require("mongoose");
const Album = require('./Album')

const reviewSchema = new Schema({
  id: {
    type: String,
  },
  albumName: {
    type: String,
    ref: "Album",
  },
  reviewText: {
    type: String,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const Review = model("Review", reviewSchema);

module.exports = Review;