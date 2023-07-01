import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import './Semesters.css';
//import allSemesters from "../../../mockdata";
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import {Authentication , NavigateToRole} from '../../../Authentication/Authentication'

const Semesters = () => {
  const [semesters, setSemesters] = useState([]);
  const [allSemesters, setallSemesters] = useState([])
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
        setallSemesters(data)
        setSemesters(data.slice(0, 6))
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
    <div className='semesters'>
      <p>Check the Semesters</p>
      <hr/>
      <div className='semesters-container'>
        <ul className='list'>
          {semesters.map((semester) => (
            <Link key={semester.id} to={`/teacher-assistant/1`}>
              <Card className='card'>
                <li>
                  <p>{semester.name}</p>
                </li>
              </Card>
            </Link>
          ))}
        </ul>
        {allSemesters.length > 6 && (
          <div className='btn-container'>
            {!showAll ? (
              <Button className='showMore btn' onClick={handleShowMore}>
                More
              </Button>
            ) : (
              <Button className='btn' onClick={handleShowLess}>
                Less
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Semesters;
