const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
// const albumSchema = require('./Album')
//! call in and reference the music and review models to be associated with the user model.

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Must match an email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
  },
    // New fields for album categories
    listenedAlbums: [{
      id: { type: String },
      albumName: { type: String },
      artistName: { type: String },
      albumPic: { type: String },
      releaseDate: { type: String }
    }],
    wannaListenAlbums: [{
      id: { type: String },
      albumName: { type: String },
      artistName: { type: String },
      albumPic: { type: String },
      releaseDate: { type: String }
    }],
    reviews: [{
      id: { type: String },
      albumName: { type: String },
      reviewText: { type: String },
    }],  
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//TODO We can add userSchema virtuals for anything we can count like watched, watchlist, follower, following, or how many reviews a user has made

const User = model("User", UserSchema);

module.exports = User;
