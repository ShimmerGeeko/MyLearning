import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberPinIcon from "@material-ui/icons/FiberPin";
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
import { trackPromise } from "react-promise-tracker";
import HttpService from "../../HttpService";
import swal from "sweetalert";
import Container from "@material-ui/core/Container";
import CustBreadcrumb from "../common/CustBreadcrumb";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import InputAdornment from "@material-ui/core/InputAdornment";
import PanImg from "../../Images/phoneotp.png";
import i18next from "i18next";
import swal2 from "sweetalert2";
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
  },
  contentHeading: {
    textAlign: "center",
    fontWeight: "400",
    color: "#555555",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    marginTop: theme.spacing(1),
    borderBottom: "2px solid #1f91f3",
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 4, 5, 4),
    justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%", // Fix IE 11 issue.
  },
  //   form: {
  //     width: "100%", // Fix IE 11 issue.
  //     marginTop: theme.spacing(1),
  //     justify: "center"
  //   },
  // button: {
  //     // margin: theme.spacing(3, 0, 2),
  //     backgroundColor: "#1f91f3",
  //     textTransform: "none",
  // },
  checkboxFormCtrl: {
    display: "table",
    paddingTop: theme.spacing(2),
    textAlign: "left",
  },
  checkboxFormCtrlLabel: {
    display: "table-cell",
    fontSize: "0.9rem",
    color: "#555555",
  },
  // submit: {
  //   margin: theme.spacing(4, 0, 0),
  // },
  gridItemSppacing: {
    padding: theme.spacing(1),
  },
  gridList: {
    height: 50,
  },
  buttonArea: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}));

const defaultValues = {
  mobileNo: "",
  txtOTP: "",
  CustRefId: "",
  otpGenerated: false,
  otpLabel: "Submit",
};
var respCode = "";
var respMsg = "";

