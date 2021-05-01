const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();

//!models

const Directors = require("../models/Director");


route.post("/new", (req, res) => {
    const director = new Directors(req.body);
    const save = director.save();
    save.then(data => res.json(data)).catch(err => res.json(err));
});
route.get("/", (req, res) => {
    const director = Directors.aggregate([{
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true //Boş olsada getir

            }
        },
        {
            $group: {
                _id: {
                    _id: '$id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    director.then(data => res.json(data)).catch(err => res.json(err));
});
route.get("/:director_id", (req, res) => {
    const director = Directors.aggregate([
        {
            $match: {
                "_id":mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true //Boş olsada getir

            }
        },
        {
            $group: {
                _id: {
                    _id: '$id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    director.then(data => res.json(data)).catch(err => res.json(err));
});
route.put("/:director_id",(req, res)=>{
    const update = Directors.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
    update.then(data => res.json(data)).catch(err => res.json(err));
});
route.delete("/:director_id",(req, res)=>{
   const del = Directors.findByIdAndDelete(req.params.director_id);
   del.then(data => res.json(data)).catch(err => res.json(err));

});
module.exports = route;
