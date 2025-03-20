const express = require('express');
const {checkSchema} = require ('express-validator')
const configureDB = require('./config/db');
const categoriesCltr = require('./app/controllers/category-controller');
const expensesCltr = require('./app/controllers/expense-controller')
const idValidationSchema = require('./app/validators/id-schema-validator')
const categoryValidationSchema = require('./app/validators/category-validation-schema')
const expenseValidationSchema = require('./app/validators/expense-validation-schema')
const app = express();
const cors = require('cors')
const port = 3030;
configureDB()

app.use(express.json())
app.use(cors())

// application level middle ware
app.use(function(req,res,next){
    console.log(`${new Date()} - ${req.method} - ${req.url} -${req.ip}`)
    next()
})

app.get('/api/categories',categoriesCltr.list)
app.get('/api/categories/:id',checkSchema(idValidationSchema),categoriesCltr.show)
app.post('/api/categories',checkSchema(categoryValidationSchema),categoriesCltr.create)
app.put('/api/categories/:id',checkSchema(categoryValidationSchema),checkSchema(idValidationSchema),categoriesCltr.update)
app.delete('/api/categories/:id',checkSchema(idValidationSchema),categoriesCltr.remove)
app.get('/api/expenses',expensesCltr.list)
app.get('/api/expenses/:id', checkSchema(idValidationSchema), expensesCltr.show)
app.post('/api/expenses', checkSchema(expenseValidationSchema), expensesCltr.create)
app.put('/api/expenses/:id', checkSchema(expenseValidationSchema), checkSchema(idValidationSchema), expensesCltr.update)
app.delete('/api/expenses/:id', checkSchema(idValidationSchema), expensesCltr.remove)



app.listen(port, ()=>{
    console.log('expense server is running in port', port);
    
})