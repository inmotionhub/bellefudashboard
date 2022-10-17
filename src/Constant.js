import Typography from "@mui/material/Typography";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const colors = {
  secondary: "#76ba1b",
  primary: "#FFA500",
  heading: "#757575",
  backG: "#f3f2f2",
  bellefuGreen: "rgb(118 186 27)",
};

function PageTitle(props) {
  return (
    <div>
      <Typography variant="h4" size="sm" sx={{ color: colors.heading }}>
        {props.title}
      </Typography>
    </div>
  );
}

// loading circles

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: "flex", marginLeft: "30vw" }}>
      <CircularProgress color="success" />
    </Box>
  );
};

function Backdrop() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

// api datas
export const BASE_URL = "https://phpstack-794034-2715115.cloudwaysapps.com/";
const APIDATA = "https://phpstack-794034-2715115.cloudwaysapps.com/api/v3/";

const ProductImageUrl =
  "https://phpstack-794034-2715115.cloudwaysapps.com/get/product/image/";

export const AnouncementUrl =
  "https://phpstack-794034-2715115.cloudwaysapps.com/get/custom/image/";

export {
  colors,
  PageTitle,
  APIDATA,
  CircularIndeterminate,
  Backdrop,
  ProductImageUrl,
};
