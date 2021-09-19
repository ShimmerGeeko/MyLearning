import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    fontSize: "36px !important",
    // color: "#673AB7"
    color: "#fff",
    paddingTop: "30px",
  },
  tagline: {
    textAlign: "center",
    fontSize: "12px !important",
    // paddingBottom: "2px",
    // color: "#673AB7"
    color: "#fff",
  },
}));

export default function CustHeading() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" component="h3" className={classes.heading}>
        {" "}
        <b>Video KYC</b>
      </Typography>
      <Typography gutterBottom className={classes.tagline}>
        One Stop KYC Solution
      </Typography>
    </>
  );
}
