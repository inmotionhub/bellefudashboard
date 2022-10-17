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
    <div>
      <PageTitle title="Create Custom Ads" />

      <Toolbar sx={{ mt: 5 }} />
      <div>
        {/* <Paper sx={{ width: 300, padding: "20px", margin: "auto 4%" }}> */}
        <Box>
          <Paper sx={style}>
            <form>
              <div style={{ marginBottom: "5vh", display: "flex" }}>
                <div>
                  <FormControl sx={{ width: 450, mb: 5 }}>
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
                    sx={{ mr: 5, mb: 5, width: 450 }}
                    id="outlined-basic"
                    label="Enter link address"
                    // borderColor='green'
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    variant="outlined"
                  />
                  <TextField
                    sx={{ mr: 5, width: 450 }}
                    id="outlined-basic"
                    label="Description"
                    // borderColor='green'
                    type="text"
                    onChange={(e) => setDes(e.target.value)}
                    value={des}
                    variant="outlined"
                  />
                </div>
                <div>
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
                        width: 300,
                        height: 60,
                        m: 3.5,
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

                  <Box>
                    <div>
                      {preview === undefined || "" ? (
                        <Icons.Image style={{ fontSize: "13vw" }} />
                      ) : (
                        <img
                          src={preview}
                          alt="ajebuta"
                          style={{
                            width: 200,
                          }}
                        />
                      )}
                    </div>
                  </Box>
                </div>
              </div>

              <div style={{ margin: "auto 13%" }}>
                <Button
                  variant="contained"
                  style={{
                    position: "relative",
                    left: "11vw",
                    margin: 10,
                    width: "20vw",
                    backgroundColor: colors.bellefuGreen,
                  }}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
          <Toolbar sx={{ mt: -5 }} />
        </Box>
        {/* </Paper> */}
      </div>
    </div>
  );
}
