const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title:String,
    post:String,
    image:String,
    createAt:{
        type:Date,
        default:new Date(),
    }
})

const postModel = mongoose.model('post', schema);
module.exports = postModel;