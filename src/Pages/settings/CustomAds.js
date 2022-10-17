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

const APIDATAA = `${BASE_URL}api/v3/get/all/commercial`;

export default function AdminList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [image, setImage] = useState();
  const [reload, setReload] = useState(0);

  const [priority, setPriority] = useState("");
  const [read, setRead] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(undefined);
  const [url, setUrl] = useState("");
  const [des, setDes] = useState("");

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
        .get(`${APIDATAA}`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [reload]);

  const verify = () => {
    const formDatas = new FormData();

    formDatas.append("id", pushId);
    axios({
      method: "POST",
      url: `${APIDATA}delete/commercial`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.success("Custom Advert Created", {
            position: "top-right",
          });
          setOpen(false);
          setReload((prev) => prev + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  //update commercial

  const onSubmit = () => {
    if (priority === "" || read === undefined || url === "" || des === "") {
      toast.error("All fields are required", {
        position: "top-right",
      });
    } else {
      const formDatas = new FormData();

      formDatas.append("image", read);
      formDatas.append("id", pushId);
      formDatas.append("action", url);
      formDatas.append("type", "custom");
      formDatas.append("priority", priority);
      formDatas.append("description", des);

      axios({
        method: "POST",
        url: `${APIDATA}update/commercial`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            toast.success("Custom Commercial Updated", {
              position: "top-right",
            });

            setRead();
            setPreview(undefined);
            setUrl("");
            setDes("");
            setPriority("");
            setOpen3(false);
            setReload((prev) => prev + 1);
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
      width: "80%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,

      maxWidth: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5%",
    },
  };

  const btn = {
    border: "none",
    position: "relative",
    top: -30,

    borderRadius: "5px",
    textTransform: "capitalize",
  };

  const imgStyle = {
    width: "130px",
    display: "block",
    maxWidth: "100%",
    height: "60px",
    marginLeft: "0.625rem",
  };
  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Custom Ads List" variant="h4" component="h2" />
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
                <strong>Date</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Expiration</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Type</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Priority</strong>
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
                    <TableCell component="th" scope="row">
                      <img
                        src={`${BASE_URL}get/commercial/image/${row.image}`}
                        alt="error"
                        style={imgStyle}
                      />
                    </TableCell>
                    <TableCell>{moment(row.created_at).format("l")}</TableCell>
                    <TableCell>{moment(row.expired).format("l")}</TableCell>

                    <TableCell>{row.type}</TableCell>

                    <TableCell>{row.priority}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title="Edit Ad">
                          <IconButton
                            onClick={() => {
                              setPushId(row.id);
                              setOpen3(true);
                            }}
                          >
                            <Icons.EditOutlined sx={{ color: "blue" }} />
                          </IconButton>
                        </Tooltip>

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
                          opacity={0.3}
                        >
                          <Box sx={modal.edit}>
                            <Box sx={{ margin: "auto 42%" }}>
                              <Icons.WarningAmber sx={{ fontSize: 50 }} />
                            </Box>
                            <Divider sx={{ mb: 5 }} />

                            <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                              {" "}
                              Do you want to delete this Advert ?{" "}
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
                              src={`${BASE_URL}/get/custom/image/${image}`}
                              alt="image"
                              style={{ width: "100%" }}
                            />
                          </Box>
                        </Modal>

                        {/* update custom ads modal */}

                        <Modal
                          open={open3}
                          onClose={() => setOpen3(false)}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          opacity={0.2}
                        >
                          <Paper sx={modal.slide}>
                            <form>
                              <div
                                style={{ marginBottom: "5vh", display: "flex" }}
                              >
                                <div>
                                  <FormControl sx={{ width: 450, mb: 5 }}>
                                    <InputLabel id="demo-simple-select-label">
                                      Priority
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={priority}
                                      label="Priority"
                                      onChange={(e) =>
                                        setPriority(e.target.value)
                                      }
                                    >
                                      <MenuItem value="custom">Custom</MenuItem>
                                      <MenuItem value="xbooster">
                                        X-booster
                                      </MenuItem>
                                      <MenuItem value="2xbooster">
                                        XX-booster
                                      </MenuItem>
                                      <MenuItem value="3xbooster">
                                        XXX-booster
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    sx={{ mr: 5, mb: 5, width: 450 }}
                                    id="outlined-basic"
                                    label="Enter link address"
                                    // borderColor='green'
                                    type="text"
                                    onChange={(e) => setUrl(e.target.value)}
                                    value={url}
                                    variant="outlined"
                                  />
                                  <TextField
                                    sx={{ mr: 5, width: 450 }}
                                    id="outlined-basic"
                                    label="Description"
                                    // borderColor='green'
                                    type="text"
                                    onChange={(e) => setDes(e.target.value)}
                                    value={des}
                                    variant="outlined"
                                  />
                                </div>
                                <div style={{ ml: -7 }}>
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
                                      startIcon={
                                        <Icons.CloudUpload color="#fff" />
                                      }
                                      sx={{
                                        "&:hover": { backgroundColor: "green" },
                                        width: 150,
                                        height: 50,
                                        m: 3.5,
                                        bgcolor: "#76ba1b",
                                        color: "#ffff",
                                        // '&:hover': {
                                        //   bgcolor: 'success',
                                        // },
                                      }}
                                      style={btn}
                                    >
                                      Select Image
                                    </Button>
                                  </label>

                                  <Box>
                                    <div>
                                      {preview === undefined || "" ? (
                                        <Icons.Image
                                          style={{ fontSize: "13vw" }}
                                        />
                                      ) : (
                                        <img
                                          src={preview}
                                          alt="ajebuta"
                                          style={{
                                            width: 200,
                                          }}
                                        />
                                      )}
                                    </div>
                                  </Box>
                                </div>
                              </div>

                              <div style={{ margin: "auto 13%" }}>
                                <Button
                                  variant="contained"
                                  style={{
                                    position: "relative",
                                    left: "11vw",
                                    margin: 10,
                                    width: "20vw",
                                    backgroundColor: colors.bellefuGreen,
                                  }}
                                  onClick={onSubmit}
                                >
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Paper>
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
