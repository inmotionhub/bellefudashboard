import { StyleSheet, css } from "aphrodite";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { colors } from "../../Constant";

const style = StyleSheet.create({
  kind: {
    marginLeft: "150px",
  },
  get: {
    marginTop: "50%",
    margin: "auto 24%",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    fontWeight: 750,
    fontSize: "70px",
    color: colors.bellefuGreen,
  },
});

function PageNotFound() {
  const move = useNavigate();
  return (
    <div className={css(style.get)}>
      <img src="images/logo.png" alt="logo" />
      <div>
        <h1 className={css(style.kind)}>
          <span className={css(style.main)}>404-</span>PAGE NOT FOUND
        </h1>
        <subtitle className={css(style.kind)}>
          The page you are looking for might have been removed
        </subtitle>
        <br />
        <subtitle className={css(style.kind)}>
          had its name changed or its temporarily unavailable{" "}
        </subtitle>{" "}
        <br />
      </div>
      <div style={{ marginTop: "7%", textAlign: "center" }}>
        <Button
          onClick={() => move("/login")}
          size="large"
          variant="contained"
          style={{
            borderRadius: 4,
            color: "#ffff",
            backgroundColor: colors.primary,
            m: 70,
          }}
        >
          GO TO HOMEPAGE
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
