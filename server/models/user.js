// Require the mongoose module 
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;




// Defining User schema 
// const userSchema = new Schema( 
//     {
//         name: String,
//         age: Number,
//         bio: String,
//         email: String
//         // friends: String,
//         // friendRequests: String,

//         // profilePicture: Image,
        
//     } 
// ) 

const userSchemaObject = {
    username: {
        type: String,
        required: true,
        unique: true
      },
      // bio on default, will be created on its own when a User object is initialized
      bio: {
        String,
        default: "Add your bio here !"
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true,
        min: 14,
        max: 120
      },
      country: {
        type: String,
        required: false
      },
      gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say']
      }
}

const mongooseSchema = mongoose.Schema(userSchemaObject);

module.exports = mongoose.model('User',mongooseSchema);
  
// Defining User model 
// export const User = mongoose.model('User', userSchema);