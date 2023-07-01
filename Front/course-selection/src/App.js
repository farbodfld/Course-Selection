import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { TeacherAssistance } from "./components/TA/TeacherAssistance";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";

import Semesters from "./components/TA/Semesters/Semesters";
import Semester from "./components/TA/Semester/Semester";
import Course from "./components/TA/Course/Course";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CssBaseline from "@mui/material/CssBaseline";
import Student from "./components/Student/Student";
import StudentDashboard from "./components/Student/Student-dashboard/StudentDashboard";
import StudentSemesters from "./components/Student/Student-semesters/StudentSemesters";
import StudentSemester from "./components/Student/Student-semester/StudentSemester";
import ProCoursePreReg from "./components/Student/proCoursePreReg/ProCoursePreReg";
import PreRegs from "./components/Student/preRegs/PreRegs";
import ProCourseReg from "./components/Student/proCourseReg/ProCourseReg";
import RegCourses from "./components/Student/RegCourses/RegCourses";
import PrincipleSemesters from "./components/Principle/Principle-Semesters/PrincipleSemesters";
import Principle from "./components/Principle/Principle";
import AddSemester from "./components/Principle/AddSemester/AddSemester";
import EditSemester from "./components/Principle/EditSemester/EditSemester";
import PrincipleSemester from "./components/Principle/PrincipleSemester/PrincipleSemester";
import PreRegisteringCourses from "./components/Principle/PreRegisteringCourses/PreRegisteringCourses";
import RegisteringCourses from "./components/Principle/RegisteringCourses/RegisteringCourses";
import StudentList from "./components/Principle/RegisteringCourses/StudentList/StudentList";
import AddCourse from "./components/Principle/AddCourse/AddCourse";
import Students from "./components/Principle/Students/Students";
import Professors from "./components/Principle/Professors/Professors";
import IT from "./components/IT/IT";
import ITStudentList from './components/IT/ITStudentList/ITStudentList'
import AddStudent from './components/IT/AddStudent/AddStudent'
import ITProfessorsList from './components/IT/ITProfessorsList/ITProfessorsList'
import AddProfessor from './components/IT/AddProfessor/AddProfessor'
import ITPresidentList from './components/IT/ITPresidentList/ITPresidentList'
import AddPresident from './components/IT/AddPresident/AddPresident'
import AddFaculty from './components/IT/AddFaculty/AddFaculty'
import Unauthorized from './components/Unauthorized/Unauthorized'
function App() {
  const { mode } = useSelector((state) => state.darkMode);

  const darkTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });
  document.body.classList = mode ? "dark" : "light";
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* TA */}
        <Route path="/teacher-assistant" element={<TeacherAssistance />}>
          <Route index element={<Semesters />} />
          <Route path=":id" element={<Semester />} />
          <Route path=":id/course/:courseid" element={<Course />} />
        </Route>

        <Route path="/student" element={<Student />}>
          <Route index element={<StudentDashboard />} />
          <Route path="semesters" element={<StudentSemesters />} />
          <Route path="semesters/:semesterID" element={<StudentSemester />} />
          <Route
            path="semesters/:semesterID/ProCoursePreReg"
            element={<ProCoursePreReg />}
          />
          <Route path="semesters/:semesterID/PreRegs" element={<PreRegs />} />
          <Route
            path="semesters/:semesterID/ProCourseReg"
            element={<ProCourseReg />}
          />
          <Route
            path="semesters/:semesterID/RegCourses"
            element={<RegCourses />}
          />
        </Route>

        <Route path="/principle" element={<Principle />}>
          <Route index element={<PrincipleSemesters />} />
          <Route path=":id/edit" element={<EditSemester />} />
          <Route path="addSemester" element={<AddSemester />} />
          <Route path=":semesterID/course" element={<PrincipleSemester />} />
          <Route
            path=":semesterID/course/PreRegisteringCourses"
            element={<PreRegisteringCourses />}
          />
          <Route
            path=":semesterID/course/PreRegisteringCourses/add"
            element={<AddCourse />}
          />
          <Route
            path=":semesterID/course/PreRegisteringCourses/StudentList/:courseID"
            element={<StudentList />}
          />
          <Route
            path=":semesterID/course/RegisteringCourses"
            element={<RegisteringCourses />}
          />
          <Route
            path=":semesterID/course/RegisteringCourses/add"
            element={<AddCourse />}
          />
          <Route
            path=":semesterID/course/RegisteringCourses/StudentList/:courseID"
            element={<StudentList />}
          />
          <Route path="students" element={<Students />} />
          <Route path="Profs" element={<Professors />} />
        </Route>

        <Route path="IT" element={ <IT/> } > 
          <Route index element={ <ITStudentList/> } />
          <Route path="ITAddStudent" element={<AddStudent/>} />
         

          
          <Route path="ITProfessorsList" element={ <ITProfessorsList/> } />
          <Route path="ITProfessorsList/ITAddProfessor" element={ <AddProfessor/> }/> 
        

          <Route path="ITPresidentsList" element={ <ITPresidentList/> } />
          <Route path="ITPresidentsList/addFaculty" element={ <AddFaculty/> } />
          <Route path="ITPresidentsList/ITAddPresident" element={ <AddPresident/> }/> 
        
          
        </Route>

        <Route path="Unauthorized" element={ <Unauthorized/> } />
      </Routes>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
