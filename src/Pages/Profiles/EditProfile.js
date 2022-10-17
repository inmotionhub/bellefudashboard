import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { PageTitle, colors, APIDATA, BASE_URL } from "../../Constant";
import { loginStatus, updateProfileDetails } from "../../Features/LoginSlice";

import {
  Container,
  TextField,
  InputLabel,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { IconButton } from "@mui/material";
import "./EditProfile.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";

const EditProfile = ({ setIsUpdating, setOpen }) => {
  let currUser = useSelector(loginStatus).profiles,
    dispatch = useDispatch(),
    [image, setImage] = useState({
      file: null,
      previewUrl: currUser.image_url,
    }),
    [imageChanged, setImageChanged] = useState(false),
    [fullName, setFullName] = useState(currUser.name),
    [phoneNumber, setPhoneNumber] = useState(currUser.phone),
    [email, setEmail] = useState(currUser.email),
    [isLoading, setIsLoading] = useState(false),
    [inputError, setInputError] = useState(false),
    validateInput = (data) => {
      if (!data) setInputError(true);
      if (data) setInputError(false);
    },
    previewImg = (evt) => {
      setImage({
        file: evt.target.files[0],
        previewUrl: URL.createObjectURL(evt.target.files[0]),
      });
      setImageChanged(true);
      validateInput(evt.target.files[0]);
    },
    uploadEdit = async () => {
      const formData = new FormData();

      if (!image.file) {
        //If Admin image not edited, convert image path to file object

        //Proxy server if environment is development, otherwise set the full url
        const url =
          process.env.NODE_ENV === "development"
            ? `admin/profile/${currUser.image_url}`
            : `${BASE_URL}admin/profile/${currUser.image_url}`;

        const response = await fetch(url);
        const arrBuff = await response.arrayBuffer(); //Get read response as array buffer
        const imgExt = currUser.image_url.match(/.\w+$/)[0].substring(1); //Get image extension
        const fileData = new File([arrBuff], currUser.image_url, {
          type: `image/${imgExt}`,
        });
        formData.append("image", fileData);
      }

      if (image.file) formData.append("image", image.file);

      formData.append("id", currUser.id);
      formData.append("name", fullName);
      formData.append("phone", phoneNumber);
      formData.append("email", email);

      try {
        setIsUpdating(true);
        setIsLoading(true);

        const response = await axios.post(`${APIDATA}update/admin`, formData);
        dispatch(updateProfileDetails(response.data.data));

        setIsUpdating(false);
        setIsLoading(false);
        setOpen(false);
      } catch (error) {
        console.log(`Error uploading the update due to: ${error.message}`);

        setIsUpdating(false);
        setOpen(false);
      }
    };

  return (
    <Container sx={{ width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="image-edit" className="container">
          <Box
            component="input"
            type="file"
            accept="image/*"
            id="image-edit"
            sx={{ display: "none" }}
            onChange={previewImg}
          />
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt="profile image"
              src={
                imageChanged
                  ? image.previewUrl
                  : `${BASE_URL}/admin/profile/${currUser.image_url}`
              }
              variant="circular"
              className="avatar"
              sx={{
                width: 100,
                height: 100,
              }}
            />
          </IconButton>
          <PhotoCameraIcon className="edit" />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="fullname">Full Name</InputLabel>
        <TextField
          sx={{ backgroundColor: "white", width: "100%" }}
          id="fullname"
          variant="outlined"
          size="small"
          value={fullName}
          onChange={(evt) => {
            setFullName(evt.target.value);
            validateInput(evt.target.value);
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          sx={{ backgroundColor: "white", width: "100%" }}
          id="email"
          type="email"
          size="small"
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
            validateInput(evt.target.value);
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="phone">Phone Number</InputLabel>
        <TextField
          sx={{ backgroundColor: "white", width: "100%" }}
          id="phone"
          type="number"
          size="small"
          value={phoneNumber}
          onChange={(evt) => {
            setPhoneNumber(evt.target.value);
            validateInput(evt.target.value);
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {!isLoading ? (
          <Button
            disabled={inputError ? true : false}
            variant="contained"
            size="large"
            style={{ backgroundColor: colors.bellefuGreen }}
            onClick={uploadEdit}
          >
            Save
          </Button>
        ) : (
          <LoadingButton
            loading
            loadingPosition="start"
            size="large"
            style={{ backgroundColor: colors.bellefuGreen, color: "#fff" }}
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Saving
          </LoadingButton>
        )}
      </div>
    </Container>
  );
};

export default EditProfile;
