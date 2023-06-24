import React, { useState } from "react";
import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';

import {setId, setUsername} from '../../features/authSlice'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const { mode } = useSelector( (state) => state.darkMode )
 const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const status = response.status;
      if (status !== 200) {
        setShowUnauthorized( pre => !pre )
        setTimeout(() => {
          setShowUnauthorized(prevState => !prevState);
        }, 2000);
      } else {
        const data = await response.json();
        console.log(data.user._id);

        dispatch( setId(data.user._id) );
        dispatch( setUsername(data.user.firstname) )
      }

      // Process the response data
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconClick = () => {
    setShowUnauthorized(false )
  }

  return (
    <div className="login-div">
     
      <form onSubmit={handleSubmit}>
       
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
         <div className={showUnauthorized ? 'unauthorized-banner' : 'none' }>
        
        <CloseIcon style={ { cursor : 'pointer' } } onClick={handleIconClick} />
        <p> 
          You are not Authorized 
          <br></br>
          Put valid Email and Password
        </p>
      </div>
        <button type="submit">Login</button>
      </form>
      <div className="black"></div>
    </div>
  );
};
