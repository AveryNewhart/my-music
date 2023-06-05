//! this will be breaking down the different things associated with each music piece of content searched up,
//! examples, like the artist, album name, song name

//! REMEMBER TO NOT MAKE ANYTHING REQUIRED BECAUSE OF THE DIFFERENT SEARCH TYPES(song, album, artist)

const { Schema, model } = require("mongoose")

const musicSchema = new Schema({
    musicId: {
        type: String,
    },
    artist: {
        type: String,
    },
    releaseDate: {
        type: String,
    },
    albumName: {
        type: String,
    },
    songName: {
        type: String,
    },
    genre: {
        type: String,
    },
})

module.exports = musicSchema