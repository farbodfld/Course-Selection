import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

import allSemesters from "../../../mockdata";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {Authentication , NavigateToRole} from '../../../Authentication/Authentication'



export default function PrincipleSemesters() {

  
  const [allSemesters, setallSemesters] = useState([])
  const [semesters, setSemesters] = useState(allSemesters.slice(0, 10));
  const [showAll, setShowAll] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch("http://localhost:9090/api/terms", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
       setallSemesters(data);

       setSemesters(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTerms();
  }, []);


  const handleShowMore = () => {
    setShowAll(true);
    setSemesters(allSemesters);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setSemesters(allSemesters.slice(0, 6));
  };

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const role = localStorage.getItem("role");
      const response = await fetch(`http://localhost:9090/api/term/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          role : `${role}`
        },
      });

      if (response.ok) {
        console.log("Term deleted successfully");
        // Update the list of semesters after deleting the term
        const updatedSemesters = allSemesters.filter((semester) => semester._id !== id);
        setallSemesters(updatedSemesters);

        // Update the displayed semesters based on showAll state
        if (showAll) {
          setSemesters(updatedSemesters);
        } else {
          setSemesters(updatedSemesters.slice(0, 6));
        }
      } else {
        console.error("Failed to delete term");
        // Handle error case
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div className="semesters">
      <div className="header">
        <p> Check the Semesters </p>

        <Link style={{ textDecoration: "none" }} to={"addSemester"}>
          <Button variant="text"> Add Semester</Button>
        </Link>
      </div>
      <hr />
      <div className="semesters-container">
        <ul className='list'>
          {semesters.map((semester , index) => {
            return(
           <Link key={index} to={`/principle/${semester._id}/course`}> 
              <Card   className="card">
                <li>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {semester.name}
                    <span style={{ display: "flex", gap: "5px" }}>
                      <Link style={{ textDecoration: "none" }} to={`${semester._id}/edit` }>
                        <Button variant="outlined"> Edit </Button>
                      </Link>
                      <Link>
                      <Button onClick={() => handleDelete(semester._id)} variant="contained"> Delete </Button>
                      
                      </Link>
                        
                    </span>
                  </p>
                </li>
              </Card>
              </Link>
      
          )})}
        </ul>
        {allSemesters.length > 6 && (
          <div className="btn-container">
            {!showAll ? (
              <Button className="showMore btn" onClick={handleShowMore}>
                More
              </Button>
            ) : (
              <Button className="btn" onClick={handleShowLess}>
                Less
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
