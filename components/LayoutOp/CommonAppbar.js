import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import InfoIcon from "@material-ui/icons/Info";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import UserBackground from "../../Images/user-img-background.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    backgroundImage: `url(${UserBackground})`,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sidegrid: {
    backgroundColor: "#e6ee9c",
    fontWeight: "bold",
    padding: "10px",
  },
  gridList: {
    height: 50,
    width: "100%",
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,

    paddingBottom: 10,
    paddingLeft: 10,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "20px",
    // [theme.breakpoints.down("md")]: {
    //   marginBottom: "2em",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   marginBottom: "1.25em",
    // },
  },
}));

function CommonAppbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Video KYC
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <img src={UserBackground} alt="PhoneOtp" className={classes.gridList} /> */}
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Grid className={classes.sidegrid}>Main Navigation</Grid>
        <List>
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-start"
          >
            <ListItem
              button
              component={Link}
              to={
                props.userRole == 3
                  ? "/AuthorizerDashboard"
                  : props.userRole == 1
                  ? "/AdminDashboard"
                  : props.userRole == 2
                  ? "/Dashboard"
                  : "/"
              }
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            {props.userRole == 3 ? (
              <ListItem button component={Link} to="/AuthorizerKYCStatusfrom">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>

                <ListItemText primary="Key Status Index" />
              </ListItem>
            ) : (
              ""
            )}
            {props.userRole == 1 ? (
              <ListItem button component={Link} to="/CreateUser">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>

                <ListItemText primary="Create User" />
              </ListItem>
            ) : (
              ""
            )}
            {props.userRole == 1 ? (
              <ListItem button component={Link} to="/EditUser">
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>

                <ListItemText primary="Edit User" />
              </ListItem>
            ) : (
              ""
            )}
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Privacy" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          </Grid>
        </List>
        <div className={classes.bottomPush}>
          <Typography>© 2019 - 2020 Video KYC</Typography>

          <Typography>version 1.12 C</Typography>
        </div>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <div className={classes.toolbarMargin} />
    </div>
  );
}

export default CommonAppbar;
