import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../../Loader";
import moment from "moment";

import { loginStatus } from "../../Features/LoginSlice";
import { useDispatch, useSelector } from "react-redux";

import UserData from "./UserData";
import Activate from "./Activate";
import Deactivate from "./Deactivate";

import Modal from "@mui/material/Modal";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  ClickAwayListener,
  InputLabel,
  Select,
  Paper,
  Fade,
  Typography,
  TextField,
  MenuItem,
  OutlinedInput,
  Box,
  Toolbar,
  InputAdornment,
  FormControl,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons

import * as Icons from "@mui/icons-material";

import {
  PageTitle,
  CircularIndeterminate,
  APIDATA,
  BASE_URL,
} from "../../Constant";
import axios from "axios";

import { toast } from "react-toastify";

export default function AdminList() {
  const statusChange = useSelector(loginStatus);
  console.log(statusChange.userStatus);
  const [lolo1, setLolo1] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState([]);
  const [userholder, setUserholder] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState(null);
  const [des, setDes] = useState(null);
  const [target, setTarget] = useState(null);
  const [userdataholder, setUserdataholder] = useState("");

  const [activeuserid, setActiveuserid] = useState("");
  const [inactiveuserid, setInactiveuserid] = useState("");

  //   Modal states
  const [modalopen, setModalopen] = useState(false);
  const [modalopen2, setModalopen2] = useState(false);
  const [modalopen3, setModalopen3] = useState(false);

  const handleOpen1 = (event) => {
    setModalopen(true);
    setUserdataholder(event);
  };
  const handleClose2 = () => setModalopen(false);

  const handleOpen2 = (event) => {
    setModalopen2(true);
    setActiveuserid(event);
  };
  const handleClose3 = () => setModalopen2(false);

  const handleOpen3 = (event) => {
    setModalopen3(true);
    setInactiveuserid(event);
  };
  const handleClose4 = () => setModalopen3(false);

  // filter states
  const [countrys, setCountrys] = useState("");
  const [countrylists, setCountrylists] = useState(null);

  const [filterresults1, setFilterresults1] = useState("");
  const [filterresults, setFilterresults] = useState("");

  const [selectstatus, setSelectstatus] = useState(true);

  const handleFilter1 = (e) => {
    setFilterresults1(e.target.value);

    setProgram(
      !e.target.value
        ? program
        : program.filter((person) =>
            person.first_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          )
    );
  };

  const handleShowall = (e) => {
    setCountrys(e.target.value);

    setProgram(e.target.value === "Show all" ? userholder : userholder);
  };

  const handleFilter = (e) => {
    setFilterresults(e.target.value);

    setProgram(
      countrys === "Show all"
        ? program
        : program?.filter((data) => {
            return data.country === e.target.value;
          })
    );
  };

  // #####################
  const [loader, setLoader] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const openFilter = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const oweiTime = time.toISOString();
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   console.log(program)
  // useEffect calls###########################
  useEffect(() => {
    setLolo1(statusChange.userStatus);
  }, []);
  useEffect(() => {
    setLoader(true);
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}list/users`)
        .then((res) => {
          setProgram(res.data);
          setUserholder(res.data);
        })
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  useEffect(() => {
    const getcountries = async () => {
      await axios
        .get(`${APIDATA}list/country`)
        .then((res) => setCountrylists(res.data.data))
        .catch((err) => console.log(err));
    };

    getcountries();
  }, []);

  // ########################################

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="User List" variant="h4" component="h2" />

        <Button
          variant="outlined"
          color="success"
          id="fade-button"
          aria-controls={openFilter ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openFilter ? "true" : undefined}
          onClick={handleClick}
        >
          <FilterListIcon />
          Filter
        </Button>
        {anchorEl ? (
          <ClickAwayListener
            onClickAway={handleClose}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <Paper
              sx={{
                position: "absolute",
                top: "8%",
                right: 0,
                left: "30%",
                zIndex: 1,
                width: 600,
              }}
              open={openFilter}
              onClose={handleClose}
              anchorEl={anchorEl}
              TransitionComponent={Fade}
              id="fade-menu"
            >
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  left: "13%",
                  margin: 2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={countrys}
                    label="Gender"
                    size="small"
                    onChange={handleShowall}
                    sx={{ width: "50%" }}
                  >
                    <MenuItem value={"Show all"}>
                      <em>Show-all</em>
                    </MenuItem>
                    <MenuItem value={1}>Countries</MenuItem>
                    <MenuItem value={2}>Names</MenuItem>
                  </Select>
                </FormControl>
                {countrys === 2 ? (
                  <TextField
                    id="outlined-basic"
                    label="search"
                    value={filterresults1}
                    variant="outlined"
                    sx={{ width: "50%", position: "relative", right: "15%" }}
                    size="small"
                    onChange={handleFilter1}
                  />
                ) : countrys === 1 ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Results
                    </InputLabel>
                    <Select
                      disabled={countrys === "" ? true : false}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterresults}
                      label="Gender"
                      size="small"
                      onChange={handleFilter}
                      sx={{ width: "70%" }}
                    >
                      {countrylists?.map((list, index) => (
                        <MenuItem key={index} value={list.name}>
                          {list.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
              </Box>
            </Paper>
          </ClickAwayListener>
        ) : null}
        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            sx={{ height: 35, borderRadius: 4 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <Icons.Search />
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
      </Box>

      <Toolbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#76ba1b" }}>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Avatar</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>name</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Sex</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Country</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Joined</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {program === null ? (
              <Loader isLoading={loader} />
            ) : program.length === 0 ? (
              console.log()
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
                        src={`${BASE_URL}get/user/images/${row.avatar}`}
                        style={{ width: 80, height: 80 }}
                        alt="Error"
                      />
                    </TableCell>
                    <TableCell> {row.first_name} </TableCell>
                    <TableCell> {row.email}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          borderRadius: 2,
                          mb: 0.4,
                          textAlign: "center",
                          p: 0.5,
                          bgcolor: [row.status === "active" ? "orange" : "red"],
                          color: "#ffff",
                        }}
                      >
                        {row.status}
                      </Typography>
                      <Typography
                        sx={{
                          borderRadius: 2,
                          textAlign: "center",
                          p: 0.5,
                          bgcolor: [row.verified === 0 ? "#76ba1b" : "red"],
                          color: "#ffff",
                        }}
                      >
                        {row.verified === 0 ? "verified" : "Unverified"}
                      </Typography>
                    </TableCell>
                    <TableCell>{moment(row.joined).format("l")}</TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title="View">
                          <IconButton onClick={() => handleOpen1(row)}>
                            <Icons.RemoveRedEyeOutlined />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Activate">
                          <IconButton onClick={() => handleOpen2(row)}>
                            <Icons.LockOpenOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deactivate">
                          <IconButton onClick={() => handleOpen3(row)}>
                            <Icons.LockOutlined />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                          //   onClick={() => {
                          //       setPushId(row.id)
                          //       setOpen2(true)
                          //   }}
                          >
                            <Icons.DeleteOutline />
                          </IconButton>
                        </Tooltip>
                        <Modal
                          sx={{ opacity: 0.25 }}
                          open={modalopen}
                          onClose={handleClose2}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Paper
                            sx={{
                              width: "30%",
                              height: "70%",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              bgcolor: "background.paper",
                              boxShadow: 24,
                              p: 2,
                              borderRadius: 8,
                            }}
                          >
                            <UserData userdataholder={userdataholder} />
                          </Paper>
                        </Modal>
                        <Modal
                          sx={{ opacity: 0.25 }}
                          open={modalopen2}
                          onClose={handleClose3}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Paper
                            sx={{
                              width: "30%",
                              height: "30%",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              bgcolor: "background.paper",
                              boxShadow: 24,
                              p: 2,
                              borderRadius: 8,
                            }}
                          >
                            <Activate
                              close={handleClose3}
                              active={activeuserid}
                            />
                          </Paper>
                        </Modal>
                        <Modal
                          sx={{ opacity: 0.25 }}
                          open={modalopen3}
                          onClose={handleClose4}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Paper
                            sx={{
                              width: "30%",
                              height: "30%",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              bgcolor: "background.paper",
                              boxShadow: 24,
                              p: 2,
                              borderRadius: 8,
                            }}
                          >
                            <Deactivate
                              close={handleClose4}
                              inactive={inactiveuserid}
                            />
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
