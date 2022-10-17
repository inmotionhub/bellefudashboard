import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TablePagination,
  TableFooter,
  Tooltip,
  TableHead,
  Divider,
  TableRow,
  Typography,
  Paper,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { StyleSheet, css } from "aphrodite";
import { CircularIndeterminate, APIDATA, BASE_URL } from "../../../Constant";
import axios from "axios";
import { toast } from "react-toastify";

const slideview = `${BASE_URL}get/sliders/image/`;
const styles = StyleSheet.create({
  tcell: {
    color: "#FCFFF9",
    fontWeight: "bold",
    width: "33.33%",
  },
  img: {
    width: "130px",
    display: "block",
    maxWidth: "100%",
    height: "60px",
    marginLeft: "0.625rem",
  },
});

const FilesUploadedTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [upload, setUpload] = useState(null);
  const [open, setOpen] = useState(false);
  const [slideId, setSlideId] = useState(null);
  const [reload, setReload] = useState();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getprogram = async () => {
      await axios
        .get(`${APIDATA}sliders/list`)
        .then((res) => setUpload(res.data.data))
        .catch((err) => console.log(err));
    };

    getprogram();
  }, [reload]);

  const remove = () => {
    const deleted = new FormData();
    deleted.append("image_name", slideId);

    axios({
      method: "POST",
      url: `${APIDATA}sliders/delete`,
      data: deleted,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setReload((prev) => prev + 1);
          setOpen(false);
          toast.success("Slider deleted", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const edit = {
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
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "3rem" }}>
      <Table aria-label="files upload table">
        <TableHead
          sx={{
            bgcolor: "#76BA1B",
            height: "20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            <TableCell variant="head" className={css(styles.tcell)}>
              Image
            </TableCell>
            <TableCell variant="head" className={css(styles.tcell)}>
              Name
            </TableCell>
            <TableCell variant="head" className={css(styles.tcell)}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upload === null ? (
            <CircularIndeterminate />
          ) : (
            upload
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((file) => (
                <TableRow
                  key={file.id}
                  sx={{
                    borderRadius: "10px",
                    height: "20px",
                    [`& .MuiTableCell-body`]: {
                      bgcolor: "#F9FDF5",
                      padding: "0.5rem",
                      marginTop: "0.3rem",
                      marginBottom: "0.31rem",
                    },
                  }}
                >
                  <TableCell variant="body">
                    <img
                      src={`${slideview}${file}`}
                      alt="error"
                      className={css(styles.img)}
                    />
                  </TableCell>
                  <TableCell variant="body">{file}</TableCell>
                  <TableCell variant="body">
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setSlideId(file);
                          setOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    <Modal
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      sx={{ opacity: 0.5 }}
                    >
                      <Box sx={edit}>
                        <Box sx={{ margin: "auto 42%" }}>
                          <WarningAmberIcon sx={{ fontSize: 50 }} />
                        </Box>
                        <Divider sx={{ mb: 5 }} />

                        <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                          {" "}
                          Do you want to delete this slider ?{" "}
                        </Typography>

                        <Divider sx={{ mt: 5, mb: 5 }} />
                        <Box
                          sx={{
                            mt: 5,
                            display: "flex",
                            bgColor: "grey",
                            justifyContent: "space-between",
                            m: 4,
                            mb: 5,
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ bgcolor: "#76ba1b" }}
                            onClick={() => setOpen(false)}
                          >
                            cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={remove}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={upload?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default FilesUploadedTable;
