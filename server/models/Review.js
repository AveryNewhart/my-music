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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    ref: "User",
  },
});

// Define static methods
reviewSchema.statics.getReviewById = async function (id) {
  // Implement the logic to retrieve a review by ID
  try {
    const review = await this.findById(id);
    return review;
  } catch (error) {
    throw new Error('Failed to get review by ID');
  }
};

const Review = model("Review", reviewSchema);

module.exports = Review;