import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const loggedInData = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userCred, setUserCred] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: "random-msg",
  });

  function handleInput(e) {
    setUserCred((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
     fetch(`https://nutrition-app-dpud.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify(userCred),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setMessage({
            type: "error",
            text: "User not found",
          });
        } else if (res.status === 403) {
          setMessage({
            type: "error",
            text: "Incorrect Password",
          });
        }
        setTimeout(() => {
          setMessage({ type: "invisible-msg", text: "Dummy Msg" });
        }, 3000);

        return res.json();
      })
      .then((data) => {
        if (data.token !== undefined) {
          localStorage.setItem("userData", JSON.stringify(data));
          loggedInData.setLoggedIn(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Sign In</h1>
        <input
          type="text"
          name="username"
          className="input"
          placeholder="Enter your username"
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Enter your password"
          onChange={handleInput}
        />
        <button className="btn">Log In</button>
        <p className="below">
          Not Registered?{" "}
          <Link className="signIn" to="/register">
            Sign up now
          </Link>
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
};

export default Login;
