import React from "react";
import { PageTitle } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Icons from "@mui/icons-material";
import { colors, APIDATA } from "../../Constant";

import {

  Button,
  Paper,
  Box,
  Toolbar,
} from "@mui/material";


export default function CreateSubCat() {
  const [title, setTitle] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(undefined);
  const [catId, setCatId] = useState(null);
  const [cat, setCat] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {

    const getCategory = async () => {
      await axios.get(`${APIDATA}list/category`)
        .then(res => setCat(res.data.data))
        .catch(err => console.log(err))
    }


    axios.get()


    getCategory()
  }, [])



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



  const onSubmit = () => {
    if (title === undefined || catId === null) {

      toast.error('All fields are required', {
        position: 'top-right'
      })
    } else {

      const formDatas = new FormData()

      formDatas.append('name', title)
      formDatas.append('catid', catId)

      axios({
        method: 'POST',
        url: `${APIDATA}create/sub-category`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))

      navigate('/subcatlist')

      toast.success('Sub-Category Created', {
        position: 'top-right'
      })

    }
  }

  const style = {
    position: "relative",
    top: 220,
    left: "45%",
    transform: "translate(-50%, -50%)",
    width: 850,
    bgcolor: "background.paper",

    borderRadius: 5,
    p: 4,
  };

  const btn = {
    border: 'none',
    position: "relative",
    top: -30,

    borderRadius: '5px',
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <PageTitle title="Create Category" />
      <div>
        {/* <Paper sx={{ width: 300, padding: "20px", margin: "auto 4%" }}> */}
        <Toolbar />
        <Box>
          <Paper sx={style}>
            <form>
              <div style={{ marginBottom: "5vh", display: "flex" }}>
                <div>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      sx={{ mr: 5, width: 250 }}
                      id="demo-simple-select"
                      error={catId === ""}
                      helperText={catId === "" ? "Empty field!" : " "}
                      value={catId}
                      label="Select Category"
                      onChange={(e) => setCatId(e.target.value)}
                    >
                      {cat?.map(cat => <MenuItem key={cat.name} value={cat.id}>{cat.name}</MenuItem>)}

                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    sx={{ mr: 5, width: 250 }}
                    id="outlined-basic"
                    label="Enter Sub-cat Name"
                    // borderColor='green'
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
                    style={{ display: 'none' }}
                  />


                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<Icons.CloudUpload color="#fff" />}
                    sx={{
                      "&:hover": { backgroundColor: 'green' },
                      width: 200,
                      height: 54,
                      mr: 1,
                      mt: 3.6,


                      bgcolor: '#76ba1b',
                      color: '#ffff',
                      // '&:hover': {
                      //   bgcolor: 'success',
                      // },
                    }}
                    style={btn}
                  >
                    Select  Image
                  </Button>
                </label>
              </div>
              <Box>
                <div style={{ position: "relative", left: "19vw" }}>
                  {preview === undefined || "" ? (
                    <Icons.Image style={{ fontSize: "13vw" }} />
                  ) : (
                    <img
                      src={preview}
                      alt="ajebuta"
                      style={{
                        width: 200,
                        position: "relative",
                        left: "4vw",
                      }}
                    />
                  )}
                </div>
              </Box>
            </form>
            <Button
              variant="contained"
              style={{
                position: "relative",
                left: "15.5vw",
                margin: 10,
                width: "20vw",
                backgroundColor: colors.bellefuGreen,
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Box>
        <Toolbar sx={{ mt: -4 }} />
        {/* </Paper> */}
      </div>
    </div>
  );
}
