import "../Styles.css"
import { useState } from "react"
export default function DisplayCap(){
    const [capitals,setCapitals] = useState('')

    const handleChange = (e)=>{
        setCapitals(e.target.value)
    }
    return(
        <div className="App">
        <h1>Display In Caps</h1>
         <label>
            <input 
            type = "text"
            value={capitals.toUpperCase()}
            onChange={handleChange}
            ></input>
         </label>
        </div>
    )
}