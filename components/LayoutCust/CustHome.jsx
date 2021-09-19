import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Copyright from "../common/Copyright";
import Badge from "../common/CustomBadge";
import BadgeRight from "../common/CustomBadgeRight";
import LayoutCust from "./LayoutCust";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";
import CustInstruction_1 from "./CustInstruction_1";
import CustInstruction_2 from "./CustInstruction_2";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CustBreadcrumb from "../common/CustBreadcrumb";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StopIcon from "@material-ui/icons/Stop";
import i18next from "i18next";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   marginTop: theme.spacing(1),
  //   padding: theme.spacing(2),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   maxWidth: "800px",
  //   minWidth: "800px",
  //   [theme.breakpoints.down("sm")]: {
  //     minWidth: "250px",
  //   },
  //   [theme.breakpoints.down(312)]: {
  //     marginTop: theme.spacing(2),
  //     padding: theme.spacing(1),
  //   },
  // },
  contentHeading: {
    textAlign: "left",
    color: "#555555",
    fontSize: "1.2rem !important",
  },
  OperatorHead: {
    textAlign: "left",
    color: "#555555",
    fontSize: "0.9rem",
    color: "blue",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  changeLang: {
    fontSize: "0.9rem",
    fontWeight: "600",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  // paper: {
  //   // margin: theme.spacing(3, 5),
  //   padding: theme.spacing(2, 4, 4, 4),
  //   justify: "center",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   textAlign: "center",
  // },
  // button: {
  //   marginLeft: theme.spacing(4, 0, 0),
  // },

  //Breadcrumb
  // link: {
  //   display: "flex",
  //   fontWeight: "bold",
  // },
  // icon: {
  //   marginRight: theme.spacing(0.5),
  //   width: 20,
  //   height: 20,
  //   fill: "#673AB7",
  // },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: "18px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  },
  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    marginTop: theme.spacing(1),
    borderBottom: "2px solid #1f91f3",
  },
  buttonArea: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}));

