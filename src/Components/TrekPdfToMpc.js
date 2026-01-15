import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import PdfInput from "../Components/pdf-input";
import PdfConverter from "../Components/pdf-converter";



const TrekPdfToMpc = (props) =>  {

  const [pdfFile, setPdfFile] = useState(null);

  return (

    <Container maxWidth="md" sx={{ py: 6 }}>
      <PdfInput onFileChange={(file) => setPdfFile(file)} />  
      {pdfFile && (
        <Grid item sx={{width: "100%"}}>
          <PdfConverter
            pdfUrl={URL.createObjectURL(pdfFile)}
            fileName={pdfFile.name}
          />
        </Grid>
      )}
    </Container>

  )
}

export default TrekPdfToMpc;
