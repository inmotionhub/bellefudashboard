import React from "react";
import { StyleSheet, css } from "aphrodite";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductAmountUpdate from "./ProductAmountUpdate";
import { Box, Button } from "@mui/material";

function Advertplan() {
  const drawer = useSelector((state) => state.login);

  const styles = StyleSheet.create({
    main: {
      height: "calc(100vh - 64px)",
      px: 1,
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },

    formOptions: {
      display: "flex",
      flexDirection: "column",
    },

    form: {
      padding: "0 40px 40px 40px",
    },

    label: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "38px",
      width: "63px",
      height: "38px",
      color: "#767873",
    },
    input: {
      width: "901px",
      height: "50px",
      backgroundColor: "#FCFFF9",
      border: "0.5px solid #767873",
      boxSizing: "border-box",
      borderRadius: "10px",
      paddingLeft: "15px",
      paddingRight: "15px",
      fontSize: "18px",
      outlineColor: "#76BA1B",
    },

    saveButton: {
      color: "#F9FDF5",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "38px",
      width: "901px",
      height: "50px",
      left: "423px",
      top: "798px",
      backgroundColor: "#76BA1B",
      border: "none",
      outline: "none",
      borderRadius: "5px",
      marginTop: "30px",
    },

    topHeader: {
      marginLeft: "40px",
      width: "216px",
      height: "38px",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "38px",
      color: "#767873",
      borderBottom: "4px solid",
      borderBottomColor: "#ffa500",
      borderRadius: "2px",
    },
  });

  return (
    <Box className={css(styles.main)}>
      <Box
        sx={{
          width: { xs: "100%", md: "700px" },
          mx: "auto",
          border: "0.5px solid #767873",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", md: "700px" },
            justifyContent: "space-around",
          }}
        >
          <NavLink
            to="/adsplan"
            end={true}
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              borderBottom: isActive
                ? "solid 4px #76BA1B"
                : "solid 4px #ffffff",
              textDecoration: "unset",
            })}
          >
            <Button
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "Poppins",
                textTransform: "capitalize",
                border: "none",
                width: "100%",
              }}
            >
              amount Update
            </Button>
          </NavLink>
          <NavLink
            to="/adsplan/adsDurationPlan"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              borderBottom: isActive
                ? "solid 4px #76BA1B"
                : " solid 4px #ffffff",
              textDecoration: "unset",
            })}
          >
            <Button
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "Poppins",
                color: "#22261B",
                textTransform: "capitalize",
                border: "none",
                width: "100%",
              }}
            >
              duration Update
            </Button>
          </NavLink>
        </Box>

        <div>
          {window.location.pathname === "adsplan" ? (
            <>
              <ProductAmountUpdate />
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </Box>
    </Box>
  );
}

export default Advertplan;
