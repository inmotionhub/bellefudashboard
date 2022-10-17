import React from "react";
import { PageTitle, colors, APIDATA } from "../../Constant";
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
  Divider,
  Button,
  Menu,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import * as Icons from "@mui/icons-material";
import { StyleSheet, css } from "aphrodite";
import { useSelector } from "react-redux";

export default function InfoBox() {
  const options = ["Profile", "Sign Out"];

  const ITEM_HEIGHT = 48;

  const drawer = useSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stylesHead = StyleSheet.create({
    firstBox: {
      position: "relative",
      left: 200,
    },
  });

  const styles = StyleSheet.create({
    //right side

    topRight: {
      display: "flex",
      alignItems: "center",
      padding: "15px",
    },
    topRightIcon1: {
      marginRight: drawer.drawer ? "5px" : "10px",
    },
    // topRightIcon2: {position:"relative",right:10},
    topRightP: {
      fontSize: drawer.drawer ? "17px" : "18px",
      fontWeight: "bold",
      fontStyle: "normal",
      fontFamily: "Poppins",
      color: "black",
      paddingRight: drawer.drawer ? "15px" : "10px",
      whiteSpace: "nowrap",
    },
    iconNotify: {
      paddingRight: "2px",
      display: "flex",
      alignItems: "center",
    },
  });

  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-beteen",
          position: "relative",
          left: "60vw",
          backgroundColor: colors.primary,
          borderRadius: 30,
          height: 60,
          margin: 8,
          width: "21vw",
        }}
      >
        <div className={css(styles.topRight)}>
          <div className={css(styles.topRightIcon1)}>
            <Icons.Event
              sx={{
                color: "black",
                width: "30px",
                height: "30px",
                marginTop: 1,
              }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className={css(styles.topRightP)}>Jan 30, 2022</p>
              <span
                style={{
                  color: "#767873",
                  fontSize: "20px",
                  marginTop: "-5px",
                  paddingRight: drawer.drawer ? "10px" : "20px",
                }}
              >
                |
              </span>
            </div>

            <div className={css(styles.iconNotify)}>
              <Icons.Notifications
                sx={{
                  color: "black",
                  width: "30px",
                  height: "30px",
                }}
              />
              <span
                style={{
                  color: "#767873",
                  fontSize: "20px",
                  marginTop: "-5px",
                  paddingLeft: drawer.drawer ? "5px" : "20px",
                }}
              >
                |
              </span>
            </div>
            <div>
              
              <span
                style={{
                  color: "#767873",
                  fontSize: "20px",
                  marginTop: "-5px",
                  paddingLeft: "10px",
                }}
              />
            </div>
            <div >
              {/* <Box> */}
                <Button style={{ borderRadius: 30,display:"flex",backgroundColor:colors.bellefuGreen }} variant="contained">
                  <small style={{ fontSize: 10 }}>log out</small>
                </Button>
              {/* </Box> */}
            </div>
          </div>
        </div>

        {/* <Box style={{display:"flex"}}>
          <IconButton>
            <Icons.CalendarToday />
          </IconButton>
            <small style={{position:"relative",top:11,margin:5}}>12-2022-10</small>
        </Box>
        <Divider sx={{backgroundColor:"black",width:2,height:40,marginTop:1}} />
        <Box>
          <IconButton>
            <Icons.NotificationsNone />
          </IconButton>
        </Box>
        <Divider sx={{backgroundColor:"black",width:2,height:40,marginTop:1}} />
        <Box>
          <Button style={{borderRadius:30}} variant="contained"><small style={{fontSize:10}}>log out</small></Button>
        </Box> */}
      </Box>
    </div>
  );
}
