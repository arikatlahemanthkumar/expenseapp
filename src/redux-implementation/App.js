import CategoriesContainer from "../redux-implementation/components/CategoriesContainer"
import ExpenseContainer from "./components/ExpenseContainer"
export default function App(){
    return(
        <div>
            <h2>Expense App (redux)</h2>
            <CategoriesContainer/>
            <ExpenseContainer/>
        </div>
    )
}