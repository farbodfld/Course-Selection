import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './Student-semester.css'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';
import LaptopIcon from '@mui/icons-material/Laptop';

export default function StudentSemester() {
  let { semesterID } = useParams();
  const semester = allSemesters.find((semester) => semester.id === Number(semesterID));
  console.log(semester);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="semester student-semester">
         <div className="header">
        <p> {semester.name} </p>
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

      <div className="cards" >  
       <Link to={'ProCoursePreReg'}>  <Card className="studentSemesterCard"> <LibraryBooksIcon className="semesterIcon"></LibraryBooksIcon> The Provided Courses for <br/> pre-registration </Card></Link>
       <Link to={'PreRegs'}>  <Card className="studentSemesterCard"> <LocalLibraryIcon className="semesterIcon"></LocalLibraryIcon> The pre-Registrations  </Card></Link>
       <Link to={'ProCourseReg'} >  <Card className="studentSemesterCard"> <SchoolIcon className="semesterIcon"></SchoolIcon> The Provided Courses for <br/> Registration </Card></Link>
       <Link to={'RegCourses'}>  <Card className="studentSemesterCard"> <LaptopIcon className="semesterIcon"></LaptopIcon> The Registereted Courses  </Card></Link>
        
       </div>



    </div>
    
  ) 
}
