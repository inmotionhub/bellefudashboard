import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
// import * as moment from 'moment';


const  MyDatePicker = ({ date, setDate })  => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Basic example"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} helperText={date === '' ? 'Please enter date' : ''} />
        )}
        sx={{ marginTop: '1rem' }}
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;
