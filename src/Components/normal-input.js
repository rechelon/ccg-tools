import { CloseOutlined } from "@mui/icons-material";
import { Button,IconButton,Snackbar,Stack,Typography,useTheme} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import uploadImg from "../assets/file-upload.png";
import fileNormal from "../assets/file-image.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NormalInput = (props) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);
  const bpSMd = theme.breakpoints.down("sm");

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
    if (newFile && newFile.type.startsWith("image/")) {
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
    <>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "14px",
            letterSpacing: 1,
            color: "text.primary",
            [bpSMd]: { fontSize: "10px" },
          }}
        >
          This will take a jpg or png of a playing card (with a normal border) and give it an MPC-ready border (for printing at MakePlayingCards.com).
        </Typography>
      </Stack>
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
          <input type="file" accept="image/*" value="" onChange={onFileDrop} />
        </Button>
      )}
      {file ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          <div className="drop-file-preview__item">
            <img src={fileNormal} alt="PNG Icon" />
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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please upload pdf only
        </Alert>
      </Snackbar>
    </>
  );
};

NormalInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default NormalInput;

