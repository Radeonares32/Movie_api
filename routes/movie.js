const express = require('express');
const router = express.Router();
const movie = require("../models/Movie");

router.get("/",(req,res,next)=>{
  const find = movie.find({ });
  find.then(data=>res.json(data)).catch(err=>next(err));
});
router.post('/', function(req, res, next) {
  const data = req.body;
  const Movie = new movie(req.body);
  const promise = Movie.save();
  promise.
  then(data=>{
    res.json(data);
  }).
  catch(err=>{
    next(err);
  });
  //res.json(data);
});
router.get("/:movie_id",(req,res,next)=>{
  const findById = movie.findById(req.params.movie_id);

  findById.
  then((movie)=> {
    /*if (!movie) {
      next({message: "Film Bulunamadi"});
    }*/
    res.json(movie);
  }).
  catch(err=>next(err));
});
router.put("/:movie_id",(req,res)=>{
  const update = movie.findByIdAndUpdate(req.params.movie_id,req.body);
  update.then(data=>res.json(data)).catch(err=>res.json(err));
});
module.exports = router;