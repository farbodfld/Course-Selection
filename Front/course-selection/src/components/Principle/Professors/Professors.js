import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";
import './Professors.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

export default function Professors() {
  const mockProfessors = [
    { id: 1, name: "Professor A" },
    { id: 2, name: "Professor B" },
    { id: 3, name: "Professor C" },
    { id: 4, name: "Professor D" },
    { id: 5, name: "Professor E" },
    { id: 6, name: "Professor F" },
    { id: 7, name: "Professor G" },
    { id: 8, name: "Professor H" },
    { id: 9, name: "Professor I" },
    { id: 10, name: "Professor J" },
    { id: 11, name: "Professor K" },
    { id: 12, name: "Professor L" },
    { id: 13, name: "Professor M" },
    { id: 14, name: "Professor N" },
    { id: 15, name: "Professor O" },
  ];

  const [professors, setProfessors] = useState(mockProfessors.slice(0, 10));
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
    setProfessors(mockProfessors);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setProfessors(mockProfessors.slice(0, 10));
  };

  return (
    <div className="professors">
      <div className="header">
        <p> Professors list </p>
      </div>
      <div className="search-container"></div>
      <hr />

      <div className="professors-container">
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
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          {professors.length > 10 ? (
            !showAll ? (
              <Button
                className="showMore btn"
                variant="contained"
                onClick={handleShowMore}
              >
                More
              </Button>
            ) : (
              <Button
                className="btn"
                variant="contained"
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
