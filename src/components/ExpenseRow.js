import axios from "axios"
import {useContext} from "react"
import {format } from "date-fns"
import ExpenseContext from "../contexts/ExpenseContext"
export default function ExpenseRow({expenseDate,title,amount,category,_id}){
    const {expensesDispatch} = useContext(ExpenseContext)
    const handleRemove=()=>{
        const userConfirm = window.confirm("Are you sure?")
        if(userConfirm){
            axios.delete(`http://localhost:3030/expenses/${_id}`)
            .then((response)=>{
              const result = response.data
              expensesDispatch({type:'remove_expense',payload:result._id})
            })
            .catch((err)=>{
              console.log(err.message)
            })   
        }

    }

    const handleAssignEditId = ()=>{
      expensesDispatch({type:'assign_edit_id',payload:_id})
    }
    return(
        <tr>
           <td>{format(expenseDate,'dd-mm-yyyy')}</td>
           <td>{title}</td>
           <td>{amount}</td>
           <td>{category}</td>
           <td><button onClick={handleAssignEditId}>edit</button></td>
           <td><button onClick={handleRemove}>remove</button></td>
        </tr>
    )
}