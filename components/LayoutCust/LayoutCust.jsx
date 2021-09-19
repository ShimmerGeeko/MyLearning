import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CustHeading from "./CustHeading";
import Paper from "@material-ui/core/Paper";
import TechImg from "../../Images/bg_Landing1.png";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/bg_Landing.png"})`,
    // backgroundImage: `url(${TechImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    //marginBottom: theme.spacing(4),
    overflow: "scroll",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 5,
    // paddingBottom: theme.spacing(2),
    // backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
  },
}));

export default function LayoutCustNew({ children }) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay}>
          <CustHeading />
          {children}
        </div>
      </Paper>
    </>
  );
}
