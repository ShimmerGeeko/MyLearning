import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  infoBox: {
    backgroundColor: "#3F51B5",
    height: "80px",
  },
  infoBoxIcon: {
    display: "inline-block",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: "80px",
  },
  infoBoxIconI: {
    color: "#fff",
    fontSize: "50px",
    lineHeight: "80px",
  },
  infoBoxContent: {
    display: "inline-block",
    padding: "7px 10px",
  },
  infoBoxText: {
    fontSize: "13px",
    marginTop: "11px",
    color: "#fff",
  },
  infoBoxNumber: {
    fontWeight: "normal",
    fontSize: "26px",
    marginTop: "-4px",
    color: "#fff",
  },
}));

export default function BadgeOverlap(props) {
  const classes = useStyles();

  const rectangle = <div className={classes.shape} />;
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <div className={classes.infoBoxIcon}>
          <i className={classes.infoBoxIconI}>
            {/* <PersonAddIcon fontSize='large' /> */}
            {/* {children} */}
          </i>
        </div>
        <div className={classes.infoBoxContent}>
          <div className={classes.infoBoxText}>{props.Text}</div>
          <div className={classes.infoBoxNumber}>{props.Number}</div>
        </div>
      </div>
      <Badge color='primary' badgeContent={0} showZero>
        <div style={{ height: "80px" }} className={classes.infoBox}>
          <div className={classes.infoBoxIcon}>
            <i className={classes.infoBoxIconI}>
              <PersonAddIcon fontSize='large' />
            </i>
          </div>
          <div className={classes.infoBoxContent}>
            <div className={classes.infoBoxText}>New Enquires</div>
            <div className={classes.infoBoxNumber}>50</div>
          </div>
        </div>
      </Badge>
      <Badge color='secondary' badgeContent=' ' variant='dot'>
        {rectangle}
      </Badge>
      <Badge color='secondary' overlap='circle' badgeContent=' '>
        {circle}
      </Badge>
      <Badge color='secondary' overlap='circle' badgeContent=' ' variant='dot'>
        {circle}
      </Badge>
    </div>
  );
}
