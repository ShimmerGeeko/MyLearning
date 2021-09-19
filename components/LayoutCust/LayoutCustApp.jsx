import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TechImg from "../../Images/tech1.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    height: "100vh",
    width: "100%",
    background: `url(${TechImg})`,
    // backgroundImage: `url(${TechImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center-bottom",
    //marginBottom: theme.spacing(4),
    overflow: "scroll",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 5,
    // paddingBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
    },
    // backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
  },
  title:{
    fontSize:"1rem",
    fontWeight:"bold",
    flexGrow: 1,
     [theme.breakpoints.down("sm")]: {
    fontSize:"1rem",
    },
  },
  
}));

export default function LayoutCustApp({ children }) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Video KYC | One Stop KYC Solution
              </Typography>
            </Toolbar>
          </AppBar>
          {children}
        </div>
      </Paper>
    </>
  );
}
