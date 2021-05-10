const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
const tokenverify = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(tokenverify){
        const tokenController = jwt.verify(tokenverify,req.app.get('secret_keys'),(err,data) => {
            if(err){
                res.json({
                    status:false,
                    message:'No auth token'
                });
            }else{
                req.decode = data;
                next();
            }
                
        });
    }else{
        res.json({
            status:false,
            message:"No Token"
        });
    }
}