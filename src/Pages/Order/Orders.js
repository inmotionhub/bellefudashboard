import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Paper,
  TextField,
  Typography,
  Modal,
  Box,
  Toolbar,
  Button,
  TablePagination,
  IconButton,
  Tooltip,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Icons from "@mui/icons-material";
import {
  PageTitle,
  CircularIndeterminate,
  APIDATA,
  colors,
  BASE_URL,
} from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const APIDATAA = `${BASE_URL}api/v3/list/orders`;

export default function AdminList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [track, setTrack] = useState("");

  const [des, setDes] = useState("");

  const [reload, setReload] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/orders`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [reload]);

  const modal = {
    deletestyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    },
    edit: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 420,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 3,
      paddingTop: 2,
    },
    btn: {
      border: "none",
      width: "85%",
      borderRadius: "5px",
      textTransform: "capitalize",
    },
  };

  const update = () => {
    if (des === "" || track === "") {
      toast.error("All fields are required");
    } else {
      axios
        .post(`${APIDATA}update/track/status`, {
          orderId: pushId,
          status: track,
          info: des,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Order Updated Successfully");
            setReload((prev) => prev + 1);
            setOpen3(false);
          }
        });
    }
  };

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Order list" variant="h4" component="h2" />
      </Box>
      <Toolbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#76ba1b" }}>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Date</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Order Number</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Payment</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Total Price</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Shipping Fee</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Address</strong>
              </TableCell>

              <TableCell sx={{ color: "#ffff" }}>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {program === null ? (
              <CircularIndeterminate />
            ) : (
              program
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{moment(row.created_at).format("l")}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>

                    <TableCell>{row.payment}</TableCell>

                    <TableCell>{row.total_amount}</TableCell>

                    <TableCell>{row.delivery_fee}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.address +
                        ", " +
                        row.city_code +
                        " ," +
                        row.state_code +
                        ", " +
                        row.country_code}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title="Edit tracking status">
                          <IconButton
                            onClick={() => {
                              setPushId(row.id);
                              setOpen3(true);
                            }}
                          >
                            <Icons.EditOutlined sx={{ color: "blue" }} />
                          </IconButton>
                        </Tooltip>

                        {/* update custom ads modal */}

                        <Modal
                          open={open3}
                          onClose={() => setOpen3(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={modal.edit}>
                            <Box sx={{ margin: "auto 42%" }}>
                              <Icons.WarningAmber sx={{ fontSize: 50 }} />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography sx={{ p: 1, ml: 3, mb: 2 }} variant="p">
                              {" "}
                              Do you want to edit this order status ?{" "}
                            </Typography>

                            <div
                              style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                marginTop: 30,
                              }}
                            >
                              <FormControl sx={{ m: 1, minWidth: 350, mb: 4 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                  Orders Status
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  value={track}
                                  label="Order Status"
                                  onChange={(e) => setTrack(e.target.value)}
                                >
                                  <MenuItem value="processing">
                                    Processing
                                  </MenuItem>
                                  <MenuItem value="ontransit">
                                    On Transit
                                  </MenuItem>
                                  <MenuItem value="delivered">
                                    Delivered
                                  </MenuItem>
                                </Select>
                              </FormControl>

                              <input
                                style={{
                                  padding: 20,
                                  height: 40,
                                  width: 350,
                                  marginBottom: 30,
                                }}
                                id="outlined-basic"
                                onChange={(e) => setDes(e.target.value)}
                                value={des}
                                placeholder="Tracking Description"
                              />
                            </div>

                            <Divider sx={{ mb: 5 }} />
                            <Box
                              sx={{
                                mt: 5,
                                display: "flex",
                                justifyContent: "space-between",
                                m: 2,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => setOpen3(false)}
                              >
                                cancel
                              </Button>
                              <Button
                                variant="contained"
                                onClick={update}
                                sx={{ color: "#ffff", bgcolor: "#76ba1b" }}
                              >
                                Update
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 200]}
          component="div"
          count={program?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
