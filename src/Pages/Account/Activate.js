import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle, colors, APIDATA } from "../../Constant";
import { colorsUpdate } from "../../Features/LoginSlice";
import * as Icons from "@mui/icons-material";
import { toast } from "react-toastify";


import {
  Container,
  TextField,
  IconButton,
  Tooltip,
  InputLabel,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import axios from "axios";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Activate = (props) => {
    const dispatch=useDispatch();

    const closeModal=props.close
    const activeuser=props.active.id
const handleActivate=()=>{
    const formData = new FormData();

    formData.append("id", activeuser);
    formData.append("status", "active");

    axios({
      method: "POST",
      url: `${APIDATA}update/users `,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) =>{
       if( res.data.status === true){
        toast.success("User Activated", {
          position: "top-center",
        });
        dispatch(colorsUpdate(res.data.data.status));
        closeModal();
       }else{
        toast.error("User not Activated", {
          position: "top-center",
        });
       }}
      )
      .catch((err) =>
        toast.error("Check Your network connection", {
          position: "top-center",
        })
      );
    }




  //   console.log(userdataholder);
  return (
    <Container sx={{ width: "100%" }}>
      <div
        style={{
          height: 200,        
        }}
      >
        <h3 style={{textAlign:"center"}}>Are You sure you want to Activate this User?</h3>
        <div 
        style={{justifyContent:"space-between",display:"flex"}}>
          <Button
            onClick={handleActivate}
            style={{
              backgroundColor: colors.bellefuGreen,
            }}
            variant="contained"
            size="large"
          >
            yes
          </Button>
          <Button
            onClick={()=>closeModal()}
            style={{
              backgroundColor: "red",
            }}
            variant="contained"
            size="large"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Activate;
