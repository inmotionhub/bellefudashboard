import React from "react";
import Box from "@mui/material/Box";
import * as Icons from "@mui/icons-material";
import { StyleSheet, css } from "aphrodite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const GridOption = ({ Icon, IconTag, Description, Count }) => {
  //styles
  const styles = StyleSheet.create({
    iconDiv: {
      display: "flex",
      alignItems: "center",
    },
    iconsP: {
      fontSize: "20px",
      lineHeight: "20px",
      color: "#22261B",
      fontWeight: "500",
      fontStyle: "normal",
      fontFamily: "Poppins",
      marginLeft: "5px",
      textTransform: "capitalize",
    },
    descP: {
      fontWeight: "normal",
      fontStyle: "normal",
      fontFamily: "Poppins",
      fontSize: "18px",
      color: "#767873",
      wordWrap: "break-word",
      // width: "150px",
      height: "20px",
      marginBottom: "-10px",
    },
    countP: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "600",
      color: "#76ba1b",
      fontSize: "38px",
    },
  });
  return (
    <Card
      sx={{
        maxWidth: "100%",
        maxHeight: 200,
        backgroundColor: "#F9FDF5",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <CardContent>
        <div className={css(styles.iconDiv)}>
          {Icon}
          <span className={css(styles.iconsP)}>{IconTag}</span>
        </div>
        <p className={css(styles.descP)}>{Description}</p>
        <p className={css(styles.countP)}>{Count}</p>
      </CardContent>
    </Card>
  );
};

export default GridOption;
