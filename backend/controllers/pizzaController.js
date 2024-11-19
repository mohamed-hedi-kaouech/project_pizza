const pizza=require('../models/pizza_model');

const mongoose= require('mongoose');

const getpizzas = async (req, res) =>{
    const AccountId=req.params;
    const pizzas = await pizza.find({Account_id:AccountId.Account_id}).sort({ createdAt: -1 });
    
    if (!pizzas.length) {
        return res.status(404).json({ message: 'No pizzas found for this account.' });
    }

    res.status(200).json(pizzas);
}


const createpizza = async(req, res)=>{
    const {Account_id, Ingredients, Size, Quantity, favorite,Method, Crust ,price}=req.body;
    let emptyFileds="";

    if(!Ingredients){
        emptyFileds+='Ingredients ';
    }
    if(!Method){
        emptyFileds+='Method ';
    }
    if(!Crust){
        emptyFileds+='Crust ';
    }
    if(!Size){
        emptyFileds+='Size ';
    }
    if(!Quantity){
        emptyFileds+='Quantity ';
    }
    if(emptyFileds.length >0 ){
        return res.status(400).json({ error:'Please fill in all the fields '+emptyFileds});
    }
    //add to data base
    try{
        const pizza1 = await pizza.create({Account_id, Ingredients, Size, Quantity, favorite, Method, Crust, price});
        res.status(200).json(pizza1);
    }catch(error){
        res.status(400).json({error:error.message});
    }
    
}

const deletetpizza = async (req, res) =>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"No such pizza"});
    }
    
    const pizza1 = await pizza.findOneAndDelete({_id:id})
    if(!pizza1){
        return res.status(404).json({error:"No such pizza"});
    }
    res.status(200).json(pizza1);
}



module.exports={
    createpizza,
    getpizzas,
    deletetpizza

}