import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";


export default function ProCourseReg() {
let { semesterID } = useParams();
  const semester = allSemesters.find(
    (semester) => semester.id === Number(semesterID)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredCourses = semester ? semester.courses : [];
  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const displayedCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, 6);

  return (
    <div className="semester">
      <div className="header">
        <p> Provided Courses for Pre-Registration </p>
      </div>
      <hr />
      <div>
        <div className="filter-container">
          <TextField
            id="filled-basic"
            label="Search courses"
            variant="filled"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="list">
          {displayedCourses.map((course, index) => (
            <Card className="card">
              <li>
                
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  
                  {course.name}
                  <span>
                    
                    <Button variant="contained"> Cancel </Button>
                    <Button variant="outlined"> Information </Button>
                  </span>
                </p>
              </li>
            </Card>
          ))}
        </ul>
        {filteredCourses.length > 6 && (
          <div className="btn-container">
            {showAll ? (
              <Button onClick={toggleShowAll}>Less</Button>
            ) : (
              <Button onClick={toggleShowAll}>More</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
