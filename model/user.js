const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    email:String,
    address:String,
    username:String,
    password:String
});

const userModel = mongoose.model('user',schema);
module.exports = userModel;