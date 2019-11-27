const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const saltRounds = 10

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    password: {
      type:String,
      required: true
    },
    phonenumber:String,
    email: {
      type: String,
      unique:true,
      required: true
    },
    type: Number // 1 customer  2 seller 
  },
  { timestamps: true });

// userSchema.pre('save',function(next){
//   let user = this
//   if(user.password && user.isModified()){
//     bcrypt
//     .hash(user.password, saltRounds)
//     .then(function(hash) {
//       // Store hash in your password DB.
//       user.password = hash
//       console.log(user.password)
//       next()

//   })
//   .catch((err)=>console.log(err))

//   }
// })

// userSchema.methods.verifyPassword = (password,hash,next)=>{
//   bcrypt.compare(password, hash, function(err, res) {
//     if(err){
//       return next(err)
//     }
//     return next(null,res)
// });
// }


const Users = mongoose.model("Users", userSchema);
module.exports = Users;
