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
import i18next from "i18next";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
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
  instructionTextSubHeader: {
    fontSize: [16, "!important"],
    //fontWeight: "800",
    color: "#555",
  },
  instructionTextSubHeaderSecond: {
    fontSize: [14, "!important"],
    //fontWeight: "800",
    color: "#555",
  },
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
    textAlign: "left",
    textWrap: "noWrap",
    overflow: "hidden",
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
              <p className={classes.titleSec}>{i18next.t("Requirement")}</p>
            </Grid>
          </Grid>
        </Grid>
        <Box m={0.5} />

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement1")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "20px" }}
          >
            <Grid item>
              <StopIcon style={{ fontSize: "10px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeaderSecond}>
                Steps to download Offline KYC :
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "20px" }}
          >
            {/* <Grid item>
             {i18next.t('step1')} 
            </Grid> */}
            <Grid item>
              <Link
                color="inherit"
                href="https://resident.uidai.gov.in/offline-kyc"
                rel="noreferrer"
                target="_blank"
                style={{ overflow: "hidden" }}
              >
                <ListItemText
                  primary={
                    <Typography
                      className={classes.instructionTextSubHeaderSecond}
                    >
                      {i18next.t("step1")}{" "}
                      <span style={{ color: "#00BCD4", fontWeight: "bold" }}>
                        {" "}
                        https://resident.uidai.gov.in/offline-kyc{" "}
                      </span>
                    </Typography>
                  }
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "20px" }}
          >
            <Grid item>
              <Typography className={classes.instructionTextSubHeaderSecond}>
                {i18next.t("step2")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "20px" }}
          >
            <Grid item>
              <Typography className={classes.instructionTextSubHeaderSecond}>
                {i18next.t("step3")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "20px" }}
          >
            <Grid item>
              <Typography className={classes.instructionTextSubHeaderSecond}>
                {i18next.t("step4")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement2")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement3")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}
        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement4")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement5")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}
        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("Requirement6")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        <Box m={1} />
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
              <p className={classes.titleSec}>{i18next.t("conditions")}</p>
            </Grid>
          </Grid>
        </Grid>

        <Box m={0.5} />

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("condition1")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}

        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("condition2")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}
        {/* start item */}
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            wrap="nowrap"
            style={{ paddingLeft: "10px" }}
          >
            <Grid item>
              <RadioButtonUncheckedIcon style={{ fontSize: "6px" }} />
            </Grid>
            <Grid item>
              <Typography className={classes.instructionTextSubHeader}>
                {i18next.t("condition3")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* end item */}
      </Grid>
    </>
  );
}
