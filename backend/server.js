require('dotenv').config();


const createaccount = require("./Scripts/Admin");
const express = require('express');
const mongoose = require('mongoose');
const accountRoutes=require('./routes/accounts');
const pizzaRoutes=require('./routes/pizza');
const cors = require('cors');

const app= express();

// createaccount();


app.use((req, res,next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/account',accountRoutes);
app.use('/api/pizza',pizzaRoutes);


//database connection
mongoose.connect(process.env.MONGO_URI).then(()=> {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and Listening on port',process.env.PORT);
        });
    }).catch((error)=>{
        console.log(error);
    });

app.use(cors({
    origin: 'http://localhost:3000' 
}));


