import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({isLoading}) {

  return (
    <Backdrop
    sx={{ color: '#fff', zIndex: '100', textAlign: 'center' }}
    open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}