import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import allSemesters from "../../../../mockdata";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';

export default function StudentList() {
    let { semesterID, courseID } = useParams();
    const semester = allSemesters.find((semester) => semester.id === Number(semesterID));
    const course = semester.courses.find(
      (course) => course.id === Number(courseID)
    );
    const [showAll, setShowAll] = useState(false);
    const [students, setStudents] = useState(course.students.slice(0, 10));
    const [searchQuery, setSearchQuery] = useState("");
    const [sortByStudents, setSortByStudents] = useState(null);
  
    const handleShowMore = () => {
      setShowAll(true);
      setStudents(course.students);
    };
    const handleShowLess = () => {
      setShowAll(false);
      setStudents(course.students.slice(0, 10));
    };
  
    const handleStatusChange = (studentId, newStatus) => {
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          return { ...student, status: newStatus };
        }
        return student;
      });
      setStudents(updatedStudents);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      filterStudents(event.target.value);
    };
  
    const filterStudents = (query) => {
      const filteredStudents = course.students.filter((student) =>
        student.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setStudents(filteredStudents);
    };
    const handleSortByStudents = (criteria) => {
        let sortedStudents = [];
      
        if (criteria === "newest") {
          // Sort students by newest (based on registration date)
          sortedStudents = [...students].sort((a, b) => {
            const dateA = new Date(a.registrationDate);
            const dateB = new Date(b.registrationDate);
            return dateB.getTime() - dateA.getTime();
          });
        } else if (criteria === "oldest") {
          // Sort students by oldest (based on registration date)
          sortedStudents = [...students].sort((a, b) => {
            const dateA = new Date(a.registrationDate);
            const dateB = new Date(b.registrationDate);
            return dateA.getTime() - dateB.getTime();
          });
        }
      
        setStudents(sortedStudents);
      };
     
    
  
 

    
  return (
    <div className="students">
    <div className="header">
      <p>  List of Registered for {course.name} </p>
      
    </div>
   
    <hr />

    <div className="semesters-container">
    <div className="filter-container RegisteringCoursesFilterContainer">
    <TextField variant="filled" label='Search students' value={searchQuery} onChange={handleSearchChange} />
    <div className="filterbtn-container">
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("newest")}
              >
                Newest
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("oldest")}
              >
                Oldest
              </Button>
            </div>
            <div>
                <Button variant="contained"> Download Excel </Button>
            </div>
      
    </div>
      <ul className="list">
        {students.map((student) => (
          <Card className="card">
          <li key={student.id} style={{display : 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}>
            <p>{student.fullName}</p>
            <div className="status-buttons">
              <Button
                variant="outlined"
                className={
                  student.status === "Pass" ? "status pass" : "status"
                }
                onClick={() => handleStatusChange(student.id, "Pass")}
              >
                Pass
              </Button>
              <Button
                variant="outlined"
                className={
                  student.status === "Fail" ? "status fail" : "status"
                }
                onClick={() => handleStatusChange(student.id, "Fail")}
              >
                Fail
              </Button>
            </div>
          </li>
          </Card>
        ))}
      </ul>
      <div className="btn-container">
        {course.students.length > 10 ? (
          !showAll ? (
            <button className="showMore btn" onClick={handleShowMore}>
              More
            </button>
          ) : (
            <button className="btn" onClick={handleShowLess}>
              Less
            </button>
          )
        ) : null}
      </div>
    </div>
  </div>
  )
}
