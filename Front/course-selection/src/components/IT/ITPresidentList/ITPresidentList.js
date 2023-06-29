import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./ITPresidentList.css";

export default function ITPresidentList() {
  const mockPresidents = [
    { id: 1, name: "George Washington" },
    { id: 2, name: "Abraham Lincoln" },
    { id: 3, name: "Thomas Jefferson" },
    { id: 4, name: "Franklin D. Roosevelt" },
    { id: 5, name: "John F. Kennedy" },
    { id: 6, name: "Barack Obama" },
    { id: 7, name: "Donald Trump" },
    { id: 8, name: "Joe Biden" },
  ];

  const [showAll, setShowAll] = useState(false);
  const [presidents, setPresidents] = useState(mockPresidents.slice(0, 5));
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowMore = () => {
    setShowAll(true);
    setPresidents(mockPresidents);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setPresidents(mockPresidents.slice(0, 5));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterPresidents(event.target.value);
  };

  const filterPresidents = (query) => {
    const filteredPresidents = mockPresidents.filter((president) =>
      president.name.toLowerCase().includes(query.toLowerCase())
    );
    setPresidents(filteredPresidents);
  };

  return (
    <div className="presidents">
      <div className="header">
        <p> List of Presidents </p>
        <Link to={"ITAddPresident"}>
          {" "}
          <Button variant="text">
            <AddIcon /> Add President
          </Button>{" "}
        </Link>
        <Link to={"addFaculty"}>
          {" "}
          <Button variant="text">
            <AddIcon /> Add Faculty
          </Button>{" "}
        </Link>
      </div>

      <hr />

      <div className="presidents-container">
        <div className="filter-container">
          <TextField
            variant="filled"
            label="Search Presidents"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="contained"> Download Excel </Button>
        </div>

        <ul className="list">
          {presidents.map((president) => (
            <Card className="card">
              <li
                key={president.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{president.name}</p>
                <div className="status-buttons">
                  <Button variant="text"> Delete </Button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          {mockPresidents.length > 5 ? (
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
