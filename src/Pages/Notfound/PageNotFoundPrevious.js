import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const style = StyleSheet.create({
  kind: {
    color: "black",
    marginLeft: "150px",
  },
  get: {
    marginLeft: "250px",
    marginTop: "60px",
  },
});

function PageNotFound() {
  return (
    <div className={css(style.get)}>
      <img src="images/logo.png" />
      <h1 className={css(style.kind)}>404-PAGE NOT FOUND</h1>
      <subtitle className={css(style.kind)}>
        The page you are looking for might have been removed
      </subtitle>
      <br />
      <subtitle className={css(style.kind)}>
        had its name changed or its temporarily unavailable{" "}
      </subtitle>{" "}
      <br />
      <Link to="/">
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "blue",
            marginLeft: "250px",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        >
          GO TO HOMEPAGE
        </Button>
      </Link>
    </div>
  );
}

export default PageNotFound;
