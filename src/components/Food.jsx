import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
const Food = (props) => {
  const [eatenQuantity, setEatenQuantity] = useState(100);
  const [food, setFood] = useState({});
  const [foodInitial, setFoodInitial] = useState({});
  const loggedInData = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setFood(props.food);
    setFoodInitial(props.food);
    // console.log(loggedInData);
    // console.log(props.food);
  }, [props.food]);


  function calculateMacros(event) {
    if (event.target.value.length !== 0) {
      let quantity = Number(event.target.value);
      setEatenQuantity(quantity);
      let copyFood = { ...food };
      copyFood.protein = (foodInitial.protein * quantity) / 100;
      copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
      copyFood.fat = (foodInitial.fat * quantity) / 100;
      copyFood.fiber = (foodInitial.fiber * quantity) / 100;
      copyFood.calories = (foodInitial.calories * quantity) / 100;

      setFood(copyFood);
    }
  }

  function trackFood() {
    let trackedFoodItem = {
      userId: loggedInData.loggedIn.userId,
      foodId:food._id,
      details:{
        protein:food.protein,
        carbohydrates:food.carbohydrates,
        fat:food.fat,
        fiber:food.fiber,
        calories:food.calories
      },
      quantity:eatenQuantity
    }
    // console.log(track);
    fetch(`https://nutrition-app-dpud.onrender.com/track`, {
      method:"POST",
      body:JSON.stringify(trackedFoodItem),
      headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${loggedInData.loggedIn.token}`
    }})
    .then((res)=>res.json())
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})
  }

  return (
    <div className="food-details">
      <h2>
        {food.name} ({food.calories})Kcal for {eatenQuantity}Gm
      </h2>
      <div className="food">
        <div className="nutrients">
          <p className="n-title">Proteins</p>
          <p className="n-value">{food.protein}gms</p>
        </div>
        <div className="nutrients">
          <p className="n-title">Carbohydrates</p>
          <p className="n-value">{food.carbohydrates}gms</p>
        </div>
        <div className="nutrients">
          <p className="n-title">Fibre</p>
          <p className="n-value">{food.fiber}gms</p>
        </div>
        <div className="nutrients">
          <p className="n-title">Fat</p>
          <p className="n-value">{food.fat}gms</p>
        </div>
        <input type="number" name="quantity" placeholder="Quantity in gms" onChange={calculateMacros} />
        <button className="btn" onClick={trackFood}>Track Food</button>
      </div>
    </div>
  );
};

export default Food;
