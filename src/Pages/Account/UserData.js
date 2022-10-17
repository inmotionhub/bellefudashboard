import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle, colors, APIDATA, BASE_URL } from "../../Constant";
import { loginStatus, updateProfileDetails } from "../../Features/LoginSlice";
import * as Icons from "@mui/icons-material";

import Activate from "./Activate";
import Deactivate from "./Deactivate";
import Modal from "@mui/material/Modal";

import {
  Container,
  TextField,
  IconButton,
  Tooltip,
  InputLabel,
  Button,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UserData = (props) => {
  const activeuserid = props.userdataholder;
  //   console.log(userdataholder);

  // const currUser = useSelector(loginStatus).profiles;
  // const dispatch = useDispatch();
  // const [image, setImage] = useState(currUser.image_url);
  // const [fullName, setFullName] = useState(currUser.name);
  // const [phoneNumber, setPhoneNumber] = useState(currUser.phone);
  // const [fileHolder, setFileHolder] = useState("");
  // const [email, setEmail] = useState(currUser.email);
  // const [read, setRead] = useState("");
  // const [changer, setChanger] = useState(false);
  // const inputImg = useRef(null);

  const [modalopen2, setModalopen2] = useState(false);
  const [modalopen3, setModalopen3] = useState(false);

  const handleOpen2 = () => {
    setModalopen2(true);
  };
  const handleClose3 = () => setModalopen2(false);

  const handleOpen3 = () => {
    setModalopen3(true);
  };
  const handleClose4 = () => setModalopen3(false);

  return (
    <Container sx={{ width: "100%" }}>
      <div
        style={{
          width: "40%",
          marginBottom: "20px",
          position: "relative",
          left: "10vw",
        }}
      >
        <div>
          <Avatar
            alt="profile image"
            src={`${BASE_URL}admin/profile/${activeuserid.avatar}`}
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
      </div>
      <div style={{ width: "95%", margin: "auto", marginBottom: "20px" }}>
        <InputLabel htmlFor="fullname">Full Name</InputLabel>
        <TextField
          disabled
          sx={{ backgroundColor: "white", width: "100%" }}
          id="fullname"
          variant="outlined"
          size="small"
          value={activeuserid.first_name + " " + activeuserid.last_name}
          //   onChange={(evt) => setFullName(evt.target.value)}
        />
      </div>
      <div style={{ width: "95%", margin: "auto", marginBottom: "20px" }}>
        <InputLabel htmlFor="phone">Phone Number</InputLabel>
        <TextField
          disabled
          sx={{ backgroundColor: "white", width: "100%" }}
          id="phone"
          type="number"
          size="small"
          value={activeuserid.phone}
          //   onChange={(evt) => setPhoneNumber(evt.target.value)}
        />
      </div>
      <div style={{ width: "95%", margin: "auto", marginBottom: "20px" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          disabled
          sx={{ backgroundColor: "white", width: "100%" }}
          id="email"
          type="email"
          size="small"
          value={activeuserid.email}
          //   onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div
        style={{
          width: "95%",
          margin: "auto",
          marginBottom: "20px",
          display: "flex",
        }}
      >
        <div>
          <InputLabel>Gender</InputLabel>
          <TextField
            disabled
            sx={{ backgroundColor: "white", width: "80%" }}
            id="email"
            type="text"
            size="small"
            value={activeuserid.gender}
            //   onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div>
          <InputLabel>Country</InputLabel>
          <TextField
            disabled
            sx={{ backgroundColor: "white", width: "100%" }}
            id="email"
            type="text"
            size="small"
            value={activeuserid.country}
            //   onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            poition: "relative",
            // left: 400,
            marginLeft: "7vw",
            display: "flex",
          }}
        >
          <Button
            style={{
              backgroundColor: [
                activeuserid.status === "active" ? "orange" : "red",
              ],
            }}
            variant="contained"
            size="large"
          >
            {activeuserid.status}
          </Button>
          <Tooltip title="Activate">
            <IconButton onClick={handleOpen2}>
              <Icons.LockOpenOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deactivate">
            <IconButton onClick={handleOpen3}>
              <Icons.LockOutlined />
            </IconButton>
          </Tooltip>
          <Modal
            open={modalopen2}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper
              sx={{
                width: "30%",
                height: "30%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                borderRadius: 8,
              }}
            >
              <Activate close={handleClose3} active={activeuserid} />
            </Paper>
          </Modal>
          <Modal
            open={modalopen3}
            onClose={handleClose4}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper
              sx={{
                width: "30%",
                height: "30%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                borderRadius: 8,
              }}
            >
              <Deactivate close={handleClose4} inactive={activeuserid} />
            </Paper>
          </Modal>
        </div>
      </div>
    </Container>
  );
};

export default UserData;
