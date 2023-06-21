const { Schema, model } = require("mongoose")

const albumSchema = new Schema({
    id: {
        type: String,
    },
    albumName: {
        type: String,
    },
    artistName: {
        type: String,
    },
    albumPic: {
        type: String,
    },
    releaseDate: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Album = model("Album", albumSchema);

module.exports = Album;

// module.exports = albumSchema