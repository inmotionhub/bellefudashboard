import React from "react";
import { PageTitle } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Icons from "@mui/icons-material";
import { colors, APIDATA } from "../../Constant";

import { Button, Paper, Box, Toolbar } from "@mui/material";
import { width } from "@mui/system";

export default function CreateSubCat() {
  const [title, setTitle] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(undefined);
  const [catId, setCatId] = useState(null);
  const [cat, setCat] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${APIDATA}list/category`)
        .then((res) => setCat(res.data.data))
        .catch((err) => console.log(err));
    };

    axios.get();

    getCategory();
  }, []);

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

    // const file = e.target.files;
    // for (let i = 0; i < file.length; i++) {
    //   let file1 = file[i];
    //   console.log(file1.name);
    //   setRead(file1);
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === undefined || catId === null) {
      toast.error("All fields are required", {
        position: "top-right",
      });
    } else {
      const formDatas = new FormData();

      formDatas.append("name", title);
      formDatas.append("catid", catId);

      axios({
        method: "POST",
        url: `${APIDATA}create/sub-category`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      navigate("/subcatlist");

      toast.success("Sub-Category Created", {
        position: "top-right",
      });
    }
  };

  const btn = {
    border: "none",
    borderRadius: "5px",
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
          <form onSubmit={(e) => onSubmit(e)}>
            <Box sx={{ display: { xs: "block", md: "flex" } }}>
              <Box style={{ width: "100%" }}>
                <div>
                  <FormControl sx={{ width: "100%", maxWidth: 350 }}>
                    <InputLabel id="demo-simple-select-label">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={catId === ""}
                      helperText={catId === "" ? "Empty field!" : " "}
                      value={catId}
                      label="Select Category"
                      onChange={(e) => setCatId(e.target.value)}
                    >
                      {cat?.map((cat) => (
                        <MenuItem key={cat.name} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: 350,
                      my: 2,
                    }}
                    id="outlined-basic"
                    label="Enter Sub-cat Name"
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
                      <Icons.Image style={{ fontSize: "10vw" }} />
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
                  onClick={(e) => onSubmit(e)}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
        <Toolbar sx={{ mt: -4 }} />
        {/* </Paper> */}
      </Box>
    </Box>
  );
}
