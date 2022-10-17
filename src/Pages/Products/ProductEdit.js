import React, { useEffect, useState } from "react";
import { Modal, Box, Select, InputLabel, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { APIDATA } from "../../Constant";

const ProductEdit = ({ open, setOpen, id, editDetails }) => {
  const [catLists, setCatLists] = useState([]);
  const [subCatLists, setSubCatLists] = useState([]);
  const [editCatFilter, setEditCatFilter] = useState("");
  const [editSubCatFilter, setEditSubCatFilter] = useState("");
  const [catId, setCatId] = useState(null);

  //method for getting all categories

  //method for getting all sub-categories
  // useEffect(() => {
  //   const getprogram = async () => {
  //     await axios
  //       .get(`${APIDATA}list/sub-category/${catId}`)
  //       .then((res) => setSubCatLists(res.data.data))
  //       .catch((err) => console.log(err));
  //   };

  //   getprogram();
  // }, []);

  // console.log("catLists", catLists);
  // console.log("subCatLists", subCatLists);
  // console.log("catid => ", catId);

  // const handleSubChange = (e) => {
  //   setSubCat(e.target.value);
  // };

  // const handleCatChange = (e) => {
  //   setCat(e.target.value);
  // };

  // console.log("New cat => ", cat);
  // console.log("New sub cat => ", subCat);

  return (
    <div>
      <Modal
        key={id}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ opacity: 0.1 }}
      >
        <Box
          sx={{
            maxWidth: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5%",
          }}
        >
          <form
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <br />
              <h3
                style={{
                  fontSize: "20px",
                  color: "gray",
                  textTransform: "capitalize",
                }}
              >
                Update <span>{editDetails.title}</span>
              </h3>
            </div>
            <Divider />
            <br />
            <TextField
              value={editDetails.title}
              id="Product Name"
              label="Product Name"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <br />
            <br />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editCatFilter}
                label="Category"
                onChange={(e) => setEditCatFilter(e.target.value)}
              >
                {catLists?.map((catList) => (
                  <MenuItem
                    key={catList.id}
                    onClick={() => setCatId(catList.id)}
                    value={catList.name}
                  >
                    {catList?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Sub Category
              </InputLabel>
              <Select
                disabled={catId === null ? true : false}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editSubCatFilter}
                label="Sub Category"
                onChange={(e) => setEditSubCatFilter(e.target.value)}
              >
                {subCatLists?.map((subCatList) => (
                  <MenuItem key={subCatList.id} value={subCatList.id}>
                    {subCatList?.name}
                  </MenuItem>
                ))}

                {/* testing */}
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              id="Location"
              value={editDetails.country}
              label="Location"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <br /> <br />
            <Divider />
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#767873",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  outline: "none",
                  padding: "10px 15px 10px 15px",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                close
              </button>
              <button
                style={{
                  backgroundColor: "#76BA1B",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  outline: "none",
                  padding: "10px 15px 10px 15px",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductEdit;
