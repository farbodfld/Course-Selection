import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function ITStudentList() {
  const mockStudents = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Williams" },
    { id: 5, name: "David Brown" },
    { id: 6, name: "Sarah Davis" },
    { id: 7, name: "Daniel Wilson" },
    { id: 8, name: "Olivia Taylor" },
    { id: 9, name: "Jacob Anderson" },
    { id: 10, name: "Sophia Martinez" },
    { id: 11, name: "Matthew Thomas" },
    { id: 12, name: "Isabella Clark" },
    { id: 13, name: "William Lewis" },
    { id: 14, name: "Ava Hernandez" },
    { id: 15, name: "James Lee" },
  ];

  const [showAll, setShowAll] = useState(false);
  const [students, setStudents] = useState(mockStudents.slice(0, 10));
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowMore = () => {
    setShowAll(true);
    setStudents(mockStudents);
  };
  const handleShowLess = () => {
    setShowAll(false);
    setStudents(mockStudents.slice(0, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterStudents(event.target.value);
  };

  const filterStudents = (query) => {
    const filteredStudents = mockStudents.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setStudents(filteredStudents);
  };

  return (
    <div className="students">
      <div className="header">
        <p> List of Students </p>
        <Link to={'ITAddStudent'}> <Button variant="text"> <AddIcon/> Add Student </Button> </Link> 
      </div>

      <hr />

      <div className="semesters-container">
        <div className="filter-container RegisteringCoursesFilterContainer">
          <TextField
            variant="filled"
            label="Search Students"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="contained"> Download Excel </Button>
        </div>

        <ul className="list">
          {students.map((student) => (
            <Card className="card">
              <li
                key={student.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{student.name}</p>
                <div className="status-buttons">
                  <Button variant="text"> Delete </Button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          {mockStudents.length > 10 ? (
            !showAll ? (
              <Button
                variant="contained"
                className="showMore btn"
                onClick={handleShowMore}
              >
                More
              </Button>
            ) : (
              <Button
                variant="contained"
                className="btn"
                onClick={handleShowLess}
              >
                Less
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
