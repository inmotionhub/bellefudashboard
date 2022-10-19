import React from "react";
import { PageTitle, colors, APIDATA } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button, Paper ,Grid, Typography} from "@mui/material";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { Toolbar, Button, Paper, Box } from "@mui/material";

export default function CreateCategory() {
  const [title, setTitle] = useState(undefined);
  const [read, setRead] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(undefined);

  const navigate = useNavigate();

  const onSubmit = () => {
    if (title === undefined || read === "") {
      toast.error("All fields are required", {
        position: "top-right",
      });
    } else {
      const formDatas = new FormData();

      formDatas.append("name", title);
      formDatas.append("image", read);

      axios({
        method: "POST",
        url: `${APIDATA}create/category`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      toast.success("Category Created", {
        position: "top-right",
      });
      navigate("/categorylist");
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const imageHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else {
      setSelectedFile(e.target.files[0]);
    }

    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      let file1 = file[i];
      console.log(file1.name);
      setRead(file1);
    }
  };

  const style = {
    position: "relative",
    top: 220,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",

    borderRadius: 5,
    p: 4,
  };
  const btn = {
    border: "none",
    position: "relative",
    top: -30,

    borderRadius: "5px",
    textTransform: "capitalize",
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <PageTitle title="Create Category" />
      <div>
        <Box
          sx={{
            height: "calc(100vh - 105.98px)",
            display: { xs: "block", lg: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 1300,
            width: "100%",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              maxWidth: 850,
              height: { xs: "100vh", lg: 450 },
              p: { xs: 1, md: 5 },
            }}
          >
            <form>
              <Box sx={{ display: { xs: "block", md: "flex" } }}>
                <Box style={{ width: "100%" }}>
                  <div>
                    <TextField
                      sx={{
                        width: "100%",
                        maxWidth: 450,
                        mb: 5,
                      }}
                      id="outlined-basic"
                      label="Enter Category Name"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      variant="outlined"
                    />
                  </div>
                  <label htmlFor="upload-button-file">
                    <input
                      accept="image/*"
                      id="upload-button-file"
                      multiple
                      type="file"
                      onChange={imageHandler}
                      style={{ display: "none" }}
                    />

                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<Icons.CloudUpload color="#fff" />}
                      sx={{
                        "&:hover": { backgroundColor: "green" },
                        bgcolor: "#76ba1b",
                        color: "#ffff",
                        py: 1,
                      }}
                      style={btn}
                    >
                      Select Image
                    </Button>
                  </label>
                </Box>

                <Box>
                  <Box sx={{ mt: { xs: 2, md: 0 }, mb: 1 }}>
                    <div
                      style={{
                        width: 200,
                        height: 250,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      {preview === undefined || "" ? (
                        <Icons.Image style={{ fontSize: "13vw" }} />
                      ) : (
                        <img
                          src={preview}
                          alt="uploaded image preview"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      )}
                    </div>
                  </Box>

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: colors.bellefuGreen,
                    }}
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
          <Toolbar sx={{ mt: -5 }} />
        </Box>
      </div>
    </Box>
  );
}
