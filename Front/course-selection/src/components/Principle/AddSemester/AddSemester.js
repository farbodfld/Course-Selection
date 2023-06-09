import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Card from "@mui/material/Card";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import allSemesters from "../../../mockdata";

export default function AddSemester() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Name:", name);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");
      const response = await fetch("http://localhost:9090/api/term", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          role : `${role}`
        },
        body: JSON.stringify({
          name: name,
          startDate: startDate,
          endDate: endDate,
        }),
      });
      
      if (response.ok) {
        console.log("Semester added successfully");
        // Redirect to the desired page
      
      } else {
        console.error("Failed to add semester");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: "80%" }} className="semester">
      <div className="header">
        <p> Add Semester </p>
      </div>
      <hr />
      <div className="form-container">
        <form className="addCourse-form" onSubmit={handleSubmit}>
          <TextField
            label="Semester Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              className="DateTimePicker"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <DateTimePicker
              className="DateTimePicker"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </LocalizationProvider>
          <Button
            className="addCourseBtn"
            style={{ width: "100%", marginTop: "70px" }}
            variant="contained"
            type="submit"
          >
            Add Semester
          </Button>
        </form>
      </div>
    </div>
  );
}
