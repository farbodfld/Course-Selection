import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Semester.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";

export default function Semester() {
  let { id } = useParams();
  const semester = allSemesters.find((semester) => semester.id === Number(id));
  //const [semester, setsemester] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByStudents, setSortByStudents] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const coursesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const fetchTermById = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
   

  //       const response = await fetch(`http://localhost:9090/api/term/${id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //      // setsemester(data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchTermById();
  // }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset the current page when the search query changes
  };

  const handleSortByStudents = (criteria) => {
    setSortByStudents(criteria);
  };

  const handleShowMore = () => {
    setShowAllCourses(true);
  };

  const handleShowLess = () => {
    setShowAllCourses(false);
    setCurrentPage(1); // Reset the current page when switching back to showing limited courses
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
        <p> {semester.name} </p>
        <Button variant="text" onClick={handleOpenDialog}>
          Check Semester Information
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Semester Information</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <hr />
      {semester ? (
        <div>
          <div className="filter-container">
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
          </div>

          <ul className='list'>
            {currentCourses.map((course, index) => (
              <Link
                key={index}
                to={`/teacher-assistant/${semester.id}/course/${course.id}`}
              >
                <Card className="card">
                  <li>
                    <p> {course.name} </p>
                  </li>
                </Card>
              </Link>
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
