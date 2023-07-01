import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkModeSlice";
import { IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar , Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Authentication , NavigateToRole} from '../../Authentication/Authentication'

export default function IT() {

  useEffect(() => {


    
    
    const fetchTerms = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch("http://localhost:9090/api/terms", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTerms();
     
    
    
  
   
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const showAllLink = location.pathname === "/IT";

  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);

  const [navItems, setNavItems] = useState([]);
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

  useEffect(() => {
    switch (location.pathname) {
      case "/IT":
        setNavItems([
          { name: "Students", to: ".", className: "firstLink" },
          { name: "Professors", to: "ITProfessorsList", className: "" },
          { name: "Presidents", to: "ITPresidentsList", className: "" },
        ]);
        break;
      case "/IT/ITProfessorsList":
      case "/IT/ITPresidentsList":
        setNavItems([
          { name: "Students", to: ".", className: "" },
          { name: "Professors", to: "ITProfessorsList", className: "firstLink" },
        ]);
        break;
      default:
        break;
    }
  }, [location.pathname]);

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
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link
              to={item.to}
              className={index === 0 ? item.className : ""}
              style={{ marginTop: index  !== 0 ? "0" : "" }}
            >
              <ArrowRightIcon /> {item.name}
            </Link>
            <Divider />
          </React.Fragment>
        ))}
      </div>
      <div className="main">
        <div className="main-items">
          <Outlet />
        </div>
        <div className="sideNav">
          {navItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.to}
                className={index === 0 ? item.className : ""}
                style={{ marginTop: index !== 0 ? "0" : "" }}
              >
                <ArrowRightIcon /> {item.name}
              </Link>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
