const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroomSchemaObject = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // reference to the User model
    }] // array of User references( 2+ users in a chatroom)
};

const chatroomSchema = new Schema(chatroomSchemaObject);
module.exports = mongoose.model('Chatroom', chatroomSchema);