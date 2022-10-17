import React, { useEffect, useState } from 'react';
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
import { CircularIndeterminate, APIDATA, PageTitle, AnouncementUrl } from '../../Constant';
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
        width: '30%',
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
    img: {
        width: '80px',
        display: 'block',
        maxWidth: '100%',
        height: '60px',
        marginLeft: '0.625rem'
    },
});

const Valuelist = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [time, setTime] = useState('')
    const [pushID, setPushID] = useState(null)
    const [pushData, setPushData] = useState([])
    const [loading, setLoading] = useState(0)
    const [show, setShow] = useState(null)




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const navigate = useNavigate();

    useEffect(() => {
        const getPush = async () => {
            await axios
                .get(`${APIDATA}list/announcement`)
                .then((res) => setPushData(res.data.data))
                .catch((err) => console.log(err));
        };

        getPush();
    }, [loading]);



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


    const deleted = () => {
        const remove = new FormData()

        remove.append('id', pushID)

        axios({
            method: 'POST',
            url: `${APIDATA}delete/announcement`,
            data: remove,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {

                if (res.data.status) {
                    toast.success('Anouncement deleted', {
                        position: 'top-right'
                    })
                    setOpen(false)
                    setLoading(prev => prev + 1)
                }
            })
            .catch(err => console.log(err))


    }


    console.log(pushID)
    console.log(show)
    return (
        <Container>
            <Stack
                spacing={2}
                direction={{ sx: "column", md: "row" }}
                alignItems="center"
                sx={{ justifyContent: 'space-between' }}
            >
                <PageTitle title="Announcement List" />
                <Button
                    onClick={() => navigate('/valueads')}
                    variant="contained"
                    className={css(styles.btn)}

                >
                    Create Announcement
                </Button>
            </Stack>
            <TableContainer component={Paper} className={css(styles.tableContainer)}>
                <Table aria-label="notifications">
                    <TableHead className={css(styles.thead)}>
                        <TableRow>
                            <TableCell className={css(styles.tcell)}>Image</TableCell>
                            <TableCell className={css(styles.tcell)} align="center">
                                Anouncement
                            </TableCell>
                            <TableCell className={css(styles.tcell)} align="center">
                                Link
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
                                <TableCell align="left">
                                    <img
                                        src={`${AnouncementUrl}${item.image}`}
                                        alt="error"
                                        className={css(styles.img)}
                                    />

                                </TableCell>
                                <TableCell align="center">{item.announcement}</TableCell>
                                <TableCell align="center">{item.action}</TableCell>
                                <TableCell align="center">


                                    <Tooltip title='Delete'>
                                        <IconButton onClick={() => {
                                            setOpen(true)
                                            setPushID(item.id)
                                            setShow(item)
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
                                                Do you want to delete this Announcement?{" "}
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

export default Valuelist;
