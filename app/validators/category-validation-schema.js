const Category = require('../models/category-model')
const categoryValidationSchema = {
    name : {
        trim : true,
        in : ['body'],
        exists : {
            errorMessage : 'name is required'
        },
        notEmpty : {
            errorMessage : 'name cannot be empty'
        },
        isLength : {
            options : {min : 3, max :20},
            errorMessage : 'name should be between 3 to 20 characters long'
        },
        trim:true,
        custom:{
            options:async function(value){
              const category = await Category.findOne({"name":value})
              if(category){
                throw new Error("name is already used")
              }
              return true
            }
        }

        
    }
}

module.exports = categoryValidationSchema