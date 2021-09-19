import React, { useState, useEffect } from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import useFormStyles from "../common/css/useFormStyles";
import PropTypes from "prop-types";
import HttpService from "../../HttpService";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import LayoutCustApp from "../LayoutCust/LayoutCustApp";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { storeCust } from "../../redux/actions/mainAction";
import { Divider } from "@material-ui/core";
import BasicDetails from "./BasicDetails";
import MediaAndDetails from "./MediaAndDetails";
import AadharDetails from "./AadharDetails";
import PanDetails from "./PanDetails";

const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(6),
    },
  },
  heading: {
    paddingTop: "1rem",
    //marginBottom: "20px",
    fontSize: "1.2rem",
    marginLeft: "10px",
  },
  tabsField: {
    "& button": {
      minWidth: "3rem",
      minHeight: "3rem",
      background: "#fff",
      color: "#000",
    },

    // borderRadius: "50px",
  },
  tabField: {
    textTransform: "none",
    background: "#fff",
    color: "#000",
    "& button": {
      minWidth: "3rem",
      minHeight: "3rem",
    },
    fontWeight: theme.typography.fontWeightRegular,
  },
  abStatic: {
    borderBottom: "2px solid #673ab7",
  },
  // indicator: {
  //   background: "#000",
  // },
}));

const useStylesMain = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    //alignItems: "center",
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    marginTop: theme.spacing(1),
    borderBottom: "2px solid #673ab7",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStylesMain();
  const matchesMd = useMediaQuery("(min-width:960px)");
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <>
        <div className={classes.paper}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box m={matchesMd ? 3 : 0} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        <Box m={2} />
        <Divider className={classes.headingDivider} />
      </>

      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustIndex() {
  const classes = useStyles();
  const { pending_custId, userCode, userId } = useSelector((state) => ({
    pending_custId: state.mainReducer.pending_custId,
    userCode: state.mainReducer.sesParamOpUserCode,
    userId: state.mainReducer.sesParamOpUserId,
  }));
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(min-width:380px)");
  const matchesSmBtn = useMediaQuery("(min-width:450px)");
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    debugger;
    const dataPara = {
      UserCode: String(userCode),
      UserId: userId,
      CustId: pending_custId,
    };
    console.log("Effect otp flag", dataPara);

    Swal.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(dataPara, "MainService/PendingAuthCustomerData")
      .then((resp) => {
        Swal.close();
        let responseJSON = resp.data;
        console.log("PendingAuthCustomerData res ", responseJSON);
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <LayoutCustApp>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Paper elevation={matchesSm ? 3 : 3}>
          <p className={classes.heading}>Customer Authorization</p>
          <AppBar
            position="static"
            style={{ boxShadow: "#000" }}
            classes={{
              root: classes.abRoot,
              positionStatic: classes.abStatic,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              className={classes.tabsField}
              // inkBarStyle={{ background: "#fff" }}
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab
                className={classes.tabField}
                label="Basic Details"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tabField}
                label="Aadhar Details"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tabField}
                label="Pan Details"
                {...a11yProps(2)}
              />
              <Tab
                className={classes.tabField}
                label="Media And Details"
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <BasicDetails />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AadharDetails />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PanDetails />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MediaAndDetails />
          </TabPanel>
        </Paper>
      </Container>
    </LayoutCustApp>
  );
}
