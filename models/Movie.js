const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:Number,
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("movie",movieSchema);