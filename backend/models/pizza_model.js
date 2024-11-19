const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const pizza=new Schema({
    Account_id:{
        type:String,
        require:true
    },
    Method:{
        type:String,
        require:true
    },
    Crust:{
        type:String,
        require:true
    },
    Ingredients:{
        type:String,
        required:true
    },
    Size:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type: Number,
        require:true
    },
    favorite:{
        type:Boolean,
        default:false
    }
    
    
},{timestamps:true});

module.exports=mongoose.model('pizza',pizza);