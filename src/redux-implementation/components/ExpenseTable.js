import ExpenseRow from "./ExpenseRow"
import { useSelector } from "react-redux"
export default function ExpenseTable(){
    const {data} = useSelector(state=>state.expenses)
    return(
        <div>
            <table border={1}>
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
                    {data.map((ele)=>{
                        return <ExpenseRow key={ele._id} {...ele}/>
                    })}
                </tbody>
                
            </table>
        </div>
    )
}