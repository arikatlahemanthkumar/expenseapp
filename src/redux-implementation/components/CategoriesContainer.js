import { useDispatch,useSelector } from "react-redux"
import {fetchCategories}  from "../slices/categories-slice"
import { useEffect } from "react"
import CategoryList from "./CategoryList"
import CategoryForm from "./CategoryForm"
export default function CategoriesContainer(){
    const {data} = useSelector ((state)=>state.categories)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCategories())
    },[])
    return(
        <div>
            <h2>Listing Categories-{data.length}</h2>
            <CategoryList/>     
            <CategoryForm />


        </div>
    )
}