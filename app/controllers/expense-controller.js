
const {validationResult} = require('express-validator')
const Expense = require('../models/expense-model')
const expensescltr = {}

expensescltr.list = async (req,res)=>{
    try{
        const expenses = await Expense.find()
        res.json(expenses)
    }catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}

expensescltr.show = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const getExpense = await Expense.findById(id)
        if(!getExpense){
            res.status(404).json({error:'record not found'})
        }
        res.json(getExpense)
    }catch(err){
            res.status(500).json({error:'something went wrong'})
    }
}

expensescltr.create = async  (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const body = req.body
        const createExpense = await Expense.create(body)
        res.status(201).json(createExpense)
    }catch(err){
            res.status(400).json(err)
    }
}

expensescltr.update = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id,body, {new:true, runValidators:true})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.status(404).json({error:'record not found'})
        })
}

expensescltr.remove = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id =req.params.id
    Expense.findByIdAndDelete(id)
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.status(404).json({error:'record not found'})
        })
}

module.exports = expensescltr









