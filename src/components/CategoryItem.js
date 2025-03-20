import axios from 'axios'
import CategoryContext from '../contexts/CategoryContext'
import { useContext } from 'react'
export default function CategoryItem({name,_id}){
    const {handleRemoveCategory} = useContext(CategoryContext)
    const deleteCategory =()=>{
        const userConfirm = window.confirm("Are you sure")
        if(userConfirm){
            axios.delete(`http://localhost:3030/categories/${_id}`)
            .then((response)=>{
                const result = response.data
                handleRemoveCategory(result._id)

            })
            .catch((err)=>{
                console.log(err)

            })
        }
    }
    return (
    <li key={_id}> 
        {name} 
        <button onClick={deleteCategory}>remove</button>
    </li>
    )
}