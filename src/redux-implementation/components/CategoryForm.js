import {  useState,useEffect } from "react";
import { addCategories ,updateCategories } from "../slices/categories-slice";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryForm() {
    const dispatch = useDispatch()
    const { serverErrors,editId,data } = useSelector((state)=> state.categories)
    const [name, setName] = useState("")
    const [clientErrors, setClientErrors] = useState({})
    
    const errors = {};

    useEffect(()=>{
        if(editId){
            const category = data.find(ele => ele._id==editId)
            console.log(editId)
            setName(category.name)
        }

    },[editId])

    const runClientSideValidations = () => {
        if (name.trim().length === 0) {
            errors.name = "name can not be empty"
        } else if (name.trim().length < 3 || name.trim().length > 20){
            errors.name = "name Should be between 3 to 20 characters long"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: name
        }
        runClientSideValidations()
        const resetForm = ()=>{
            setName('')
        }

        if (Object.keys(errors).length !== 0) {
            setClientErrors(errors)

        } else {
            setClientErrors({})

            if(editId){
                dispatch(updateCategories({formData,editId,resetForm}))
            }else{
                dispatch(addCategories({formData,resetForm}))
            }
            
            }

        }
    
    return (
        <div>
            <h2>{editId ? 'edit':'add'} category</h2>
           
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        id="name"

                    />
                    {clientErrors.name && <span style={{ color: 'red' }}>{clientErrors.name}</span>}
                    {serverErrors && serverErrors.map((ele,i) => <p style={{ color: 'red' }} key={i}>{ele.msg}</p>)}
                    <br />
                    <input type="submit" />
                </form>
        </div >
    )
}
