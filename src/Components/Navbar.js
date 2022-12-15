
import logo from "../imgs/logo.jpeg"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar sx={{width:"100vw",backgroundColor:"#fff402",display:"flex", justifyContent:"center", alignItems: "center"}} position="static">
       
          <img src={logo} style={{width:"7rem",padding:0,marginLeft:10}} />
        
      </AppBar>
    </Box>
  );
}

