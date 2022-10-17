import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle, colors, APIDATA } from "../../Constant";
import {colorsUpdate } from "../../Features/LoginSlice";
import * as Icons from "@mui/icons-material";

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
import { toast } from "react-toastify";


const Deactivate = (props) => {
    const dispatch=useDispatch();
    const closeModal=props.close
    const deactiveuser=props.inactive.id

  const handleDeactivate=()=>{
    const formData = new FormData();

    formData.append("id", deactiveuser);
    formData.append("status", "inactive");

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
        toast.success("User Deactivated", {
          position: "top-center",
        });
        dispatch(colorsUpdate(res.data.data.status));
        closeModal();
       }else{
        toast.error("User not Deactivated", {
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






  return (
    <Container sx={{ width: "100%" }}>
      <div
        style={{
          height: 200,        
        }}
      >
        <h3 style={{textAlign:"center"}}>Are You sure you want to Deactivate this User?</h3>
        <div 
        style={{justifyContent:"space-between",display:"flex"}}>
          <Button
            onClick={handleDeactivate}
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

export default Deactivate;
