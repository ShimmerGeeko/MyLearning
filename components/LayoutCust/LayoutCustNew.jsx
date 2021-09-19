import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CustHeadingNew from "./CustHeadingNew";
import Paper from "@material-ui/core/Paper";
import TechImg from "../../Images/tech1.png";

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
          <CustHeadingNew />
          {children}
        </div>
      </Paper>
    </>
  );
}
