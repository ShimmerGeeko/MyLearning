import { makeStyles } from "@material-ui/core/styles";

const useFormStyles = makeStyles((theme) => ({
  // button: {
  //   //margin: theme.spacing(4, 0, 0, 2),
  //   paddingLeft: theme.spacing(10),
  //   paddingRight: theme.spacing(10),
  //   [theme.breakpoints.down("md")]: {
  //     paddingLeft: theme.spacing(4),
  //     paddingRight: theme.spacing(4),
  //   },
  // },

  contentHeading: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "15",
    },
    color: "#555555",
    paddingLeft: theme.spacing(2),
  },
  contentSubHeading: {
    textAlign: "left",
    // fontWeight: "400",
    color: "#999999",
    paddingTop: "10px",
    paddingLeft: "13px",
  },

  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    // marginTop: theme.spacing(1),
    // border: "1px solid #673AB7",
  },
  paper: {
    // padding: theme.spacing(3, 6),
    padding: theme.spacing(0, 2, 2, 2),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%",

    // Fix IE 11 issue.
  },

  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: "100%",
    textAlign: "left",
  },

  input: {
    display: "none",
  },
  outerBox: {
    padding: theme.spacing(3, 6),
  },
  headerSpan: {
    fontSize: "0.9rem",
    fontWeight: "600",
    margin: "2px 4px",
  },
  buttonArea: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
  mainContainer: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(6),
    },
  },
}));

export default useFormStyles;
