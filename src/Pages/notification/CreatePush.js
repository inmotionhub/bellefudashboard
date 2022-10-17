import React, { useState } from 'react';
import { TextField, Box, Container, Button, Paper } from '@mui/material';
import { StyleSheet, css } from 'aphrodite';
import { PageTitle, APIDATA } from '../../Constant';
import axios from "axios";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  formContainer: {
    width: '70%',
    margin: '2rem auto 0 auto',
    padding: '2rem 0',
  },

  form: {
    width: '90%',
    height: 'auto',
    display: 'flex',
    margin: '0 auto',
    flexDirection: 'column',
  },
  dateInput: {
    padding: '1rem 14px',
    width: '100%',
    border: '1px solid #c4c4c4',
    cursor: 'pointer',
    borderRadius: '5px',
    '&:focus': {
      color: 'rgba(0, 0, 0, 0, 0.23)',
      
      border: '0.5 solid rgba(0, 0, 0, 0, 0.23)',
    },
  },
  submitBtn: {
    backgroundColor: '#76BA1B',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#76BA1B',
    },
  },
});

function CreatePush() {
  const [title, setProgramTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);

  console.log(date);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === null || description === null || date === null) {
      setProgramTitle('');
      setDescription('');
      setDate('');
    }

    axios.post(`${APIDATA}create/notification`, {title, description, schedule: date })
    .then(() => {
      toast.success("push notification successful!", {
        position: toast.POSITION.TOP_CENTER
      })
      .catch(() => {
        toast.error("server busy, try again", {
          position: toast.POSITION.TOP_CENTER
        })
      })
    })
  };

  return (
    <Container>
      <PageTitle title="Create Notifications" />
      <Box className={css(styles.formContainer)} component={Paper}>
        <form className={css(styles.form)}>
          <TextField
            id="program-title"
            label="Program Title"
            onChange={(e) => setProgramTitle(e.target.value)}
            name="title"
            value={title}
            helperText={title === '' ? 'Please enter title' : ''}
            error={title === ''}
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            multiline
            maxRows={2}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            sx={{ margin: '1rem 0' }}
            helperText={description === '' ? 'Please enter description' : ''}
            error={description === ''}
          />

          <label style={{ color: 'rgba(0, 0, 0, 0.6' }}>
            Start Time <br />
            <input
              className={css(styles.dateInput)}
              type="datetime-local"
              placeholder="starttime"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </label>
          <Button
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            className={css(styles.submitBtn)}
          >
            Post
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default CreatePush;
