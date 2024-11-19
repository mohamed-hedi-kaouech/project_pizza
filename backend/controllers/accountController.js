const account=require('../models/account_model');

const mongoose= require('mongoose');

const getaccounts = async (req, res) =>{
    const accounts = await account.find({}).sort({createdAt:-1});


    res.status(200).json(accounts);
}

const getaccount = async (req, res) =>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"No such account"});
    }

    const account1 = await account.findById(id);
    if(!account1){
        return res.status(404).json({error:"No such account"});
    }
    res.status(200).json(account1);
}

const createaccount = async(req, res)=>{
    const {FirstName, LastName, Email, Address, City, State, Password}=req.body;
    let emptyFileds="";
    if(!FirstName){
        emptyFileds+='FirstName,';
    }
    if(!LastName){
        emptyFileds+='LastName, ';
    }
    if(!Email){
        emptyFileds+='Email, ';
    }
    if(!Address){
        emptyFileds+='Address, ';
    }
    if(!City){
        emptyFileds+='City, ';
    }
    if(!State){
        emptyFileds+='State, ';
    }
    if(!Password){
        emptyFileds+='Password';
    }
    if(emptyFileds.length >0 ){
        return res.status(400).json({ error:'Please fill in all the fields : '+emptyFileds});
    }

    const Exist=account.findOne({Email});
    if(Exist){
        return  res.status(404).json({error:"Email already Exist"});
    }else{
        //add to data base
        try{
            const account1 = await account.create({FirstName, LastName, Email, Address, City, State, Password});
            res.status(200).json(account1);
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    
}

const deletetaccount = async (req, res) =>{
    const {id}=req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"No such account"});
    }
    
    const account1 = await account.findOneAndDelete({_id:id})
    if(!account1){
        return res.status(404).json({error:"No such account"});
    }
    res.status(200).json(account1);
}

const updateaccount = async (req, res) =>{
    const {id}=req.params;
    const {FirstName, LastName, Email, Address, City, State}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"No such account"});
    }

    let emptyFileds1="";
    if(!FirstName){
        emptyFileds1+='FirstName,';
    }
    if(!LastName){
        emptyFileds1+='LastName, ';
    }
    if(!Email){
        emptyFileds1+='Email, ';
    }
    if(!Address){
        emptyFileds1+='Address, ';
    }
    if(!City){
        emptyFileds1+='City, ';
    }
    if(!State){
        emptyFileds1+='State';
    }
    if(emptyFileds1.length >0 ){
        return res.status(400).json({ error:'Please fill in all the fields : '+emptyFileds1});
    }
    const Exist=account.find({Email:Email});
    if(Exist.length>0){
        return  res.status(404).json({error:"Email already Exist"});
    }else{
        const account1 = await account.findOneAndUpdate({_id:id},{
            ...req.body
        })
        res.status(200).json(account1);
        if(!account1){
            return res.status(404).json({error:"No such account"});
        }
    }
}


module.exports={
    createaccount,
    getaccounts,
    getaccount,
    deletetaccount,
    updateaccount
}