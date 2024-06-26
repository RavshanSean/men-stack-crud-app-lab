const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: String,
    isReadyToWatch: Boolean,
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;