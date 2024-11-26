import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const [message, setMessage] = useState({
    type:"invisible-msg",
    text:"random-msg"
  });
  //useEffect is called when the state of the variable changes
  // useEffect(()=> {
  //   console.log(userData);
  // },[userData])

  const handleChange = (e) => {
    //console.log(e.target.name,e.target.value);
    setUserData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://nutrition-app-production-1e70.up.railway.app/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log(res); // Log the entire response object
        return res.json(); // Return the parsed JSON data
      })
      .then((data) => {
        // console.log(data);
        setMessage({
          type:"success",
          text:data.message
        })
        setUserData({
          username: "",
          email: "",
          password: "",
          age: "",
        
        })
        setTimeout(()=>{
          setMessage({
            type:"invisible-msg",
            text:"Dummy msg"
          })
        },3000)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <section className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Register your Details</h1>
        <input
          type="text"
          name="username"
          required
          className="input"
          placeholder="Enter your name"
          onChange={handleChange}
          value={userData.username}
        />
        <input
          type="email"
          name="email"
          required
          className="input"
          placeholder="Enter your email"
          onChange={handleChange}
          value={userData.email}
        />
        <input
          type="password"
          name="password"
          required
          className="input"
          minLength={8}
          placeholder="Enter your password"
          onChange={handleChange}
          value={userData.password}
        />
        <input
          type="number"
          name="age"
          required
          className="input"
          min={10}
          max={60}
          placeholder="Enter your age"
          onChange={handleChange}
          value={userData.age}
        />
        <button className="btn">
          Register
        </button>
        <p className="below">
          Already Registered?{" "}
          <Link className="signIn" to="/login">
            Sign in now
          </Link>
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
   
      {/* <button onClick={()=>{
          setUserData((prevData)=>{
            return {...prevData,username:"John Doe"}
          })
        }}>click me</button> */}
    </section>
  );
};

export default Register;
