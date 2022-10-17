import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import {
    Paper,
    Box, Divider,
    Toolbar, Typography,
    Button, TextareaAutosize,
    TablePagination,
    IconButton,
    Tooltip, Modal
} from "@mui/material";

import { useState, useEffect } from "react";
// icons
import moment from 'moment'
import * as Icons from '@mui/icons-material'



import { PageTitle, CircularIndeterminate, APIDATA } from "../../Constant"
import axios from "axios";

import { toast } from "react-toastify";

import SliderCompo from "./SliderCompo";

export default function AdminList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [program, setProgram] = useState(null)
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [pushId, setPushId] = useState(null)
    const [reason, setReason] = useState()
    const [image, setImage] = useState(null)
    const [reload, setReload] = useState(0)





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        const getprogram = async () => {
            await axios.get(`${APIDATA}verification/kyc/list`)
                .then(res => setProgram(res.data.data))
                .catch(err => console.log(err))
        }

        getprogram()
    }, [reload])



    const verify = () => {
        const formDatas = new FormData()

        formDatas.append('id', pushId)
        formDatas.append('status', 'completed')

        axios({
            method: 'POST',
            url: `${APIDATA}verify/user/id`,
            data: formDatas,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                if (res.data.status) {
                    setOpen3(false)
                    setReload(prev => prev + 1)
                    toast.success('User Verified', {
                        position: 'top-right'
                    })
                }
            })
            .catch(err => console.log(err))






    }


    const declined = () => {

        if (reason === undefined) {
            toast.error('Please enter reason', {
                position: 'top-right'
            })

        } else {

            const formMatters = new FormData()


            formMatters.append('id', pushId)
            formMatters.append('status', 'declined')
            formMatters.append('reason', reason)

            axios({
                method: 'POST',
                url: `${APIDATA}verify/user/id`,
                data: formMatters,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(res => {
                    if (res.data.status) {
                        setReload(prev => prev + 1)
                        setOpen(false)
                        toast.error('User Declined', {
                            position: 'top-right'
                        })
                    }
                })
                .catch(err => console.log(err))



        }


    }






    const modal = {
        edit: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 280,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3,
            paddingTop: 2
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

        }
    }




    return (
        <Box>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PageTitle title="KYC Verification" variant="h4" component="h2" />


            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#76ba1b' }}>

                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Date</strong>
                            </TableCell >
                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Username</strong>
                            </TableCell>
                            <TableCell sx={{ color: '#ffff' }}>
                                <strong>Email</strong>
                            </TableCell>
                            <TableCell sx={{ color: '#ffff' }}>
                                <strong>Status</strong>
                            </TableCell>
                            <TableCell sx={{ color: '#ffff' }}>
                                <strong>Action</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {program === null ? <CircularIndeterminate /> : program
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {moment(row.created_at).format('l')}

                                    </TableCell>
                                    <TableCell >{row.username}</TableCell>
                                    <TableCell >{row.email}</TableCell>
                                    <TableCell >
                                        {row.status === 'completed' ? <Typography sx={{ color: 'white', borderRadius: '5px', textAlign: 'center', width: '7vw', padding: '3px', bgcolor: 'green' }}>Completed</Typography> :
                                            row.status === 'pending' ? <Typography sx={{ color: 'white', borderRadius: '5px', textAlign: 'center', width: '7vw', padding: '3px', bgcolor: 'blue' }}>Pending</Typography> :
                                                <Typography sx={{ color: 'white', borderRadius: '5px', textAlign: 'center', width: '7vw', padding: '3px', bgcolor: 'red' }}>Declined</Typography>}
                                    </TableCell>
                                    <TableCell >
                                        <Box >
                                            <TableCell >
                                                <Box >

                                                    <Tooltip title='View documents'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setImage(row.value)
                                                                setPushId(row.id)
                                                                setOpen2(true)

                                                            }}
                                                        >
                                                            <Icons.RemoveRedEyeOutlined />
                                                        </IconButton>
                                                    </Tooltip>


                                                    <Tooltip title='Verify'>
                                                        <IconButton
                                                            onClick={() => {

                                                                setPushId(row.id)
                                                                setOpen3(true)

                                                            }}
                                                        >
                                                            <Icons.Verified sx={{ color: "#1D9BF0" }} />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title='Decline'>
                                                        <IconButton
                                                            onClick={() => {

                                                                setPushId(row.id)
                                                                setOpen(true)

                                                            }}
                                                        >
                                                            <Icons.HighlightOff sx={{ color: "red" }} />
                                                        </IconButton>
                                                    </Tooltip>


                                                    <Modal
                                                        open={open2}
                                                        onClose={() => setOpen2(false)}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    // sx={{ opacity: 0.3 }}
                                                    >
                                                        {/* <Paper
                                                    sx={modalstyle}
                                                > */}
                                                        <Box sx={modal.slide}>
                                                            <Carousel style={{ height: 100 }}>
                                                                <SliderCompo image={image} />
                                                            </Carousel>
                                                        </Box>
                                                    </Modal>

                                                    <Modal
                                                        open={open}
                                                        onClose={() => setOpen(false)}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    // sx={{ opacity: 0.3 }}
                                                    >
                                                        <Box sx={{ ...modal.edit, width: 450, height: 300 }}>
                                                            <Box sx={{ margin: 'auto 42%' }}>
                                                                <Icons.WarningAmber sx={{ fontSize: 50 }} />
                                                            </Box>
                                                            <Divider sx={{ mb: 2 }} />

                                                            <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p">
                                                                Why do you want to decline ?
                                                            </Typography>
                                                            <Toolbar sx={{ mt: -5 }} />

                                                            <TextareaAutosize
                                                                aria-label="minimum height"
                                                                minRows={5}

                                                                value={reason}
                                                                onChange={(e) => setReason(e.target.value)}
                                                                placeholder=" Reasons for verification decline "
                                                                style={{ width: 400, padding: 1, marginLeft: 23 }}
                                                            />

                                                            <Divider sx={{ mb: -2 }} />

                                                            <Box sx={{ mt: 5, display: "flex", justifyContent: 'space-between', m: 4, mb: 5 }}>
                                                                <Button variant="contained" onClick={() => setOpen(false)}>cancel</Button>
                                                                <Button color='error' variant="contained" onClick={declined} sx={{ color: '#ffff' }} >Decline</Button>
                                                            </Box>
                                                        </Box>
                                                    </Modal>


                                                    <Modal
                                                        open={open3}
                                                        onClose={() => setOpen3(false)}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    // sx={{ opacity: 0.3 }}
                                                    >
                                                        <Box sx={modal.edit}>
                                                            <Box sx={{ margin: 'auto 42%' }}>
                                                                <Icons.WarningAmber sx={{ fontSize: 50 }} />
                                                            </Box>
                                                            <Divider sx={{ mb: 5 }} />

                                                            <Typography sx={{ p: 1, ml: 3, mb: 6 }} variant="p"> Do you want to Verify this user ? </Typography>



                                                            <Divider sx={{ mt: 5, mb: 5 }} />
                                                            <Box sx={{ mt: 5, display: "flex", justifyContent: 'space-between', m: 4, mb: 5 }}>
                                                                <Button variant="contained" color='error' onClick={() => setOpen3(false)}>cancel</Button>
                                                                <Button variant="contained" onClick={verify} sx={{ color: '#ffff', bgcolor: '#76ba1b' }} >Verify</Button>
                                                            </Box>
                                                        </Box>
                                                    </Modal>





                                                </Box>
                                            </TableCell>

                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
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

