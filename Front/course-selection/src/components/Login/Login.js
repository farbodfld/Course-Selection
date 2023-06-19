import React, { useState } from "react";
import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUnauthorized, setShowUnauthorized] = useState(false);

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
      } else {
        const data = await response.json();
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
