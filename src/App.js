import "./Styles.css"
import axios from "axios"
import {useState, useReducer,useEffect} from "react"
import CategoryContainer from "./components/CategoryContainer.js"
import ExpenseContainer from "./components/ExpenseContainer.js"
import CategoryContext from "./contexts/CategoryContext.js"
import ExpenseContext from "./contexts/ExpenseContext.js"
const expenseInitialState ={
  data:[],
  editId:null,
  serverErrors:null
}

const expensesReducer = (state,action)=>{
  switch(action.type){
    case 'set_expenses':{
      return {...state,data:action.payload}
    }
    case 'add_expense':{
      return{...state,data:[...state.data,action.payload]}
     // state.data.push(action.payload)
    }
    case 'remove_expense':{
      
      return{...state,data:state.data.filter(ele => ele._id !== action.payload)}
    }
    case 'update_expense':{
      return{
        ...state,
        editId:null,
        data: state.data.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        ),
      }
    }

    case 'assign_edit_id' :{
      return{...state,editId:action.payload}
    }


    default :{
      return {...state}
    }

  }
}
export default function App() {
  const[categories,setCategories]= useState([])
  const[expenses,expensesDispatch] = useReducer(expensesReducer,expenseInitialState)

  // useEffect for categories
  useEffect(()=>{
    axios.get("http://localhost:3030/categories")
    .then((response)=>{
      const result = response.data
      setCategories(result)

    })
    .catch((err)=>{
      console.log(err.message)

    })

  },[])

  useEffect(()=>{
    axios.get('http://localhost:3030/expenses')
    .then((response)=>{
      const result = response.data
      console.log(result)
      expensesDispatch({type:"set_expenses",payload:result})
    })
    .catch((err)=>{
      console.log(err.message)
    })

  },[])
  // without this [] infinite api calls will happen
  
  // const handleFetchExpenses =()=>{
  //   axios.get('http://localhost:3030/expenses')
  //   .then((response)=>{
  //     const result = response.data
  //     console.log(result)
  //     expensesDispatch({type:"set_expenses",payload:result})
  //   })
  //   .catch((err)=>{
  //     console.log(err.message)
  //   })
  // }



  // const handleFetchCategories =()=>{
  //   axios.get("http://localhost:3030/categories")
  //   .then((response)=>{
  //     const result = response.data
  //     setCategories(result)

  //   })
  //   .catch((err)=>{
  //     console.log(err.message)

  //   })
  // }

const handleAddCategory = (newCategory)=>{
  setCategories([...categories,newCategory])
}

const handleRemoveCategory =(id)=>{
  const newArr = categories.filter((ele)=> ele._id !== id)
  setCategories(newArr)
}
  return (
    <div className="App">
      <h1> Expense App</h1>
      {/* <button onClick ={handleFetchCategories}>Fetch Category</button>
      <button onClick ={handleFetchExpenses}>Fetch Expenses</button> */}
      <CategoryContext.Provider value ={{categories,handleAddCategory,handleRemoveCategory}}>
      <CategoryContainer />
      
      </CategoryContext.Provider>
     <hr/>
     <ExpenseContext.Provider value={{expenses,categories,expensesDispatch}}>
     <ExpenseContainer />
     </ExpenseContext.Provider>
      
    </div>
  );
}

