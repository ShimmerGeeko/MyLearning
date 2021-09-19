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
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import PanImg from "../../Images/phoneotp.png";
import useIndexStyles from "../common/css/useIndexStyles";
import i18next from "i18next";
import swal2 from "sweetalert2";
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//     flexGrow: 1,
//   },
//   contentHeading: {
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
  customerNo: "",
  otpGenerated: false,
  otpLabel: "Submit",
};
var respCode = "";
var respMsg = "";

export default function RekycIndex() {
  const classes = useIndexStyles();
  const history = useHistory();
  const [mobileNoError, setMobileNoError] = useState("");
  const [customerNoError, setCustomerNoError] = useState("");
  const [otpNoError, setOtpNoError] = useState("");

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

  useEffect(() => {}, [data]);

  const validateCustomer = (mobileNo, customerNo) => {
    const phoneRegex = /^\d+$/;
    if (mobileNo.trim() == "") {
      setOtpNoError("");
      setMobileNoError("This field is required");
      return;
    } else if (mobileNo.length > 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (mobileNo.length < 10) {
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (!phoneRegex.test(mobileNo)) {
      setOtpNoError("");
      setMobileNoError("Only Numbers are allowed!");
      return;
    } else if (customerNo.trim() == "") {
      setCustomerNoError("This field is required");
      setOtpNoError("");
      setMobileNoError("");
      return;
    } else {
      setOtpNoError("");
      setMobileNoError("");
    }

    const OperationDate = new Date();
    const Data = {
      CustNo: customerNo,
      inParam: {
        mplLBrCode: 0,
        // mplOprnDate: "2021-01-18",
        mplOprnDate: OperationDate.toISOString(),
        mplUserCd1: "string",
        mplUserCd2: 0,
        mplStnNo: 0,
        ProgMode: 8,
        mplPrgParam: "string",
        mplHomeCurCd: "string",
        mplGrpCd: 0,
      },
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
    HttpService.PostCBSAjaxData(Data, "MainService/GetAllCustomerMasterNew")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        debugger;
        respCode = responseJSON.ResponseCode;
        respMsg = responseJSON.ResponseMessage;

        setData({ ...data, otpLabel: "Resend OTP" });
        if (resp.status === 200) {
          if (responseJSON.key != null) {
            if (responseJSON.key.PagerNo != mobileNo) {
              swal(
                "Alert",
                "Please Enter Your Registered Mobile Number To Proceed!",
                "error"
              );
            } else {
              debugger;
              validateCustomerMobileNo(mobileNo, customerNo);
            }
          } else {
            swal("Alert", "No Record Found!", "error");
          }
        }
      })
      .catch((error) => {
      //  setState.otpGenerated = false;
        setData({ ...data, otpGenerated: false });
      });
  };

  function validateCustomerMobileNo(mobileNo, customerNo) {
    const Data = { custMobNo: mobileNo };
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
        const responseJSON = resp.data;
        debugger;
        dispatch(storeCust("sesParamCBSCustNo", customerNo));
        // sessionStorage.setItem("sesParamCBSCustNo", txtCbsCustNo);

        if (responseJSON.ResponseCode === "000") {
          dispatch(storeCust("sesParamExistingCust", "N"));
          debugger;
          GenerateOTP(
            mobileNo,
            responseJSON.ResponseCode,
            responseJSON.ResponseMessage
          );
        } else if (responseJSON.ResponseCode === "100") {
          // dispatch(storeCust("sesParamExistingCust", "Y"));
          // dispatch(storeCust("sesParamCustId", responseJSON.Response));
          swal("Alert", responseJSON.ResponseMessage, "error").then(() => {
            history.push("/ScheduleNow");
          });
          // GenerateOTP(
          //   customerMobileNumber,
          //   responseJSON.ResponseCode,
          //   responseJSON.ResponseMessage
          // );
        } else if (
          responseJSON.ResponseCode === "104" ||
          responseJSON.ResponseCode === "105"
        ) {
          dispatch(storeCust("sesParamExistingCust", "Y"));
          dispatch(storeCust("sesParamCustId", responseJSON.Response));
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
        console.log(error, "Response Error!");
      });
  }
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
        debugger;
        if (responseJSON.ResponseCode === "000") {
          setData({ ...data, otpGenerated: true });

          swal(
            "Success",
            "Your OTP Is " + responseJSON.Response.OTP,
            "success"
          );
        } else {
          //setState.otpGenerated = false;
          setData({ ...data,otpGenerated: false });

          swal("Alert!", responseJSON.ResponseMessage, "warning");
        }
      })
      .catch((error) => {
       // setState.otpGenerated = false;
        setData({ ...data, otpGenerated: false });
      });
  }

  const submitForm = (mobileNo, txtOTP) => {
    // setData(data);

    const phoneRegex = /^\d+$/;
    if (txtOTP.trim() == "") {
      setOtpNoError("This field is required");
      setMobileNoError("");
      return;
    } else {
      setOtpNoError("");
      setMobileNoError("");
    }
    var defaultMessage = "";
    var defaultIcon = "";
    console.log("RED_Cust PREV", RED_Cust);
    const Data = { MobNo: mobileNo, OTP: txtOTP };
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

        if (responseJSON.ResponseCode === "000") {
          dispatch(storeCust("red_CustMob", data.mobileNo));
          const xExistingCust = RED_Cust.sesParamExistingCust;
          const xCustId = RED_Cust.sesParamCustId;

          if (xExistingCust === "Y" && xCustId != null && xCustId != "") {
            swal({
              title: "Success!",
              text: "OTP Validated Successfully!",
              type: "success",
            }).then(() => {
              history.push("/ScheduleNow");
            });
          } else {
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
                // history.push('/CustAccountIndex');
                // window.location.href = './AccountType_mr.html';
              } else if (ApplType === 3) {
                // window.location.href = './CustInfoCC_mr.html';
              } else if (ApplType === 4) {
                history.push("/custInfoReKYC");
                // window.location.href = './CustInfoReKYC_mr.html';
              } else if (ApplType === 5) {
              }
            });
          }
        } else {
          dispatch(storeCust("red_CustMob", ""));

          swal("Alert!", responseJSON.ResponseMessage, "warning");
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });

    // dispatch(storeCust("red_CustMob", data.mobileNo));
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
  console.log("errors", errors);

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
            <form noValidate>
              {!data.otpGenerated ? (
                <>
                  <div className={classes.textArea}>
                    <Typography
                      className={classes.textWeight}
                      variant="h6"
                      gutterBottom
                    >
                      {i18next.t("custHeader")}
                    </Typography>
                  </div>

                  <div className={classes.fieldAreaReKyc}>
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
                    <TextField
                      fullWidth
                      label={i18next.t("custIdNew")}
                      value={data.customerNo}
                      autoComplete="off"
                      inputProps={{ maxLength: 10 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiberPinIcon />
                          </InputAdornment>
                        ),
                      }}
                      autoFocus
                      onChange={(e) =>
                        setData({ ...data, customerNo: e.target.value })
                      }
                      error={customerNoError !== ""}
                      helperText={
                        customerNoError !== "" ? customerNoError : " "
                      }
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
                          validateCustomer(data.mobileNo, data.customerNo);
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
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={12} xl={12}>
                      <img
                        src={PanImg}
                        alt="PhoneOtp"
                        className={classes.gridList}
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
                        className={classes.submit}
                        onClick={async () => {
                          await submitForm(data.mobileNo, data.txtOTP);
                        }}
                        //   onClick={this._showHideComp.bind(null, false)}
                      >
                        {i18next.t("btnSubmit")}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </form>
          </div>
        </Paper>
      </Container>
    </LayoutCustNew>
  );
}
