import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories-slice"
import expensesReducer from "./slices/expenses-slice"
const store = configureStore({
    reducer:{
        categories : categoriesReducer,
        expenses: expensesReducer

    }
})

export default store