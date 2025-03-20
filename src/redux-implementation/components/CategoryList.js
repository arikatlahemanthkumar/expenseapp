import CategoryItem  from "./CategoryItem"
import { useSelector } from "react-redux"
export default function CategoryList(){
    const {data} = useSelector((state)=>state.categories)
    return(
        <div>
            <ul>
                {data?.map((ele)=>{
                    return(
                        <CategoryItem key={ele._id} {...ele}/>
                    )
                })}
            </ul>
        </div>
    )
}