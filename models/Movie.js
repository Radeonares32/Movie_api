const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required:[true,'`{PATH}` zorunludur'],
        maxlength:[20,'`{PATH}` en fazla `({MAXLENGTH}) olabilir`']
    },
    category:String,
    country:String,
    year:Number,
    imdb_score:{
        type:Number,
        max:10,
        min:1
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("movie",movieSchema);