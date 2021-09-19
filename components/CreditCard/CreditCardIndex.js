import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import BadgeRight from "../common/CustomBadgeRight";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { CardContent, CardHeader, Card } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import Copyright from "../common/Copyright";
import LayoutCustNew from "../LayoutCust/LayoutCustNew";
import PersonIcon from "@material-ui/icons/Person";
import { storeCust } from "../../redux/actions/mainAction";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../HttpService";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import Container from "@material-ui/core/Container";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import InputAdornment from "@material-ui/core/InputAdornment";
// import PhoneOtp from "../../Images/phone_otp.png";
import PanImg from "../../Images/phoneotp.png";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import useIndexStyles from "../common/css/useIndexStyles";
import  i18next from 'i18next';
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//     flexGrow: 1,
//   },
//   contentHeading: 
//     textAlign: "center",
//     fontWeight: "400",
//     color: "#555555",
//     paddingTop: theme.spacing(2),
//     paddingBottom: theme.spacing(1),
//   },
//   headingDivider: {
//     // borderWidth: "1px",
//     // borderColor: "#673AB7",
//     marginTop: theme.spacing(1),
//     border: "1px solid #673AB7",
//   },
//   paper: {
//     // margin: theme.spacing(3, 5),
//     padding: theme.spacing(2, 4, 5, 4),
//     justify: "center",
//     display: "flex",
//     // flexDirection: "column",
//     flexDirection: "row",
//     alignItems: "center",
//     textAlign: "center",
//     width: "100%", // Fix IE 11 issue.
//   },
//   //   form: {
//   //     width: "100%", // Fix IE 11 issue.
//   //     marginTop: theme.spacing(1),
//   //     justify: "center"
//   //   },
//   button: {
//     // margin: theme.spacing(3, 0, 2),
//     marginBottom: 0,
//     textTransform: "none",
//   },
//   checkboxFormCtrl: {
//     display: "table",
//     paddingTop: theme.spacing(2),
//     textAlign: "left",
//   },
//   checkboxFormCtrlLabel: {
//     display: "table-cell",
//     fontSize: "0.9rem",
//     color: "#555555",
//   },
//   submit: {
//     margin: theme.spacing(4, 0, 0),
//   },
//   gridItemSppacing: {
//     padding: theme.spacing(1),
//   },
//   gridList: {
//     height: 50,
//   },
// }));

const defaultValues = {
  mobileNo: "",
  txtOTP: "",
  otpGenerated: false,
  otpLabel: "Submit",
};
var respCode = "";
var respMsg = "";

