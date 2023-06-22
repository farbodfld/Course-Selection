import React , { useState } from 'react';
import { Link, Route , Outlet } from 'react-router-dom';
import './Semesters.css';
import allSemesters from "../../../mockdata";

const Semesters = () => {


    
      const [semesters, setSemesters] = useState(allSemesters.slice(0, 10));
      const [showAll, setShowAll] = useState(false);
    
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
        <p> Check the Semesters </p>
        <hr/>
        <div className='semesters-container' > 
            <ul>
            { semesters.map( (semester)=> (
                <Link key={semester.id} to={ `/teacher-assistant/`+semester.id }> 
                <li  > <p> {semester.name} </p>  </li></Link> 
            )   ) }
            </ul>
            <div className='btn-container'>
            {!showAll ? (
        <button className='showMore btn' onClick={handleShowMore}>More</button>
      ) : (
        <button className='btn' onClick={handleShowLess}>Less</button>
      )}
      </div>
         </div>
   </div>
  )
}

export default Semesters;