export default function CustAccountIndex() {
  const classes = useStyles();
  const history = useHistory();
  const [thirdScreen, setThirdScreen] = useState(false);
  const [mobileNoError, setMobileNoError] = useState("");
  const [CustRefIdError, setCustRefIdError] = useState("");
  const [otpNoError, setOtpNoError] = useState("");
  const [accSelect, setAccSelect] = useState(false);
  const [badgeIA, setbadgeIA] = useState({
    BadgeText: i18next.t("Individual"),
    BadgeNumber: i18next.t("Account"),
    BadgeColor: "#FFF",
  });
  const [badgeOA, setbadgeOA] = useState({
    BadgeText: i18next.t("Organization"),
    BadgeNumber: i18next.t("Account"),
    BadgeColor: "#FFF",
  });
  const { handleSubmit, register, trigger, getValues, reset, control, errors } =
    useForm({
      defaultValues,
      reValidateMode: "onChange",
    });
  const [data, setData] = useState(defaultValues);
  const [otpValid, setOtpValid] = useState(false);
  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();

  var ApplType = RED_Cust.red_ApplType;
  console.log("ApplType 111>>>", RED_Cust);
  useEffect(() => {
    console.log("Effect otp flag", data);
  }, [data]);

  const validateCustomer = (customerMobileNumber, CustRefId) => {
    const phoneRegex = /^\d+$/;
    if (customerMobileNumber.trim() == "") {
      setOtpNoError("");
      setMobileNoError("This field is required");
      return;
    } else if (customerMobileNumber.length > 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (customerMobileNumber.length < 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (!phoneRegex.test(customerMobileNumber)) {
      setOtpNoError("");
      setMobileNoError("Only Numbers are allowed!");
      return;
    } else if (accSelect) {
      if (CustRefId.trim() == "") {
        setOtpNoError("");
        setMobileNoError("");
        setCustRefIdError("This field is required");
        return;
      }
    } else {
      setOtpNoError("");
      setMobileNoError("");
      setCustRefIdError("");
    }
    debugger;
    const Data = { custMobNo: customerMobileNumber, CustRefId: CustRefId };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(Data, "MainService/ValidateCustomer")
      .then((resp) => {
        swal2.close();
        console.log("ValidateCustomer ", resp);
        let responseJSON = resp.data;
        respCode = responseJSON.ResponseCode;
        respMsg = responseJSON.ResponseMessage;
        if (responseJSON.ResponseCode === "000") {
          if (
            responseJSON.JointRefId != "NA" &&
            responseJSON.JointRefId != null
          ) {
            // sessionStorage.setItem("sesParamJointRefId", responseJSON.JointRefId);
            dispatch(storeCust("JointRefId", responseJSON.JointRefId));
          } else {
            dispatch(storeCust("JointRefId", "NA"));
          }
          // sessionStorage.setItem("sesParamExistingCust", 'N');
          GenerateOTP(customerMobileNumber, responseJSON.ResponseCode, "");
        } else if (responseJSON.ResponseCode === "100") {
          // sessionStorage.setItem("sesParamExistingCust", 'Y');
          dispatch(storeCust("JointRefId", "NA"));
          //   sessionStorage.setItem("sesParamCustId", responseJSON.Response);
          GenerateOTP(
            customerMobileNumber,
            responseJSON.ResponseCode,
            responseJSON.ResponseMessage
          );
        } else if (
          responseJSON.ResponseCode === "104" ||
          responseJSON.ResponseCode === "105"
        ) {
          //             sessionStorage.setItem("sesParamExistingCust", 'Y');
          //   sessionStorage.setItem("sesParamCustId", responseJSON.Response);
          GenerateOTP(
            customerMobileNumber,
            responseJSON.ResponseCode,
            responseJSON.ResponseMessage
          );
        } else {
          swal("Alert", responseJSON.ResponseMessage, "error");
        }
      })
      .catch((error) => {
      //  setState.otpGenerated = false;
        setData({ ...data, otpGenerated: false });
        console.log(error, "Response Error!");
      });
  };

  function GenerateOTP(customerMobileNumber, respCode, respMsg) {
    //  var selLang = sessionStorage.getItem("selLanguage");
    var defaultMessage = "";
    var defaultIcon = "";
    var Data = {
      MobNo: customerMobileNumber,
    };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(Data, "MainService/GenerateOTP")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        if (responseJSON.ResponseCode === "000") {
          setData({ ...data, otpGenerated: true });
          console.log("OTP >>>", responseJSON.Response.OTP);
          swal(
            "Success",
            "Your OTP Is " + responseJSON.Response.OTP,
            "success"
          );
        } else {
          //setState.otpGenerated = false;
          setData({ ...data,otpGenerated: false });
          console.log("EX_Code: ", responseJSON.ResponseCode);
          swal("Alert!", responseJSON.ResponseMessage, "warning");
        }
      })
      .catch((error) => {
       // setState.otpGenerated = false;
        setData({ ...data, otpGenerated: false });
        console.log(error, "Response Error!");
      });
  }

  // function GenerateOTP(customerMobileNumber) {
  //     const Data = { MobNo: customerMobileNumber };
  //     trackPromise(
  //         HttpService.PostAjaxData(Data, "MainService/GenerateOTP")
  //             .then((resp) => {
  //                 let responseJSON = resp.data;
  //                 if (responseJSON.ResponseCode === "000") {
  //                     setData({ ...data, otpGenerated: true });
  //                     console.log('OTP >>>', responseJSON.Response.OTP);
  //                     swal("Success", "Your OTP Is " + responseJSON.Response.OTP, "success");
  //                 } else {
  //                     setState.otpGenerated = false;
  //                     setData({ ...data });
  //                     console.log("EX_Code: ", responseJSON.ResponseCode);
  //                     swal("Alert!", responseJSON.ResponseMessage, "warning");
  //                 }
  //             })
  //             .catch((error) => {
  //                 setState.otpGenerated = false;
  //                 setData({ ...data });
  //                 console.log(error, "Response Error!");
  //             })
  //     );
  // };

  const submitForm = (mobileNo, txtOTP) => {
    // setData(data);
    debugger;
    var defaultMessage = "";
    var defaultIcon = "";
    console.log("RED_Cust PREV", RED_Cust);
    const Data = { MobNo: data.mobileNo, OTP: data.txtOTP };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(Data, "MainService/ValidateOTP")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("responseJSON", responseJSON);
        console.log("respCode", respCode);
        console.log("ApplType", ApplType);
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
                history.push("/AccountopeningInfo");
                // window.location.href = './CustInfo_mr.html';
              } else if (ApplType === 2) {
                setThirdScreen(true);
                setOtpValid(true);
                // history.push('/CustAccountIndex');
                // window.location.href = './AccountType_mr.html';
              } else if (ApplType === 3) {
                // window.location.href = './CustInfoCC_mr.html';
              } else if (ApplType === 4) {
                // window.location.href = './CustInfoReKYC_mr.html';
              } else if (ApplType === 5) {
              }
            });
          } else {
            defaultMessage = respMsg;
            debugger;
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
      });

    // dispatch(storeCust("red_CustMob", data.mobileNo));
    console.log("RED_Cust NEXT", RED_Cust);
  };

  const onJointAccount = () => {};
  const onNewAccount = (bol) => {
    debugger;
    reset();
    setData({
      ...data,
      mobileNo: "",
      txtOTP: "",
      CustRefId: "",
      otpGenerated: false,
    });
    setAccSelect(bol);
  };
  const nextFormOA = () => {
    swal("Coming Soon...", "", "info");
    return;
  };
  const nextFormIA = () => {
    history.push("/AccountopeningInfo");
  };
  // const handleChange = (event) => {
  //   console.log(event.target.name);
  //   setData({ ...data, [event.target.name]: event.target.checked });
  // };
  console.log("errors", errors);

  return (
    <LayoutCustNew>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className={classes.paper}
          >
            {/*start top header */}
            <Grid
              container
              direction="row"
              justify="center"
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
                <Grid
                  container
                  direction="column"
                  // justify="center"
                  // alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      {i18next.t("custHeader")}
                    </Typography>
                  </Grid>
                  <Box m={1} />
                  <Grid
                    container
                    item
                    direction="column"
                    // spacing={2}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            //color="#1f91f3 !important"
                            size="small"
                            onClick={() => onNewAccount(false)}
                            style={{
                              backgroundColor: "#1f91f3",
                              color: "#fff",
                            }}
                            startIcon={<PersonAddIcon />}
                          >
                            {i18next.t("btnNewAccount")}
                          </Button>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} xl={6}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => onNewAccount(true)}
                            style={{
                              backgroundColor: "#9C27B0",
                              color: "#fff",
                            }}
                            startIcon={<GroupIcon />}
                          >
                            {i18next.t("btnJointAccount")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box m={1} />
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={8} lg={6} md={6} xl={6}>
                      <TextField
                        fullWidth
                        label={i18next.t("fieldMobile")}
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
                    </Grid>
                  </Grid>
                  {accSelect ? (
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={8} lg={6} md={6} xl={6}>
                        <TextField
                          fullWidth
                          label={i18next.t("custRefId")}
                          name="CustRefId"
                          autoComplete="off"
                          value={data.CustRefId}
                          autoComplete="off"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FiberPinIcon />
                              </InputAdornment>
                            ),
                          }}
                          autoFocus
                          onChange={(e) =>
                            setData({ ...data, CustRefId: e.target.value })
                          }
                          error={CustRefIdError !== ""}
                          helperText={
                            CustRefIdError !== "" ? CustRefIdError : " "
                          }
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                  {/* <Box m={1} /> */}
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={8} lg={6} md={6} xl={6}>
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        name="btnGenOTP"
                        type="button"
                        style={{ width: "50%", margin: "4px 0px" }}
                        className={classes.buttonArea}
                        onClick={async () => {
                          data.otpLabel = i18next.t("btnSubmit");
                          setData({
                            ...data,
                            otpLabel: i18next.t("btnSubmit"),
                          });
                          validateCustomer(data.mobileNo, data.CustRefId);
                        }}
                      >
                        {i18next.t("btnSubmit")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : !thirdScreen ? (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}></Grid>
                  {/* <Box m={1} /> */}
                  <Grid item xs={12} md={12} xl={12}>
                    <img
                      src={PanImg}
                      alt="PhoneOtp"
                      className={classes.gridList}
                    />
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={8} lg={6} md={6} xl={6}>
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
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={8} lg={6} md={6} xl={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={async () => {
                          await submitForm(data.mobileNo, data.txtOTP);
                        }}
                        //style={{ width: "50%", margin: "4px 0px" }}
                        className={classes.buttonArea}
                        //   onClick={this._showHideComp.bind(null, false)}
                      >
                        {i18next.t("btnSubmit")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Box m={1} />
                  <Grid item xs={12} lg={12} md={12} xl={12}>
                    <BadgeRight
                      badgeData={badgeIA}
                      fnShowHide={nextFormIA}
                      badgeType="RK"
                    >
                      <PersonIcon style={{ fill: "#3F51B5" }} />
                    </BadgeRight>
                  </Grid>
                  <Grid item xs={12} lg={12} md={12} xl={12}>
                    <BadgeRight
                      badgeData={badgeOA}
                      fnShowHide={nextFormOA}
                      badgeType="RK"
                    >
                      <AccountBalanceIcon style={{ fill: "#009688" }} />
                    </BadgeRight>
                  </Grid>
                </Grid>
              )}
            </form>
            {/*end otp */}
          </Grid>
        </Paper>
      </Container>
    </LayoutCustNew>
  );
}