export default function Creditcardindex() {
  const classes = useIndexStyles();
  const history = useHistory();
  const [badgeIA, setbadgeIA] = useState({
    BadgeText: "Individual",
    BadgeNumber: "Account",
    BadgeColor: "#FFF",
  });
  const [badgeOA, setbadgeOA] = useState({
    BadgeText: "Organization",
    BadgeNumber: "Account",
    BadgeColor: "#FFF",
  });

  const [data, setData] = useState(defaultValues);
  const [otpValid, setOtpValid] = useState(false);
  const RED_Cust = useSelector((state) => state.mainReducer);
  const [mobileNoError, setMobileNoError] = useState("");
  const [otpNoError, setOtpNoError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({
      ...user,
      role: event.target.value,
    });
  };

  var ApplType = RED_Cust.red_ApplType;
  console.log("ApplType >>>", RED_Cust);
  useEffect(() => {
    console.log("Effect otp flag", data);
  }, [data]);

  const validateCustomer = (value) => {
    const phoneRegex = /^\d+$/;
    if (value.trim() == "") {
      setOtpNoError("");
      setMobileNoError("This field is required");
      return;
    } else if (value.length > 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (value.length < 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (!phoneRegex.test(value)) {
      setOtpNoError("");
      setMobileNoError("Only Numbers are allowed!");
      return;
    } else {
      setOtpNoError("");
      setMobileNoError("");
    }
    debugger;
    const Data = { custMobNo: value };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
      HttpService.PostAjaxData(Data, "MainService/ValidateCustomer")
        .then((resp) => {
          swal2.close();
          console.log("ValidateCustomer ", resp);
          let responseJSON = resp.data;
          respCode = responseJSON.ResponseCode;
          respMsg = responseJSON.ResponseMessage;
          if (responseJSON.ResponseCode === "000") {
            setData({ ...data, otpLabel: "Resend OTP" });
            GenerateOTP(value);
          } else if (responseJSON.ResponseCode === "100") {
            dispatch(storeCust("red_CustId", responseJSON.Response));
            setData({ ...data, otpLabel: "Resend OTP" });
            GenerateOTP(value);
          } else if (
            responseJSON.ResponseCode === "104" ||
            responseJSON.ResponseCode === "105"
          ) {
            dispatch(storeCust("red_CustId", responseJSON.Response));
            GenerateOTP(value);
          } else {
            swal("Alert", responseJSON.ResponseMessage, "error");
          }
        })
        .catch((error) => {
         // setState.otpGenerated = false;
          setData({ ...data, otpGenerated: false });

          console.log(error, "Response Error!");
        })
    
  };

  function GenerateOTP(customerMobileNumber) {
    const Data = { MobNo: customerMobileNumber };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
      HttpService.PostAjaxData(Data, "MainService/GenerateOTP")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          if (responseJSON.ResponseCode === "000") {
            setData({
              ...data,
              otpGenerated: true,
            });
            console.log("OTP >>>", responseJSON.Response.OTP);
            swal(
              "Success",
              "Your OTP Is " + responseJSON.Response.OTP,
              "success"
            );
          } else {
           // setState.otpGenerated = false;
            setData({ ...data, otpGenerated: false });
            console.log("EX_Code: ", responseJSON.ResponseCode);
            swal("Alert!", responseJSON.ResponseMessage, "warning");
          }
        })
        .catch((error) => {
        //  setState.otpGenerated = false;
          setData({ ...data, otpGenerated: false });
          console.log(error, "Response Error!");
        })
    
  }

  const submitForm = (MobNo, OTP) => {
    const phoneRegex = /^\d+$/;
    if (OTP.trim() == "") {
      setOtpNoError("This field is required");
      setMobileNoError("");
      return;
    } else if (OTP.length > 6) {
      setOtpNoError("Please Enter a six digit Number");
      setMobileNoError("");
      return;
    } else if (OTP.length < 6) {
      setOtpNoError("Please Enter a six digit Number");
      setMobileNoError("");
      return;
    } else if (!phoneRegex.test(OTP)) {
      setOtpNoError("Only Numbers are allowed!");
      setMobileNoError("");
      return;
    } else {
      setOtpNoError("");
      setMobileNoError("");
    }
    // setData(data);
    debugger;
    var defaultMessage = "";
    var defaultIcon = "";
    console.log("RED_Cust PREV", RED_Cust);
    const Data = { MobNo: MobNo, OTP: OTP };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
      HttpService.PostAjaxData(Data, "MainService/ValidateOTP")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          if (responseJSON.ResponseCode === "000") {
            dispatch(storeCust("red_CustMob", data.mobileNo));
            if (respCode === "000") {
              // fresh customer
              defaultMessage = respMsg;
              swal({
                title: "Success!",
                text: "OTP Validated Successfully",
                icon: "success",
              }).then(() => {
                //ApplType from Redux red_ApplType
                if (ApplType === 1) {
                  history.push("/custInfo");
                  // window.location.href = './CustInfo_mr.html';
                } else if (ApplType === 2) {
                  setOtpValid(true);
                  // history.push('/CustAccountIndex');
                  // window.location.href = './AccountType_mr.html';
                } else if (ApplType === 3) {
                  history.push("/Custinfocc");
                  // window.location.href = './CustInfoCC_mr.html';
                } else if (ApplType === 4) {
                  // window.location.href = './CustInfoReKYC_mr.html';
                } else if (ApplType === 5) {
                }
              });
            } else {
              defaultMessage = respMsg;
              swal({
                title: "Success!",
                text: defaultMessage,
                icon: "info",
              }).then(() => {
                history.push("/ScheduleNow");
              });
            }
          } else {
            dispatch(storeCust("red_CustMob", ""));
            console.log("EX_Code: ", responseJSON.ResponseCode);
            swal("Alert!", responseJSON.ResponseMessage, "warning");
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
    // dispatch(storeCust("red_CustMob", data.mobileNo));
    console.log("RED_Cust NEXT", RED_Cust);
  };

  const nextFormOA = () => {
    swal("Coming Soon...", "", "info");
    return;
  };
  const nextFormIA = () => {
    history.push("/custInfo");
  };
  // const handleChange = (event) => {
  //   console.log(event.target.name);
  //   setData({ ...data, [event.target.name]: event.target.checked });
  // };

  return (
    <LayoutCustNew>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          <div className={classes.paper}>
            {/*start top header */}
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" className={classes.headingDivider} />
              </Grid>
            </Grid>
            {/*end top header */}
            <Box m={1} />

            {/*start otp */}
            <form noValidate>
              {!data.otpGenerated ? (
                <>
                  <div className={classes.textArea}>
                    <Typography
                      className={classes.textWeight}
                      variant="h6"
                      gutterBottom
                    >
                      {i18next.t('custHeader')}
                    </Typography>
                  </div>

                  <div className={classes.fieldArea}>
                    <TextField
                      fullWidth
                      label={i18next.t('fieldMobile')}
                      value={data.mobileNo}
                      autoComplete="off"
                      inputProps={{ maxLength: 10 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneAndroidIcon />
                          </InputAdornment>
                        ),
                      }}
                      autoFocus
                      onChange={(e) =>
                        setData({ ...data, mobileNo: e.target.value })
                      }
                      error={mobileNoError !== ""}
                      helperText={mobileNoError !== "" ? mobileNoError : " "}
                    />

                    <Box m={2} />
                  </div>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="primary"
                        name="btnGenOTP"
                        type="button"
                        className={classes.buttonArea}
                        onClick={async () => {
                          validateCustomer(data.mobileNo);
                        }}
                      >
                        {data.otpLabel}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <img
                        src={PanImg}
                        alt="PhoneOtp"
                        className={classes.otpImageHeight}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="txtOTP"
                        label="OTP"
                        type="password"
                        fullWidth
                        value={data.txtOTP}
                        autoComplete="off"
                        autoFocus
                        inputProps={{ maxLength: 6 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FiberPinIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) =>
                          setData({ ...data, txtOTP: e.target.value })
                        }
                        error={otpNoError !== ""}
                        helperText={otpNoError !== "" ? otpNoError : " "}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        //style={{ width: "80%", margin: "4px 0px" }}
                        type="button"
                        className={classes.buttonArea}
                        onClick={async () => {
                          await submitForm(data.mobileNo, data.txtOTP);
                        }}
                        //   onClick={this._showHideComp.bind(null, false)}
                      >
                        {i18next.t('btnSubmit')}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
             
            </form>
            {/*end otp */}
          </div>
        </Paper>
      </Container>
    </LayoutCustNew>
  );
}

// <LayoutCustNew>
// <Container maxWidth="sm">
//   <Paper elevation={3}>
//     <Grid
//       container
//       justify="center"
//       spacing={2}
//       className={classes.paper}
//     >
//       {/*start top header */}
//       <Grid
//         container
//         direction="row"
//         justify="flex-start"
//         alignItems="center"
//       >
//         <Grid item xs={12}>
//           <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
//         </Grid>
//         <Grid item xs={12}>
//           <Divider variant="middle" className={classes.headingDivider} />
//         </Grid>
//       </Grid>
//       {/*end top header */}
//       <Box m={1} />

//       {/*start otp */}
//       <form noValidate onSubmit={handleSubmit(onSubmit)}>
//         {!data.otpGenerated ? (
//           <Container maxWidth="sm">
//             {/*start heading */}
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="center"
//             >
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Open Zero-Contact Video KYC Digital Account without any
//                   paperwork.
//                 </Typography>
//               </Grid>
//             </Grid>
//             {/*end heading */}

//             <Grid container direction="column" justify="center">
//               <Grid item xs={12} md={12} xl={12}>
//                 <Controller
//                   as={
//                     <TextField
//                       // variant="outlined"
//                       margin="normal"
//                       // required
//                       fullWidth
//                       label="Mobile Number"
//                       name="mobileNo"
//                       autoComplete="off"
//                       inputProps={{ maxLength: 10 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneAndroidIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                       autoFocus
//                     />
//                   }
//                   name="mobileNo"
//                   defaultValue=""
//                   control={control}
//                   rules={{
//                     required: {
//                       value: true,
//                       message: "This Field is required!",
//                     },
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "Only Numbers are allowed!",
//                     },
//                     minLength: {
//                       value: 10,
//                       message: "Enter 10 digit Mobile Number!",
//                     },
//                   }}
//                 />
//                 {errors.mobileNo && (
//                   <FormHelperText error>
//                     {errors.mobileNo.message}
//                   </FormHelperText>
//                 )}
//               </Grid>

//               <Box m={1} />

//               <Grid item xs={12}>
//                 <Button
//                   fullWidth
//                   size="medium"
//                   variant="contained"
//                   color="primary"
//                   name="btnGenOTP"
//                   type="button"
//                   style={{ width: "50%", margin: "4px 0px" }}
//                   className={classes.button}
//                   onClick={async () => {
//                     const result = await trigger("mobileNo");
//                     if (result) {
//                       const valMobNo = getValues("mobileNo");
//                       console.log("get Val Mob:", valMobNo);
//                       data.otpLabel = "Resend OTP";
//                       setData({ ...data, otpLabel: data.otpLabel,  });
//                       validateCustomer(valMobNo);
//                     }
//                   }}
//                 >
//                   {data.otpLabel}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Container>
//         ) : (
//           <Container maxWidth="sm">
//             {/*start heading */}
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="center"
//             >
//               <Grid item xs={12}></Grid>
//             </Grid>
//             {/*end heading */}

//             <Grid container direction="column" justify="center">
//               <Box m={1} />
//               <Grid item xs={12} md={12} xl={12}>
//                 <img
//                   src={PanImg}
//                   alt="PhoneOtp"
//                   className={classes.gridList}
//                 />
//               </Grid>
//               <Grid item xs={12} md={12} xl={12}>
//                 <Controller
//                   as={
//                     <TextField
//                       name="txtOTP"
//                       label="OTP"
//                       type="password"
//                       fullWidth
//                       margin="normal"
//                       autoComplete="off"
//                       inputProps={{ maxLength: 6 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <FiberPinIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   }
//                   name="txtOTP"
//                   defaultValue=""
//                   control={control}
//                   rules={{
//                     required: {
//                       value: true,
//                       message: "This Field is required!",
//                     },
//                     pattern: {
//                       value: /^\d+$/,
//                       message: "Only Number are allowed!",
//                     },
//                     minLength: {
//                       value: 6,
//                       message: "Enter 6 digit OTP!",
//                     },
//                   }}
//                 />
//                 {errors.txtOTP && (
//                   <FormHelperText error>
//                     {errors.txtOTP.message}
//                   </FormHelperText>
//                 )}
//               </Grid>

//               {/* <Box m={1} /> */}

//               <Grid item xs={12}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   //style={{ width: "80%", margin: "4px 0px" }}
//                   type="submit"
//                   className={classes.submit}
//                   //   onClick={this._showHideComp.bind(null, false)}
//                 >
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </Container>
//         )}
//       </form>
//       {/*end otp */}
//     </Grid>
//   </Paper>
// </Container>
// </LayoutCustNew>
