import ExpenseRow from "./ExpenseRow"
import { useContext } from "react"
import ExpenseContext from "../contexts/ExpenseContext"
export default function ExpenseTable(){
    const {expenses} = useContext(ExpenseContext)
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.data.map((ele)=>{
                        return <ExpenseRow 
                        key ={ele._id}
                        
                        {...ele}
                        // expenseDate={ele.expenseDate}
                        // title={ele.title}
                        // amount={ele.amount}
                        // category={ele.category}
                        />
                    })}
                </tbody>
            </table>
        </div>
    )
}