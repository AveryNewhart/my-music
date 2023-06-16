//! this will be breaking down the different things associated with each music piece of content searched up,
//! examples, like the artist, album name, song name

//! REMEMBER TO NOT MAKE ANYTHING REQUIRED BECAUSE OF THE DIFFERENT SEARCH TYPES(song, album, artist)

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
})

const Album = model("Album", albumSchema);

module.exports = Album;

// module.exports = albumSchema