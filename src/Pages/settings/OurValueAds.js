import React from "react";
import { PageTitle, colors, APIDATA } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button, Paper ,Grid, Typography} from "@mui/material";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

import * as Icons from "@mui/icons-material";
import {
    Toolbar,
    Button,
    Paper,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function CreateCategory() {


    const [title, setTitle] = useState('');
    const [read, setRead] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(undefined);
    const [url, setUrl] = useState('')




    const navigate = useNavigate()


    const onSubmit = () => {
        if (title === undefined || read === undefined) {

            toast.error('All fields are required', {
                position: 'top-right'
            })
        } else {

            const formDatas = new FormData()

            formDatas.append('announcement', title)
            formDatas.append('image', read)
            formDatas.append('action', url)
            formDatas.append('show', true)

            axios({
                method: 'POST',
                url: `${APIDATA}add/announcement`,
                data: formDatas,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(res => {
                    if (res.data.status) {

                        toast.success('Anouncement uploaded', {
                            position: 'top-right'
                        })
                        setTitle('')
                        setRead()
                        setPreview(undefined)
                        setUrl('')

                    }
                })
                .catch(err => console.log(err))



        }
    }


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


    const style = {
        position: "relative",
        top: 220,
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        bgcolor: "background.paper",

        borderRadius: 5,
        p: 4,
    }
    const btn = {
        border: 'none',
        position: "relative",
        top: -30,

        borderRadius: '5px',
        textTransform: 'capitalize',
    }


    return (
        <div>
            <Button
                sx={{ mt: -5, mb: 5, width: '10%', backgroundColor: colors.primary, color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', borderRadius: '5px' }}
                onClick={() => navigate('/valuelist')}
            >
                <Icons.ArrowBack />
            </Button>
            <PageTitle title="Our Value Ads" />
            <Toolbar />
            <div >
                {/* <Paper sx={{ width: 300, padding: "20px", margin: "auto 4%" }}> */}
                <Box >
                    <Paper sx={style}>
                        <form>
                            <div style={{ marginBottom: "5vh", display: "flex" }}>
                                <div>
                                    <TextField
                                        sx={{ mr: 5, mb: 5, width: 450 }}
                                        id="outlined-basic"
                                        label="Enter Anouncement"
                                        // borderColor='green'
                                        type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        variant="outlined"
                                    />
                                    <TextField
                                        sx={{ mr: 5, width: 450 }}
                                        id="outlined-basic"
                                        label="Enter link address"
                                        // borderColor='green'
                                        type="text"
                                        onChange={(e) => setUrl(e.target.value)}
                                        value={url}
                                        variant="outlined"
                                    />


                                </div>
                                <label htmlFor="upload-button-file">
                                    <input
                                        accept="image/*"
                                        id="upload-button-file"
                                        multiple
                                        type="file"
                                        onChange={imageHandler}
                                        style={{ display: 'none' }}
                                    />


                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<Icons.CloudUpload color="#fff" />}
                                        sx={{
                                            "&:hover": { backgroundColor: 'green' },
                                            width: 300,
                                            height: 60,
                                            m: 3.5,
                                            bgcolor: '#76ba1b',
                                            color: '#ffff',
                                            // '&:hover': {
                                            //   bgcolor: 'success',
                                            // },
                                        }}
                                        style={btn}
                                    >
                                        Select Image
                                    </Button>
                                </label>
                            </div>

                            <div style={{ margin: 'auto 13%' }}>
                                <Box>
                                    <div style={{ position: "relative", left: "15vw" }}>
                                        {preview === undefined || "" ? (
                                            <Icons.Image style={{ fontSize: "13vw" }} />
                                        ) : (
                                            <img
                                                src={preview}
                                                alt="ajebuta"
                                                style={{
                                                    width: 200,
                                                    position: "relative",
                                                    left: "4vw",
                                                }}
                                            />
                                        )}
                                    </div>
                                </Box>

                                <Button
                                    variant="contained"
                                    style={{ position: "relative", left: "11vw", margin: 10, width: "20vw", backgroundColor: colors.bellefuGreen }}
                                    onClick={onSubmit}
                                >
                                    Submit
                                </Button>
                            </div>

                        </form>


                    </Paper>
                    <Toolbar sx={{ mt: -5 }} />

                </Box>
                {/* </Paper> */}
            </div>
        </div>
    );
}
