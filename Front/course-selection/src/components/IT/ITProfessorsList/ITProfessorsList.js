import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export default function ITProfessorList() {
  const mockProfessors = [
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
  const [professors, setProfessors] = useState(mockProfessors.slice(0, 10));
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowMore = () => {
    setShowAll(true);
    setProfessors(mockProfessors);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setProfessors(mockProfessors.slice(0, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProfessors(event.target.value);
  };

  const filterProfessors = (query) => {
    const filteredProfessors = mockProfessors.filter((professor) =>
      professor.name.toLowerCase().includes(query.toLowerCase())
    );
    setProfessors(filteredProfessors);
  };

  return (
    <div className="professors">
      <div className="header">
        <p> List of Professors </p>
        <Link to={'ITAddProfessor'}> <Button variant="text"> <AddIcon/> Add Professors </Button> </Link> 
      </div>

      <hr />

      <div className="professors-container">
        <div className="filter-container RegisteringCoursesFilterContainer">
          <TextField
            variant="filled"
            label="Search Professors"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="contained"> Download Excel </Button>
        </div>

        <ul className="list">
          {professors.map((professor) => (
            <Card className="card">
              <li
                key={professor.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{professor.name}</p>
                <div className="status-buttons">
                 
                  <Button variant="text"> Delete </Button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          {mockProfessors.length > 10 ? (
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
