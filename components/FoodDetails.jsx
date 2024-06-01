import { useEffect, useState } from "react"
import styles from './fooddetails.module.css'
import ItemList from "./ItemList"
export default function FoodDetails({foodId}){
    const [food, setFood] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = "0689f40920a84be39e05e76d7a9b4dc4"
    useEffect(() => {
        async function fetchFood(){
            const res = await fetch(`${URL}?apiKey=${API_KEY}`)
            const data = await res.json()
            setFood(data)
            setIsLoading(false)
        }
        fetchFood()
    }, [foodId])
    return(
        <div>
            <div className={styles.recipeCard}>
                <h1 className={styles.recipeName}>{food.title}</h1>
                <img className={styles.recipeImage} src={food.image} alt=""></img>
            <div className={styles.recipeDetails}>
                <span>
                <strong>
                    ⌚{food.readyInMinutes}
                </strong>
            </span>
            <span>
                <strong>Serves {food.servings}</strong>
            </span>
            <span>
                <strong>{food.vegetarian ? "🥕Vegetarian" : "Non-Vegetarian"}</strong>
            </span>
            <span>
               <strong>{food.vegan ? "vegan" : ""}</strong>
            </span>
            </div>
            <div>
                
                <span><strong>{food.pricePerServing/100} Per serving</strong></span>
            </div>
            

            <div>
                <h2>Ingredients</h2>
                <ItemList food = {food} isLoading={isLoading}/>
                <h2>Instructions</h2>
                <div className={styles.recipeInstructions}>
                    <ol>s
                        {isLoading ? (<p>Loading...</p>) : (food.analyzedInstructions[0].steps.map((step)=>(
                        <li>{step.step}</li>
                        )))}
                    </ol>
                    
                </div>
                
            </div>
            </div>
        </div>
        

    )
}