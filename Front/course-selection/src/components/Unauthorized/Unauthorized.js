import React , {useEffect , useState} from "react";
import { styled } from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {Authentication , NavigateToRole} from '../../Authentication/Authentication'


  const Unauthorized = () => {



    

    
   
  
    return (
     <div style={{ position : 'relative' , top : '30%' , display : 'flex' , flexDirection : 'column' , justifyContent : 'center' , padding : '20px' , textAlign : 'center'  }}>

        <p>
          You are not authorized. Please provide valid credentials.
        </p>
        <Button
          
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Go to Login
        </Button>
        
        </div>
      
    );
  };
  
  export default Unauthorized;
