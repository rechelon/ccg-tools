import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useMemo, useState, } from "react";

import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerPort = new Worker(
  new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url),
  { type: "module" }
);



function CardsConverter({ pdfUrl, fileName }) {
  const myRef = React.createRef();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [imageUrls, croppedImages]);

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const UrlUploader = async (url) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    renderPage(new Uint8Array(buffer));
  };

  useMemo(() => {
    UrlUploader(pdfUrl);
  }, []);
  
  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");

    console.log(
      data instanceof Uint8Array,
      data instanceof ArrayBuffer,
      typeof data
    );

    const pdf = await pdfjsLib.getDocument({ data }).promise;
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`looping thru pdf pages ${i}`);
      var page = await pdf.getPage(i);
      //
      var viewport = page.getViewport({ scale: 1 });
      const scale = 4400 / viewport.height;
      viewport = page.getViewport({ scale: scale });
      canvas.height = 4400;
      canvas.width = 3400;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    // =====================================================
    console.log('moving onto crops');
    const crops = [];

    const left1 = 260, left2 = 1253, left3 = 2245;
    const top1 = 170, top2 = 1556, top3 = 2942;

    const card_regions = [
      // row 1
      [left1, top1, 1],
      [left2, top1, 2],
      [left3, top1, 3],
      // row 2
      [left1, top2, 4],
      [left2, top2, 5],
      [left3, top2, 6],
      // row 3
      [left1, top3, 7],
      [left2, top3, 8],
      [left3, top3, 9],
    ];

    for (let pageIndex = 0; pageIndex < imagesList.length; pageIndex++) {
      console.log(`looping thru crops ${pageIndex}`);
      const baseName = `page-${pageIndex + 1}`;
      const img = new Image();
      img.src = imagesList[pageIndex];

      await img.decode();

      for (const [l, t, suffix] of card_regions) {
        const cropped_width = 894;
        const cropped_height = 1289;
        const final_width = 1095;
        const final_height = 1489;

        const canvas = document.createElement("canvas");
        canvas.width = final_width;
        canvas.height = final_height;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, final_width, final_height);
        ctx.drawImage(
          img, // source
          l, t, cropped_width, cropped_height, // source crop
          100, 100, cropped_width, cropped_height  // destination
        );
        //await page.render(render_context).promise;
        //let img = canvas.toDataURL("image/png");
        //const dataUrl = canvas.toDataURL("image/png");
        //crops.push(dataUrl);

        const blob = await canvasToBlob(canvas);
        const url = URL.createObjectURL(blob);

        const expansion = fileName.substring(0, fileName.length - 4);
        const card_index = pageIndex * 9 + suffix
        crops.push({
            filename: `${expansion}_${card_index}.png`,
            blob,
            url,
        });
      }
    }



    setNumOfPages(pdf.numPages);
    setImageUrls(imagesList);

    setCroppedImages(crops);
    console.log(croppedImages);

  };

  const canvasToBlob = (canvas) => {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
  }



  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageUrls]);

  const downloadImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    const expansion = fileName.substring(0, fileName.length - 4);
    a.download = `${expansion}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };


  return (
    <Box sx={{ my: 4, textAlign: "center" }} ref={myRef} id="image-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {croppedImages.length > 0 && (
            <>
              <h4 className="drop-file-preview__title">
                Final cards from {numOfPages}
              </h4>
              <Grid container spacing={3}>
                {croppedImages.map((img_obj, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box
                      className="img-card"
                      sx={{ position: "relative" }}
                    >
                      <img
                        src={img_obj.url}
                        alt={img_obj.filename}
                        style={{
                          objectFit: "cover",
                          width:'100%',
                          height:'100%',
                        }}
                      />
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: "absolute", top: 2, right: 2, color: "white", zIndex: 100 }}
                      >
                        <IconButton
                          onClick={() => downloadImage(img_obj.url, index)}
                          className="btn-bg"
                          sx={{ color: "white", zIndex: 100 }}
                        >
                          <Download />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Preview</DialogTitle>
        <DialogContent dividers={true}>
          <img
            src={selectedImage?.url}
            alt={selectedImage?.url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              downloadImage(selectedImage.url, selectedImage.index)
            }
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CardsConverter;





