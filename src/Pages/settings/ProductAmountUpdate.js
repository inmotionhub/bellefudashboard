import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { APIDATA } from "../../Constant";
import axios from "axios";

const styles = StyleSheet.create({
  main: {
    height: "100vh",
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

function ProductAmountUpdate() {
  const [featured, setFeatured] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [urgent, setUrgent] = useState("");

  //handle amount Update

  const handleFeeUpdate = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("featured", featured);
    formDatas.append("highlighted", highlighted);
    formDatas.append("urgent", urgent);

    axios({
      method: "POST",
      url: `${APIDATA}update/product/fee`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // await axios.post(`${APIDATA}change/pending/status`).then((res) => {});
  };

  return (
    <div>
      <h5 className={css(styles.topHeader)}>Ads Amount Update</h5>
      <form className={css(styles.form)}>
        <TextField
          id="Urgent"
          label="Urgent"
          value={urgent}
          variant="outlined"
          sx={{ mb: 5, width: "100%" }}
          onChange={(e) => setUrgent(e.target.value)}
        />
        <TextField
          id="HighLighted"
          label="HighLighted"
          value={highlighted}
          variant="outlined"
          sx={{ mb: 5, width: "100%" }}
          onChange={(e) => setHighlighted(e.target.value)}
        />
        <TextField
          id="Featured"
          label="Featured"
          value={featured}
          variant="outlined"
          sx={{ mb: 5, width: "100%" }}
          onChange={(e) => setFeatured(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            "&:hover": { backgroundColor: "#76BA1B" },
            backgroundColor: "#76BA1B",
            width: "100%",
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "38px",
          }}
          onClick={handleFeeUpdate}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default ProductAmountUpdate;
