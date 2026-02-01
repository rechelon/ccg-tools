import {
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, useMemo, } from "react";

import { PDFDocument } from 'pdf-lib';



function CardsConverter({ cardFiles }) {
  const myRef = React.createRef();

  const [newPdf, setNewPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cardFiles || cardFiles.length === 0) return;
    renderPage();
  }, [cardFiles]);

  
  const renderPage = async () => {
    if (!cardFiles || cardFiles.length === 0 ) {
      return;
    }
    setLoading(true);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdfDoc = await PDFDocument.create();

    const PAGE_WIDTH = 612; // done in "pdf points" stupid fucking specification
    const PAGE_HEIGHT = 792; // works out to US letter, 1 point = 1/72 inch
    //const PADDING = 20; // have to manually figure this out

    //const cellWidth = (PAGE_WIDTH - PADDING * 2) / 3;
    //const cellHeight = (PAGE_HEIGHT - PADDING * 2) / 3;
    const cellWidth = 197 //2.73*72
    const cellHeight = 269 //3.73*72

    let page = null;

    // for each card 
    // counter up to 9 then reset, add page
    for (let i = 0; i < cardFiles.length; i++) {
      if (i % 9 === 0) {
        page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      }

      const file = cardFiles[i];
      // need to process mpc cards to strip out border
      // bypassing that for now
      const bytes = await file.arrayBuffer();

      const img =
        file.type === 'image/png'
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);

      let x = 0;
      let y = 0;
      const indexOnPage = i % 9;
      switch (indexOnPage) {
        case 0:
          x = 29; // left side
          y = 12; // bottom side
          break;
        case 1:
          x = 209;
          y = 12;
          break;
        case 2:
          x = 387;
          y = 12;
          break;
        case 3:
          x = 29;
          y = 262;
          break;
        case 4:
          x = 209;
          y = 262;
          break;
        case 5:
          x = 387;
          y = 262;
          break;
        case 6:
          x = 29;
          y = 512;
          break;
        case 7:
          x = 209;
          y = 512;
          break;
        case 8:
          x = 387;
          y = 512;
          break;
        default:
          console.log('SWITCH FAILED TO HIT')
      }

      page.drawImage(img, {
        x,
        y,
        width: cellWidth,
        height: cellHeight,
      });

    } // outside of per image loop

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setNewPdf(url);
    setLoading(false);

  };




  return (
    <Box sx={{ my: 4, textAlign: "center" }} ref={myRef} id="image-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {newPdf && (
            <>
              <h4 className="drop-file-preview__title">
                Final PDF
              </h4>
              <a href={newPdf} download="cards.pdf">
                Download PDF
              </a>
            </>
          )}

        </>
      )}
    </Box>
  );
}

export default CardsConverter;





