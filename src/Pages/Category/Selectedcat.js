import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import {
    Paper,
    // Fade,

    Modal,
    Box,
    Toolbar,
    Button,
    TablePagination,
    IconButton,
    Tooltip,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// icons

import * as Icons from '@mui/icons-material'



import { PageTitle, CircularIndeterminate, APIDATA } from "../../Constant"
import axios from "axios";
import { useSelector } from 'react-redux'
import { loginStatus } from "../../Features/LoginSlice";




export default function Selectedcat() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [program, setProgram] = useState(null)
    const [open, setOpen] = useState(false)





    const catId = useSelector(loginStatus)


    console.log(catId.category_id)

    const navigate = useNavigate()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        const getprogram = async () => {
            await axios.get(`${APIDATA}list/sub-category/${catId.category_id}`)
                .then(res => setProgram(res.data.data))
                .catch(err => console.log(err))
        }

        getprogram()
    }, [])



    return (
        <Box>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PageTitle title="sub-Category" variant="h6" component="h2" />
                <Button onClick={() => navigate(-1)}><Icons.ArrowBack /></Button>



            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#76ba1b' }}>

                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Subcategories</strong>
                            </TableCell >
                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Products Count</strong>
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
                                        {row.name}

                                    </TableCell>
                                    <TableCell >{row.products}</TableCell>



                                    <TableCell >
                                        <Box >

                                            <Tooltip title='View'>
                                                <IconButton

                                                >
                                                    <Icons.DeleteOutline />
                                                </IconButton>
                                            </Tooltip>
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

