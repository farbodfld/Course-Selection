import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";
import TextField from "@mui/material/TextField";


import AddIcon from '@mui/icons-material/Add';

export default function PreRegisteringCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByStudents, setSortByStudents] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const coursesPerPage = 6;

  let { semesterID } = useParams();
  const [semester, setSemester] = useState([])
  const [preRegistrationCourses, setPreRegistrationCourses] = useState([])
  // const semester = allSemesters.find(
  //   (semester) => semester.id === Number(semesterID)
  // );

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");
        const response = await fetch(`http://localhost:9090/api/term/${semesterID}/preregistration_courses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          role : `${role}`
        },
      });

      const responseSemester = await fetch(`http://localhost:9090/api/term/${semesterID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          role : `${role}`
        },
      });

        const dataSemester = await responseSemester.json();
        setSemester(dataSemester)

        const data = await response.json();
        console.log(data.preRegCoursesNames);
        setPreRegistrationCourses(data.preRegCoursesNames)
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemester();
  }, [semesterID]);




  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    
    

    
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
    //setCurrentPage(1);
  };

  let filteredCourses =  preRegistrationCourses? preRegistrationCourses : [];

  if (searchQuery) {
    console.log(searchQuery);
    console.log(filteredCourses);
   filteredCourses =  filteredCourses.filter( course => course.toLowerCase().includes(searchQuery) )
   console.log(filteredCourses);
  
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
        <p> Pre-Registering Courses  {semester.name} </p>
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
            {filteredCourses.map((course, index) => (
             
                <Card className="card registeringCoursesList">
                  <li>
                    <p className="courseName"> {filteredCourses[index]} </p>
                    <span className="registeringCoursesBtns">
                     <Link  to={'StudentList/'+course.id}>  <Button variant="outlined"> Information </Button> </Link>
                      <Button variant="outlined"> Delete </Button>
                    </span>
                  </li>
                </Card>
            
            ))}
          </ul>

          {preRegistrationCourses.length > coursesPerPage && (
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
