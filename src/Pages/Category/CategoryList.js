import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Modal from "@mui/material/Modal";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Paper,
  Typography,
  Box,
  Fade,
  Toolbar,
  Button,
  TablePagination,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";

// icons
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import { Navigate, useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { subcat } from "../../Features/LoginSlice";
import Tooltip from "@mui/material/Tooltip";
import {
  APIDATA,
  PageTitle,
  CircularIndeterminate,
  BASE_URL,
} from "../../Constant";

import axios from "axios";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(null);

  const [des, setDes] = useState(null);
  const [open2, setOpen2] = useState(false);

  const [preview, setPreview] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState();
  const [read, setRead] = useState("");

  const [replayId, setReplayID] = useState(null);

  const [cat, setCat] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const imageHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else {
      setSelectedFile(e.target.files[0]);
    }

    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      let file1 = file[i];
      console.log(file1.name);
      setRead(file1);
    }
  };

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
    const formDatas = new FormData();

    formDatas.append("name", cat);
    formDatas.append("id", replayId);
    formDatas.append("image", read);

    axios({
      method: "POST",
      url: `${APIDATA}update/category`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setOpen2(false);
          toast.success("Category Updated", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));

    window.location.reload(false);
  };

  const deleted = () => {
    const formDatas = new FormData();

    formDatas.append("id", replayId);

    axios({
      method: "POST",
      url: `${APIDATA}category/delete`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.error("Category deleted", {
            position: "top-right",
          });
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));

    window.location.reload(false);
  };

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
        .get(`${APIDATA}list/category`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };
    getprogram();
  }, []);

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Category List " variant="h4" component="h2" />
      </Box>
      <Toolbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#76ba1b" }}>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Image</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Name</strong>
              </TableCell>

              <TableCell sx={{ color: "#ffff" }}>
                <strong> Subcategories</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Product-counts </strong>
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
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        style={{ width: 60, height: 56 }}
                        alt="error"
                        src={`${BASE_URL}get/category/image/${row.image}`}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.subcategories}</TableCell>
                    <TableCell>{row.products}</TableCell>

                    <TableCell>
                      <Box>
                        <Tooltip title="View Category">
                          <IconButton
                            onClick={() => {
                              dispatch(subcat(row.id));
                              navigate("/selectedcat");
                            }}
                          >
                            <RemoveRedEyeOutlinedIcon sx={{ color: "green" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Category">
                          <IconButton
                            onClick={() => {
                              setOpen2(true);
                              setReplayID(row.id);
                            }}
                          >
                            <ModeEditOutlinedIcon sx={{ color: "blue" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Category">
                          <IconButton
                            onClick={() => {
                              setOpen(true);
                              setReplayID(row.id);
                            }}
                          >
                            <DeleteOutlineIcon sx={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>

                        <Modal
                          open={open}
                          onClose={() => setOpen(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.3 }}
                        >
                          <Box sx={modal.deletestyle}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Do you want to delete this Category?
                            </Typography>
                            <Box
                              sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button onClick={() => setOpen(false)}>
                                cancel
                              </Button>{" "}
                              <Button color="error" onClick={deleted}>
                                Yes
                              </Button>
                            </Box>
                          </Box>
                        </Modal>

                        <Modal
                          open={open2}
                          onClose={() => setOpen2(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{ opacity: 0.3 }}
                        >
                          <Box sx={modal.edit}>
                            <Box sx={{ margin: "auto 42%" }}>
                              <WarningAmberIcon sx={{ fontSize: 50 }} />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Typography sx={{ p: 1, ml: 3, mb: 2 }} variant="p">
                              {" "}
                              Do you want to edit this Category ?{" "}
                            </Typography>

                            <div>
                              <input
                                style={{
                                  padding: 8,
                                  height: 40,
                                  width: 340,
                                  margin: 30,
                                }}
                                id="outlined-basic"
                                onChange={(e) => setCat(e.target.value)}
                                value={cat}
                                placeholder="Category Name"
                                // label="category"
                                // variant="outlined"
                              />
                              {/* error={cat === ""}
                                                             helperText={cat === "" ? 'Empty field!' : ' '} */}
                              <label htmlFor="upload-button-file">
                                <input
                                  accept="image/*"
                                  id="upload-button-file"
                                  multiple
                                  type="file"
                                  onChange={imageHandler}
                                  style={{ display: "none" }}
                                />
                                <Button
                                  variant="contained"
                                  component="span"
                                  startIcon={<UploadFileIcon color="#fff" />}
                                  sx={{
                                    m: 3.5,
                                    bgcolor: "#76ba1b",
                                    color: "#ffff",
                                    "&:hover": {
                                      bgcolor: "success",
                                    },
                                  }}
                                  style={modal.btn}
                                >
                                  Select Image
                                </Button>
                              </label>
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
                                onClick={() => setOpen2(false)}
                              >
                                cancel
                              </Button>
                              <Button
                                variant="contained"
                                disabled={selectedFile ? false : true}
                                sx={{ color: "#ffff", bgcolor: "#76ba1b" }}
                                onClick={update}
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
