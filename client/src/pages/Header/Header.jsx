import React, { useContext, useEffect, useState } from "react";
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import jwt_decode from "jwt-decode";
import Context from "../Store/Context";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";
import GetStarted from "../GetStarted/GetStarted";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Header() {
  const { state, dispatch } = useContext(Context);
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [role, setRole] = useState();
  const [username, setUser] = useState("");
  const toggle = () => setShow((prevState) => !prevState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userdata = jwt_decode(token);
      if (!userdata) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUser(userdata.user.name);
        setUserID(userdata.user._id);
        const fname = userdata.user.name.split(" ")[0];
        dispatch({ type: "UPDATE_NAME", payload: fname });
        setRole(userdata.user.role)
        setAuth(true);
      }
    }
  }, [localStorage.getItem("token")]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    setRole();
    setAuth(false);
    navigate("/");
    window.location.reload();
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    if (auth) {
      setOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navHead = [
    ['Profile'],
    ["Dashboard","Profile", "Patient List"],
    ["Add Patient", "Patient List", "Add Doctor", "Doctors List"],
  ];

  const navIcon = [
    [
      <AccountBoxIcon />,

      
    ],
    [<AccountBoxIcon />,<AccountBoxIcon />,<AccountBoxIcon />],
    [<AccountBoxIcon />, <AccountBoxIcon />,<AccountBoxIcon />, <AccountBoxIcon />],
  ];

  const navlink = [
    [`/Patient/${userID}`],
    ['/Dashboard',`/doctor/${userID}`, "/Patients"],
    ["/AddPatient", "/AllPatient","/AddDoctor", "/AllDoctor"],
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="header_main"
        style={{ backgroundColor: "#f3eded", color: "#000000" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          {auth && <IconButton
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EHR
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <div className="link_but">
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                  className="login_but"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List></List>
        {auth &&
          <List>
            {navHead[role].map((text, index) => (
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{navIcon[role][index]}</ListItemIcon>
                  <ListItemText
                    primary={text}
                    onClick={() => {
                      navigate(navlink[role][index]);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        }
        {/* <List>
        <ListItem>
            <ListItemButton>
                <ListItemIcon>
                    
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText onClick={()=>{navigate(`/Patients`)}} primary="Assigned Patients" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText onClick={()=>{navigate(`/Patient/${userID}`)}} primary="Patient Profile" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
                <ListItemIcon>
                    <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton>
                <ListItemIcon>
                    <SummarizeIcon />
                </ListItemIcon>
                <ListItemText primary="Report" />
            </ListItemButton>
        </ListItem>
        <ListItem >
            <ListItemButton>
                <ListItemIcon>
                    <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText primary="Bills" />
            </ListItemButton>
        </ListItem>
        </List> */}
      </Drawer>
      <GetStarted isModalOpen={show} toggleModal={toggle} setShow={setShow} />
    </Box>
  );
}

export default Header;
