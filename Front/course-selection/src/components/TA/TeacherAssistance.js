import React , {useState} from 'react'
import './TeacherAssistance.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Route , Outlet } from 'react-router-dom';
import Course from './Course/Course';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSelector ,useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../features/darkModeSlice'

export const TeacherAssistance = () =>  {
  const dispatch = useDispatch()
  const { mode } = useSelector(state => state.darkMode);
  const { username } = useSelector(state => state.auth);

  const [showSmallScreenSideNav, setShowSmallScreenSideNav] = useState(false);
  const handleMenuClick = () => {
    setShowSmallScreenSideNav(pre => !pre )
  }
  
  return (
    <>
    
    <nav>  <button onClick={ () => dispatch( toggleDarkMode() ) }> DarkMode </button> <MenuIcon className="menu" onClick={handleMenuClick} />  </nav>
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

