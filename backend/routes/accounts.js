const express = require('express')

const account=require('../models/account_model')

const router = express.Router()


const {
    getaccounts,
    getaccount,
    createaccount,
    deletetaccount,
    updateaccount
}=require("../controllers/accountController")


//get all accounts function
router.get('/',getaccounts)

//get a single account by id in url function
router.get('/:id',getaccount)

router.post('/',createaccount)

router.delete('/:id',deletetaccount)

router.patch('/:id',updateaccount)

module.exports = router