import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { TeacherAssistance } from "./components/TA/TeacherAssistance";

import "./App.css";

import Semesters from "./components/TA/Semesters/Semesters";
import Semester from "./components/TA/Semester/Semester";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* TA */}
      <Route path="/teacher-assistant" element={<TeacherAssistance />} >
        <Route index element={ <Semesters/> } />
        <Route path=":id" element={ <Semester/> } />
        

      </Route>
     
      <Route path="/teacher-assistant/terms/:id" />
      {/* Student */}
      <Route path="/student" />
      <Route path="/student/terms" />
      {/* vice principal */}
      <Route path="/vice-principal" />
      {/* IT Admin */}
      <Route path="/admin" />
    </Routes>
  );
}

export default App;
