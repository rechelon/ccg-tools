import React, { useState, lazy } from "react";
import { Grid } from "@mui/material";
import CardsInput from "../Components/cards-input";
import CardsConverter from "../Components/cards-converter";



const SwMpcToPdf = (props) =>  {

  const [cardFiles, setCardFiles] = useState([]);

  return (
    <>
      <Grid container className="d-flex" sx={{ py: 6, px: 4}}>
      <Grid item className="box">
        <CardsInput onFileChange={(files) => setCardFiles(files)} />  
      </Grid>
      {cardFiles.length > 0 && (
        <Grid item sx={{width: "100%"}}>
          <CardConverter
            cardFiles={cardFiles}
          />
        </Grid>
      )}
    </Grid>

    </>
  )
}

export default SwMpcToPdf;
