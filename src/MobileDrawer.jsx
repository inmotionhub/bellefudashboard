import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { colors } from "./Constant";
import { mobileIcons } from "./mobileIconList/mobileIcons";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MobileDrawer() {
  const [state, setState] = useState({
    left: false,
  });

  const [products, setProducts] = useState(false);
  const [verify, setVerify] = useState(false);
  const [Voucher, setVoucher] = useState(false);
  const [account, setAccount] = useState(false);
  const [cat, setCat] = useState(false);
  const [report, setReport] = useState(false);
  const [setting, setSetting] = useState(false);
  const [custom, setCustom] = useState(false);
  const [shop, setShop] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box sx={{ width: 240 }} role="presentation">
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
                textDecoration: "none",
                borderRadius: "50px 0 0 50px",
              })}
            >
              <ListItem button sx={{ pl: 6 }}>
                <ListItemIcon>
                  <Icons.FactCheckOutlined sx={{ color: "rgb(118 186 27)" }} />
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
                textDecoration: "none",
                borderRadius: "50px 0 0 50px",
              })}
            >
              <ListItem button sx={{ pl: 6 }}>
                <ListItemIcon>
                  <Icons.FactCheckOutlined sx={{ color: "rgb(118 186 27)" }} />
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
                textDecoration: "none",
                borderRadius: "50px 0 0 50px",
              })}
            >
              <ListItem button sx={{ pl: 6 }}>
                <ListItemIcon>
                  <Icons.PlaylistAddCircle sx={{ color: "rgb(118 186 27)" }} />
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
              <Icons.LocalShippingOutlined sx={{ color: "rgb(118 186 27)" }} />
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
                textDecoration: "none",
                borderRadius: "50px 0 0 50px",
              })}
            >
              <ListItem button sx={{ pl: 6 }}>
                <ListItemIcon>
                  <Icons.RateReviewOutlined sx={{ color: "rgb(118 186 27)" }} />
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
    </Box>
  );

  return (
    <Box sx={{}}>
      <React.Fragment>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon sx={{ color: "rgb(118 186 27)" }} />
        </Button>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
          {mobileIcons.map((icon, id) => (
            <Button
              key={icon.id}
              onClick={toggleDrawer("left", true)}
              sx={{ color: "rgb(118 186 27)" }}
            >
              {icon.icon}
            </Button>
          ))}
        </Box>
        <Drawer
          sx={{ width: "23px" }}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <DrawerHeader>
            <div>
              <Box
                style={{
                  padding: "1.3%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/mainlogo.png"
                  alt="bellefu logo"
                  style={{ height: "80px%", width: "200px" }}
                />
                <IconButton
                  onClick={toggleDrawer("left", false)}
                  sx={{
                    marginLeft: 3,
                    width: "20px",
                    height: "20px",
                    p: 1,
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
            </div>
          </DrawerHeader>
          <Divider />

          {list()}
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
