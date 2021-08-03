var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Any = mongoose.Schema.Types.Mixed;
// Define collection and schema for Items
var Users = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String
    },
    assignCrypto :{
        type:Any
    },
    assignStock:{
        type:Any
    },
    status: {
        type: Number
    },
    forgotLink: String,
    forgotStatus: Any,
    updatedAt: Any,
    createdAt: Any,
}, {
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);