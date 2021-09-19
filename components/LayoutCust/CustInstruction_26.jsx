import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarBorder from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StopIcon from "@material-ui/icons/Stop";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  // root: {
  //   width: "100%",
  //   // maxWidth: 360,
  //   color: "#555555",
  //   backgroundColor: theme.palette.background.paper,
  // },
  // instructionTextHeader: {
  //   fontSize: "0.9rem",
  //   fontWeight: "500",
  // },
  // instructionTextSubHeader: {
  //   fontSize: "0.94rem",
  //   fontWeight: "400",
  // },
  // mainHeader: {
  //   paddingLeft: theme.spacing(0.5),
  //   paddingRight: theme.spacing(0.5),
  //   paddingTop: theme.spacing(0),
  //   // paddingTop: theme.spacing(2),
  // },
  // nested: {
  //   paddingLeft: theme.spacing(0.5),
  //   paddingRight: theme.spacing(0.5),
  //   paddingTop: theme.spacing(0),
  //   paddingBottom: theme.spacing(0.3),
  // },
  // nestedSubItem: {
  //   paddingLeft: theme.spacing(0.5),
  //   paddingRight: theme.spacing(0.5),
  //   paddingTop: theme.spacing(0),
  // },
  // // secondaryItem: {
  // //     fontSize: "0.875rem !important"
  // // },
  // iconMinWidth: {
  //   minWidth: "35px",
  // },
  // fiberIconXs: {
  //   fontSize: "0.75rem",
  //   marginLeft: theme.spacing(0.5),
  // },
  // navigateIconXs: {
  //   fontSize: "1.4rem",
  // },
  titleSec: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  titleLi: {
    fontSize: "15px",
    textAlign: "left",
    // lineHeight: "1px",
  },
  titleLiDogit: {
    fontSize: "13px",
    textAlign: "left",
    // lineHeight: "15px",
  },
}));

export default function CustInstruction_2() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <StarIcon color="primary" />
            </Grid>
            <Grid item>
              <p className={classes.titleSec}>Requirements</p>
            </Grid>
          </Grid>
        </Grid>
        <Box m={1} />

        <Grid item xs={12}>
          <p className={classes.titleLi}>
            <li> Your Aadhaar Number/ Virtual ID/ Offline KYC.</li>
          </p>
        </Grid>

        <Grid item xs={12} style={{ paddingLeft: "10px" }}>
          <p className={classes.titleLiDogit}>
            <li> Steps to download Offline KYC :</li>
          </p>
        </Grid>

        <Grid item xs={12} style={{ paddingLeft: "10px" }}>
          <a href="https://resident.uidai.gov.in/offline-kyc">
            <p className={classes.titleLiDogit}>
              1. Visit https://resident.uidai.gov.in/offline-kyc
            </p>
          </a>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: "10px" }}>
          <p className={classes.titleLiDogit}>
            2. Please enter your Aadhaar Number along with Captcha.
          </p>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: "10px" }}>
          <p className={classes.titleLiDogit}>
            {" "}
            3. After which you will receive an OTP on your registered mobile
            number.
          </p>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: "10px" }}>
          <p className={classes.titleLiDogit}>
            4. Use the OTP, to create a 4 digit share code and download the zip
            file.
          </p>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            {" "}
            <li>Your PAN Card. </li>
          </p>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            {" "}
            <li>Your Mobile Phone.</li>{" "}
          </p>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li> A white sheet of paper and a black pen. </li>
          </p>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li> A well lit room with plain wall behind you. </li>
          </p>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li>Internet Connectivity.</li>{" "}
          </p>
        </Grid>
        <Box m={1} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <StarIcon color="primary" />
          </Grid>
          <Grid item>
            <p className={classes.titleSec}>Conditions</p>
          </Grid>
        </Grid>
        <Box m={1} />
        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li>
              The video KYC process needs to be done within our Banking Hours
              (8.00 a.m. to 7.00 p.m.)
            </li>{" "}
          </p>
        </Grid>

        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li>Your Mobile Number and Aadhaar Number should be linked.</li>{" "}
          </p>
        </Grid>

        <Grid item xs={12}>
          {" "}
          <p className={classes.titleLi}>
            <li>
              You need to be physically present in India during the Video KYC
              process.
            </li>{" "}
          </p>
        </Grid>

        <Box m={1} />
        {/* end item */}
      </Grid>
    </>
  );
}
