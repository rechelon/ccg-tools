import React, { useState } from "react";
import { Grid } from "@mui/material";
import NormalInput from "../Components/normal-input";
import NormalConverter from "../Components/normal-converter";



const NormalToMPC = (props) =>  {

  const [normalFile, setNormalFile] = useState(null);

  return (
    <>
      <Grid container className="d-flex" sx={{ py: 6, px: 4}}>
      <Grid item className="box">
        <NormalInput onFileChange={(file) => setNormalFile(file)} />  
      </Grid>
      {normalFile && (
        <Grid item sx={{width: "100%"}}>
          <p>Normal Converter</p>
          <NormalConverter
            normalUrl={URL.createObjectURL(normalFile)}
            fileName={normalFile.name}
          />
        </Grid>
      )}
    </Grid>

    </>
  )
}

export default NormalToMPC;