function CustHome(props) {
  const classes = useStyles();
  const history = useHistory();
  const matchesSm = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const defaultValue = {
    AO: { display: false, key: 2 },
    BK: { display: false, key: 1 },
    CC: { display: false, key: 3 },
    RK: { display: false, key: 4 },
  };

  // const [badgeData, setBadgeData] = useState({BadgeText: 'Leadsss', BadgeNumber: '10', BadgeColor: '#3F51B5'});
  const [badgeAO, setbadgeAO] = useState({
    BadgeText: i18next.t("Account"),
    BadgeNumber: i18next.t("Opening"),
    BadgeColor: "#FFF",
  });
  const [badgeBK, setbadgeBK] = useState({
    BadgeText: i18next.t("Basic"),
    BadgeNumber: i18next.t("VKYC"),
    BadgeColor: "#FFF",
  });
  const [badgeCC, setbadgeCC] = useState({
    BadgeText: i18next.t("applyFor"),
    BadgeNumber: i18next.t("CreditCard"),
    BadgeColor: "#FFF",
  });
  const [badgeRK, setbadgeRK] = useState({
    BadgeText: i18next.t("Re"),
    BadgeNumber: i18next.t("KYC"),
    BadgeColor: "#FFF",
  });
  const [stateShowHide, setShowHide] = useState(true);
  const [formType, setFormType] = useState("");
  const [stateBreadcrumb, setBreadcrumb] = useState(defaultValue);
  const fnShowHideComp = (bool, bcType) => {
    // console.log(badgeData+" -- "+badgeType)
    // if (!stateShowHide && !bool) {
    //   history.push("/CustIndex");
    // }
    setShowHide(bool);
    setFormType(bcType);
    if (bcType != undefined) {
      let bcData = { ...stateBreadcrumb };
      bcData[bcType].display = true;
      setBreadcrumb(bcData);
      dispatch(storeCust("red_CustBreadcrumb", bcData));
      dispatch(storeCust("red_ApplType", bcData[bcType].key));
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL, "REACT_APP_SERVER_URL");
    // console.log('useEffect >>>', stateShowHide);
  }, [stateShowHide]);

  const fnShowHideForm = (ftype) => {
    if (ftype == "AO") {
      history.push("/CustAccountIndex");
    } else if (ftype == "BK") {
      history.push("/CustIndex");
    } else if (ftype == "CC") {
      history.push("/CreditCardIndex");
    } else if (ftype == "RK") {
      history.push("/RekycIndex");
    }
  };

  const handleLangChange = (evt, option) => {
    evt.preventDefault();

    const lang = evt.target.value;
    // console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(`lan chnge to ${lang}`);
    setbadgeAO({
      BadgeText: i18next.t("Account"),
      BadgeNumber: i18next.t("Opening"),
      BadgeColor: "#FFF",
    });
    setbadgeBK({
      BadgeText: i18next.t("Basic"),
      BadgeNumber: i18next.t("VKYC"),
      BadgeColor: "#FFF",
    });
    setbadgeCC({
      BadgeText: i18next.t("applyFor"),
      BadgeNumber: i18next.t("CreditCardHed"),
      BadgeColor: "#FFF",
    });
    setbadgeRK({
      BadgeText: i18next.t("Re"),
      BadgeNumber: i18next.t("KYC"),
      BadgeColor: "#FFF",
    });
  };

  function refreshPage() {
    window.location.href = "#Login";
    // console.log("passed>>",refreshPage)
  }

  console.log("stateShowHide ", stateShowHide);
  console.log("formType ", formType);
  return (
    <LayoutCust>
      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <div className={classes.paper}>
            {stateShowHide ? (
              <>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  spacing={2}
                  // alignItems="center"
                >
                  <Grid item md={4} xs={12}>
                    <Typography className={classes.contentHeading}>
                      {i18next.t("intr")}
                    </Typography>
                  </Grid>
                  <Grid item md={4} xs={8}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      // alignItems="center"
                      spacing={1}
                    >
                      <Grid item className={classes.changeLang}>
                        {i18next.t("ChangeLang")}
                      </Grid>
                      <Grid item>
                        <select
                          id="selLanguage"
                          name="selLanguage"
                          class="show-tick ml-4"
                          onChange={handleLangChange}
                          // onClick={refreshPage}
                          value={language}
                        >
                          <option value="en">English</option>
                          <option value="es">मराठी</option>
                        </select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Grid
                      container
                      direction="column"
                      // justify="center"
                      alignItems="flex-end"
                    >
                      <Grid
                        item
                        className={classes.OperatorHead}
                        onClick={() => props.history.push("/login")}
                      >
                        {/* <Link to="/login">Operator Login</Link> */}
                        {i18next.t("operatorLogin")}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* end of header */}
              </>
            ) : (
              <div style={{ marginTop: "16px" }}>
                <CustBreadcrumb bcBool={stateBreadcrumb} />
              </div>
            )}
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box p={1} width="100%">
                  <Divider
                    variant="fullWidth"
                    className={classes.headingDivider}
                  />
                </Box>
              </Box>
            </div>

            <Box m={1} />

            {stateShowHide ? <CustInstruction_1 /> : <CustInstruction_2 />}
            <Box m={3} />

            {!stateShowHide ? (
              <>
                <Grid
                  container
                  direction="column"
                  // justify="flex-end"
                  alignItems="center"
                  className={classes.buttonArea}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={2}
                    // alignItems="flex-end"
                  >
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        {/*  onClick={() => fnShowHideComp(false)}> */}
                        {i18next.t("btnPrevious")}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => fnShowHideForm(formType)}
                      >
                        {/*  onClick={() => fnShowHideComp(false)}> */}
                        {i18next.t("btnNext")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  //alignItems="center"
                  spacing={2}
                >
                  {/* card start */}
                  <Grid item md={4} xs={12}>
                    <BadgeRight
                      badgeData={badgeAO}
                      fnShowHide={fnShowHideComp}
                      badgeType="AO"
                    >
                      <AccountBalanceIcon />
                    </BadgeRight>
                  </Grid>
                  {/* card end */}
                  {/* card start */}
                  <Grid item md={4} xs={12}>
                    <BadgeRight
                      badgeData={badgeBK}
                      fnShowHide={fnShowHideComp}
                      badgeType="BK"
                    >
                      <PersonIcon style={{ fill: "#009688" }} />
                    </BadgeRight>
                  </Grid>
                  {/* card end */}
                  {/* card start */}
                  <Grid item md={4} xs={12}>
                    <BadgeRight
                      badgeData={badgeCC}
                      fnShowHide={fnShowHideComp}
                      badgeType="CC"
                    >
                      <CreditCardIcon style={{ fill: "#009688" }} />
                    </BadgeRight>
                  </Grid>
                  {/* card end */}
                  <Grid item md={4} xs={12}></Grid>
                  {/* card start */}
                  <Grid item md={4} xs={12}>
                    <BadgeRight
                      badgeData={badgeRK}
                      fnShowHide={fnShowHideComp}
                      badgeType="RK"
                    >
                      <AccountCircleIcon style={{ fill: "#E91E63" }} />
                    </BadgeRight>
                  </Grid>
                  {/* card end */}
                  <Grid item md={4} xs={12}></Grid>
                </Grid>
              </>
            )}

            <Box m={2} />
          </div>
        </Paper>
      </Container>
    </LayoutCust>
  );
}

const mapStateToProps = (state) => {
  return {
    xCustMobNo: state.mainReducer.red_CustMob,
    xCustId: state.mainReducer.red_CustId,
  };
};
export default withRouter(connect(mapStateToProps)(CustHome));
