import React, { useState, useEffect } from "react";
import { PageTitle, colors, APIDATA, ProductImageUrl } from "../../Constant";
import {
  InputLabel,
  MenuItem,
  TextareaAutosize,
  FormControl,
  Typography,
  Select,
  IconButton,
  Toolbar,
  Tooltip,
  TableContainer,
  Table,
  Modal,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

import * as Icons from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { loginStatus } from "../../Features/LoginSlice";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";
import moment from "moment";
import { styled } from "@mui/material/styles";
import ProductModal from "./ProductModal";
import Loader from "../../Loader";
import { toast } from "react-toastify";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Pending() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catId, setCatId] = useState(null);
  const [countries, setCountries] = useState(null);
  const [editCatFilter, setEditCatFilter] = useState("");
  const [editSubCatFilter, setEditSubCatFilter] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");
  const [coun, setCoun] = useState("");
  const [selectcat, setSelectcat] = useState("");

  const [countryID, setCountryID] = useState(null);
  const [catFilter, setCatFilter] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [subcat, setSubCat] = useState(null);
  const [cat, setCat] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);

  const isDrawerOpen = useSelector(loginStatus);

  const lolo = StyleSheet.create({
    container: {
      overflow: "hidden",
    },

    con: {
      position: "relative",
      top: "8%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      left: "24%",
    },
    free: {
      backgroundColor: colors.secondary,
      color: "#ffff",
      padding: 6,
      borderRadius: 5,
      width: "4vw",
      textAlign: "center",
    },
    status: {
      backgroundColor: colors.secondary,
      color: "#ffff",

      padding: 6,
      borderRadius: 5,
      width: "7vw",
      textAlign: "center",
    },
    tableContainer: {
      marginTop: "3rem",
    },

    thead: {
      backgroundColor: "#76BA1B",
      fontWeight: "bold",
      color: "#ffffff",
    },
    tcell: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    productImg: {
      width: "70px",
      height: "70px",
      maxWidth: "100%",
    },
  });

  const modal = {
    approvestyle: {
      position: "absolute",
      top: "50%",
      left: "55%",
      transform: "translate(-50%, -50%)",
      width: "20%",

      backgroundColor: "white",
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    },
    declinestyle: {
      position: "absolute",
      top: "50%",
      left: "55%",
      transform: "translate(-50%, -50%)",
      width: "20%",
      justifyContent: "center",

      backgroundColor: "white",
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    },
  };

  const getPendingProducts = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${APIDATA}list/pending/product?page=${page}`
      );
      setPendingProducts(data?.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getPendingProducts();
  }, [page, reload]);

  //useEffect for fetching the list of all categories
  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/category`)
        .then((res) => setCat(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  //useEffect for fetching the sub categories
  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/sub-category/${catId}`)
        .then((res) => setSubCat(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [catId]);

  //useEffect for fetching the list of countries
  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/country`)
        .then((res) => setCountries(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("id", productId);
    formDatas.append("name", title);
    formDatas.append("category", editCatFilter);
    formDatas.append("subcategory", editSubCatFilter);
    formDatas.append("country", country);

    axios({
      method: "POST",
      url: `${APIDATA}update/product`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen2(false);
          setReload((prevState) => prevState + 1);
          toast.success("Product Updated", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));

    // await axios.post(`${APIDATA}change/pending/status`).then((res) => {});
  };

  //handling approve
  const handleApprove = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("id", productId);
    formDatas.append("status", "approved");

    axios({
      method: "POST",
      url: `${APIDATA}save/status/product`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen3(false);
          setReload((prev) => prev + 1);
          toast.success("Product Approved", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //handling decline
  const handleDecline = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("id", productId);
    formDatas.append("status", "declined");
    formDatas.append("reason", reason);

    axios({
      method: "POST",
      url: `${APIDATA}save/status/product`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen3(false);
          setReason("");
          setReload((prev) => prev + 1);
          toast.error("Product Declined", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={css(lolo.container)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Pending Product" />
      </div>
      <Toolbar />
      <div
        style={{
          position: "relative",
          left: isDrawerOpen.drawer ? "37%" : "49%",
        }}
      >
        <form>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Filter Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={coun}
              label="Filter country"
              onChange={(e) => setCoun(e.target.value)}
            >
              {countries?.map((con, index) => (
                <MenuItem
                  onClick={() => setCountryID(con.name)}
                  value={con.name}
                  key={index}
                >
                  {con.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Filter Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectcat}
              label="Filter Category"
              onChange={(e) => setSelectcat(e.target.value)}
            >
              {cat?.map((cat, index) => (
                <MenuItem
                  onClick={() => setCatFilter(cat.name)}
                  value={cat.name}
                  key={index}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </div>
      <Toolbar />

      {!isLoading ? (
        <>
          <TableContainer>
            <Table aria-label="active-products">
              <TableHead className={css(lolo.thead)} color="success">
                <TableRow>
                  <TableCell className={css(lolo.tcell)}>Products</TableCell>
                  <TableCell className={css(lolo.tcell)}>Username</TableCell>
                  <TableCell className={css(lolo.tcell)}>Status</TableCell>
                  <TableCell className={css(lolo.tcell)}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ bgcolor: "#ffffff" }}>
                {pendingProducts
                  ?.filter((item) => {
                    if (selectcat === "" && coun === "") {
                      return item;
                    } else if (item.category === catFilter) {
                      return item;
                    } else if (item.country === countryID) {
                      return item;
                    }
                  })
                  .map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Grid container spacing={3}>
                          <Grid item xs={3} sx={{ paddingLeft: 0 }}>
                            <Item>
                              <img
                                src={`${ProductImageUrl}${product?.images[0]}`}
                                alt="iuujhbb"
                                className={css(lolo.productImg)}
                              />
                            </Item>
                          </Grid>
                          <Grid
                            container
                            item
                            xs={4}
                            md={5}
                            lg={4}
                            direction="column"
                            columnSpacing={2}
                          >
                            <Grid item>
                              <Item>
                                <Typography
                                  align="left"
                                  color="success"
                                  sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    width: "200px",
                                  }}
                                >
                                  {product.title}
                                </Typography>
                              </Item>
                            </Grid>
                            <Grid item>
                              <Item>
                                <Stack direction="row" spacing={1}>
                                  <Icons.LocalOfferOutlined />
                                  <Typography>{product.category}</Typography>
                                </Stack>
                              </Item>
                            </Grid>
                            <Grid item>
                              <Item>
                                <Stack direction="row" spacing={2}>
                                  <Icons.LocationOnOutlined />
                                  <Typography>{product.country}</Typography>
                                </Stack>
                              </Item>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            xs={2}
                            direction="column"
                            columnSpacing={1}
                          >
                            <Grid item xs={3}>
                              <Item>
                                <Typography className={css(lolo.free)}>
                                  {product.planname}
                                </Typography>
                              </Item>
                            </Grid>
                            <Grid item xs={3}>
                              <Item>
                                <Typography align="left">Fruits</Typography>
                              </Item>
                            </Grid>
                            <Grid item xs={3}>
                              <Item>
                                <Stack direction="row" spacing={1}>
                                  <Icons.DateRangeOutlined />
                                  <Typography>
                                    {moment(product.created_at).format("l")}
                                  </Typography>
                                </Stack>
                              </Item>
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>{product.username}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={css(lolo.status)}
                        >
                          Pending
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ width: "12%" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <Item>
                              <Tooltip title="View">
                                <IconButton
                                  onClick={() => {
                                    setProductId(product.id);
                                    setOpen(true);
                                    setOpen6(true);
                                  }}
                                >
                                  <Icons.RemoveRedEyeOutlined
                                    sx={{ color: "#FFA500" }}
                                  />
                                </IconButton>
                              </Tooltip>
                              {/* modal for view starts here */}
                              <Modal
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                // sx={{ opacity: 0.1 }}
                              >
                                <Box
                                  style={{
                                    maxWidth: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "1%",
                                    position: "relative",
                                  }}
                                >
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    .
                                  </Typography>
                                </Box>
                              </Modal>

                              {pendingProducts
                                .filter((product) => product.id === productId)
                                .map((product, index) => (
                                  <ProductModal
                                    key={index}
                                    title="Pending"
                                    open={open}
                                    setOpen={setOpen}
                                    productDetails={product}
                                    status="pending"
                                    id={index}
                                  />
                                ))}

                              {/* modal for view ends here */}
                            </Item>

                            <Modal
                              open={open2}
                              onClose={() => setOpen2(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              sx={{ zIndex: 999 }}
                            >
                              <Box sx={modal.approvestyle}>
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Do you want to delete this product?
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {" "}
                                    <Button onClick={() => setOpen2(false)}>
                                      cancel
                                    </Button>{" "}
                                    <Button color="error">Yes</Button>
                                  </span>
                                </Box>
                              </Box>
                            </Modal>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              <Tooltip title="Edit">
                                <IconButton
                                  onClick={() => {
                                    setOpen3(true);
                                    setProductId(product.id);
                                  }}
                                >
                                  <Icons.ModeEditOutlined
                                    sx={{ color: "blue" }}
                                  />
                                </IconButton>
                              </Tooltip>

                              {/* Edit modal starts here */}
                              <Modal
                                open={open3}
                                onClose={() => setOpen3(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                // sx={{ opacity: 0.1 }}
                              >
                                <Box
                                  style={{
                                    maxWidth: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "1%",
                                    position: "relative",
                                  }}
                                >
                                  <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                  >
                                    .
                                  </Typography>
                                </Box>
                              </Modal>

                              {pendingProducts
                                .filter((pedit) => pedit.id === productId)
                                .map((singleEdit) => (
                                  <Modal
                                    key={singleEdit.id}
                                    hideBackdrop
                                    open={open3}
                                    onClose={() => setOpen3(false)}
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
                                            Update{" "}
                                            <span>{singleEdit.title}</span>
                                          </h3>
                                        </div>
                                        <Divider />
                                        <br />
                                        <TextField
                                          value={title}
                                          id="Product Name"
                                          label={singleEdit.title}
                                          variant="outlined"
                                          sx={{ width: "100%" }}
                                          onChange={(e) =>
                                            setTitle(e.target.value)
                                          }
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
                                            onChange={(e) =>
                                              setEditCatFilter(e.target.value)
                                            }
                                          >
                                            {cat?.map((catList) => (
                                              <MenuItem
                                                key={catList.id}
                                                onClick={() =>
                                                  setCatId(catList.id)
                                                }
                                                value={catList.id}
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
                                            disabled={
                                              catId === null ? true : false
                                            }
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={editSubCatFilter}
                                            label="Sub Category"
                                            onChange={(e) =>
                                              setEditSubCatFilter(
                                                e.target.value
                                              )
                                            }
                                          >
                                            {subcat?.map((subCatList) => (
                                              <MenuItem
                                                key={subCatList.id}
                                                value={subCatList.id}
                                              >
                                                {subCatList?.name}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                        <br />
                                        <br />
                                        <FormControl sx={{ width: "100%" }}>
                                          <InputLabel id="demo-simple-select-helper-label">
                                            Country
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={country}
                                            label="Country"
                                            onChange={(e) =>
                                              setCountry(e.target.value)
                                            }
                                          >
                                            {countries?.map((country) => (
                                              <MenuItem
                                                key={country.id}
                                                value={country.iso2}
                                              >
                                                {country?.name}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
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
                                              cursor: "pointer",
                                            }}
                                            onClick={() => setOpen3(false)}
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
                                              cursor: "pointer",
                                            }}
                                            onClick={handleUpdate}
                                          >
                                            update
                                          </button>
                                        </div>
                                      </form>
                                    </Box>
                                  </Modal>
                                ))}

                              {/* Edit modal ends here */}
                            </Item>
                          </Grid>

                          <Grid item xs={3}>
                            <Item>
                              <Tooltip title="Approve">
                                <IconButton
                                  onClick={() => {
                                    setOpen4(true);
                                    setProductId(product.id);
                                  }}
                                >
                                  <Icons.AddTaskOutlined
                                    sx={{ color: colors.secondary }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Item>
                            {/* Approve & Decline modal */}

                            <Modal
                              open={open4}
                              onClose={() => setOpen4(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              sx={{ zIndex: 999 }}
                            >
                              <Box sx={modal.approvestyle}>
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                  style={{ marginBottom: "60px" }}
                                >
                                  Do you want to approve this product?
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {" "}
                                    <Button
                                      onClick={() => setOpen5(true)}
                                      style={{
                                        fontWeight: "600",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Decline
                                    </Button>{" "}
                                    {/* Start Decline Modal */}
                                    <Modal
                                      hideBackdrop
                                      open={open5}
                                      onClose={() => setOpen5(false)}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                      // sx={{ opacity: 0.7 }}
                                    >
                                      <Box sx={modal.declinestyle}>
                                        <Typography
                                          variant="h5"
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          Why do you want to decline ?
                                        </Typography>
                                        <Divider />
                                        <TextareaAutosize
                                          aria-label="minimum height"
                                          minRows={6}
                                          placeholder="Reason for Decline"
                                          value={reason}
                                          onChange={(e) =>
                                            setReason(e.target.value)
                                          }
                                          style={{
                                            width: "100%",
                                            fontSize: "20px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingTop: "5px",
                                            paddingBottom: "5px",
                                            border: "none",
                                            outline: "none",
                                            marginTop: "10px",
                                          }}
                                        />
                                        <Box sx={{ mt: 2 }}>
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            {" "}
                                            <Button
                                              onClick={() => setOpen5(false)}
                                              style={{
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Cancel
                                            </Button>{" "}
                                            <Button
                                              color="error"
                                              onClick={handleDecline}
                                              style={{
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Decline
                                            </Button>
                                          </span>
                                        </Box>
                                      </Box>
                                    </Modal>
                                    {/* End of decline modal */}
                                    <Button
                                      color="error"
                                      onClick={handleApprove}
                                      style={{
                                        fontWeight: "600",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Approve
                                    </Button>
                                  </span>
                                </Box>
                              </Box>
                            </Modal>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              <Tooltip title="Delete">
                                <IconButton onClick={() => setOpen2(true)}>
                                  <Icons.DeleteOutlined sx={{ color: "red" }} />
                                </IconButton>
                              </Tooltip>
                            </Item>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <IconButton onClick={() => setPage(page - 1)}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>Back</label>
                <Icons.ArrowBackIos
                  sx={{
                    cursor: "pointer",
                    color: "#76BA1B",
                    marginLeft: "5px",
                  }}
                />
              </div>
            </IconButton>
            <Typography variant="h5"> Page : {page}</Typography>
            {pendingProducts.length > 0 ? (
              <IconButton onClick={() => setPage(page + 1)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Icons.ArrowForwardIos
                    sx={{ cursor: "pointer", color: "#76BA1B" }}
                  />
                  <label>Next</label>
                </div>
              </IconButton>
            ) : null}
          </div>
        </>
      ) : (
        <div style={{ width: "90%", margin: "auto" }}>
          <Loader isLoading={isLoading} />
        </div>
      )}

      {/* <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Icons.ArrowBackIos />
        <Icons.ArrowForwardIos />
      </div> */}

      <Toolbar sx={{ mb: -4 }} />
    </div>
  );
}

export default Pending;
