import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Toolbar,
} from "@mui/material";
import { PageTitle, APIDATA } from "../../../Constant";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { StyleSheet, css } from "aphrodite";
import Table from "./Table";
import axios from "axios";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  btn: {
    border: "none",
    width: "250px",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  imgPreviewBox: {
    width: "40%",
    height: "200px",
  },
  imgPreview: { width: "100%", height: "100%" },

  input: {
    display: "none",
  },
});

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [read, setRead] = useState();
  const [preview, setPreview] = useState();
  const [reload, setReload] = useState(0);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));

    const main = e.target.files;

    for (let i = 0; i < main.length; i++) {
      let file1 = main[i];
      // console.log(file1.name);
      setRead(file1);
    }
  };

  const upload = () => {
    const slide = new FormData();
    slide.append("slider_images", read);

    axios({
      method: "POST",
      url: `${APIDATA}sliders/create`,
      data: slide,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          toast.success("Slider uploaded", {
            position: "top-right",
          });
          window.location.reload(false);
        } else {
          toast.error("something went wrong", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log("catch", err));
  };
  return (
    <Box component="main">
      <PageTitle title="Slider Upload" />

      <Toolbar />

      <Container>
        <Box component="section">
          <Stack spacing={6} direction="column">
            <Stack
              spacing={2}
              alignItems="start"
              direction={{ xs: "column", md: "row" }}
              sx={{ justifyContent: "space-between" }}
            >
              <Stack spacing={3} direction="column">
                <Typography component="p">Upload Image</Typography>
                <Stack spacing={2} direction="row">
                  <label htmlFor="upload-button-file">
                    <input
                      accept="image/*"
                      id="upload-button-file"
                      multiple
                      type="file"
                      onChange={uploadFile}
                      className={css(styles.input)}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadFileIcon color="#000" />}
                      sx={{
                        bgcolor: "#ffffff",
                        color: "black",
                        "&:hover": {
                          bgcolor: "rgb(221, 215, 215)",
                        },
                      }}
                      className={css(styles.btn)}
                    >
                      Select Image
                    </Button>
                  </label>

                  <Button
                    variant="contained"
                    onClick={upload}
                    sx={{
                      bgcolor: "#FFA500",
                      "&:hover": {
                        bgcolor: "rgb(255, 195, 83)",
                      },
                    }}
                    startIcon={<CloudUploadIcon />}
                    className={css(styles.btn)}
                    disabled={file ? false : true}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
              {file && (
                <Box className={css(styles.imgPreviewBox)}>
                  <img
                    src={preview}
                    alt={file.name}
                    className={css(styles.imgPreview)}
                  />
                </Box>
              )}
            </Stack>
            <Table />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FileUpload;
