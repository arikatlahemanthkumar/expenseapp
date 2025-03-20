import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios"
import { assignEditId } from "./categories-slice";

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses',async()=>{
    const response = await axios.get('/api/expenses')
    return response.data
})

export const removeExpenses = createAsyncThunk('expenses/removeexpenses',async(_id)=>{
    const response = await axios.delete(`/api/expenses/${_id}`)
    return response.data
})

export const addExpenses = createAsyncThunk('expenses/addExpenses',async({form,resetForm},{rejectWithValue})=>{
  try{
    const response = await axios.post('api/expenses',form)
    resetForm()
    return response.data
  }catch(err){
    console.log(err)
    return rejectWithValue(err.response.data.errors)
  }
})

export const updateExpenses = createAsyncThunk ('expenses/updateExpenses',async({form,editId,resetForm},{rejectWithValue})=>{
    try{
        const response = await axios.put('/api/expenses'+editId,form)
        resetForm()
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data.errors)
    }
})
const expenseSlice= createSlice({
    name:'expenses',
    initialState:{
        data:[],
        serverErrors:null,
        editId:null
    },
    reducers:{
        assignEdit_Id :(state,action)=>{
            state.editId = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchExpenses.fulfilled,(state,action)=>{
            state.data=action.payload
        })
        builder.addCase(removeExpenses.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=>ele._id == action.payload._id)
            state.data.splice(index,1)
        })
        builder.addCase(addExpenses.fulfilled,(state,action)=>{
            state.data.push(action.payload)
        })
        builder.addCase(addExpenses.rejected,(state,action)=>{
            state.serverErrors = action.payload
        })
        builder.addCase(updateExpenses.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=> ele._id == action.payload._id)
            state.data[index] = action.payload
            state.editId= null
        })
        builder.addCase(updateExpenses.rejected,(state,action)=>{
            state.serverErrors = action.payload
        })
    }
})

export const {assignEdit_Id} = expenseSlice.actions
export default expenseSlice.reducer