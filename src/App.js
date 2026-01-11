import React, { useState, lazy } from "react";
import './App.css';
import { Grid } from "@mui/material";
import FileInput from "./Components/file-input";
import FileConverter from "./Components/file-converter";

import Header from "./Components/Header";
//import Home from "./Components/Home";
//const TrekPdfToMpc = lazy(() => import('./Components/TrekPdfToMpc'));
//const SwMpcToPdf = lazy(() => import('./Components/SwMpcToPdf'));


export const primary = "#176ede";


function App() {
  const [pdfFile, setPdfFile] = useState(null);
  return (
      <div className="App">
        <Header />

        <Grid container className="d-flex" sx={{ py: 6, px: 4}}>
          <Grid item className="box">
            <FileInput onFileChange={(file) => setPdfFile(file)} />  
          </Grid>
          {pdfFile && (
            <Grid item sx={{width: "100%"}}>
              <FileConverter
                pdfUrl={URL.createObjectURL(pdfFile)}
                fileName={pdfFile.name}
              />
            </Grid>
          )}
        </Grid>
      </div>
  );
}

export default App;
