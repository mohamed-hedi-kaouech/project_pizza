const account=require('../models/account_model');
const bcrypt = require('bcrypt');


async function CreateAdmin() {
    try {
        const Exist=await account.findOne({Email:"admin@test.com"});
        if(!Exist){
            const newAccount=new account({
                FirstName:"Admin",
                LastName: "Admin",
                Email: "admin@test.com",
                Address:"***",
                City:"***",
                State:"***",
                Password:"admin1234"
            });
            await newAccount.save();
            console.log("Admin created successfully");
        }else{
            console.log("Admin Exist");
        }
    } catch (error) {
        console.error(error.message);

    }
    
}

module.exports= CreateAdmin;