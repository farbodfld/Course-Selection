import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { TeacherAssistance } from "./components/TA/TeacherAssistance";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./App.css";

import Semesters from "./components/TA/Semesters/Semesters";
import Semester from "./components/TA/Semester/Semester";
import Course from "./components/TA/Course/Course";
import { useSelector } from "react-redux";

import CssBaseline from '@mui/material/CssBaseline';




function App() {
  const { mode } = useSelector((state) => state.darkMode);
  
const darkTheme = createTheme({
  palette: {
      mode :  mode ? 'dark' : 'light'
  },
});
  document.body.classList = mode ? 'dark' : 'light';
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* TA */}
      <Route path="/teacher-assistant" element={<TeacherAssistance />}>
        <Route index element={<Semesters />} />
        <Route path=":id" element={<Semester />}  /> 
        <Route path=":id/course/:courseid" element={<Course/>} />
        
      </Route>

   

    </Routes>
    </ThemeProvider>
  );
}

export default App;
