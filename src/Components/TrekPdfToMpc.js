import React, { useState, lazy } from "react";
import { Grid } from "@mui/material";
import FileInput from "../Components/file-input";
import FileConverter from "../Components/file-converter";



const TrekPdfToMpc = (props) =>  {

  const [pdfFile, setPdfFile] = useState(null);

  return (
    <>
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

    </>
  )
}

export default TrekPdfToMpc;
