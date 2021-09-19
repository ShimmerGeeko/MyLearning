import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoBox: {
    color: "#fff",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    height: "80px",
    width: "100%",
    textAlign: "left",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  hoverExpandEffect: {
    "&::after": {
      backgroundColor: "rgba(0, 0, 0, 0.05) !important",
      content: '"."',
      position: "absolute",
      left: "80px",
      top: "0",
      width: "0",
      height: "100%",
      color: "transparent",
      transition: "all 0.95s",
    },
    "&:hover:after": {
      width: "100%",
    },
  },

  infoBoxIcon: {
    display: "inline-block",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: "80px",
    height: "80px",
  },
  infoBoxIconI: {
    color: "#fff",
    fontSize: "50px",
    lineHeight: "80px",
    paddingTop: "3px",
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

export default function CustomBadge(props) {
  const classes = useStyles();
  const BadgeProps = props.badgeData;
  return (
    <div
      className={classNames(classes.infoBox, classes.hoverExpandEffect)}
      style={{ backgroundColor: BadgeProps.BadgeColor }}>
      <div className={classes.infoBoxIcon}>
        <i className={classes.infoBoxIconI}>{props.children}</i>
      </div>
      <div className={classes.infoBoxContent}>
        <div className={classes.infoBoxText}>{BadgeProps.BadgeText}</div>
        <div className={classes.infoBoxNumber}>{BadgeProps.BadgeNumber}</div>
      </div>
    </div>
  );
}

/*
***USAGE***
const [badgeData, setBadgeData] = useState({BadgeText: 'Leadsss', BadgeNumber: '10', BadgeColor: '#3F51B5'});

<Grid
  container
  item
  lg={6}
  md={6}
  sm={6}
  xs={6}
  className={classes.gridItemSppacing}
  style={{ paddingBottom: 0 }}>

  <Badge badgeData={badgeData}>
  <PersonAddIcon fontSize='large' />
  </Badge>
</Grid>
*/
