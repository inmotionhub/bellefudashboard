import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
//Icon
import * as Icons from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import { colors } from "./Constant";
import { useDispatch } from "react-redux";
import { drawerOpen } from "./Features/LoginSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [products, setProducts] = useState(false);
  const [verify, setVerify] = useState(false);
  const [Voucher, setVoucher] = useState(false);
  const [account, setAccount] = useState(false);
  const [cat, setCat] = useState(false);
  const [report, setReport] = useState(false);
  const [setting, setSetting] = useState(false);
  const [custom, setCustom] = useState(false);
  const [shop, setShop] = useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(drawerOpen(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(drawerOpen(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: "white" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),

                        }}
                    >
                        <MenuIcon sx={{ color: "gray" }} />
                    </IconButton>

                </Toolbar>
            </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              position: "absolute",
              right: "20%",
              // top: '45%',
              zIndex: 1000,
              // marginRight: '-27px',
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {open ? (
            <div>
              <Box style={{ padding: "1.3%", display: "flex" }}>
                <img
                  // src="https://bellefu.online/wp-content/uploads/2020/12/blog_logo.png"
                  src="/images/mainlogo.png"
                  alt="bellefu"
                  style={{ height: "80%", width: "73%" }}
                />
                <IconButton
                  sx={{ marginLeft: 3, position: "relative", top: "-15%" }}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </Box>
            </div>
          ) : null}
        </DrawerHeader>
        <Divider />

        <List>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              background: isActive ? colors.primary : "#ffffff",
              display: "flex",
              padding: isActive ? "6px 6.6vw 4px 18px" : null,
              textDecoration: "none",
              borderRadius: "50px 0 0 50px",
            })}
          >
            {" "}
            <ListItem button>
              <ListItemIcon>
                <Icons.Dashboard sx={{ color: "rgb(118 186 27)" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </NavLink>

          <ListItem button onClick={() => setProducts(!products)}>
            <ListItemIcon>
              <Icons.BackupTableOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {products ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={products} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="productlist"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ListAltOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Product List" />
                </ListItem>
              </NavLink>

              <NavLink
                to="active"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.FactCheckOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Active" />
                </ListItem>
              </NavLink>

              <NavLink
                to="pending"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PendingActions sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pending" />
                </ListItem>
              </NavLink>

              <NavLink
                to="expired"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.RemoveShoppingCartOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Expired" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <ListItem button onClick={() => setVerify(!verify)}>
            <ListItemIcon>
              <Icons.VerifiedOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Verification" />
            {verify ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={verify} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="idveri"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.BadgeOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="ID Verification" />
                </ListItem>
              </NavLink>

              <NavLink
                to="kycveri"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.FactCheckOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="KYC Verification" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <ListItem button onClick={() => setVoucher(!Voucher)}>
            <ListItemIcon>
              <Icons.LocalAtmOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Voucher" />
            {Voucher ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={Voucher} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="voucherlist"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.CreditScoreOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Voucher list" />
                </ListItem>
              </NavLink>

              <NavLink
                to="createvoucher"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PaidOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Voucher" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <ListItem button onClick={() => setCat(!cat)}>
            <ListItemIcon>
              <Icons.AutoAwesomeMosaicOutlined
                sx={{ color: "rgb(118 186 27)" }}
              />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            {cat ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={cat} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ListAltOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Category List" />
                </ListItem>
              </NavLink>

              <NavLink
                to="subcatlist"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.List sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="SubCategory" />
                </ListItem>
              </NavLink>

              <NavLink
                to="createcategory"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PlaylistAddOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Create Category" />
                </ListItem>
              </NavLink>

              <NavLink
                to="createsubcat"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PlaylistAddCircle
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary=" Create SubCat" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <NavLink
            to="notification"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              background: isActive ? colors.primary : "#ffffff",
              display: "flex",
              // padding: isActive ? "6px 6.6vw 4px 18px" : null,
              textDecoration: "none",
              borderRadius: "50px 0 0 50px",
            })}
          >
            {" "}
            <ListItem button>
              <ListItemIcon>
                <Icons.Notifications sx={{ color: "rgb(118 186 27)" }} />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </NavLink>

          <ListItem button onClick={() => setShop(!shop)}>
            <ListItemIcon>
              <Icons.StoreOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Shop" />
            {shop ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={shop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="shop"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.AddBusiness sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Shops" />
                </ListItem>
              </NavLink>

              <NavLink
                to="shopproduct"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PendingActions sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pending products" />
                </ListItem>
              </NavLink>

              <NavLink
                to="declined"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PendingActions sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Declined products" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <NavLink
            to="order"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#757575",
              background: isActive ? colors.primary : "#ffffff",
              display: "flex",
              textDecoration: "none",
              borderRadius: "50px 0 0 50px",
            })}
          >
            <ListItem button>
              <ListItemIcon>
                <Icons.LocalShippingOutlined
                  sx={{ color: "rgb(118 186 27)" }}
                />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </NavLink>

          <ListItem button onClick={() => setAccount(!account)}>
            <ListItemIcon>
              <Icons.AccountCircleOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
            {account ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={account} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="user"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ManageAccountsOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItem>
              </NavLink>

              <NavLink
                to="transaction"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ReceiptLongOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Transaction" />
                </ListItem>
              </NavLink>
              <NavLink
                to="create-Admin"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PersonAdd sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Admin" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <ListItem button onClick={() => setReport(!report)}>
            <ListItemIcon>
              <Icons.AnnouncementOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Report" />
            {report ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={report} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="report"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ReportGmailerrorred
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Dispute" />
                </ListItem>
              </NavLink>

              <NavLink
                to="review"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.RateReviewOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Review" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
          <ListItem button onClick={() => setCustom(!custom)}>
            <ListItemIcon>
              <Icons.SupportAgent sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Custom" />
            {report ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={custom} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="customads"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ViewCarousel sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Custom Ads" />
                </ListItem>
              </NavLink>
              <NavLink
                to="createads"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ViewCarouselOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Create Ads" />
                </ListItem>
              </NavLink>

              <NavLink
                to="customrequest"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.SupportAgent sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Custom Request" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <ListItem button onClick={() => setSetting(!setting)}>
            <ListItemIcon>
              <Icons.SettingsOutlined sx={{ color: "rgb(118 186 27)" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {setting ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={setting} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink
                to="fileupload"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.ViewCarouselOutlined
                      sx={{ color: "rgb(118 186 27)" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Home Slider" />
                </ListItem>
              </NavLink>

              <NavLink
                to="country"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.PublicOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Country" />
                </ListItem>
              </NavLink>

              <NavLink
                to="adsplan"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.CasesOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Ads Plan" />
                </ListItem>
              </NavLink>

              <NavLink
                to="valuelist"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#757575",
                  background: isActive ? colors.primary : "#ffffff",
                  display: "flex",
                  // padding: "6px 6.6vw 4px 18px",
                  textDecoration: "none",
                  borderRadius: "50px 0 0 50px",
                })}
              >
                <ListItem button sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <Icons.FlagOutlined sx={{ color: "rgb(118 186 27)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Our Value" />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: colors.backG }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
