import React, { useState , useEffect } from "react";
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
  //const semester = allSemesters.find((semester) => semester.id === Number(id));


  const [semester, setsemester] = useState({})
  const [name, setName] = useState('');
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");

  useEffect(() => {
    const fetchTermById = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:9090/api/term/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
        setsemester( data )
        setName( data.name )
         
      } catch (error) {
        console.error(error);
      }
    };

    fetchTermById();
  }, []);





  const handleNameChange = (event) => {
    setName(event.target.value);

  };

  const handleStudentChange = (event) => {
    console.log(event.target);
    setSelectedStudent(event.target.value);
  };

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Name:", name);
    console.log("Selected Student:", selectedStudent);
    console.log("Selected Professor:", selectedProfessor);
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:9090/api/term/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          users: selectedStudent,
          professor: selectedProfessor,
        }),
      });
  
      if (response.ok) {
        console.log("Data updated successfully");
        // Additional logic after successful update
      } else {
        console.error("Failed to update data");
        // Additional error handling
      }
    } catch (error) {
      console.error(error);
      // Additional error handling
    }
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
                <MenuItem    key={student.id} value={student.name}>
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
                <MenuItem key={professor.id} value={professor.name}>
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
