import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loggedIn, profileDetails, roles } from "../../Features/LoginSlice";
import { APIDATA } from "../../Constant";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  // const selector = useSelector(loginStatus)
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);
  const [pass, setPass] = useState(null);
  const [email, setEmail] = useState(null);

  const handleSubmit = (e) => {
    // e.preventDefault();
    setIsLoading(true);
    // dispatch(loggedIn(true))
    // navigate("/")

    axios({
      method: "POST",
      url: `${APIDATA}login/admin`,
      data: { email: email, password: pass },
    })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status) {
          dispatch(loggedIn(res.data.status));
          dispatch(profileDetails(res.data.data));
          dispatch(roles(res.data.data.role))
          navigate("/");
          setIsLoading(false);
          toast.success("Login Successful", {
            position: "top-center",
          });
          console.log(res.data.data);
        } else {
          setIsLoading(false);
          setError1(true);
        }

        // selector.userAuth ? : navigate("/login");
      })
      .catch((err) => {
        if (err) {
          setIsLoading(false);
          setError2(true);
        }
      });
  };

  const styles = StyleSheet.create({
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // position: "absolute",
      top: 0,
      left: 0,
    },
    logotypeContainer: {
      backgroundColor: "white",
      width: "80%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    logotypeImage: {
      position: "relative",
      width: "100%",
      height: "100%",
      objectFit: "fill",
      borderRadius: 3,
    },
    logotypeText: {
      position: "absolute",
      color: "white",
      fontWeight: 500,
      fontSize: 70,
      marginTop: "30%",
      whiteSpace: "nowrap",
    },
    formContainer: {
      width: "40%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: 420,
    },
    tab: {
      fontWeight: 400,
      fontSize: 18,
    },
    greeting: {
      fontWeight: 500,
      textAlign: "center",
      marginTop: 30,
      color: "#76BA1B",
      whiteSpace: "nowrap",
      fontSize: "18px",
    },
    subGreeting: {
      fontWeight: 500,
      textAlign: "center",
      marginTop: 20,
    },
    googleButton: {
      marginTop: 6,
      backgroundColor: "white",
      width: "100%",
      textTransform: "none",
    },
    googleButtonCreating: {
      marginTop: 0,
    },
    googleIcon: {
      width: 30,
    },
    creatingButtonContainer: {
      marginTop: 5,
      height: 46,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    createAccountButton: {
      height: 46,
      textTransform: "none",
    },
    formDividerContainer: {
      marginTop: 4,
      marginBottom: 4,
      display: "flex",
      alignItems: "center",
    },
    formDividerWord: {
      paddingLeft: 4,
      paddingRight: 4,
    },
    formDivider: {
      flexGrow: 1,
      height: 1,
      backgroundColor: "green",
    },
    errorMessage: {
      textAlign: "center",
      marginTop: 15,
    },
    textFieldUnderline: {
      "&:before": {
        borderBottomColor: "green",
      },
      "&:after": {
        borderBottomColor: "green",
      },
      "&:hover:before": {
        borderBottomColor: "green",
      },
    },
    textField: {
      borderBottomColor: "green",
    },
    formButtons: {
      width: "100%",
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
    },
    forgetButton: {
      textTransform: "none",
      fontWeight: 400,
    },
    loginLoader: {
      marginLeft: 6,
    },
    copyright: {
      color: "#8abe1e",
      marginTop: "20%",
      whiteSpace: "nowrap",
      fontSize: "17px",
    },
  });

  const date = new Date();

  const time = date.getHours();

  const greetings =
    time < 12
      ? "Good Morning"
      : time > 12 && time <= 16
        ? "Good Afternoon"
        : "Good Evening ";

  const year = date.getFullYear()
  return (
    <Grid className={css(styles.container)}>
      <div className={css(styles.logotypeContainer)}>
        <img
          className={css(styles.logotypeImage)}
          src="/images/Bellefu-Front-Image.png"
          alt="logo"
        />

        <img style={{ zIndex: 1000, top: '5%', left: '2%', position: 'absolute', width: '150px', height: '70px' }} src="images/mainlogo.png" alt='error' />

        <div className={css(styles.logotypeText)}>
          <p style={{ marginTop: "-17%" }}>Welcome Admin</p>
        </div>

      </div>
      <div className={css(styles.formContainer)}>
        <div className={css(styles.form)}>
          <div>
            <p
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "#76BA1B",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Login
            </p>
            <p
              style={{
                borderBottom: "2px solid #FFA500",
                width: "70px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "-10px",
              }}
            />
          </div>

          {activeTabId === 0 && (
            <React.Fragment>
              <Typography constiant="h1" className={css(styles.greeting)}>
                {greetings}, <span style={{ color: "#FFA500" }}>Admin</span>
              </Typography>
              {error2 === true ? (
                <Typography
                  color="secondary"
                  className={css(styles.errorMessage)}
                >
                  Check Your internet connection :(
                </Typography>
              ) : null}

              {error1 ? (
                <Fade in={error1}>
                  <Typography
                    color="secondary"
                    className={css(styles.errorMessage)}
                  >
                    Either email or password is not correct 🤷🏽‍♂️
                  </Typography>
                </Fade>
              ) : null}
              {error3 ? (
                <Fade in={error3}>
                  <Typography
                    color="primary"
                    className={css(styles.errorMessage)}
                  >
                    Login Sucess:(
                  </Typography>
                </Fade>
              ) : null}
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: styles.textFieldUnderline,
                    input: styles.textField,
                  },
                }}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div>
                {isLoading ? (
                  <CircularProgress
                    size={26}
                    className={css(styles.loginLoader)}
                  />
                ) : (
                  <Button
                    className={css(styles.formButton)}
                    onClick={handleSubmit}
                    size="large"
                    variant="contained"
                    sx={{
                      backgroundColor: "#8abe1e",
                      color: "white",
                      "&:hover": { backgroundColor: "#FFA500" },
                      marginTop: "10px",
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={css(styles.copyright)}>
          © {year} Bellefu, All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default Login;
