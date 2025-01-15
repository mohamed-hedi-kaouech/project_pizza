const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

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

Account.pre('save',async function(next){
    if(!this.isModified('Password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password,salt);
    next();
})

module.exports=mongoose.model('Account',Account);



