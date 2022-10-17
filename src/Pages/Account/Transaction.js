import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import moment from "moment";
import {
  Paper,
  Typography,
  OutlinedInput,
  Box,
  Toolbar,
  InputAdornment,
  FormControl,
  TablePagination,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons

import * as Icons from "@mui/icons-material";

import { PageTitle, CircularIndeterminate, APIDATA } from "../../Constant";
import axios from "axios";

import { toast } from "react-toastify";

export default function AdminList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [program, setProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pushId, setPushId] = useState(null);
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState(null);
  const [des, setDes] = useState(null);
  const [target, setTarget] = useState(null);

  const oweiTime = time.toISOString();
  const navigate = useNavigate();
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
        .get(`${APIDATA}list/transaction`)
        .then((res) => setProgram(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, []);

  const formstyle = {
    position: "relative",
    left: "38vw",
  };

  const deletestyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const onSubmit = () => {
    if (title === null || des === null) {
      setTitle("");
      setDes("");
      setTarget("");

      toast.error("All fields are required", {
        position: "top-center",
      });
    } else {
      const formDatas = new FormData();

      formDatas.append("time", oweiTime);
      formDatas.append("title", title);
      formDatas.append("target", target);
      formDatas.append("id", pushId);
      formDatas.append("description", des);

      axios({
        method: "POST",
        url: `${APIDATA}notification/update`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      setOpen(false);

      toast.success("Push Notification Updated", {
        position: "top-right",
      });
    }
  };

  const deleted = () => {
    const formDatas = new FormData();

    formDatas.append("id", pushId);

    axios({
      method: "POST",
      url: `${APIDATA}notification/delete`,
      data: formDatas,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    toast.error("Push Notification Deleted", {
      position: "top-right",
    });

    setOpen2(false);
  };
  const modalstyle = {
    width: 750,
    padding: "20px",
    margin: "auto 25%",
    position: "absolute",
    top: "10%",
  };
  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle title="Transaction" variant="h4" component="h2" />

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
                <strong>Date</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Product</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Type</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Method</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Amount</strong>
              </TableCell>

              <TableCell sx={{ color: "#ffff" }}>
                <strong>User</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ color: "#ffff" }}>
                <strong>Status</strong>
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
                      {moment(row.date).format("l")}
                    </TableCell>
                    <TableCell> {row.title}</TableCell>
                    <TableCell> {row.type} </TableCell>
                    <TableCell>Wallet</TableCell>
                    <TableCell>{row.total_amount}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell> {row.email} </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          borderRadius: 2,
                          textAlign: "center",
                          p: 0.5,
                          bgcolor: "#76ba1b",
                          color: "#ffff",
                        }}
                      >
                        Completed
                      </Typography>
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
