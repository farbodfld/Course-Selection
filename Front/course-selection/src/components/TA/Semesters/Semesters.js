import React , { useState } from 'react';
import { Link, Route , Outlet } from 'react-router-dom';
import './Semesters.css';

const Semesters = () => {

    const allSemesters = [
        { id: 1, name: 'Fall 2020', courses: ['Mathematics', 'Physics', 'English'] },
        { id: 2, name: 'Spring 2021', courses: ['Computer Science', 'Chemistry', 'History'] },
        { id: 3, name: 'Fall 2021', courses: ['Biology', 'Art', 'Psychology'] },
        { id: 4, name: 'Spring 2022', courses: ['Sociology', 'Economics', 'Spanish'] },
        { id: 5, name: 'Fall 2022', courses: ['Literature', 'Statistics', 'Physical Education'] },
        { id: 6, name: 'Spring 2023', courses: ['Geography', 'Music', 'Political Science'] },
        { id: 7, name: 'Fall 2023', courses: ['Anthropology', 'Philosophy', 'Theater'] },
        { id: 8, name: 'Spring 2024', courses: ['Environmental Science', 'Marketing', 'French'] },
        { id: 9, name: 'Fall 2024', courses: ['Engineering', 'Communications', 'Japanese'] },
        { id: 10, name: 'Spring 2025', courses: ['Psychiatry', 'Business Management', 'German'] },
        { id: 11, name: 'Fall 2025', courses: ['Chemical Engineering', 'Sociology', 'Latin'] },
        { id: 12, name: 'Spring 2026', courses: ['Astronomy', 'Finance', 'Italian'] },
        { id: 13, name: 'Fall 2026', courses: ['Human Resources', 'Criminal Justice', 'Russian'] },
        { id: 14, name: 'Spring 2027', courses: ['Geology', 'Management', 'Korean'] },
        { id: 15, name: 'Fall 2027', courses: ['Digital Media', 'Ethics', 'Chinese'] },
        { id: 16, name: 'Spring 2028', courses: ['Journalism', 'Public Speaking', 'Swedish'] },
        { id: 17, name: 'Fall 2028', courses: ['Social Work', 'Linguistics', 'Portuguese'] },
        { id: 18, name: 'Spring 2029', courses: ['Architecture', 'International Relations', 'Hindi'] },
        { id: 19, name: 'Fall 2029', courses: ['Neuroscience', 'Fashion Design', 'Arabic'] },
        { id: 20, name: 'Spring 2030', courses: ['Astrophysics', 'Education', 'Dutch'] },
      ];
    
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
                <Link to={ `/teacher-assistant/`+semester.id }> 
                <li key={semester.id} > <p> {semester.name} </p>  </li></Link> 
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
