import { removeExpenses } from "../slices/expenses-slice"
import { useDispatch } from "react-redux"
import {format} from "date-fns"
import { assignEdit_Id } from "../slices/expenses-slice"
export default function ExpenseRow({expenseDate,title,amount,category,_id}){
    const dispatch = useDispatch()
    const handleRemove=()=>{
       const userConfirm= window.confirm("Are you Sure?")
       if(userConfirm){
         dispatch(removeExpenses(_id))
       }
    }

    const handleEdit=()=>{
      dispatch(assignEdit_Id(_id))
    }
    return (
       <tr>
        <td>{format(expenseDate,'dd-mm-yyyy')}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>{category}</td>
        <td>
         <button onClick={handleEdit}>edit</button>
         <button onClick={handleRemove}>remove</button></td>
       </tr>
    )
}