import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchExpenses } from "../slices/expenses-slice"
import ExpenseTable from "./ExpenseTable"
import ExpenseForm from "./ExpenseForm"
export default function ExpenseContainer(){
    const {data} = useSelector(state => state.expenses)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchExpenses())
    },[])
    return(
        <div>
            <h2>Listing Expenses -{data.length}</h2>
            <ExpenseTable/>
            <ExpenseForm/>
        </div>
    )
}