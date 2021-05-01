const express = require('express');
const router = express.Router();
const movie = require("../models/Movie");

router.get("/",(req,res,next)=>{
  const find = movie.find({ });
  find.then(data=>res.json(data)).catch(err=>next(err));
});
router.post('/new', function(req, res, next) {
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
//top 10 list
router.get("/top10",(req,res)=>{
   const top10 = movie.find({ }).limit(10).sort({imdb_score:-1});
   top10.then(data=>res.json(data)).catch(err=>res.json(err));
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
  const update = movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true,useFindAndModify:false});
  update.then(data=>res.json(data)).catch(err=>res.json(err));
});
router.delete("/:movie_id",(req,res)=>{
  const deleted = movie.findByIdAndRemove(req.params.movie_id,{useFindAndModify:false});
  deleted.then(data=>res.json(data)).catch(err=>res.json(err));
});
router.get("/between/:start_year/:end_year",(req,res)=>{
  const between = movie.find({
    year:{"$gte": parseInt(req.params.start_year),"$lte":parseInt(req.params.end_year)}
  });
  between.then(data=>res.json(data)).catch(err=>res.json(err));
});
module.exports = router;
