import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";
import "./Course.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Course() {
  let { id, courseid } = useParams();
  const semester = allSemesters.find((semester) => semester.id === Number(id));
  const course = semester.courses.find(
    (course) => course.id === Number(courseid)
  );

  console.log(semester);
  console.log(course);

  const [showAll, setShowAll] = useState(false);
  const [students, setStudents] = useState(course.students.slice(0, 10));
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="students">
      <div className="header">
        <p> {course.name} </p>
        <p> Number of Students : {course.students.length} </p>
      </div>
      <div className="search-container">

        
      </div>
      <hr />

      <div className="semesters-container">
      <TextField variant="filled" label='Search students' value={searchQuery} onChange={handleSearchChange} />
        <ul>
          {students.map((student) => (
            <li key={student.id}>
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
  );
}
