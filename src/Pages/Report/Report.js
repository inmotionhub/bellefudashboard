// import Backdrop from "@mui/material/Backdrop";
// import Modal from "@mui/material/Modal";
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import {
  Paper,
  // Fade,
  // Typography,
  // TextField,
  TableRow,
  Box,
  TableHead,
  Toolbar,
  TableContainer,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Table,
  Tooltip,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons

import * as Icons from "@mui/icons-material";

import { PageTitle, CircularIndeterminate, APIDATA } from "../../Constant";
import axios from "axios";

import { toast } from "react-toastify";
import moment from "moment";
import ReportModal from "./ReportModal";

export default function Report() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [report, setReport] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [reportId, setReportId] = useState(null);

  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState(null);
  const [des, setDes] = useState(null);
  const [target, setTarget] = useState(null);
  const [reload, setReload] = useState(0);

  // const oweiTime = time.toISOString();
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getReport = async () => {
      await axios
        .get(`${APIDATA}get/all/report`)
        .then((res) => setReport(res.data.data))
        .catch((err) => console.log(err));
    };

    getReport();
  }, [reload]);

  // const filteredReport = report.filter((filterdP) => filterdP.inorganic_views === )

  //handling approve report
  const handleApprove = () => {
    const formDatas = new FormData();

    formDatas.append("id", reportId);
    formDatas.append("status", "approved");

    axios({
      method: "POST",
      url: `${APIDATA}update/report`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen3(false);
          setReload((prev) => prev + 1);
          toast.success("Report Approved", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //handle probe report
  const handleProbe = () => {
    const formDatas = new FormData();

    formDatas.append("id", reportId);
    formDatas.append("status", "probed");

    axios({
      method: "POST",
      url: `${APIDATA}update/report`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen3(false);
          setReload((prev) => prev + 1);
          toast.success("Report Moved To Probing", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //handle report delete method
  const handleDelete = () => {
    const formDatas = new FormData();

    formDatas.append("id", reportId);

    axios({
      method: "POST",
      url: `${APIDATA}delete/report`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.statu) {
          setReload((prev) => prev + 1);
          toast.error("Report Deleted", {
            position: "top-right",
          });

          setOpen4(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const modalstyle = {
    width: 750,
    padding: "20px",
    margin: "auto 25%",
    position: "absolute",
    top: "10%",
  };

  const modal = {
    approvestyle: {
      position: "absolute",
      top: "50%",
      left: "55%",
      transform: "translate(-50%, -50%)",
      width: "40%",

      backgroundColor: "white",
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    },
    deletestyle: {
      position: "absolute",
      top: "50%",
      left: "55%",
      transform: "translate(-50%, -50%)",
      width: "30%",

      backgroundColor: "white",
      boxShadow: 24,
      borderRadius: 3,
      p: 4,
    },
  };
  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Customer Report " variant="h4" component="h2" />
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
                <strong>Report ID</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Title</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Description</strong>
              </TableCell>

              <TableCell sx={{ color: "#ffff" }}>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report === null ? (
              <CircularIndeterminate />
            ) : (
              report
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.reportsid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moment(row.reportedat).format("l")}
                    </TableCell>
                    <TableCell> {row.title} </TableCell>
                    <TableCell> #{row.inorganic_views} </TableCell>
                    <TableCell>
                      {row.status === "approved" ? (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            textTransform: "capitalize",
                            padding: "5px",
                            bgcolor: "green",
                          }}
                        >
                          {row.status}
                        </Typography>
                      ) : row.status === "pending" ? (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            textTransform: "capitalize",
                            padding: "5px",
                            bgcolor: "blue",
                          }}
                        >
                          {row.status}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                            textTransform: "capitalize",
                            padding: "5px",
                            bgcolor: "red",
                          }}
                        >
                          {row.status}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.message}</TableCell>

                    <TableCell>
                      <Box>
                        <Tooltip title="View">
                          <IconButton
                            onClick={() => {
                              setOpen5(true);
                              setReportId(row.reportsid);
                              setTitle(row.title);
                              setDes(row.description);
                              setTarget(row.target);
                            }}
                          >
                            <Icons.RemoveRedEyeOutlined
                              sx={{ color: "#FFA500" }}
                            />
                          </IconButton>
                        </Tooltip>

                        {/* View report details Modal starts here */}
                        <Modal
                          open={open5}
                          onClose={() => setOpen5(false)}
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

                        {/* main report modal */}

                        {report
                          .filter((pReport) => pReport.reportsid === reportId)
                          .map((pReport) => (
                            <ReportModal
                              key={pReport.reportsid}
                              open={open5}
                              setOpen={setOpen5}
                              productDetails={pReport}
                            />
                          ))}

                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => {
                              setReportId(row.reportsid);
                              setOpen3(true);
                            }}
                          >
                            <Icons.ModeEditOutlined sx={{ color: "blue" }} />
                          </IconButton>
                        </Tooltip>

                        {/* Edit modal starts here */}

                        <Modal
                          open={open3}
                          onClose={() => setOpen3(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.5 }}
                        >
                          <Box sx={modal.approvestyle}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              style={{
                                marginBottom: "60px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Do you want to approve or probe this product?
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button
                                  onClick={() => setOpen3(false)}
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                >
                                  Cancel
                                </Button>

                                <Button
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleApprove}
                                >
                                  Approve
                                </Button>

                                <Button
                                  color="error"
                                  // onClick={handleApprove}
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleProbe}
                                >
                                  Probe
                                </Button>
                              </span>
                            </Box>
                          </Box>
                        </Modal>

                        {/* Edit modal ends here */}

                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              setReportId(row.reportsid);
                              setOpen4(true);
                            }}
                          >
                            <Icons.DeleteOutline sx={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                        {/* modal for deleting a report  */}
                        <Modal
                          open={open4}
                          onClose={() => setOpen4(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.5 }}
                        >
                          <Box sx={modal.deletestyle}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                              style={{
                                marginBottom: "60px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Are you sure you want to delete this report?
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button
                                  onClick={() => setOpen4(false)}
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                >
                                  No
                                </Button>

                                <Button
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                  onClick={handleDelete}
                                >
                                  Yes
                                </Button>
                              </span>
                            </Box>
                          </Box>
                        </Modal>

                        {/* end of delete modal */}

                        {/* <Modal
                                                open={open2}
                                                onClose={() => setOpen2(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={deletestyle}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        Do you want to delete this push notification?
                                                    </Typography>
                                                    <Box sx={{ mt: 2 }}>
                                                        <span> <Button onClick={() => setOpen2(false)}>cancel</Button> <Button onClick={deleted}>Yes</Button></span>
                                                    </Box>
                                                </Box>
                                            </Modal> */}
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
          count={report?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
