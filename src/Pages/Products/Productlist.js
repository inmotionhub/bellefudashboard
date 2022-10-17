import React, { useState, useEffect } from "react";
import { PageTitle, colors, APIDATA, ProductImageUrl } from "../../Constant";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Select,
  OutlinedInput,
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
} from "@mui/material";

import * as Icons from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { loginStatus } from "../../Features/LoginSlice";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { styled } from "@mui/material/styles";
import ProductModal from "./ProductModal";
import Loader from "../../Loader";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ProductList() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catId, setCatId] = useState(null);
  const [countries, setCountries] = useState(null);
  const [editCatFilter, setEditCatFilter] = useState("");
  const [editSubCatFilter, setEditSubCatFilter] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");

  const [selectcoun3, setSelectcoun3] = useState("");
  const [selectcat, setSelectcat] = useState("");
  const [state, setState] = useState("");
  const [countryID, setCountryID] = useState(null);
  const [catFilter, setCatFilter] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState("");
  const [subcat, setSubCat] = useState(null);
  const [cat, setCat] = useState(null);
  const [page, setPage] = useState(1);
  const [initailProducts, setInitialProducts] = useState([]);
  const [totalSearch, setTotalSearch] = useState(0);

  const isDrawerOpen = useSelector(loginStatus);
  const handleOpen = () => setOpen(true);

  const lolo = StyleSheet.create({
    container: {
      overflow: "hidden",
      marginTop: "-2%",
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
      width: "140px",
      maxWidth: "100%",
      height: "120px",
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
  };

  const getProductList = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${APIDATA}list/products?page=${page}`);
      setProductList(data.data.data);
      setInitialProducts(data.data.data);
      setTotalSearch(data.data.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getProductList();
  }, [page]);

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

  const handleSearch = async (e) => {
    setState(e.target.value);
    const input = e.target.value;

    if (input) {
      try {
        const response = await axios.get(
          `${APIDATA}search/products/${input.toLocaleLowerCase()}`
        );
        setProductList(response.data.data.data);
        setTotalSearch(response.data.data.total);
      } catch (error) {
        console.log(`Search error due to: ${error.message}`);
      }
    } else {
      setProductList(initailProducts);
      setTotalSearch(30);
    }
  };

  return (
    <div className={css(lolo.container)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="All Products" />

        <FormControl>
          <InputLabel htmlFor="component-outlined">
            Search Product Name
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            sx={{ width: "100%" }}
            value={state}
            onChange={handleSearch}
            label="Search Product Name"
          />
        </FormControl>
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
              value={selectcoun3}
              label="Filter country"
              onChange={(e) => setSelectcoun3(e.target.value)}
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
      <Toolbar sx={{ mt: -5 }} />

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
                {productList
                  ?.filter((item) => {
                    if (selectcoun3 === "" && selectcat === "") {
                      return item;
                    } else if (item.category === catFilter) {
                      return item;
                    } else if (item.country === countryID) {
                      return item;
                    }
                    //  else if (
                    //   item.title
                    //     .toLowerCase()
                    //     .includes(state.toLowerCase())
                    // ) {
                    //   return item;
                    // }
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
                        {product.status === "expired" ||
                        product.status === "declined" ? (
                          <Button variant="contained" color="error">
                            {product.status}
                          </Button>
                        ) : product.status === "pending" ? (
                          <Button variant="contained">{product.status}</Button>
                        ) : (
                          <Button
                            variant="contained"
                            className={css(lolo.status)}
                          >
                            {product.status}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "12%" }}>
                        <Grid container spacing={3}>
                          <Grid item xs={3}>
                            <Item>
                              <Tooltip title="View">
                                <IconButton
                                  onClick={() => {
                                    handleOpen();
                                    setProductId(product.id);
                                  }}
                                >
                                  <Icons.RemoveRedEyeOutlined
                                    sx={{ color: "#FFA500" }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Modal
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{ opacity: 0.1 }}
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

                              {productList
                                .filter((product) => product.id === productId)
                                .map((product, index) => (
                                  <ProductModal
                                    title="Products List"
                                    open={open}
                                    setOpen={setOpen}
                                    productDetails={product}
                                    status="Active"
                                    id={index}
                                  />
                                ))}
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
            {totalSearch > 25 && (
              <IconButton onClick={() => setPage(page - 1)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Icons.ArrowBackIos
                    sx={{
                      cursor: "pointer",
                      mr: 2,
                      color: "#76BA1B",
                      marginLeft: "5px",
                    }}
                  />
                  <label>Back</label>
                </div>
              </IconButton>
            )}
            <label style={{ fontWeight: "bold", fontSize: 18 }}>
              Page : {page}
            </label>

            {productList.length > 0 && totalSearch >= 25 ? (
              <IconButton onClick={() => setPage(page + 1)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label>Next</label>
                  <Icons.ArrowForwardIos
                    sx={{ cursor: "pointer", ml: 2, color: "#76BA1B" }}
                  />
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

      <Toolbar sx={{ mb: -4 }} />
    </div>
  );
}

export default ProductList;
