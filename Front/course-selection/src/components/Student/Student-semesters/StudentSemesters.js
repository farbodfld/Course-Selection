import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

import allSemesters from "../../../mockdata";
import { useSelector } from "react-redux";

export default function StudentSemesters() {
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
    <div className='semesters '>
      <p> Check the Semesters </p>
      <hr/>
      <div className='semesters-container'>
        <ul className='list'>
          {semesters.map((semester) => (
            <Link key={semester.id} to={`` + semester.id}>
              <Card className='card'>
                <li>
                  <p> {semester.name} </p>
                </li>
              </Card>
            </Link>
          ))}
        </ul>
        <div className='btn-container'>
          {semesters.length > 6 && !showAll ? (
            <Button className='showMore btn' onClick={handleShowMore}>
              More
            </Button>
          ) : (
            showAll && (
              <Button className='btn' onClick={handleShowLess}>
                Less
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
