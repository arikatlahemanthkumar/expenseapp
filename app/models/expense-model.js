
const{Schema,model} = require ('mongoose')
const expenseSchema = new Schema({
    expenseDate : Date,
    title : String,
    amount : Number,
    category : {
        type : Schema.Types.ObjectId,
        ref : 'category'
    },
    description : String
}, {timestamps:true})

const Expense = model('Expense', expenseSchema)

module.exports = Expense