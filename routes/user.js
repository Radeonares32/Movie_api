const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const route = require("./directors");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user");
});
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcryptjs.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash,
    });
    const addUser = user.save();
    addUser.then((data) => res.json(data)).catch((err) => res.json(err));
  });
});
router.post('/token',(req,res)=>{
    const {username,password} = req.body;
    User.findOne({
        username
    },(err,data)=>{
        if(err)
            throw err;
        if(!data){
            res.json({
                status:false,
                message:"Not found Username"
            });
        }
        else{          
            bcryptjs.compare(password,data.password).then(result=>{
                if(!result){
                    res.json({
                        status:false,
                        message:"Wrong Password"
                    });
                }else{
                    const payload = {
                        username
                    }
                    const token = jwt.sign(payload,req.app.get('secret_keys'),{
                        expiresIn:720 //12 hours
                    });
                    res.json({
                        status:true,
                        token
                    });
                }
            });
        }
    })
});

module.exports = router;

