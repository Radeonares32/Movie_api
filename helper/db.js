const mongoose = require("mongoose");
module.exports = () => {
    mongoose.connect("mongodb+srv://radeonares32:bugisencokyasa32@cluster0.tnoae.mongodb.net/movie-api?retryWrites=true&w=majority"
        ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        });
        mongoose.connection.on("open",()=>{
        console.log("MongoDB Bağlandı");
        });
        mongoose.connection.on("error",(err)=>{
            if(err)
                console.log(err);
        });
}

//mongoose.Promise = Promise();
mongoose.Promise = global.Promise;