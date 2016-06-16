var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: {
          unique: true
        }
    },
    image: {
        type: String
    },
    rating: {
        type: String
    },
    releaseYear: {
        type: String
    },
    watchLink: {
        type: String
    },
    learnLink: {
        type: String
    },
    user: {
        type: String,
        required: true
    }

});

var Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
