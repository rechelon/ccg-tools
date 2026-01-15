import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';


function Header({currentPage, setCurrentPage, tools}) {

  return (

  <AppBar position="static" color="default" elevation={1}>
    <Toolbar>
      {currentPage === 'home' ? (
        <Typography variant="h5" component="h1">
          CCG Formatting & Printing Tools
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => setCurrentPage('home')}
            edge="start"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h1">
            {tools.find(t => t.id === currentPage)?.name}
          </Typography>
        </Box>
      )}
    </Toolbar>
  </AppBar>

  );
}
export default Header;

