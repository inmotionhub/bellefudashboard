import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ReviewModal from "./ReviewModal";

import {
  Rating,
  Modal,
  Box,
  Paper,
  FormControl,
  Toolbar,
  Typography,
  TablePagination,
  InputLabel,
  IconButton,
  Button,
  MenuItem,
  Tooltip,
  Divider,
  Select,
} from "@mui/material";

import { useState, useEffect } from "react";
// icons

import * as Icons from "@mui/icons-material";
import {
  colors,
  PageTitle,
  CircularIndeterminate,
  APIDATA,
} from "../../Constant";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

export default function Review() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [filter, setFilter] = useState("");
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
        .get(`${APIDATA}get/all/review`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [reload]);

  // Approve or resolve review
  const approve = () => {
    const formDatas = new FormData();

    formDatas.append("id", reviewId);
    formDatas.append("status", "resolved");
    axios({
      method: "POST",
      url: `${APIDATA}update/review`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen2(false);
          setReload((prev) => prev + 1);
          toast.success("Review Approved", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // When review is undergoing probing

  const probe = () => {
    const formDatas = new FormData();

    formDatas.append("id", reviewId);
    formDatas.append("status", "probing");
    axios({
      method: "POST",
      url: `${APIDATA}update/review`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen2(false);

          setReload((prev) => prev + 1);
          toast.info("Review undergoing probe", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // review delete

  const deleted = () => {
    const formDatas = new FormData();

    formDatas.append("id", reviewId);
    axios({
      method: "POST",
      url: `${APIDATA}delete/review`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false);
          setReload((prev) => prev + 1);
          toast.error("Review Deleted", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Modal style
  const modal = {
    edit: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 280,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 3,
      paddingTop: 2,
    },
  };

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Customer Review " variant="h4" component="h2" />

        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Filter Reviews
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filter}
            label="Filter Reviews"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">All Reviews </MenuItem>
            <MenuItem value="resolved">Resolved </MenuItem>
            <MenuItem value="probing"> Probing </MenuItem>
            <MenuItem value="pending">Pending </MenuItem>
          </Select>
        </FormControl>
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
                <strong>Product name</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Product ID</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Username</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Message</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Rating</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Status</strong>
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
                .filter((review) => {
                  if (filter === "") {
                    return review;
                  } else if (review.status === filter) {
                    return review;
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moment(row.reviewedat).format("ll")}
                    </TableCell>
                    <TableCell> {row.title} </TableCell>
                    <TableCell>#{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>
                      <Rating
                        name="text-feedback"
                        readOnly
                        precision={0.5}
                        defaultValue={row.rating}
                        emptyIcon={
                          <Icons.Star
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {row.status === "approve" || row.status === "resolved" ? (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            width: "7vw",
                            padding: "3px",
                            bgcolor: "green",
                          }}
                        >
                          Resolved
                        </Typography>
                      ) : row.status === "pending" ? (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            width: "7vw",
                            padding: "3px",
                            bgcolor: "blue",
                          }}
                        >
                          Pending
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            width: "7vw",
                            padding: "3px",
                            bgcolor: "red",
                          }}
                        >
                          Probing
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="View Product">
                          <IconButton
                            onClick={() => {
                              setReviewId(row.reviewid);
                              setOpen3(true);
                            }}
                          >
                            <Icons.RemoveRedEyeOutlined
                              sx={{ color: colors.secondary }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Resolve or Probe">
                          <IconButton
                            onClick={() => {
                              setReviewId(row.reviewid);
                              setOpen2(true);
                            }}
                          >
                            <Icons.ReportGmailerrorred sx={{ color: "blue" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              setReviewId(row.reviewid);
                              setOpen(true);
                            }}
                          >
                            <Icons.DeleteOutline sx={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                        {/* Attending to review */}
                        <Modal
                          open={open2}
                          onClose={() => setOpen2(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.3 }}
                        >
                          <Box sx={modal.edit}>
                            <Box sx={{ margin: "auto 42%" }}>
                              <Icons.WarningAmber sx={{ fontSize: 50 }} />
                            </Box>
                            <Divider sx={{ mb: 5 }} />

                            <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                              {" "}
                              Do you want to Probe or Approve this review ?{" "}
                            </Typography>

                            <Divider sx={{ mt: 5, mb: 3 }} />
                            <Box
                              sx={{
                                mt: 5,
                                display: "flex",
                                justifyContent: "space-between",
                                m: 4,
                                mb: 5,
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={() => setOpen2(false)}
                              >
                                cancel
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={probe}
                              >
                                Probe
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ color: "#ffff", bgcolor: "#76ba1b" }}
                                onClick={approve}
                              >
                                Approve
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                        {/* delete review modal */}
                        <Modal
                          open={open}
                          onClose={() => setOpen(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.3 }}
                        >
                          <Box sx={modal.edit}>
                            <Box sx={{ margin: "auto 42%" }}>
                              <Icons.WarningAmber sx={{ fontSize: 50 }} />
                            </Box>
                            <Divider sx={{ mb: 5 }} />

                            <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                              {" "}
                              Do you want to delete this review ?{" "}
                            </Typography>

                            <Divider sx={{ mt: 5, mb: 5 }} />
                            <Box
                              sx={{
                                mt: 5,
                                display: "flex",
                                justifyContent: "space-between",
                                m: 4,
                                mb: 5,
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{ bgcolor: "grey" }}
                                onClick={() => setOpen(false)}
                              >
                                cancel
                              </Button>

                              <Button
                                variant="contained"
                                color="error"
                                onClick={deleted}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                        {/* View review modal  */}
                        <Modal
                          open={open3}
                          onClose={() => setOpen3(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.3 }}
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
                        {program
                          .filter((review) => review.reviewid === reviewId)
                          .map((preview) => (
                            <ReviewModal
                              open={open3}
                              key={preview.reviewid}
                              setOpen={setOpen3}
                              productDetails={preview}
                            />
                          ))}
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
