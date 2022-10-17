import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { StyleSheet, css } from "aphrodite";
import GridOption from "./GridOption";
import * as Icons from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import GridBottom from "./GridBottom";
import Chart from "./Chart";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIDATA } from "../../Constant";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { colors } from "../../Constant";
import moment from "moment";

const ITEM_HEIGHT = 48;

export default function Dashboard() {
  const drawer = useSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [countStatus, setCountStatus] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  //function handling the drop down dor profile and sign out
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    localStorage.clear();
    toast.success("Log Out Successful Bye..", {
      position: "top-center",
    });
    navigate("/login")
  };
  //stylings
  const styles = StyleSheet.create({
    main: {
      display: "flex",
      height: "100%",
      marginTop: "-60px",
    },
    leftSection: {
      width: "75%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      paddingRight: "25px",
      paddingLeft: "25px",
      //width: drawer.drawer ? "70%" : "80%",
    },
    sLeftSection: {
      display: "flex",
      flexDirection: "column",
    },
    gText: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontSize: "24px",
      lineHeight: "20px",
      color: "#22261b",
    },
    nText: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      marginTop: "-15px",
      lineHeight: "38px",
      fontSize: "28px",
      color: "#22261b",
    },
    h2Text: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      lineHeight: "38px",
      fontSize: "20px",
      color: "#22261b",
    },
    dText: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      lineHeight: "16px",
      fontSize: "20px",
      marginTop: "-25px",
      color: "#767873",
    },
    leftSpan: {
      fontWeight: "bold",
    },

    //right side
    rightSection: {
      width: "25%",
      position: "relative",
      backgroundColor: "#F9FDF5",
      paddingRight: "15px",
      marginTop: "-40px",
      paddingLeft: "15px",
      marginRight: "-15px",

      //width: drawer.drawer ? "30%" : "20%",
    },
    topRight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "40px",
      width: "100%",
    },
    topRightIcon1: {
      // marginRight: drawer.drawer ? "5px" : "10px",
    },
    topRightIcon2: {
      marginLeft: "-10px",
      marginRight: "10px",
    },
    topRightP: {
      fontSize: drawer.drawer ? "17px" : "18px",
      fontWeight: "normal",
      fontStyle: "normal",
      fontFamily: "Poppins",
      color: "#22261b",
      paddingRight: drawer.drawer ? "2px" : "5px",
      whiteSpace: "nowrap",
    },
    iconNotify: {
      paddingRight: "2px",
      display: "flex",
      alignItems: "center",
      marginLeft: drawer.drawer ? "2px" : "0px",
    },
    tRText: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      lineHeight: "38px",
      fontSize: "24px",
      color: "#76BA1B",
      marginTop: "-1px",
    },
    tRText2: {
      fontWeight: "normal",
      fontFamily: "Poppins",
      fontStyle: "normal",
      lineHeight: "38px",
      fontSize: "24px",
      color: "#76BA1B",
    },
    gridP1: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "36px",
      color: "#22261b",
      marginTop: "-1px",
    },
    gridP2: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      color: "#22261b",
      marginTop: "-35px",
      display: "flex",
    },
    gridP3: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "36px",
      color: "#22261b",
      marginTop: "-1px",
    },
    gridP4: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "18px",
      color: "#22261b",
      marginTop: "-35px",
    },

    lastCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    divider: {
      borderRight: "1px solid #767873",
      height: "80px",
      marginTop: "-25px",
      marginLeft: "45px",
      marginRight: "25px",
    },
    gridDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  });

  //method for the date
  const date = new Date();
  const time = date.getHours();
  const greetings =
    time < 12 ? "Morning" : time > 12 && time < 16 ? "Afternoon" : "Evening";

  //use Effect for getting the stats for active username
  useEffect(() => {
    const getActiveUsers = async () => {
      await axios
        .get(`${APIDATA}get/users/stats`)
        .then((res) => setActiveUsers(res?.data.data))
        .catch((err) => console.log(err));
    };

    getActiveUsers();
  }, []);

  //use Effect for getting the stats of ads, pending,active etc.
  useEffect(() => {
    const getCountStats = async () => {
      await axios
        .get(`${APIDATA}count/status`)
        .then((res) => setCountStatus(res?.data.data))
        .catch((err) => console.log(err));
    };

    getCountStats();
  }, []);

  //filtering only counts from the api data
  const counts = countStatus?.map((countsta) => countsta.count);
  //summing all counts to get the total
  const sumOfCounts = counts.reduce((a, b) => a + b, 0);

  // filtering by status
  const approved = countStatus.filter(function (countS) {
    return countS.status === "approved";
  });

  const pending = countStatus.filter(function (countS) {
    return countS.status === "pending";
  });

  const declined = countStatus.filter(function (countS) {
    return countS.status === "declined";
  });

  const expired = countStatus.filter(function (countS) {
    return countS.status === "expired";
  });

  return (
    <Box
      style={{
        display: "flex",
        marginTop: "-60px",
        marginLeft: "-25px",
        marginRight: "-15px",
      }}
    >
      {/* left section */}
      <div className={css(styles.leftSection)}>
        <div className={css(styles.sLeftSection)}>
          <p className={css(styles.gText)}>
            Good <span style={{ fontWeight: "bold" }}>{greetings}</span>
          </p>

        </div>

        <Grid container spacing={2} columns={15}>
          <Grid item xs={3}>
            {approved.map((approve, index) => (
              <GridOption
                key={index}
                Icon={
                  <Icons.Send
                    sx={{ color: "#767873", width: "39px", height: "39px" }}
                  />
                }
                IconTag={approve.status}
                Description="Classified posted ads"
                Count={approve.count}
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            {pending.map((pend, index) => (
              <GridOption
                key={index}
                Icon={
                  <Icons.LanOutlined
                    sx={{ color: "#767873", width: "39px", height: "39px" }}
                  />
                }
                IconTag={pend.status}
                Description="Pending ads posted"
                Count={pend.count}
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            {declined.map((decline, index) => (
              <GridOption
                key={index}
                Icon={
                  <Icons.ChairAltOutlined
                    sx={{ color: "#767873", width: "39px", height: "39px" }}
                  />
                }
                IconTag={decline.status}
                Description="Declined ads"
                Count={decline.count}
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            {expired.map((expire, index) => (
              <GridOption
                key={index}
                Icon={
                  <Icons.GroupOutlined
                    sx={{ color: "#767873", width: "39px", height: "39px" }}
                  />
                }
                IconTag={expire.status}
                Description="Expired Ads"
                Count={expire.count + 100}
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            <GridOption
              Icon={
                <Icons.Functions
                  sx={{ color: "#767873", width: "39px", height: "39px" }}
                />
              }
              IconTag="Total"
              Description="Total number ads"
              Count={sumOfCounts}
            />
          </Grid>
        </Grid>

        <h2 className={css(styles.h2Text)}>
          Ads Post <span className={css(styles.leftSpan)}>Statistics</span>
        </h2>

        <Card
          sx={{
            backgroundColor: "#F9FDF5",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          <CardContent>
            <Chart selectedYear={selectedYear} />
            {/* selector for the years */}
            <FormControl sx={{ width: "20%" }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Grid container spacing={2} columns={12}>
          <Grid item xs={4}>
            <Link to="pending">
              <GridBottom text="Verify Post" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <GridBottom text="Accept new post" />
          </Grid>
          <Grid item xs={4}>
            <GridBottom text="Remove post" />
          </Grid>
          <Grid item xs={4}>
            <Link to="pending">
              <GridBottom text="Edit Product" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <GridBottom text="Add new product" />
          </Grid>
          <Grid item xs={4}>
            <GridBottom text="Dele Product" />
          </Grid>
        </Grid>
      </div>
      {/* right section */}
      <div className={css(styles.rightSection)}>
        <div className={css(styles.topRight)}>
          <div className={css(styles.topRightIcon1)}>
            <Icons.Event
              sx={{ color: "#76ba1b", width: "30px", height: "30px" }}
            />
          </div>
          {/* <div
            style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}
          > */}
          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <p className={css(styles.topRightP)}>Jan 30, 2022</p>
            <span
              style={{
                color: "#767873",
                fontSize: "20px",
                marginTop: "-5px",
                // paddingRight: drawer.drawer ? "5px" : "10px",
              }}
            >
              |
            </span>
          </div> */}
          <p className={css(styles.topRightP)}>{moment(new Date()).format('ll')}</p>
          <span
            style={{
              color: "#767873",
              fontSize: "20px",
              marginTop: "-5px",
              marginLeft: "3px",
              // paddingRight: drawer.drawer ? "5px" : "10px",
            }}
          >
            |
          </span>

          <div className={css(styles.iconNotify)}>
            <Icons.Notifications
              sx={{
                color: "#FFA500",
                width: "30px",
                height: "30px",
                marginRight: "5px",
              }}
            />
            <span
              style={{
                color: "#767873",
                fontSize: "20px",
                marginTop: "-5px",

                // paddingLeft: drawer.drawer ? "5px" : "90px",
              }}
            >
              |
            </span>
          </div>
          <div>
            <Icons.Person
              sx={{
                color: "#FFA500",
                width: "30px",
                height: "30px",
              }}
            />
            <span
              style={{
                color: "#767873",
                fontSize: "20px",
                marginTop: "-5px",
                paddingLeft: "10px",
              }}
            />
          </div>
          <div className={css(styles.topRightIcon2)}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Icons.KeyboardArrowDown
                sx={{
                  color: "#767873",
                  width: "20px",
                  height: "20px",
                }}
              />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <NavLink to="/profiles" style={{ textDecoration: "none" }}>
                <MenuItem sx={[{ color: "#000" }, { '&:active': { color: `${colors.bellefuGreen}` } }]} onClick={handleClose}>
                  Profile
                </MenuItem>
              </NavLink>
              <MenuItem sx={[{ color: "#000" }, { '&:active': { color: `${colors.bellefuGreen}` } }]} onClick={() => handleLogout()}>
                Sign Out
              </MenuItem>
            </Menu>
          </div>

          {/* </div> */}
        </div>
        <h2 className={css(styles.tRText)}>
          <span style={{ fontWeight: "bold" }}>Shop</span> Statistics
        </h2>
        <Card
          sx={{
            width: "100%",
            maxHeight: 250,
            backgroundColor: "#767873",
            borderRadius: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  Verify Shop
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "36px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  200
                </p>
              </div>
              <p
                style={{
                  borderBottom: "0.5px solid #F9FDF5",
                  marginTop: "-40px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  Non verified Shop
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "36px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  10
                </p>
              </div>
              <p
                style={{
                  borderBottom: "0.5px solid #F9FDF5",
                  marginTop: "-40px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  Closed Shop
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "36px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  4
                </p>
              </div>
              <p
                style={{
                  borderBottom: "0.5px solid #F9FDF5",
                  marginTop: "-40px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  Total Number Shops
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "36px",
                    fontStyle: "normal",
                    fontFamily: "Poppins",
                    color: "#f9fdf5",
                  }}
                >
                  214
                </p>
              </div>
              <p
                style={{
                  borderBottom: "0.5px solid #F9FDF5",
                  marginTop: "-40px",
                }}
              />
            </div>
          </CardContent>
        </Card>
        <h2 className={css(styles.tRText2)}>
          <span style={{ fontWeight: "bold" }}>Bellefu Ecommerce</span> Stat
        </h2>
        <Grid container spacing={2} columns={4}>
          <Grid item xs={2}>
            <Card
              sx={{
                maxHeight: 134,
                backgroundColor: "#F9FDF5",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <CardContent>
                <p className={css(styles.gridP1)}>3000</p>
                <p className={css(styles.gridP2)}>Product</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card
              sx={{
                maxHeight: 134,
                backgroundColor: "#F9FDF5",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <CardContent>
                <p className={css(styles.gridP1)}>3000</p>
                <p className={css(styles.gridP2)}>Product</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card
              sx={{
                maxHeight: 134,
                backgroundColor: "#F9FDF5",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <CardContent>
                <p className={css(styles.gridP1)}>3000</p>
                <p className={css(styles.gridP2)}>Product</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card
              sx={{
                maxHeight: 134,
                backgroundColor: "#F9FDF5",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <CardContent>
                <p className={css(styles.gridP1)}>3000</p>
                <p className={css(styles.gridP2)}>Product</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <h2 className={css(styles.tRText2)}>
          <span style={{ fontWeight: "bold" }}>User</span> Statistics
        </h2>
        <Card
          sx={{
            maxHeight: 140,
            backgroundColor: "#D4D7D1",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <CardContent className={css(styles.lastCard)}>
            <div className={css(styles.gridDiv)}>
              <div>
                <p className={css(styles.gridP1)}>{activeUsers?.active}</p>
                <p className={css(styles.gridP2)}>
                  <span
                    style={{
                      marginRight: "5px",
                      textTransform: "capitalize",
                    }}
                  >
                    Active
                  </span>{" "}
                  User
                </p>
              </div>
            </div>

            <div className={css(styles.divider)} />
            <div className={css(styles.gridDiv)}>
              <p className={css(styles.gridP3)}>{activeUsers.inactive}</p>
              <p className={css(styles.gridP4)}>Non-active user</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
