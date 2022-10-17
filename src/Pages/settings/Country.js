
import { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import {
    Paper, Switch, TableRow,
    // Fade,
    // Typography,
    TextField,
    Box, TableHead, TableBody,
    Toolbar, TableContainer,
    TableCell, 
    TablePagination, Table,
    FormControlLabel,
    Typography
} from "@mui/material";

import { useState, useEffect } from "react";

import { colors, PageTitle, APIDATA } from "../../Constant"
import Loader from "../../Loader"
import axios from "axios";

//import { toast } from "react-toastify";



export default function AdminList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [program, setProgram] = useState(null)
    const [initialPro, setInitialPro] = useState([])

    const [filter, setFilter] = useState('')
    const [isLoading, setIsLoading] = useState(false)






    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const changeStatus = async (id, status) => {
        let response,
        updateId,
        newProgram;

        try {
            //setIsLoading(true);
            response = await axios.post(`${APIDATA}enable/country`, { id, status });

            if (response.data.status) {
                updateId = program.findIndex(pro => pro.id === id);
                newProgram = [...program];
                if (newProgram[updateId].enabled) newProgram[updateId] = { ...newProgram[updateId], enabled: false };
                else newProgram[updateId] = { ...newProgram[updateId], enabled: true };
                setProgram(newProgram);
            }
        } catch (error) {
            console.log(`Error enabling country due to: ${error.message}`);
            setProgram(program);
        }
    };
    const onFilter = (evt) => {
        setFilter(evt.target.value);
        const input = evt.target.value.toLocaleLowerCase();
        if (input) {
            const filteredProgram = initialPro.filter(singlePro => {
                return singlePro.name.toLocaleLowerCase().includes(input);
            });
            setProgram(filteredProgram);
        } else {
            setProgram(initialPro);
        }
    }

    useEffect(() => {

        const getprogram = async () => {
            setIsLoading(true);
            await axios.get(`${APIDATA}list/country`)
                .then(res => {
                    setIsLoading(false);
                    setProgram(res.data.data);
                    setInitialPro(res.data.data);
                })
                .catch(err => console.log(err))
        }

        getprogram()
    }, [])












    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));






    return (
        <Box>
            { !isLoading? 
            <Fragment>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PageTitle title="Country" variant="h4" component="h2" />
                <TextField
                    sx={{ m: 1, width: '30ch' }} 
                    variant="outlined"
                    id="filled-search"
                    label="filter country"
                    type="input"
                    value={filter}
                    onChange={onFilter}
                />

            </Box>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#76ba1b' }}>

                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Code</strong>
                            </TableCell >
                            <TableCell sx={{ color: '#ffff' }} >
                                <strong>Country</strong>
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
                        {program?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.iso2}

                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell >
                                        {row.enabled ? <Typography sx={{ color: 'white', borderRadius: '5px', textAlign: 'center', width: '7vw', padding: '3px', bgcolor: 'green' }}>Enabled</Typography> :
                                            <Typography sx={{ color: 'white', borderRadius: '5px', textAlign: 'center', width: '7vw', padding: '3px', bgcolor: 'red' }}>Disabled</Typography>}
                                    </TableCell>

                                    <TableCell >
                                        <FormControlLabel
                                            control={row.enabled ? <IOSSwitch sx={{ m: 1 }} defaultChecked /> : <IOSSwitch sx={{ m: 1 }} />}
                                            onChange={row.enabled ? () => { changeStatus(row.id, 0) } : () => { changeStatus(row.id, 1) }}
                                            label=""
                                        />
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
            </Fragment> : <Loader isLoading={isLoading} />
        }
        </Box>
    );
}

