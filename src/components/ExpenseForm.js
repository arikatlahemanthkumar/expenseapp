import {useState,useContext, useEffect} from 'react'
import ExpenseContext from '../contexts/ExpenseContext'
import axios from 'axios'
import {format} from 'date-fns'

//initial value should be outside the component
const formInitialValue = {
    expenseDate:'',
    title:'',
    amount:'',
    category:'',
    description:''
}

export default function ExpenseForm(){
    
    const [formData, setFormData]=useState(formInitialValue)
    const {categories,expenseDispatch, expenses} = useContext(ExpenseContext)
    const [clientErrors, setClientErrors] = useState({})
    const errors = {}

    
    useEffect(()=>{
        if(expenses.editId){
            const expense = expenses.data.find(ele=> ele._id === expenses.editId)
            const formattedDate =  format(new Date(expense.expenseDate), 'yyyy-MM-dd')
            
            setFormData({
                expenseDate:formattedDate,
                title:expense.title,
                amount: expense.amount,
                category: expense.category,
                description: expense.description
            })
        }
    },[expenses.editId, expenses.data])

    const runClientValidations = ()=>{
        if(formData.expenseDate.length === 0){
            errors.expenseDate = 'expense date cannot be empty'
        }else if(new Date(formData.expenseDate) > new Date()){
            errors.expenseDate = 'expense date cannot greater than today'
        }

        if(formData.title.trim().length === 0){
            errors.title = 'title should not be empty'
        }

        if(formData.amount.trim().length === 0){
            errors.amount = 'amount cannot be blank'
        }else if(formData.amount.trim() < 1){
            errors.amount = 'amount should be atleast 1rs'
        }

        if(formData.category.length === 0){
            errors.category = 'category should be selected'
        }

        if(formData.description.trim().length <= 4){
            errors.description = 'description should be atleast 5 characters'
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        //console.log(formData)
        runClientValidations()
        if(Object.keys(errors).length !==0){
            setClientErrors(errors)
        }else{
            setClientErrors({})
            if(expenses.editId){
                try{
                    const response = await axios.put(`http://localhost:3030/expenses/${expenses.editId}`, formData)
                    const result = response.data
                    console.log(typeof result.amount);
                    
                    expenseDispatch({type : 'update_expense', payload : result})
                    alert('expense will be updated')
                    setFormData(formInitialValue)

                }catch(err){
                    console.log(err.message)
                }
            }else{
                try{
                    const response =  await axios.post('http://localhost:3030/expenses', formData)
                    const result=response.data  
                    expenseDispatch({type:'add_expense', payload:result})
                    setFormData(formInitialValue)
                }catch(err){
                    console.log(err.message);
                }
            }
        }
        
    }

    return(
        <div>
            <h2>{expenses.editId ? 'Edit' : 'Add'} Expense</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="expenseDate">ExpenseDate: </label>
                <input 
                type="date" 
                name="expenseDate"
                value={formData.expenseDate}
                onChange={(e)=> {setFormData({...formData, expenseDate:e.target.value})}}
                />
                {clientErrors.expenseDate && <span style={{color:"red"}}>{clientErrors.expenseDate}</span>}
                <br/>

                <label htmlFor="title">Title: </label>
                <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={(e)=>{setFormData({...formData, title:e.target.value})}}
                />
                {clientErrors.title && <span style={{color:"red"}}>{clientErrors.title}</span>}
                <br/>

                <label htmlFor="amount">Amount: </label>
                <input 
                type="number" 
                name="amount"
                value={formData.amount}
                onChange={(e)=>{setFormData({...formData, amount:e.target.value})}}
                />
                {clientErrors.amount && <span style={{color:"red"}}>{clientErrors.amount}</span>}
                <br/>

                <select 
                name='category' 
                value={formData.category} 
                onChange={(e)=>{setFormData({...formData, category:e.target.value})}}>
                    <option value="">Select a category</option>
                {categories.data.map((category) => (
                    <option key={category._id} value={category._id}>
                    {category.name}
                    </option>
                ))}
                </select>
                {clientErrors.category && <span style={{color:"red"}}>{clientErrors.category}</span>}
                <br/><br/><br/>

                <label htmlFor="description">Description: </label>
                <input 
                type='text' 
                name="description" 
                value={formData.description}
                onChange={e=>{setFormData({...formData, description:e.target.value})}}
                />
                {clientErrors.description && <span style={{color:"red"}}>{clientErrors.description}</span>}
                <br/>

                <input type="submit"/>
            </form>
        </div>
    )
}