import { removeCategories } from "../slices/categories-slice"
import { useDispatch } from "react-redux"
import { assignEditId } from "../slices/categories-slice"
export default function CategoryItem({_id,name}){
    const dispatch = useDispatch()
    const handleRemove=()=>{
        const userConfirm = window.confirm("Are you sure ?")
        if(userConfirm){
            dispatch(removeCategories(_id))
        }
        
    }

    const handleEdit=()=>{
        dispatch(assignEditId(_id))
    }
    return(
        <li>{name}
        <button  onClick={handleEdit}>edit</button>
        <button onClick={handleRemove}>remove</button></li>
    )
}