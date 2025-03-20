const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/expense-app-db')
    .then(()=>{
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log('error conneceting to db',err);
    })
}

module.exports=configureDB