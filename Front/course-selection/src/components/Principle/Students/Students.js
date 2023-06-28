import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

export default function Students() {
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

  const [students, setStudents] = useState(mockStudents.slice(0, 10));
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
    setStudents(mockStudents);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setStudents(mockStudents.slice(0, 10));
  };

  return (
    <div className="students">
      <div className="header">
        <p> Students list </p>
      </div>
      <div className="search-container"></div>
      <hr />

      <div className="semesters-container">
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
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          { (
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
          ) }
        </div>
      </div>
    </div>
  );
}
