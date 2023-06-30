import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

import allSemesters from "../../../mockdata";
import { useSelector } from "react-redux";

export default function StudentSemesters() {


  const [semesters, setSemesters] = useState();
  const [showAll, setShowAll] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/terms", {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZkAiLCJpZCI6IjY0NTdhZGQxZjdmMmVlYmQzM2Q5NjgxMyJ9LCJpYXQiOjE2ODgxMDA4NTcsImV4cCI6MTY4ODEwMTQ1N30.HnWf5U8ikExZZJ8Hz5yyStkXhmR-UHGf8Ur1XR7tlLs"
          },
        });
        const data = await response.json();
        console.log(data);
        setSemesters(data)
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
