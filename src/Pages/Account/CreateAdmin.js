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
    if (
      image === "" ||
      role === "" ||
      fullName === "" ||
      email === "" ||
      gend === "" ||
      password === "" ||
      status === ""
    ) {
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
            });

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
        })
        .catch((err) =>
          toast.error("Check Your network connection", {
            position: "top-right",
          })
        );
    }
  };

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: 700 },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        mb: 4,
      }}
    >
      <Container
        sx={{
          width: { xs: "100%", md: 600 },
          mt: 1,
          mb: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            mb: 4,
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginBottom: "3px",
            }}
          >
            <Avatar
              alt="profile image"
              src={image}
              variant="circular"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div style={{ alignSelf: "center" }}>
            <Button
              onClick={openInputFile}
              style={{
                borderRadius: 30,
                fontSize: 10,
                role: "relative",
                backgroundColor: colors.bellefuGreen,
              }}
              variant="contained"
            >
              Upload-Img
            </Button>
            <TextField
              type="file"
              inputRef={inputImg}
              sx={{ display: "none" }}
              onChange={previewImg}
            />
          </div>
        </Box>
        {/* <Toolbar /> */}

        <Box sx={{}}>
          <div
            style={{
              width: "100%",
              marginBottom: "30px",
            }}
          >
            <InputLabel htmlFor="fullname">Full Name</InputLabel>
            <TextField
              sx={{ width: "100%", borderRadius: 2 }}
              id="fullname"
              variant="outlined"
              size="small"
              onChange={(evt) => setFullName(evt.target.value)}
            />
          </div>
          <Box
            sx={{
              width: "100%",
              display: { xs: "block", lg: "flex" },
              columnGap: 3,
            }}
          >
            <FormControl sx={{ width: { xs: "100%", md: 300 } }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                size="small"
                onChange={(e) => setRole(e.target.value)}
                sx={{ width: "100%", height: "100%", py: { xs: 1, md: 0 } }}
              >
                <MenuItem value={1}>Super-Admin</MenuItem>
                <MenuItem value={2}>Sub-Admin</MenuItem>
                <MenuItem value={3}>Shop-Admin</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                width: { xs: "100%", md: 300 },
                borderRadius: 2,
              }}
            >
              <InputLabel htmlFor="email">Phone</InputLabel>
              <TextField
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
                id="phone"
                type="phone"
                size="small"
                value={phone}
                onChange={(evt) => setPhone(evt.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: { xs: "block", lg: "flex" },
              my: 3,
              columnGap: 3,
            }}
          >
            <FormControl
              sx={{
                width: { xs: "100%", md: 300 },
                py: 1,
              }}
            >
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gend}
                label="Gender"
                size="small"
                onChange={(e) => setGend(e.target.value)}
                sx={{ width: "100%", height: "100%" }}
              >
                <MenuItem value={"m"}>Male</MenuItem>
                <MenuItem value={"f"}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: { xs: "100%", md: 300 },
                py: 1,
              }}
            >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                size="small"
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: "100%", height: "100%" }}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              sx={{ width: "100%" }}
              id="email"
              type="email"
              size="small"
              value={email}
              helperText={email === "" ? "Empty field!" : " "}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <div style={{ width: "100%", marginBottom: "30px" }}>
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
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.bellefuGreen, color: "white" }}
            size="large"
            onClick={Onsubmit}
          >
            Create
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default CreateAdmin;
