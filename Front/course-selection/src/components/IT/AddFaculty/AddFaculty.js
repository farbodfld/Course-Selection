import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import './AddFaculty.css'
export default function AddFaculty() {
  const [facultyName, setFacultyName] = useState("");
  const [courses, setCourses] = useState([]);
  
  const handleFacultyNameChange = (event) => {
    setFacultyName(event.target.value);
  };

  const handleCoursesChange = (event) => {
    setCourses(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Faculty Name:", facultyName);
    console.log("Courses:", courses);
    // Additional logic for form submission
  };

  // Mock data for courses
  const mockCourses = [
    { value: "course1", label: "Course 1" },
    { value: "course2", label: "Course 2" },
    { value: "course3", label: "Course 3" },
  ];

  return (
    <div style={{ height: "80%" }} className="semester">
      <div className="header formHeader">
        <p> Add/Change for new Faculty </p>
      </div>
      <hr />
      <div className="form-container">
        <form className="addCourse-form addFaculty" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={facultyName}
            onChange={handleFacultyNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            label="Courses"
            value={courses}
            onChange={handleCoursesChange}
            fullWidth
            margin="normal"
            variant="outlined"
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(", "),
            }}
          >
            {mockCourses.map((course) => (
              <MenuItem key={course.value} value={course.value}>
                {course.label}
              </MenuItem>
            ))}
          </TextField>
          <Button className="addCourseBtn" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
