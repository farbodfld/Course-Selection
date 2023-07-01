import React, { useState } from "react";
import "./Student.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkModeSlice";
import { IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar , Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

 const Student = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);
  const navigate = useNavigate();


  const [showSmallScreenSideNav, setShowSmallScreenSideNav] = useState(false);
  const handleMenuClick = () => {
    setShowSmallScreenSideNav((pre) => !pre);
  };

  const handleLogout = () => {
    // Remove items from localStorage
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
  
    // Perform any additional logout logic or redirect to the login page
    // For example, you can redirect to the login page using React Router
    navigate("/login");
  };

  return (
    <div  style={ { 
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' }}>
      <AppBar>
        <div style={ { marginLeft : '20px'} }>

       
        <Link style={{color : 'transparent'}}> <Button style={{color : 'white'}} variant="text">Log Out</Button>  </Link>
        <IconButton
          className="icon-btn"
          onClick={() => dispatch(toggleDarkMode())}
        >
          <NightsStayIcon className={mode && "darkMode"} />
        </IconButton>
        </div>
        <div style={{display:'flex' , alignItems : 'center'}}>

        <span className="fullname "> NAME </span>
        <div style={{display : 'flex' , alignItems : 'center'}}>
        <Button onClick={handleLogout} style={{color : 'white'}} variant="text" > LogOut </Button>
        <MenuIcon className="menu" onClick={handleMenuClick} />
        </div>
        </div>
      </AppBar>
      <div className={showSmallScreenSideNav ? "smallScreenSideNav" : "none"}>
        <Link onClick={handleMenuClick} to="semesters">
          <ArrowRightIcon /> See Semesters
        </Link>
        <hr />
      </div>
      <div className="main">
        <div className="main-items">
          <Outlet />
        </div>
        <div className="sideNav">
          <Link to="semesters">
            <ArrowRightIcon /> See Semesters
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Student;