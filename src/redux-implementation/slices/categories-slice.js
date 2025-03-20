import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../config/axios"

export const fetchCategories = createAsyncThunk('categories/fetchCategories',async()=>{
    const response = await axios.get('/api/categories')
    return response.data
})

export const removeCategories = createAsyncThunk('categories/removeCategories',async(_id)=>{
    const response = await axios.delete(`/api/categories/${_id}`)
    return response.data
})

export const addCategories = createAsyncThunk('categories/addCategories',async({formData,resetForm},{rejectWithValue})=>{
    try{
        const response = await axios.post('/api/categories',formData)
        resetForm()
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data.errors)
    }
})

export const updateCategories  = createAsyncThunk ('categories,updateCategories' ,async({formData,editId,resetForm},{rejectWithValue})=>{
    try{
        const response = await axios.put('/api/categories/'+editId,formData)
        resetForm()
        return response.data
    }catch(err){
        return rejectWithValue(err.response.data.errors)
    }
})
const categoriesSlice = createSlice({
    name:"categories",
    initialState:{
        data:[],
        serverErrors:null,
        editId:null
     
    },

    reducers:{
        assignEditId:(state,action)=>{
            state.editId = action.payload
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.data = action.payload

        })

        builder.addCase(removeCategories.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=> ele._id == action.payload._id)
            state.data.splice(index,1)
        })

        builder.addCase(addCategories.fulfilled,(state,action)=>{
            state.data.push(action.payload)
        })
        builder.addCase(addCategories.rejected,(state,action)=>{
            state.serverErrors = action.payload
        })
        builder.addCase(updateCategories.fulfilled,(state,action)=>{
            const index = state.data.findIndex((ele)=>ele._id == action.payload._id)
            state.data[index]=action.payload
            state.editId = null
        })
        builder.addCase(updateCategories.rejected,(state,action)=>{
            state.serverErrors = action.payload
        })

    }
})


export const {assignEditId} = categoriesSlice.actions
export default categoriesSlice.reducer