import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const faculties = [
    { value: "faculty1", label: "Faculty 1" },
    { value: "faculty2", label: "Faculty 2" },
    { value: "faculty3", label: "Faculty 3" },
  ];
  
  const majors = [
    { value: "major1", label: "Major 1" },
    { value: "major2", label: "Major 2" },
    { value: "major3", label: "Major 3" },
  ];
export default function AddPresident() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [passedCourses, setPassedCourses] = useState("");
    const [faculty, setFaculty] = useState("");
    const [major, setMajor] = useState("");
    const [yearOfEntry, setYearOfEntry] = useState(new Date());
  
    const [levelOfEducation, setLevelOfEducation] = useState("");
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handleStudentNumberChange = (event) => {
      setStudentNumber(event.target.value);
    };
  
    const handleIdNumberChange = (event) => {
      setIdNumber(event.target.value);
    };
  
    const handlePassedCoursesChange = (event) => {
      setPassedCourses(event.target.value);
    };
  
    const handleFacultyChange = (event) => {
      setFaculty(event.target.value);
    };
  
    const handleMajorChange = (event) => {
      setMajor(event.target.value);
    };
  
  
  
    const handleLevelOfEducationChange = (event) => {
      setLevelOfEducation(event.target.value);
    };
    const handleAddCourse = () => {
      // Logic to add a passed course
      const course = ""; // Add your logic here to get the selected course
      setPassedCourses([...passedCourses, course]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form submitted");
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Student Number:", studentNumber);
      console.log("ID Number:", idNumber);
      console.log("Passed Courses:", passedCourses);
      console.log("Faculty:", faculty);
      console.log("Major:", major);
      console.log("Year of Entry:", yearOfEntry.getFullYear().toString());
      console.log("Level Of education:", levelOfEducation);
      // Additional logic for form submission
    };
    return (
      <div style={{ height: "80%" }} className="semester">
        <div className="header formHeader">
          <p> Add/Change for new President </p>
        </div>
        <hr />
        <div className="form-container">
          <form className="addCourse-form" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              select
              label="Faculty"
              value={faculty}
              onChange={handleFacultyChange}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {faculties.map((faculty) => (
                <MenuItem key={faculty.value} value={faculty.value}>
                  {faculty.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              select
              label="Major"
              value={major}
              onChange={handleMajorChange}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {majors.map((major) => (
                <MenuItem key={major.value} value={major.value}>
                  {major.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Student Number"
              value={studentNumber}
              onChange={handleStudentNumberChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
             <DatePicker className="datepickerAdd" label='Entry Year' views={["year"]} value={yearOfEntry}  onChange={(newValue) => setYearOfEntry(newValue)}/>
         
  
            <TextField
              label="ID Number"
              value={idNumber}
              onChange={handleIdNumberChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
  
            <TextField
              label="Level of Education"
              value={levelOfEducation}
              onChange={handleLevelOfEducationChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
           
            <Button className="addCourseBtn" variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
  );
}
