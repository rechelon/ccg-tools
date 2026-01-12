import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
} from "@mui/material";



function NormalConverter({ normalUrl, fileName }) {
  const myRef = React.createRef();

  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [generatedImage]);


  useEffect(() => {
    if (normalUrl) {
      renderPage(normalUrl);
    }
  }, [normalUrl]);
  

  const renderPage = async (data) => {
    setLoading(true);

    console.log(
      data instanceof Uint8Array,
      data instanceof ArrayBuffer,
      typeof data
    );


    const img = new Image();
    img.src = normalUrl;
    await img.decode();

    const final_width = 1495; // size of the final MPC bordered card
    const final_height = 2032;

    const source_width = img.naturalWidth; 
    const source_height = img.naturalHeight;

    // offset of the border on the normal card
    // a fraction of the input card size
    const l = Math.floor(( 42 / 865 ) * source_width); 
    const t = Math.floor(( 42 / 1209 ) * source_height);


    const canvas = document.createElement("canvas");
    canvas.width = final_width;
    canvas.height = final_height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, final_width, final_height);
    ctx.drawImage(
      img, // source
      l, t, source_width - 2*l, source_height - 2*t, // offset, then size of rect to crop
      134, 134, final_width - 2*134, final_height - 2*134  // destination offset then destination size 
    );

    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);

    setGeneratedImage(url);
  };

  const canvasToBlob = (canvas) => {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
  }


  return (
    <Box sx={{ my: 4, textAlign: "center" }} ref={myRef} id="image-container">
      <p> inside normal </p>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {generatedImage && (
            <>
              <img
                src={generatedImage}
                alt=''
              />
            </>
          )}

        </>
      )}
    </Box>
  );
}

export default NormalConverter;





