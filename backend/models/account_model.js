const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Account=new Schema({
    FirstName: {
        type:String,
        required:true
    },
    LastName: {
        type:String,
        required:true
    },
    Email: {
        type:String,
        unique:true,
        required:true
    },
    Address: {
        type:String,
        required:true
    },
    City: {
        type:String,
        required:true
    },
    State: {
        type:String,
        required:true
    },
    Password: {
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Account',Account);



