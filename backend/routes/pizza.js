const express = require('express')

const pizza=require('../models/pizza_model')

const router = express.Router()


const {
    getpizzas,
    deletetpizza,
    createpizza
}=require("../controllers/pizzaController")


//get all pizzas function
router.get('/:Account_id',getpizzas)

router.post('/',createpizza)

router.delete('/:id',deletetpizza)



module.exports = router