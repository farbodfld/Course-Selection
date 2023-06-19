import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import './App.css';  

function App() {

 
  return (
   <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />} />
      {/* TA */}
      <Route path='/teacher-assistant' />
      <Route path='/teacher-assistant/terms/:id' />
      {/* Student */}
      <Route path='/student' />
      <Route path='/student/terms' />
      {/* vice principal */}
      <Route path='/vice-principal'/>
      {/* IT Admin */}
      <Route path='/admin'/>
   </Routes>
  );
}

export default App;
