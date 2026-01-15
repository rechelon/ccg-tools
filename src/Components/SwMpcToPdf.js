import React, { useState, lazy } from "react";
import { Container, Grid } from "@mui/material";
import CardsInput from "../Components/cards-input";
import CardsConverter from "../Components/cards-converter";



const SwMpcToPdf = (props) =>  {

  const [cardFiles, setCardFiles] = useState([]);

  return (

    <Container maxWidth="md" sx={{ py: 6 }}>
      <CardsInput onFileChange={(files) => setCardFiles(files)} />  
      {cardFiles.length > 0 && (
        <Grid item sx={{width: "100%"}}>
          <CardsConverter
            cardFiles={cardFiles}
          />
        </Grid>
      )}
    </Container>

  )
}

export default SwMpcToPdf;
