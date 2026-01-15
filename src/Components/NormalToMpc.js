import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import NormalInput from "../Components/normal-input";
import NormalConverter from "../Components/normal-converter";



const NormalToMPC = (props) =>  {

  const [normalFile, setNormalFile] = useState(null);

  return (

    <Container maxWidth="md" sx={{ py: 6 }}>
      <NormalInput onFileChange={(file) => setNormalFile(file)} />  
      {normalFile && (
        <Grid item sx={{width: "100%"}}>
          <p>Normal Converter</p>
          <NormalConverter
            normalUrl={URL.createObjectURL(normalFile)}
            fileName={normalFile.name}
          />
        </Grid>
      )}
    </Container>
  )
}

export default NormalToMPC;
