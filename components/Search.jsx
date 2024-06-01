import { useEffect, useState } from 'react'
import styles from "./search.module.css"

const URL = "https://api.spoonacular.com/recipes/complexSearch"
const API_KEY = "0689f40920a84be39e05e76d7a9b4dc4"
export default function Search({foodData, setFoodData}){
   const [query, setQuery] = useState("pizza");
    useEffect(() => {
        async function fetchFood(){
          const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
          const data = await res.json();
          console.log(data);
          setFoodData(data.results)
        }
        fetchFood()
    }, [query])
    return(
        <div className={styles.searchContainer}>
            <input className={styles.input}
             onChange={(e)=>(e.target.value)} value={query} type="text" />
        </div>
    )
}