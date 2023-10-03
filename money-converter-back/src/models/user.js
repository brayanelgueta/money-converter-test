const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  refresh_token: String,
  
},
{
  virtuals:{
      id: {
          get(){
              return this._id
          }
      }
  }
});

module.exports = mongoose.model("User", userSchema);
