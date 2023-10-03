const {origins} = require('../middleware/allowed_origins.js');

const corsOptions = {
    origin: (origin, callback)=>{
        if(origins.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    }
}

module.exports = {corsOptions};