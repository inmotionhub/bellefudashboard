import React from "react";
import { StyleSheet, css } from "aphrodite";

const GridBottom = ({ text }) => {
  const styles = StyleSheet.create({
    button: {
      width: "100%",
      height: "60px",
      backgroundColor: "#22261B",
      borderRadius: "5px",
      cursor: "pointer",
    },
    bSpan: {
      color: "#F9FDF5",
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "20px",
    },
  });
  return (
    <div>
      <button className={css(styles.button)}>
        <span className={css(styles.bSpan)}>{text}</span>
      </button>
    </div>
  );
};

export default GridBottom;
