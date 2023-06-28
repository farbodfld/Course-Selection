import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";
import TextField from "@mui/material/TextField";
import "./RegisteringCourses.css";
import AddIcon from '@mui/icons-material/Add';

export default function RegisteringCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByStudents, setSortByStudents] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const coursesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  let { semesterID } = useParams();
  const semester = allSemesters.find(
    (semester) => semester.id === Number(semesterID)
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Reset the current page when the search query changes
  };

  const handleSortByStudents = (criteria) => {
    setSortByStudents(criteria);
  };

  const handleShowMore = () => {
    setShowAllCourses(true);
  };
  const handleShowLess = () => {
    setShowAllCourses(false);
    setCurrentPage(1);
  };

  let filteredCourses = semester ? semester.courses : [];

  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortByStudents === "most") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) => b.students.length - a.students.length
    );
  } else if (sortByStudents === "least") {
    filteredCourses = [...filteredCourses].sort(
      (a, b) => a.students.length - b.students.length
    );
  }

  const lastIndex = currentPage * coursesPerPage;
  const firstIndex = lastIndex - coursesPerPage;
  const currentCourses = showAllCourses
    ? filteredCourses
    : filteredCourses.slice(firstIndex, lastIndex);
  return (
    <div className="semester">
      <div className="header">
        <p> Registering Courses  {semester.name} </p>
        <Link to={'add'}> <Button variant="text"> <AddIcon/> Add Course </Button> </Link> 
      </div>
      <hr />
      {semester ? (
        <div>
          <div className="filter-container RegisteringCoursesFilterContainer">
            <TextField
              id="filled-basic"
              label="Search courses"
              variant="filled"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="filterbtn-container">
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("most")}
              >
                Most Students
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("least")}
              >
                Least Students
              </Button>
            </div>
            <div>
                <Button variant="contained"> Download Excel </Button>
            </div>
          </div>

          <ul className="registeringCoursesListContainer list">
            {currentCourses.map((course, index) => (
             
                <Card className="card registeringCoursesList">
                  <li>
                    <p className="courseName"> {course.name} </p>
                    <p className="numberOfRegistered"> {course.students.length} Registered </p>
                    <span className="registeringCoursesBtns">
                     <Link  to={'StudentList/'+course.id}>  <Button variant="outlined"> Information </Button> </Link>
                      <Button variant="outlined"> Delete </Button>
                    </span>
                  </li>
                </Card>
            
            ))}
          </ul>

          {filteredCourses.length > coursesPerPage && (
            <div className="btn-container">
              {!showAllCourses ? (
                <Button className="show-more-btn" onClick={handleShowMore}>
                  Show More
                </Button>
              ) : (
                <Button className="show-less-btn" onClick={handleShowLess}>
                  Show Less
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <h2>Semester not found.</h2>
      )}
    </div>
  );
}
