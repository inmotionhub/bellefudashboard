import { useState, useEffect } from "react";
import { PageTitle, colors, APIDATA, ProductImageUrl } from "../../Constant";
import {
  InputLabel,
  MenuItem,
  Modal,
  FormControl,
  Typography,
  InputAdornment,
  Select,
  OutlinedInput,
  IconButton,
  Toolbar,
  Tooltip,
  TableContainer,
  styled,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import ProductModal from "./ProductModal";
import * as Icons from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { loginStatus } from "../../Features/LoginSlice";
import { StyleSheet, css } from "aphrodite";
import Loader from "../../Loader";
import axios from "axios";
import moment from "moment";

function Expired() {
  const [allProduct, setAllProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [coun, setCoun] = useState("");
  const [selectcat, setSelectcat] = useState("");
  const [cat, setCat] = useState([]);
  const [catName, setCatName] = useState(null);
  const [countryID, setCountryID] = useState(null);
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [initailProducts, setInitialProducts] = useState([]);
  const [totalSearch, setTotalSearch] = useState(0);

  const Item = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    paddingLeft: 0,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isDrawerOpen = useSelector(loginStatus);

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
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoader(true);

      await axios
        .get(`${APIDATA}list/expired/product?page=${page}`)
        .then((res) => {
          setAllProduct(res.data.data.data);
          setInitialProducts(res.data.data.data);
          setTotalSearch(res.data.data.total);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(true);
          console.log(err);
        });
    };
    fetchProduct();
  }, [page]);

  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/country`)
        .then((res) => setCountries(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  // Category fetch

  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/category`)
        .then((res) => setCat(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const input = e.target.value;

    if (input) {
      try {
        const response = await axios.get(
          `${APIDATA}search/products/${input.toLocaleLowerCase()}`
        );
        setAllProduct(response.data.data.data);
        setTotalSearch(response.data.data.total);
      } catch (error) {
        console.log(`Search error due to: ${error.message}`);
      }
    } else {
      setAllProduct(initailProducts);
      setTotalSearch(30);
    }
  };

  return (
    <div className={css(lolo.container)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Expired Products " />

        <FormControl>
          <InputLabel htmlFor="component-outlined">
            Search Product Name
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            sx={{ width: "100%" }}
            value={search}
            onChange={handleSearch}
            label="Search Product Name"
          />
        </FormControl>
      </div>
      <Toolbar sx={{ mt: -3 }} />

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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {cat?.map((sta, index) => (
                <MenuItem
                  onClick={() => setCatName(sta.name)}
                  value={sta.name}
                  key={index}
                >
                  {sta.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </div>
      <Toolbar sx={{ mt: -5 }} />

      {!loader ? (
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
                {allProduct.map((product, index) => (
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
                      <Button variant="contained" color="error">
                        Expired
                      </Button>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "12%" }}>
                      <Grid container spacing={1}>
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
                              onClose={handleClose}
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

                            {allProduct
                              .filter((product) => product.id === productId)
                              .map((product, index) => (
                                <ProductModal
                                  id={index}
                                  open={open}
                                  setOpen={setOpen}
                                  productDetails={product}
                                  status="expired"
                                  title="Expired"
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
            )}

            {totalSearch > 25 && (
              <Typography variant="h5"> Page : {page}</Typography>
            )}
            {allProduct.length > 0 && totalSearch > 25 ? (
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
          <Loader isLoading={loader} />
        </div>
      )}

      <Toolbar sx={{ mb: -4 }} />
    </div>
  );
}

export default Expired;
