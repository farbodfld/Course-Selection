import React , {useState} from 'react'
import './TeacherAssistance.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Route , Outlet } from 'react-router-dom';
import Course from './Course/Course';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const TeacherAssistance = () =>  {

  const [showSmallScreenSideNav, setShowSmallScreenSideNav] = useState(false);
  const handleMenuClick = () => {
    setShowSmallScreenSideNav(pre => !pre )
  }
  
  return (
    <>
    
    <nav> <MenuIcon className="menu" onClick={handleMenuClick} />  </nav>
    <div className={ showSmallScreenSideNav ? 'smallScreenSideNav' : 'none'} >
       <Link onClick={handleMenuClick} to='/teacher-assistant'> <ArrowRightIcon/> See Semesters </Link>    
       <hr/>
       </div>
    <div className='main' >
      <div className='main-items'>
          <Outlet />
      </div>
      <div className='sideNav'>
        <Link to='/teacher-assistant'> <ArrowRightIcon/> See Semesters </Link>  
      
      </div>
    </div>
    </>
  )
}

