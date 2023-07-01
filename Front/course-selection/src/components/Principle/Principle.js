import React, { useState , useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkModeSlice";
import { IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Authentication , NavigateToRole} from '../../Authentication/Authentication'

export default function Principle() {
  useEffect(() => {


     Authentication('manager') ;
    
     
    
    
  
   
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  const showAllLink =
    location.pathname === "/principle" ||
    location.pathname === "/principle/students";

  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);

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
    <div style={{ height: "90%" }}>
      <AppBar>
       
        <IconButton
          className="icon-btn"
          onClick={() => dispatch(toggleDarkMode())}
        >
          <NightsStayIcon className={mode && "darkMode"} />
        </IconButton>
        <div style={{display : 'flex' , alignItems : 'center'}}>
        <Button onClick={handleLogout} style={{color : 'white'}} variant="text" > LogOut </Button>
        <MenuIcon className="menu" onClick={handleMenuClick} />
        </div>
        
      </AppBar>
      <div className={showSmallScreenSideNav ? "smallScreenSideNav" : "none"}>
        {showAllLink && (
          <>
            <Link onClick={handleMenuClick} to=".">
              <ArrowRightIcon /> See Semesters
            </Link>
            <Divider />
            <Link style={{ margin: "0" }} to="students">
              <ArrowRightIcon /> Students
            </Link>
            <Divider />
            <Link style={{ margin: "0" }} to="Profs">
              <ArrowRightIcon /> Professors
            </Link>
            <Divider />
          </>
        )}
        {!showAllLink && (
          <Link onClick={handleMenuClick} to=".">
            <ArrowRightIcon /> See Semesters
          </Link>
        )}
      </div>
      <div className="main">
        <div className="main-items">
          <Outlet />
        </div>
        <div className="sideNav">
          {showAllLink && (
            <>
              <Link to=".">
                <ArrowRightIcon /> See Semesters
              </Link>
              <Divider />
              <Link style={{ margin: "0" }} to="students">
                <ArrowRightIcon /> Students
              </Link>
              <Divider />
              <Link style={{ margin: "0" }} to="Profs">
                <ArrowRightIcon /> Professors
              </Link>
              <Divider />
            </>
          )}
          {!showAllLink && (
            <Link onClick={handleMenuClick} to=".">
              <ArrowRightIcon /> See Semesters
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
