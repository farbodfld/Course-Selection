import React from "react";
import "./StudenDashboard.css";
import {Divider} from '@mui/material'

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <p className="home"> Home </p>
      <hr />
      <p className="recently"> Recently Semester <Divider className="devider"/> </p>
      
      <p className="recently"> Recently Course  <Divider className="devider" /> </p>
     
    </div>
  );
};

export default StudentDashboard;
