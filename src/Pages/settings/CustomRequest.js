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
  // Fade,
  Typography,
  Modal,
  Box,
  Toolbar,
  Button,
  TablePagination,
  IconButton,
  Tooltip,
  Divider,
  TextareaAutosize,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as Icons from "@mui/icons-material";
import {
  PageTitle,
  CircularIndeterminate,
  APIDATA,
  BASE_URL,
} from "../../Constant";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

export default function AdminList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [image, setImage] = useState();
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
        .get(`${APIDATA}list/custom/request`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [reload]);

  const verify = () => {
    const formDatas = new FormData();

    formDatas.append("requestId", pushId);

    axios({
      method: "POST",
      url: `${APIDATA}delete/custom/request`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setReload((prev) => prev + 1);
          toast.success("Custom request deleted", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

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
    slide: {
      width: "60%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // bgcolor: "background.paper",
      boxShadow: 24,
      // p: 4,
      borderRadius: 4,

      maxWidth: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5%",
    },
  };
  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Custom Request" variant="h4" component="h2" />
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
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Comment</strong>
              </TableCell>

              <TableCell sx={{ color: "#ffff" }}>
                <strong>Phone</strong>
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
                      {row.fullname}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>

                    <TableCell>{row.comment}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.phone}
                    </TableCell>
                    <TableCell>
                      <Box>
                        {row.image !== null && (
                          <Tooltip title="View Image">
                            <IconButton
                              onClick={() => {
                                setPushId(row.id);
                                setOpen2(true);
                                if (row.image !== null) {
                                  setImage(row.image[0]);
                                }
                              }}
                            >
                              <Icons.RemoveRedEye sx={{ color: "grey" }} />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              setPushId(row.id);
                              setOpen(true);
                            }}
                          >
                            <Icons.DeleteOutlineOutlined
                              sx={{ color: "red" }}
                            />
                          </IconButton>
                        </Tooltip>

                        {/* delete Modal */}
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
                              Do you want to delete this request ?{" "}
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
                                color="error"
                                onClick={() => setOpen(false)}
                              >
                                cancel
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ color: "#ffff", bgcolor: "#76ba1b" }}
                                onClick={verify}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Modal>

                        {/* View Image Modal */}
                        <Modal
                          open={open2}
                          onClose={() => setOpen2(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          opacity={0.2}
                        >
                          <Box sx={modal.slide}>
                            <img
                              src={`${BASE_URL}get/custom/image/${image}`}
                              alt="image"
                              style={{ width: "100%" }}
                            />
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
