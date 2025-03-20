import CategoryItem from "./CategoryItem"
import CategoryContext from "../contexts/CategoryContext"
import { useContext } from "react"

export default function CategoryList(){
    const{categories} = useContext(CategoryContext)
    return(
        <div>
            <h2>Listing Categories - {categories.length}</h2>
            <ul>
                { categories.map((ele)=>{
                    return( <CategoryItem 
                                key={ele._id}
                                {...ele}
                               
                    
                            />
                    )

                })}
            </ul>
        </div>
    )
}