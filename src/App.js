import React, { useState} from "react";
import './App.css';
import Header from "./Components/Header";
import Choices from "./Components/Choices";
import Home from "./Components/Home";
import TrekPdfToMpc from './Components/TrekPdfToMpc';
import NormalToMpc from './Components/NormalToMpc';
import SwMpcToPdf from './Components/SwMpcToPdf';
import trekImg from "./assets/star-trek-1e.jpg";
import swImg from "./assets/star-wars-ccg.jpg";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';


const theme = createTheme();

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const tools = [
    { id: 'tool1', name: 'PDF to MPC', icon: trekImg, input: 'PDF sheet of cards', output: 'MPC formatted images' },
    { id: 'tool2', name: 'MPC border-adder', icon: swImg, input: 'Normal Bordered Card Image', output: 'An MPC formatted image' },
    { id: 'tool3', name: 'MPC to PDF', icon: trekImg, input: 'Multiple MPC formatted card images', output: 'Printable PDF sheet of cards' }
  ];

  //const currentTool = tools.find(t => t.id === currentPage);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>

        <Header 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          tools={tools}
         />
        { currentPage === 'home' && (
          <>
            <Choices 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              tools={tools}
            />           
            <Home />
          </>
        )}
        { currentPage === 'tool1' && (
          <TrekPdfToMpc pages={tools} />
        )}
        { currentPage === 'tool2' && (
          <NormalToMpc pages={tools} />
        )}
        { currentPage === 'tool3' && (
          <SwMpcToPdf pages={tools} />
        )}


      </Box>
    </ThemeProvider>

  );
}

export default App;
