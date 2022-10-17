import React, { useState } from 'react';
import {
  Table, Tooltip,
  Button, TextField,
  Container, Modal,
  Stack, Divider,
  TableBody, Box,
  TableCell, Typography,
  TableContainer,
  TableHead, Backdrop,
  TableRow, Fade,
  Paper, TablePagination,
  IconButton,
} from '@mui/material';
import { StyleSheet, css } from 'aphrodite';
import { CircularIndeterminate, APIDATA, PageTitle } from '../../Constant';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import axios from 'axios'
import { toast } from 'react-toastify'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FFA500',
    fontWeight: 'bold',
    width: '20%',
  },
  tableContainer: {
    marginTop: '3rem',
  },

  thead: {
    backgroundColor: '#76BA1B',
    fontWeight: 'bold',
  },
  tcell: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const PushNotification = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [title, setTitle] = useState('')
  const [des, setDes] = useState('')
  const [time, setTime] = useState('')
  const [pushID, setPushID] = useState(null)
  const [pushData, setPushData] = useState([

    {
      id: 1,
      title: 'Thank You',
      description: 'Lorem cujodja mula nu ogi faloa to mua tonus',
      time: '23/2/2022'
    },
    {
      id: 2,
      title: 'Thank You',
      description: 'Lorem cujodja mula nu ogi faloa to mua tonus',
      time: '23/2/2022'
    },
    {
      id: 3,
      title: 'Thank You',
      description: 'Lorem cujodja mula nu ogi faloa to mua tonus',
      time: '23/2/2022'
    },
    {
      id: 4,
      title: 'Thank You',
      description: 'Lorem cujodja mula nu ogi faloa to mua tonus',
      time: '23/2/2022'
    },
  ]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const navigate = useNavigate();

  // useEffect(() => {
  //   const getPush = async () => {
  //     await axios
  //       .get(`${APIDATA}get/all/notification`)
  //       .then((res) => setPushData(res.data.data))
  //       .catch((err) => console.log(err));
  //   };

  //   getPush();
  // }, []);



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
    main: {
      width: 750,
      margin: 'auto 4%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      boxShadow: 24,
      p: 4,

    }
  };

  const handleUpdate = () => {
    if (des === '' || title === '') {
      toast.error('All fields are required', {
        position: 'top-right'
      })
    } else {
      const form = new FormData()

      form.append('id', pushID)
      form.append('title', title)
      form.append('description', des)
      form.append('schedule', time)

      axios({
        method: 'POST',
        url: `${APIDATA}update/notification`,
        data: form,
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))

      toast.error('Notification deleted', {
        position: 'top-right'
      })
      setOpen2(false)
      window.location.reload(false)




    }

  }

  const deleted = () => {
    const remove = new FormData()

    remove.append('id', pushID)

    axios({
      method: 'POST',
      url: `${APIDATA}delete/notification`,
      data: remove,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    toast.error('Notification deleted', {
      position: 'top-right'
    })
    setOpen(false)
    window.location.reload(false)

  }



  return (
    <Container>
      <Stack
        spacing={2}
        direction={{ sx: "column", md: "row" }}
        alignItems="center"
        sx={{ justifyContent: 'space-between' }}
      >
        <PageTitle title="Push Notifications" />
        <Button
          onClick={() => navigate('/createpush')}
          variant="contained"
          className={css(styles.btn)}

        >
          Create New
        </Button>
      </Stack>
      <TableContainer component={Paper} className={css(styles.tableContainer)}>
        <Table aria-label="notifications">
          <TableHead className={css(styles.thead)}>
            <TableRow>
              <TableCell className={css(styles.tcell)}>Title</TableCell>
              <TableCell className={css(styles.tcell)} align="center">
                Description
              </TableCell>
              <TableCell className={css(styles.tcell)} align="center">
                Date
              </TableCell>
              <TableCell className={css(styles.tcell)} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pushData?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.time}</TableCell>
                <TableCell align="center">
                  <Tooltip title='Update'>
                    <IconButton onClick={() => {
                      setOpen2(true)
                      setPushID(item.id)
                    }}
                    >
                      <ModeEditOutlinedIcon sx={{ color: 'blue' }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Delete'>
                    <IconButton onClick={() => {
                      setOpen(true)
                      setPushID(item.id)
                    }}>
                      <DeleteOutlinedIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Tooltip>

                  {/* Delete Modal starts here */}
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  // sx={{ opacity: 0.4 }}
                  >
                    <Box sx={modal.edit}>
                      <Box sx={{ margin: "auto 42%" }}>
                        <WarningAmberIcon sx={{ fontSize: 50 }} />
                      </Box>
                      <Divider sx={{ mb: 5 }} />

                      <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                        {" "}
                        Do you want to delete this notification?{" "}
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

                          sx={{ color: "grey" }}
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
                  {/* Update Modal starts here */}


                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open2}
                    // sx={{ opacity: 0.3 }}
                    onClose={() => setOpen2(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 200,
                    }}
                  >

                    {/* <Fade in={() => setOpen2(true)}> */}



                    <Paper sx={modal.main}>
                      <form>

                        <div style={{ marginBottom: '5vh', }} >
                          <TextField
                            sx={{ mr: 5, width: 700 }}
                            id="outlined-basic"
                            label="Notification Title"

                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={title}
                            variant="outlined" />


                        </div>
                        <div style={{ marginBottom: '5vh', }} >
                          <TextField
                            sx={{ mr: 5, width: 700 }}
                            id="outlined-basic"
                            label="Description"

                            onChange={(e) => setDes(e.target.value)}
                            defaultValue={des}
                            variant="outlined" />
                        </div>


                        <div style={{ marginBottom: "10%" }}>

                          <label>Schedule Time <br />
                            <input
                              style={{ padding: '10px' }}
                              type='datetime-local'
                              value={time}
                              onChange={(e) => {
                                setTime(e.target.value)
                              }
                              } /></label>




                        </div>

                        <Button onClick={handleUpdate} color='success' variant="contained">Update</Button>
                      </form>
                    </Paper>
                    {/* </Fade> */}


                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={pushData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default PushNotification;
