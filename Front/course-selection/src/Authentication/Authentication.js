
import React, { useState , useEffect  } from "react";
export function Authentication( role = '' ){
    if( !role  ){
        const id = localStorage.getItem("id");
        const username = localStorage.getItem("username");
        const accessToken = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");

       
        if (id && username && accessToken && role) {
            return {   id , username , accessToken , role }
        }else{
            return 
        }
    }

    if( role ){
        const userRole = localStorage.getItem("role");
        console.log(userRole);
        console.log( role );
        userRole !== role && NavigateToRole("unauthorized")
    }
}


export function NavigateToRole(role){
 
    const location = window.location;
    switch (role) {
      case "admin":
        // Redirect to the admin route
        location.assign( '/IT' )
        break;
      case "manager":
        location.assign( '/principle' )
        break;
      case "student":
        // Redirect to the student route
        location.assign( '/student' )
        break;
      case "professor":
        // Redirect to the professor route
        location.assign('/teacher-assistant')
        break;

        case "unauthorized":
            // Redirect to the professor route
            location.assign('/Unauthorized')
            break;
      default:
        // Invalid role, show the login page
        break;
    }
}