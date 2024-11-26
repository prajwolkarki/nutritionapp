import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const loggedInData = useContext(UserContext);
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userData");
    loggedInData.setLoggedIn(null);
    navigate("/login");
  }

  return (
    <div className="header">
      <nav>
        <ul>
          <li>Home</li>
          <li onClick={logOut}>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
