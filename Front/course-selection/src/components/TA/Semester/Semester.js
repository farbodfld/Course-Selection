import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Semester.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';

import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";

export default function Semester() {
  let { id } = useParams();
  const semester = allSemesters.find((semester) => semester.id === Number(id));
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByStudents, setSortByStudents] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortByStudents = (criteria) => {
    setSortByStudents(criteria);
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

  return (
    <div className="semester">
      <div className="header">
        <p> {semester.name} </p>{" "}
        <Button variant="outlined" onClick={handleOpenDialog}>
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
       
          <ul>
            {filteredCourses.map((course, index) => (
              <Link 
                key={index}
                to={`/teacher-assistant/${semester.id}/course/${course.id}`}
              >
                <Card className="card">
                <li>
                  {" "}
                  <p> {course.name} </p>{" "}
                </li>
                </Card>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Semester not found.</h2>
      )}
    </div>
  );
}
