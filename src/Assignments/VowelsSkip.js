import "../Styles.css"
import { useState } from "react"
export default function VowelSkip(){
    const[vowels,setVowels]= useState('')

    const handleVowels=(e)=>{
        const input = e.target.value
        let nonVowels =''
        for(let char of input){
            if(!'aeiouAEIOU'.includes(char)){
                nonVowels= nonVowels+char

            }
        }

       setVowels(nonVowels)
    }
    return(
        <div className="App">
            <h1> Text Without Vowels</h1>
            <label>
                <input
                type="text"
                value={vowels}
                onChange={handleVowels}>
                </input>
            </label>
        </div>
    )
  
}