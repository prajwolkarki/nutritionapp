import { useState, useContext } from "react";
import Header from "./Header";
import { UserContext } from "../contexts/UserContext";
import Food from "./Food";

const Track = () => {
  let [foodItems, setFoodItems] = useState([]);
  let [searchedFood, setSearchedFood] = useState(null);
  const loggedInData = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  function searchFood(e) {
    // console.log(e.target.value);
    if (e.target.value !== "") {
      fetch(`${apiUrl}/foods/${e.target.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInData.loggedIn.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (!data.message) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //if search bar is empty, set foodItems to empty array
      setFoodItems([]);
    }
  }
  return (
    <>
      <Header />
      <div className="container input-container">
        <div className="search">
          <input
            type="search"
            name="food"
            onChange={searchFood}
            placeholder="Search your food"
          />
          {foodItems.length !== 0 ? (
            <div className="search-results">
              {foodItems.map((food) => {
                return (
                  <div key={food._id} className="food-item">
                    <h3
                      onClick={() => {
                        setSearchedFood(food);
                        console.log(searchedFood);
                      }}
                    >
                      {food.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          ) : null}
          {searchedFood !== null ? <Food food={searchedFood}/> : null}
        </div>
      </div>
    </>
  );
};

export default Track;
