import {useContext, useMemo} from "react"
import ExpenseContext from "../contexts/ExpenseContext"
import ExpenseTable from "./ExpenseTable"
import ExpenseForm from "./ExpenseForm"
export default function ExpenseContainer(){
    const {expenses} = useContext(ExpenseContext)
    const expensesSum = useMemo(()=>{
        return expenses.data.reduce((acc,cv)=>{
            console.log('calculating')
            return acc+ cv.amount
        },0)

    },[expenses.data])

return(
    <div>
        <h2>Listing Expenses - {expenses.data.length}</h2>
        <ExpenseTable />
        <h2>total -{expensesSum}</h2>
        <ExpenseForm />
    </div>
)
}