import { makeStyles } from "@material-ui/core/styles";

const useIndexStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  mainArea: {
    margin: "40px",
  },
  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    marginTop: theme.spacing(1),
    borderBottom: "2px solid #1f91f3",
  },
  fieldArea: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down(513)]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down(406)]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },

  fieldAreaReKyc: {
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
    [theme.breakpoints.down(513)]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down(406)]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  textArea: {
    textAlign: "center",
  },
  textWeight: {
    fontWeight: "200 !important",
  },
  buttonArea: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  otpImageHeight: {
    height: 50,
  },
  contentHeading: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "15",
    },
    color: "#555555",
    // paddingLeft: theme.spacing(2),
  },
  contentSubHeading: {
    // fontWeight: "400",
    color: "#999999",
    paddingTop: "10px",
    //paddingLeft: "13px",
  },
  headerSpan: {
    fontWeight: "bold",
  },
  textSize: {
    fontWeight: "400 !important",
    fontSize: "1.2rem !important",
  },
  topHedaer: {
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "1rem",
    },
  },
}));

export default useIndexStyles;
