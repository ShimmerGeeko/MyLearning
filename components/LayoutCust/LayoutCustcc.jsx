import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TechImg from "../../Images/tech1.png";
import CustHeading from "./CustHeading";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    height: "100vh",
    width: "100%",
    background: "#673ab7",
    backgroundPosition: "center",
    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 30%)",
    // backgroundImage: `url(${TechImg})`,
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center-bottom",
    //marginBottom: theme.spacing(4),
    overflow: "scroll",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 5,
    paddingBottom: theme.spacing(2),
    //marginBottom: theme.spacing(2),
    // backgroundColor: "rgba(0,0,0,.3)",
  },
}));

export default function LayoutCust({ children }) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.mainFeaturedPost}> </Paper>
      <div className={classes.overlay}>
        <CustHeading />
        {children}
      </div>
    </>
  );
}
