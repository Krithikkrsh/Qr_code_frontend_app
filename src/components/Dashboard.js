import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const [loggedUser,setLoggedUser] = useState("");
    useEffect(() => {
        fetch("http://192.168.76.211:8080/getCurrentUser")
        .then(response => response.json())
        .then(response => setLoggedUser(response.userName));

    },[loggedUser]);
    const img = require('../components/hacker.png');
    return (
        <>
        <div className="body-dashboard">
            <div className="dashboard-container">
                <div className="user-avatar">
                    <img src={img} alt="User Avatar"></img>
                </div>
                <div className="user-name">
                    {loggedUser}
                </div>
                <button className="logout-button" onClick={e => {
                    navigate("/")
                }}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default Dashboard;