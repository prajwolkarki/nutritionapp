import {Link} from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
  let [userCred,setUserCred] = useState({
    username:"",
    password:""
  })
  let [message,setMessage] = useState({
    type:"invisible-msg",
    text:"random-msg"
  })
  function handleInput(e){
    
    setUserCred((prev)=>{
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: "POST",
      body: JSON.stringify(userCred),
      headers: { // 'headers', not 'header'
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
       // console.log(res);
        if(res.status === 404){
          setMessage({
            type:"error",
            text:"User not found"
          })
        }else if(res.status === 403){
          setMessage({
            type:"error",
            text:"Incorrect Password"
          })
        }
        setTimeout(()=>{
          setMessage({type:"invisible-msg",text:"Dummy Msg"})
      },5000)

      return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <section className="container">
        <form onSubmit={handleSubmit} className="form">
            <h1>Sign In</h1>
            <input type="text" name="username" className="input" placeholder="Enter your username" onChange={handleInput}/>
            <input type="password" name="password" className="input" placeholder="Enter your password" onChange={handleInput}/>
            <button className="btn">Log In</button>
            <p className='below'>Not Registered? <Link className="signIn" to="/register">Sign up now</Link></p>
        </form>
    </section>
  )
}

export default Login;