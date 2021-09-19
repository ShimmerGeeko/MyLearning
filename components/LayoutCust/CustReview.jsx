import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  FormHelperText,
  Divider,
  Container,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles, ThemeProviderProps } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import LayoutCustApp from "./LayoutCustApp";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import HttpService from "../../HttpService";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useFormStyles from "../common/css/useFormStyles";
// import useIndexStyles from "../common/css/useIndexStyles";
import  i18next from 'i18next'; 
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const useStyles = makeStyles((theme) => ({
 
  paper: {
    // padding: theme.spacing(3, 6),
    padding: theme.spacing(0, 2, 2, 2),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginBottom:theme.spacing(4),
  },
   root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1100px",
    minWidth: "1100px",
     [theme.breakpoints.down("1100px")]: {
      minWidth: "600px",
       marginTop: theme.spacing(2),
    },
  
    [theme.breakpoints.down("md")]: {
      minWidth: "600px",
       marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "250px",
    },
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  headerSpan: {
    fontWeight: "bold",
  },
  mainContainer:{
      paddingLeft: theme.spacing(16),
       paddingRight: theme.spacing(16),
     [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
       paddingRight: theme.spacing(2),
      marginTop:theme.spacing(4),
    },
  }
}));

const defaultValues = {
  Title: "",
  Name: "",
  Fname: "",
  MName: "",
  DOB: "",
  Gender: "",
  MaritalStatus: "",
  Email: "",
  Occupation: "",
  AnnualIncome: "",
  PoliticalYN: "",

  House: "",
  Locality: "",
  Landmark: "",

  State: "",
  District: "",
  City: "",
  PinCode: "",
  PAN: "",
  AadhaarCode: "",
  AadhaarFile: "",
};

const defaultAdhrAddr = {
  _house: "",
  _loc: "",
  _po: "",
  _street: "",
  _landmark: "",
  _vtc: "",
  _pc: "",
  _dist: "",
  _state: "",
};

