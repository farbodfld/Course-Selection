import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Card from "@mui/material/Card";
import "./EditSemester.css";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";

export default function EditSemester() {
  const students = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mike" },
  ];

  const professors = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Prof. Johnson" },
    { id: 3, name: "Dr. Brown" },
  ];
  let { id } = useParams();
  const semester = allSemesters.find((semester) => semester.id === Number(id));

  const [name, setName] = useState(semester.name);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Name:", name);
    console.log("Selected Student:", selectedStudent);
    console.log("Selected Professor:", selectedProfessor);
    // Additional logic for form submission
  };

  return (
    <div style={{ height: "80%" }} className="semester">
      <div className="header">
        <p> Editing Information About {semester.name} </p>
      </div>
      <hr />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <span className="inputsWithBtns">
            
            <TextField
              select
              label="Select Student"
              value={selectedStudent}
              onChange={handleStudentChange}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </TextField>
            <span>
              
              <Button variant="contained"> Add </Button>
              <Button
                variant="contained"
                style={{
                  whiteSpace: "nowrap",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                }}
              >
                
                Upload Excel
              </Button>
            </span>
          </span>

          <span className="inputsWithBtns">
            <TextField
              select
              label="Select Professor"
              value={selectedProfessor}
              onChange={handleProfessorChange}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {professors.map((professor) => (
                <MenuItem key={professor.id} value={professor.id}>
                  {professor.name}
                </MenuItem>
              ))}
            </TextField>
            <span>
              
              <Button variant="contained"> Add </Button>
              <Button
                variant="contained"
                style={{
                  whiteSpace: "nowrap",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                }}
              >
                
                Upload Excel
              </Button>
            </span>
          </span>
          <Button style={{ width: "100%" , marginTop : ' 70px' }} variant="contained" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
