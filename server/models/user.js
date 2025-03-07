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
    name: {type: String, required: true},
    age: {type: Number, required: true},
    bio: {type: String, default:"Add a bio here..."},
    email: {type: String, required: true}
}

const mongooseSchema = mongoose.Schema(userSchemaObject);

module.exports = mongoose.model('User',mongooseSchema);
  
// Defining User model 
// export const User = mongoose.model('User', userSchema);