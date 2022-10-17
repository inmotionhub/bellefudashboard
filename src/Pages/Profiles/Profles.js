import React from "react";
import { PageTitle, colors, APIDATA, BASE_URL } from "../../Constant";

import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import {
  InputLabel,
  MenuItem,
  FormControl,
  AppBar,
  Typography,
  InputAdornment,
  Select,
  OutlinedInput,
  IconButton,
  Toolbar,
  Tooltip,
  Box,
  Button,
  Avatar,
  TextField,
  Modal,
  Paper,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { StyleSheet, css } from "aphrodite";

import InfoBox from "./InfoBox";
import { loginStatus } from "../../Features/LoginSlice";
// import Date from "./Date"

export default function Profles() {
  const [open, setOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (!isUpdating) setOpen(false);
  };

  const select = useSelector(loginStatus);
  // ? JSON.parse(localStorage.getItem('prof'))
  const userDatas = select.profiles;

  const stylesHead = StyleSheet.create({
    firstBox: {
      position: "relative",
      left: select.drawer ? 300 : 100,
    },

    new2: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  });

  return (
    <div>
      <Box>
        <AppBar
          sx={{ Width: "80%", borderRadius: 20 }}
          //   position="static"
          color="success"
        >
          <Toolbar sx={{ backgroundColor: colors.secondary }}>
            <Box style={{ display: "flex" }}>
              <Box className={css(stylesHead.firstBox)}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 13, fontStyle: "italic" }}
                >
                  Welcome
                </Typography>
                <Typography variant="h5">{userDatas.name}</Typography>
              </Box>
              <Box>
                <InfoBox />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 0.5 }}>
            <Avatar
              alt="Remy Sharp"
              src={`${BASE_URL}admin/profile/${userDatas.image_url}`}
              sx={{ width: 300, height: 300 }}
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "300px 300px",
              }}
            >
              <TextField
                disabled
                id="outlined-disabled"
                label="Name"
                defaultValue={userDatas.name}
                sx={{ margin: 3, width: 300 }}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Position"
                defaultValue={
                  userDatas.role === 1
                    ? "Super-Admin"
                    : userDatas.role === 2
                    ? "Sub-Admin1"
                    : userDatas.role === 3
                    ? "Sub-Admin2"
                    : null
                }
                sx={{ margin: 3, width: 300, position: "relative", left: 25 }}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Phone-line"
                defaultValue={userDatas.phone}
                sx={{ margin: 3, width: 300 }}
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Email"
                size="4px"
                defaultValue={userDatas.email}
                sx={{ margin: 3, width: 300, position: "relative", left: 25 }}
              />
            </Box>
            <Box>
              <Button
                onClick={handleOpen}
                style={{
                  borderRadius: 30,
                  display: "flex",
                  margin: 20,
                  position: "relative",
                  left: "80%",
                  backgroundColor: colors.bellefuGreen,
                }}
                variant="contained"
              >
                <small style={{ fontSize: 10 }}>Edit Profile</small>
              </Button>

              <Modal
                open={open}
                onClose={!isUpdating ? handleClose : null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Paper
                  sx={{
                    width: "30%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    pt: 4,
                    borderRadius: 8,
                  }}
                >
                  <EditProfile
                    setIsUpdating={setIsUpdating}
                    setOpen={setOpen}
                    isUpdating={isUpdating}
                  />
                </Paper>
              </Modal>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
