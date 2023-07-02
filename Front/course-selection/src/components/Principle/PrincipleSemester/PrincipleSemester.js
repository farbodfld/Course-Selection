import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "./PrincipleSemester.css";
export default function PrincipleSemester() {
  let { semesterID } = useParams();
  const [semester, setSemester] = useState([])
  // const semester = allSemesters.find(
  //   (semester) => semester.id === Number(semesterID)
  // );

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");
        const response = await fetch(`http://localhost:9090/api/term/${semesterID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          role : `${role}`
        },
      });

        const data = await response.json();
        setSemester(data)
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemester();
  }, [semesterID]);


  return (
    <div className="semester">
      <div className="header">
        <p> {semester.name} </p>
      </div>
      <hr />
      <div className="cards semester-cards">
      <Link to={"PreRegisteringCourses"}>
          <Card className="studentSemesterCard">
            <LocalLibraryIcon className="semesterIcon"></LocalLibraryIcon>
            Pre-Registering Courses
          </Card>
        </Link>
        <Link to={"RegisteringCourses"}>
          <Card className="studentSemesterCard">
            <LibraryBooksIcon className="semesterIcon"></LibraryBooksIcon>
            Registering Courses
          </Card>
        </Link>
        
      </div>
    </div>
  );
}
