import { CloseOutlined } from "@mui/icons-material";
import { Box,Button,IconButton,Snackbar,Stack,Typography,useTheme, Paper} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import uploadImg from "../assets/file-upload.png";
import fileNormal from "../assets/file-image.png";


const CardsInput = (props) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.onFileChange(files);
  }, [files]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFilesDrop = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith("image/")
    );
    if (imageFiles.length === 0 ) {
      setOpen(true);
      return;
    }
    setFiles(prev => [...prev, ...imageFiles]);
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
        Select multiple image files to upload. This will take those cards (formatted with MPC border) and return a PDF with pages of nine cards, for home printing. 
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

      {files.length === 0 && (
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
          <input 
            type="file"
            accept="image/*"
            multiple 
            onChange={onFilesDrop} />
        </Button>

      )}
      {files.length > 0 ? (

        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          {files.map((file, index) => (
            <div className="drop-file-preview__item" key={index}>
              <img src={fileNormal} alt="" />
              <div className="drop-file-preview__item__info">
                <p>{file.name}</p>
                <p>{returnSize(file)}</p>
              </div>
              <IconButton 
                onClick={()=>setFiles(prev => prev.filter((_, i) => i !== index))}
              >
                <CloseOutlined />
              </IconButton>
            </div>
          ))}
        </div>

      ) : null}


      </Box>
    </Paper>

  );
};

CardsInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default CardsInput;

