import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../features/darkModeSlice";
import { IconButton } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { AppBar } from "@mui/material";

export default function IT() {
  const location = useLocation();

  const showAllLink = location.pathname === "/IT";

  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.darkMode);

  const [navItems, setNavItems] = useState([]);
  const [showSmallScreenSideNav, setShowSmallScreenSideNav] = useState(false);
  const handleMenuClick = () => {
    setShowSmallScreenSideNav((pre) => !pre);
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
        <MenuIcon className="menu" onClick={handleMenuClick} />
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
