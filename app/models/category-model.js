
const { Schema, model} = require('mongoose') 
const CategorySchema = new Schema({
    name : String
},{timestamps : true})


const Category = model ('category', CategorySchema)

module.exports = Category