import { useState, useRef, useEffect } from "react";
import { PageTitle, colors, APIDATA } from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Container,
  TextField,
  InputLabel,
  Button,
  Avatar,
  Box,
  MenuItem,
  Select,
  FormControl,
  Toolbar,
  Paper,
} from "@mui/material";

const CreateAdmin = () => {
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gend, setGend] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [read, setRead] = useState("");
  const [fileHolder, setFileHolder] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const inputImg = useRef(null);

  const previewImg = (evt) => {
    const file = evt.target.files[0];
    setFileHolder(file);
    const reader = new FileReader();
    reader.onload = function (evt) {
      setImage(evt.target.result);
    };
    reader.readAsDataURL(file);

    const filer = evt.target.files;
    for (let i = 0; i < filer.length; i++) {
      let file1 = filer[i];
      console.log(file1.name);
      setRead(file1);
    }
  };

  const openInputFile = (evt) => {
    evt.preventDefault();
    if (inputImg.current) inputImg.current.click();
  };

  const Onsubmit = (e) => {
    if (image === "" ||
      role === "" ||
      fullName === "" ||
      email === "" ||
      gend === "" ||
      password === "" ||
      status === "") {

      toast.error("All fields are required!!", {
        position: "top-center",
      });
    } else {


      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("gender", gend);
      formData.append("image", read);
      formData.append("status", status);
      formData.append("id", 1);

      axios({
        method: "POST",
        url: `${APIDATA}create/admin`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status === true) {
            toast.success("Admin Created", {
              position: "top-right",
            })


            setImage("");
            setRole("");
            setFullName("");
            setEmail("");
            setGend("");
            setPassword("");
            setPhone("");
            setStatus("");

          } else {
            toast.error("Something Hapened please try again", {
              position: "top-right",
            });
            setImage("");
            setRole("");
            setFullName("");
            setEmail("");
            setGend("");
            setPassword("");
            setPhone("");
            setStatus("");
          }
        }
        )
        .catch((err) =>
          toast.error("Check Your network connection", {
            position: "top-right",
          })
        );
    }
  };

  return (
    <Paper style={{ width: "60%", padding: 17, margin: "auto 18vw" }}>
      <Container>
        <div style={{ width: "20%", margin: "auto", position: "relative", left: 50 }}>
          <div>
            <Avatar
              alt="profile image"
              src={image}
              variant="circular"
              sx={{
                display: "inline-block",
                marginRight: "10px",
                textAlign: "center",
                width: 100,
                height: 100,
              }}
            />
          </div>
          <div style={{ width: "100%", margin: "auto" }}>
            <Box>
              <Button
                onClick={openInputFile}
                style={{
                  borderRadius: 30,
                  fontSize: 10,
                  display: "flex",
                  role: "relative",
                  backgroundColor: colors.bellefuGreen,
                }}
                variant="contained"
              >
                Upload-Img
              </Button>
            </Box>
            <TextField
              type="file"
              inputRef={inputImg}
              sx={{ display: "none" }}
              onChange={previewImg}
            />
          </div>
        </div>
        <Toolbar />

        <div style={{ width: "70%", margin: "auto", marginBottom: "10px" }}>
          <InputLabel htmlFor="fullname">Full Name</InputLabel>
          <TextField
            sx={{ backgroundColor: "white", width: "100%" }}
            id="fullname"
            variant="outlined"
            size="small"

            onChange={(evt) => setFullName(evt.target.value)}
          />
        </div>
        <div style={{
          width: "70%",
          margin: "auto",
          display: "flex",
          marginBottom: "10px",
        }}>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Gender"
              size="small"

              onChange={(e) => setRole(e.target.value)}
              sx={{ width: "60%" }}
            >
              <MenuItem value={1}>Super-Admin</MenuItem>
              <MenuItem value={2}>Sub-Admin</MenuItem>
              <MenuItem value={3}>Shop-Admin</MenuItem>
            </Select>
          </FormControl>
          <div style={{ position: "relative" }}>
            <InputLabel htmlFor="email">Phone</InputLabel>
            <TextField
              sx={{ backgroundColor: "white" }}
              id="phone"
              type="phone"
              size="small"
              value={phone}

              onChange={(evt) => setPhone(evt.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            width: "70%",
            margin: "auto",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <div style={{ flex: "auto", marginRight: "20px", marginTop: 30 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gend}
                label="Gender"
                size="small"
                onChange={(e) => setGend(e.target.value)}
              >
                <MenuItem value={"m"}>Male</MenuItem>
                <MenuItem value={"f"}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ flex: "auto", marginRight: "20px", marginTop: 30 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                size="small"

                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ flex: "auto" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              id="email"
              type="email"
              size="small"
              value={email}
              helperText={email === "" ? "Empty field!" : " "}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            width: "70%",
            margin: "auto",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <div style={{ flex: "auto" }}>
            <InputLabel htmlFor="pass">Password</InputLabel>
            <TextField
              variant="outlined"
              id="pass"
              sx={{ backgroundColor: "white", width: "100%" }}
              type="password"
              size="small"
              value={password}

              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "30px" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.bellefuGreen, color: "white" }}
            size="large"
            // disabled={emptyField ? true : false}
            onClick={Onsubmit}
          >
            Create
          </Button>
        </div>
      </Container>
    </Paper>
  );
};

export default CreateAdmin;
