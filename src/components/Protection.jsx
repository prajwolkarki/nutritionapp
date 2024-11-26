
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
export default function Protection(props)
{

    const loggedInData = useContext(UserContext);

    

    return (

        loggedInData.loggedIn!==null?
        <props.Component/>
        :
        <Navigate to="/login"/>

    )

}
