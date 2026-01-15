import { CloseOutlined } from "@mui/icons-material";
import { Box,Button,IconButton,Snackbar,Stack,Typography,useTheme, Paper} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import uploadImg from "../assets/file-upload.png";
import filePdf from "../assets/file-pdf.png";


const PdfInput = (props) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.onFileChange(file);
  }, [file]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === "application/pdf") {
      setFile(newFile);
    } else {
      setOpen(true);
    }
  };

  const returnSize = (file) => {
    const fileSizeInBytes = file.size; // Example file size in bytes
    let fileSize;

    if (fileSizeInBytes >= 1048576) {
      fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
    } else {
      fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
    }
    return fileSize;
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        This will take a 9-card PDF fitting the format used by the Continuing Committee for home printing and return the cards in formatting for printing on MakePlayingCards.com. For an example expansion PDF, see https://www.trekcc.org/1e/?id=259
      </Typography>
      <Box
        sx={{
          border: 2,
          borderStyle: 'dashed',
          borderColor: 'grey.300',
          borderRadius: 1,
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main' }
        }}
      >

      {!file && (
          <Button
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-input__label">
              <img src={uploadImg} alt="" />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" accept=".pdf" value="" onChange={onFileDrop} />
          </Button>

      )}
      {file ? (

        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          <div className="drop-file-preview__item">
            <img src={filePdf} alt="PDF Icon" />
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{returnSize(file)}</p>
            </div>
            <IconButton onClick={()=>setFile(null)}>
              <CloseOutlined />
            </IconButton>
          </div>
        </div>


      ) : null}

      </Box>
    </Paper>

  );
};

PdfInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default PdfInput;

