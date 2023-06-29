import React, { useState } from "react";
import "./TeacherAssistance.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import { Divider } from '@mui/material';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkModeSlice";
import { IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar } from "@mui/material";

export const TeacherAssistance = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);


  const [showSmallScreenSideNav, setShowSmallScreenSideNav] = useState(false);
  const handleMenuClick = () => {
    setShowSmallScreenSideNav((pre) => !pre);
  };

  return (
    <div style={ { 
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column' }}>
      <AppBar>
        <IconButton
          className="icon-btn"
          onClick={() => dispatch(toggleDarkMode())}
        >
          <NightsStayIcon className={mode && "darkMode"} />
        </IconButton>
        <MenuIcon className="menu" onClick={handleMenuClick} />
      </AppBar>
      <div className={showSmallScreenSideNav ? "smallScreenSideNav" : "none"}>
        <Link onClick={handleMenuClick} to="/teacher-assistant">
          <ArrowRightIcon /> See Semesters
        </Link>
        <Divider/>
      </div>
      <div className="main">
        <div className="main-items">
          <Outlet />
        </div>
        <div className="sideNav">
          <Link to="/teacher-assistant">
            <ArrowRightIcon /> See Semesters
          </Link>
        </div>
      </div>
    </div>
  );
};
