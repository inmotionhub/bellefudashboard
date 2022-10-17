import React from "react";
import { StyleSheet, css } from "aphrodite";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductAmountUpdate from './ProductAmountUpdate'


function Advertplan() {
  const drawer = useSelector((state) => state.login);

  const styles = StyleSheet.create({
    main: {
      height: "100vh",
    },
    container: {
      width: drawer.drawer ? "80%" : "70%",
      marginLeft: "auto",
      marginRight: "auto",
      border: "0.5px solid #767873",
      position: "relative",
      borderRadius: "10px",
    },
    navButtons: {
      display: "flex",
      position: "absolute",
      left: "40px",
      top: "-42px",
    },

    buttons: {
      paddingRight: "10px",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "38px",
      fontFamily: "Poppins",
      cursor: "pointer",
      textTransform: "capitalize",
      border: "none",
    },
    buttons2: {
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "38px",
      fontFamily: "Poppins",
      cursor: "pointer",
      color: "#22261B",
      textTransform: "capitalize",
      border: "none",
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
    <div className={css(styles.main)}>
      <div className={css(styles.container)}>
        <div className={css(styles.navButtons)}>
          <NavLink
            to="/adsplan"
            end={true}
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              borderBottom: isActive
                ? "solid 4px #76BA1B"
                : "solid 4px #ffffff",
            })}
          >
            <button className={css(styles.buttons)}>
              Product amount Update
            </button>
          </NavLink>
          <NavLink
            to="/adsplan/adsDurationPlan"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              borderBottom: isActive
                ? "solid 4px #76BA1B"
                : " solid 4px #ffffff",
            })}
          >
            <button className={css(styles.buttons2)}>
              Product duration Update
            </button>
          </NavLink>
        </div>

        <div>
          {window.location.pathname === 'adsplan' ? <>  <ProductAmountUpdate /> </> : <Outlet />}

        </div>
      </div>
    </div>
  );
}

export default Advertplan;
