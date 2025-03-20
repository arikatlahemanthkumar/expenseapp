import { useEffect, useState } from 'react'; 
import { format } from 'date-fns';
import { addExpenses,updateExpenses } from '../slices/expenses-slice';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCategories } from '../slices/categories-slice';

const formInitialValue = { 
    expenseDate: '',
    title: '',
    amount: '',
    category: '',
    description: ''
};

export default function ExpenseForm(){
    const dispatch= useDispatch()
    const {serverErrors ,editId, data} =useSelector((state)=>state.expenses)
    const categories = useSelector((state)=>state.categories) 
    const [form, setForm] = useState(formInitialValue); 
    const [clientErrors, setClientErrors] = useState({}); 
    const errors = {}; 

    useEffect(()=>{
        dispatch(fetchCategories())
    },[])

    /* useEffect(() => {
        if(expenses.editId) {
            const expense = expenses.data.find(ele => ele._id === expenses.editId)
            const formattedDate = format(new Date(expense.expenseDate), 'yyyy-MM-dd')
            setForm({
                expenseDate: formattedDate, // yyyy-mm-dd
                title: expense.title,
                amount: expense.amount.toString(),
                category: expense.category,
                description: expense.description
            });
        }
    }, [expenses.editId,expenses.data]); */
    useEffect(()=>{
        if(editId){
            const expense = data.find(ele=> ele._id== editId)
            console.log(editId)
            setForm({
                expenseDate:format(new Date(expense.expenseDate),'yyyy-MM-dd'),
                title:expense.title,
                amount:expense.amount,
                category:expense.category,
                description:expense.description
            })
        }
    },[editId])

    const runClientValidations = () => {
        if(form.expenseDate.length === 0) {
            errors.expenseDate = 'expense date cannot blank'; 
        } else if(new Date(form.expenseDate) > new Date()) {
            errors.expenseDate = 'expense date cannot greater than tody';
        }

        if(form.title.trim().length === 0) {
            errors.title = 'title cannot be blank'; 
        }

        if(form.amount.trim().length === 0) {
            errors.amount = 'amount cannot be blank'; 
        } else if(form.amount.trim() < 1) {
            errors.amount = 'amount should be atleast 1rs'
        }

        if(form.category.length === 0) {
            errors.category = 'category should be selected'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runClientValidations();
        const resetForm = ()=>{
           setForm(formInitialValue)
        }

        if(Object.keys(errors).length !== 0){
            setClientErrors(errors);
        } else {
            setClientErrors({ }); 
            
            if(editId){
              dispatch(updateExpenses({form,editId,resetForm}))
            }else{
                dispatch(addExpenses({form,resetForm}))
            }
          
        }
    }

    return (
        <div>
            <h2>{ editId ? 'Edit' : 'Add' } Expense</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter Expense Date</label>
                <input 
                    type="date" 
                    value={form.expenseDate} 
                    onChange={(e) => { setForm({...form, expenseDate: e.target.value })}} 
                /> 
                { clientErrors.expenseDate && <span style={{ color: 'red' }}> { clientErrors.expenseDate } </span>}
                
                <br /> 

                <label>Enter title</label>
                <input 
                    type="text" 
                    value={form.title} 
                    onChange={(e) => { setForm({...form, title: e.target.value })}} 
                />
                { clientErrors.title && <span style={{ color: 'red' }}> { clientErrors.title } </span>}
                
                <br />

                <label>Enter Amount</label> 
                <input 
                    type="text" 
                    value={form.amount}
                    onChange={(e) => { setForm({...form, amount: e.target.value }) }}
                /> 
                { clientErrors.amount && <span style={{ color: 'red' }}> { clientErrors.amount } </span>}
                
                <br /> 

                <label>Select Category</label> 
                <select value={form.category} onChange={(e) => { setForm({ ...form, category: e.target.value }) }}>
                    <option value="">Select</option>
                    { categories.data.map((ele) => {
                        return <option key={ele._id} value={ele._id}>{ ele.name }</option>
                    })}
                </select>
        {/*         { clientErrors.category && <span style={{ color: 'red' }}> { clientErrors.category } </span>}
                {serverErrors && serverErrors.map((ele,i) => <p style={{ color: 'red' }} key={i}>{ele.msg}</p>)} */}
                 <br /> 

                 <label>Enter Description</label> 
                 <textarea value={form.description} onChange={(e) => { setForm({...form, description: e.target.value })}}></textarea><br /> 
                 {serverErrors && serverErrors.map((ele,i) => <p style={{ color: 'red' }} key={i}>{ele.msg}</p>)}
                 <input type="submit" />
            </form>
        </div>
    )
}