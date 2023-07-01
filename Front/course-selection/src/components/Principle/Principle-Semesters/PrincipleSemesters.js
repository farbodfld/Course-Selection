import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

import allSemesters from "../../../mockdata";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {Authentication , NavigateToRole} from '../../../Authentication/Authentication'


export default function PrincipleSemesters() {
  const [semesters, setSemesters] = useState(allSemesters.slice(0, 10));
  const [showAll, setShowAll] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);


  const handleShowMore = () => {
    setShowAll(true);
    setSemesters(allSemesters);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setSemesters(allSemesters.slice(0, 6));
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
          {semesters.map((semester) => (
            <Link key={semester.id} to={`/principle/${semester.id}/course`}>
              <Card className="card">
                <li>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {semester.name}
                    <span style={{ display: "flex", gap: "5px" }}>
                      <Link style={{ textDecoration: "none" }} to={`${semester.id}/edit` }>
                        <Button variant="outlined"> Edit </Button>
                      </Link>
                      <Link to={""}>
                        <Button variant="contained"> Delete </Button>
                      </Link>
                    </span>
                  </p>
                </li>
              </Card>
            </Link>
          ))}
        </ul>
        {semesters.length > 6 && (
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