export default function CustIndex() {
  const classes = useStyles();
  //   const {
  //     handleSubmit,
  //     register,
  //     trigger,
  //     getValues,
  //     reset,
  //     control,
  //     errors,
  //   } = useForm({
  //     defaultValues,
  //     // reValidateMode: "onBlur",
  //     mode: "onBlur",
  //     shouldUnregister: false
  //   });

  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const matchesSm = useMediaQuery("(min-width:380px)");
  const [step, setStep] = useState({ stepOne: true });
  const [custInfo, setCustInfo] = useState([]);
  const [custAdhrAdd, setCustAdhrAdd] = useState([]);
  // const [fileName, setfileName] = useState();

  useEffect(() => {
    // const dataPara = {  CustId: RED_Cust.red_CustId, CustMobNo: RED_Cust.red_CustMob};
    console.log("RED_Cust store res ", RED_Cust);
    const dataPara = {
      CustId: RED_Cust.red_CustId,
      CustMobNo: RED_Cust.red_CustMob,
    };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
      HttpService.PostAjaxData(dataPara, "MainService/GetCustomerReviewData")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("GetCustomerReviewData res ", responseJSON);
          if (responseJSON.ResponseCode === "000") {
            setCustInfo(responseJSON.CustBasicInfo);
            setCustAdhrAdd(responseJSON.CustAadhaarPoa);
          } else {
            swal("Alert!", responseJSON.ResponseMessage, "error");
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  }, []);

  const nextScheduleCall = () => {
    history.push("/ScheduleNow");
  };
  const prevPage = () => {
    history.push("/CustInfo");
  };

  return (
    <LayoutCustApp>
    <div className={classes.mainContainer}>
       {/* <Container maxWidth={false} > */}
       <Container >
        <Paper elevation={matchesSm ? 3 : 3}>
       <div className={classes.paper}>
        {/*start top header */}
           <Box m={1} />
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {/* <Grid item xs={12}>
                <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
              </Grid> */}
              <Grid item xs={12} style={{ paddingLeft: "10px" }}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item>
                    <Typography
                      component="h2"
                      variant="h6"
                      className={classes.contentHeading}
                    >
                     {i18next.t('custInfoHeaderReview')}
                    </Typography>
                  </Grid>
                   <Box m={1} />
                  {/* <Grid item>
                    <Typography
                      variant="caption"
                      className={classes.contentSubHeading}
                    >
                      <i>As Per Aadhaar</i>
                    </Typography>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="fullWidth" className={classes.headingDivider} />
              </Grid>
               
            </Grid>
            {/*end top header */}
          
  <form
              noValidate
              // onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container justify="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Box m={1} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldNameNew')}
                    value={custInfo.Name || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldFather')}
                    name="Fname"
                    value={custInfo.FatherName || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldMother')}
                    name="Mname"
                    value={custInfo.MotherName || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldDob')}
                    name="Title"
                    value={custInfo.DOB || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldGender')}
                    name="Title"
                    value={custInfo.Gender == "M" ? "Male" : "Female"}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldMaritalStatus')}
                    value={custInfo.MaritalStatus || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldEmail')}
                    value={custInfo.Email || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={4}>
                  <TextField
                    id="occ"
                    fullWidth
                    label={i18next.t('custFieldBusiness')}
                    value={custInfo.Occupation || ""}
                    readOnly
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2} xl={2}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldIncome')}
                    value={custInfo.AnnualIncome || ""}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2} xl={2}>
                  <TextField
                    fullWidth
                    label={i18next.t('custFieldPolitics')}
                    value={custInfo.PolitcallyExpYN || ""}
                    readOnly
                  />
                </Grid>
              </Grid>
              <Box m={0.4} />
              <Box
                item
                lg={12}
                display="flex"
                flexDirection="column"
                style={{ width: "100%", textAlign: "justify" }}
              >
                <Box lg={12} style={{ padding: "10px" }}>
                  <Typography variant="body2" gutterBottom>
                   {i18next.t('communicationAddress')}
                  </Typography>
                </Box>
              </Box>
           
           
              <Card elevation={3} style={{ width: "100%" }}>
              <div style={{ width: '100%' }}>
      
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldHome')} :</span>{" "}
                    {custInfo.House}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldArea')} :</span>{" "}
                    {custInfo.Locality}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldLandMark')} :</span>{" "}
                    {custInfo.Landmark}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldCity')} :</span>{" "}
                    {custInfo.City}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldPincode')} :</span>{" "}
                    {custInfo.PinCode}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldDistrict')} :</span>{" "}
                    {custInfo.District}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldState')} :</span>{" "}
                    {custInfo.State}
        </Box>
      </Box>
    </div>
              </Card>
      

              <Box m={0.4} />
              <Box
                item
                lg={12}
                display="flex"
                flexDirection="column"
                style={{ width: "100%", textAlign: "justify" }}
              >
                <Box lg={12} style={{ padding: "10px" }}>
                 {i18next.t('permanantAddress')}
                </Box>{" "}
              </Box>
           
              <Card elevation={3} style={{ width: "100%" }}>
              <div style={{ width: '100%' }}>
      
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldHome')} :</span>{" "}
                    {custAdhrAdd._house}
        </Box>

        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldArea')} :</span>{" "}
                    {custAdhrAdd._loc}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldLandMark')} :</span>{" "}
                    {custAdhrAdd._landmark}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldCity')} :</span>{" "}
                    {custAdhrAdd._vtc}
        </Box>
       
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldPincode')} :</span>{" "}
                    {custAdhrAdd._pc}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldDistrict')} :</span>{" "}
                    {custAdhrAdd._dist}
        </Box>
        <Box p={1}>
        <span className={classes.headerSpan}>{i18next.t('custFieldState')} :</span>{" "}
                    {custAdhrAdd._state}
        </Box>
               </Box>
    </div>
              </Card>
           
            
              <Box m={2} />
              <Grid container justify="center" spacing={2}>
                {/* <Grid item lg={3} md={3} sm={6} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="button"
                    className={classes.buttonArea}
                    onClick={prevPage}
                  >
                    PREVIOUS
                  </Button>
                </Grid> */}
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buttonArea}
                    onClick={nextScheduleCall}
                  >
                   {i18next.t('btnNext')}
                  </Button>
                </Grid>
              </Grid>

              {/* <Box display="flex" justifyContent="center" m={1} p={1}>
                <Box p={1}>
                  <Copyright />
                </Box>
              </Box> */}
            </form>
       </div>
        </Paper>
      </Container>
     </div>
    </LayoutCustApp>
  );
}
