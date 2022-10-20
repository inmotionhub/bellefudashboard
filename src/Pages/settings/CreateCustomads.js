import { PageTitle, colors, APIDATA, BASE_URL } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button, Paper ,Grid, Typography} from "@mui/material";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

import * as Icons from "@mui/icons-material";
import {
  Toolbar,
  InputLabel,
  Button,
  MenuItem,
  Paper,
  FormControl,
  Box,
  Select,
} from "@mui/material";

export default function CreateCategory() {
  const [priority, setPriority] = useState("");
  const [read, setRead] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(undefined);
  const [url, setUrl] = useState("");
  const [des, setDes] = useState("");

  const apiUrl = `${BASE_URL}api/v3/add/announcement`;

  const onSubmit = () => {
    if (priority === "" || read === undefined || url === "" || des === "") {
      toast.error("All fields are required", {
        position: "top-right",
      });
    } else {
      const formDatas = new FormData();

      formDatas.append("image", read);
      formDatas.append("action", url);
      formDatas.append("type", "custom");
      formDatas.append("priority", priority);
      formDatas.append("description", des);

      axios({
        method: "POST",
        url: `${APIDATA}create/commercial`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            toast.success("Commercial Created", {
              position: "top-right",
            });

            setRead();
            setPreview(undefined);
            setUrl("");
            setDes("");
            setPriority("");
          }
        })
        .catch((err) => console.log(err));
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
        height: { xs: "100%", md: "calc(100vh - 64px)" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageTitle title="Create Custom Ads" />

      <Toolbar />
      {/* <Paper sx={{ width: 300, padding: "20px", margin: "auto 4%" }}> */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            width: { xs: "100%", md: 800 },
            bgcolor: "background.paper",
            borderRadius: 3,
          }}
        >
          <form>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControl sx={{ width: { xs: "100%", md: 400 }, mb: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value="custom">Custom</MenuItem>
                    <MenuItem value="xbooster">X-booster</MenuItem>
                    <MenuItem value="2xbooster">XX-booster</MenuItem>
                    <MenuItem value="3xbooster">XXX-booster</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ mb: 2, width: { xs: "100%", md: 400 } }}
                  id="outlined-basic"
                  label="Enter link address"
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  variant="outlined"
                />
                <TextField
                  sx={{ mb: 2, width: { xs: "100%", md: 400 } }}
                  id="outlined-basic"
                  label="Description"
                  type="text"
                  onChange={(e) => setDes(e.target.value)}
                  value={des}
                  variant="outlined"
                />
                <Box>
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
                        px: 3,
                        py: 1,
                        mt: 3,
                        bgcolor: "#76ba1b",
                        color: "#ffff",
                        // '&:hover': {
                        //   bgcolor: 'success',
                        // },
                      }}
                      style={btn}
                    >
                      Select Image
                    </Button>
                  </label>
                </Box>
              </Box>

              <Box>
                <div>
                  <Box>
                    <div>
                      {preview === undefined || "" ? (
                        <Icons.Image style={{ fontSize: "13vw" }} />
                      ) : (
                        <div
                          style={{
                            width: 200,
                            height: 300,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={preview}
                            alt="ajebuta"
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Box>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    my: 2,
                    width: 200,
                    py: 1,
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
        {/* <Toolbar sx={{ mt: -5 }} /> */}
      </Box>
      {/* </Paper> */}
    </Box>
  );
}
