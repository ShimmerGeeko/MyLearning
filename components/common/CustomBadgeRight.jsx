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
    display: "flex",
    textAlign: "left",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",

    "&:hover div[class^='makeStyles-hoverZoomEffect']": {
        opacity: "0.4",
        transform: "rotate(-32deg) scale(1.4)",
        right: "10px",
      }
  },
  hoverExpandEffect: {
    "&::after": {
      backgroundColor: "rgba(0, 0, 0, 0.05) !important",
      content: '"."',
      position: "absolute",
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

  hoverZoomEffect: {
      position: "absolute",
      right: "10px",
      top: "10px",
    //   top: "50%",
    //   transform: "translateY(-50%)",
      transition: "all 0.3s ease",
  },

  infoBoxIcon: {
    position: "absolute",
    textAlign: "center",
    width: "20%",
    top: "15%",
    right: "10px",
  },
  infoBoxIconI: {
    color: "#673ab7",
    "& svg": {
        fontSize: "3.5rem"
    },
  },
  infoBoxContent: {
    display: "inline-block",
    padding: "7px 10px",
    width: "70%",
    marginLeft: "2%"
  },
  infoBoxText: {
    fontSize: "13px",
    marginTop: "11px",
    color: "#555555",
  },
  infoBoxNumber: {
    fontWeight: "normal",
    fontSize: "26px",
    marginTop: "-4px",
    color: "#555555",
  },
}));

export default function CustomBadgeRight(props) {
  const classes = useStyles();
  const BadgeProps = props.badgeData;
  return (
      <div
          className={classNames(classes.infoBox, classes.hoverExpandEffect)} style={{ backgroundColor: BadgeProps.BadgeColor }}
          onClick={() => props.fnShowHide(false, props.badgeType)}>
          <div className={classes.infoBoxIcon, classes.hoverZoomEffect}>
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
const [badgeData, setBadgeData] = useState({BadgeText: 'Leadsss', BadgeNumber: '10', BadgeColor: '#fff'});

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
