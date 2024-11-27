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


router.get('/',getaccounts)

router.get('/:id',getaccount)

router.post('/',createaccount)

router.delete('/:id',deletetaccount)

router.patch('/:id',updateaccount)

module.exports = router