import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SendIcon from "@material-ui/icons/Send";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Copyright from "../common/Copyright";
import LayoutCustNew from "./LayoutCustNew";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";
import { trackPromise } from "react-promise-tracker";
import HttpService from "../../HttpService";
import i18next from 'i18next';
//import swal from "sweetalert";
import Swal from "sweetalert2";
import CustBreadcrumb from "../common/CustBreadcrumb";
import Container from "@material-ui/core/Container";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import InputAdornment from "@material-ui/core/InputAdornment";
import PanImg from "../../Images/phoneotp.png";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useIndexStyles from "../common/css/useIndexStyles";

const defaultValues = {
  mobileNo: "",
  txtOTP: "",
  ckIndian: false,
  ckLocation: false,
  otpGenerated: false,
  otpLabel: "Generate OTP",
  xLatitude: 0,
  xLongitude: 0,
};
var respCode = "";
var respMsg = "";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
export default function CustIndex() {

  const classes = useIndexStyles();
  const matchesXs = useMediaQuery("(min-width:320px)");
  const matchesSm = useMediaQuery("min-width:600px");
  const history = useHistory();
  const [data, setData] = useState(defaultValues);
  const RED_Cust = useSelector((state) => state.mainReducer);
  const [otpValid, setOtpValid] = useState(false);
  const [mobileNoError, setMobileNoError] = useState("");
  const [checkboxError, setcheCkboxError] = useState(false);
  const [otpNoError, setOtpNoError] = useState("");
  const dispatch = useDispatch();

  var ApplType = RED_Cust.red_ApplType;
  console.log("ApplType >>>", RED_Cust);
  useEffect(() => {

    console.log("Effect otp flag", data);
  }, [data]);

  const handleChangeField = (event) => {
    setData({
      ...data,
      role: event.target.value,
    });
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked });
  };

  const checkBoxhandle = (e) => {
    debugger;
    console.log(e.target.checked + " checkbox handler ", navigator);
    setData({ ...data, [e.target.name]: e.target.checked });
    if (e.target.checked === true) {
      try {
        if (navigator.geolocation) {
          // navigator.geolocation.getCurrentPosition(showPosition);
          //New Implementation
          navigator.geolocation.getCurrentPosition(
            function (position) {
              let lats = position.coords.latitude;
              let longs = position.coords.longitude;
              console.log("position ", position);
              if (lats != null && lats != "" && longs != null && longs != "") {
                console.log(
                  position.coords.latitude + "," + position.coords.longitude
                );
                // setData({
                //   ...data,
                //   xLatitude: lats,
                //   xLongitude: longs,
                // });
                // xLatitude = lats;
                // xLongitude = longs;
                //  document.getElementById('ck2').checked = true;
              } else {

                Swal.fire("Alert!", "Unable To Fetch Location!", "error")
                return;
              }
            },
            function () {
              debugger;
              setData({
                ...data,
                checkLocation: false,
              });
              // document.getElementById('ck2').checked = false;
            }
          );
        } else {
          Swal.fire("Alert!", "Geolocation not supported by this browser!", "error")

        }
      } catch (err) {
        Swal.fire("Alert!", "Geolocation not supported!", "error")

        return;
      }
    } else {
      console.log("errorrrrr");
    }
  };

  const validateCustomer = (value) => {
    const phoneRegex = /^\d+$/;

    if (value.trim() == "") {
      setOtpNoError("");
      setcheCkboxError(false);
      setMobileNoError("This field is required");
      return;
    }
    //  else if (!data.ckIndian || !data.ckLocation) {
    //   setcheCkboxError(true);
    //   return;
    // }
    else if (value.length > 10) {
      setcheCkboxError(false);
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (value.length < 10) {
      setcheCkboxError(false);
      setOtpNoError("");
      setMobileNoError("Please Enter a ten digit mobile Number");
      return;
    } else if (!phoneRegex.test(value)) {
      setcheCkboxError(false);
      setOtpNoError("");
      setMobileNoError("Only Numbers are allowed!");
      return;
    } else {
      setcheCkboxError(false);
      setOtpNoError("");
      setMobileNoError("");
    }
    const Data = { custMobNo: value };
    Swal.fire({
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
        console.log("ValidateCustomer ", resp);
        Swal.close();
        let responseJSON = resp.data;
        respCode = responseJSON.ResponseCode;
        respMsg = responseJSON.ResponseMessage;
        if (responseJSON.ResponseCode === "000") {
          setData({ ...data, otpLabel: i18next.t('btnGenerateOtp') });

          GenerateOTP(value);
        } else if (responseJSON.ResponseCode === "111") {
          setData({ ...data, otpLabel: i18next.t('btnGenerateOtp') });
          dispatch(storeCust("basic_CustomerData", responseJSON.CustomerBasicInfo));
          GenerateOTP(value);
        }

        else if (responseJSON.ResponseCode === "100") {
          dispatch(storeCust("red_CustId", responseJSON.Response));
          // swal2.fire({
          //   title: "Success!",
          //   text: responseJSON.ResponseMessage,
          //   icon: "info",
          // }).then(() => {
          //   GenerateOTP(value);
          // });
          // GenerateOTP(value);

          Swal.fire({
            title: "Success!",
            text: responseJSON.ResponseMessage,
            icon: "info",
          }).then((result) => {
            GenerateOTP(value);
          })
        } else if (
          responseJSON.ResponseCode === "104" ||
          responseJSON.ResponseCode === "105"
        ) {
          dispatch(storeCust("red_CustId", responseJSON.Response));
          Swal.fire({
            title: "Success!",
            text: responseJSON.ResponseMessage,
            icon: "info",
          }).then(() => {
            GenerateOTP(value);
          });
          // GenerateOTP(value);
        } else {
          Swal.fire("Alert!", responseJSON.ResponseMessage, "error")

        }
      })
      .catch((error) => {
      
        setData({ ...data , otpGenerated: false});
        console.log(error, "Response Error!");
      })

  };

  function GenerateOTP(customerMobileNumber) {
    const Data = { MobNo: customerMobileNumber };
    Swal.fire({
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
        Swal.close();
        let responseJSON = resp.data;
        if (responseJSON.ResponseCode === "000") {
          setData({ ...data, otpGenerated: true });
          console.log("OTP >>>", responseJSON.Response.OTP);
          Swal.fire("Success!", "Your OTP Is " + responseJSON.Response.OTP, "success")

        } else {
      
          setData({ ...data, otpGenerated: false });
          console.log("EX_Code: ", responseJSON.ResponseCode);

          Swal.fire("Alert!", responseJSON.ResponseMessage, "warning")
        }
      })
      .catch((error) => {
     
        setData({ ...data, otpGenerated: false });
        console.log(error, "Response Error!");
      })

  }

  const submitForm = (MobNo, OTP) => {
    // setData(data);2
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

    var defaultMessage = "";
    var defaultIcon = "";
    console.log("RED_Cust PREV", RED_Cust);
    const Data = { MobNo: MobNo, OTP: OTP };
    Swal.fire({
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
        Swal.close();
        let responseJSON = resp.data;
        console.log("ValidateOTP ", resp)
        if (responseJSON.ResponseCode === "000") {
          dispatch(storeCust("red_CustMob", data.mobileNo));
          if (respCode === "000") {
            // fresh customer
            defaultMessage = respMsg;

            Swal.fire({
              title: "Success!",
              text: "OTP Validated Successfully!",
              icon: "success",
            }).then(() => {
              //ApplType from Redux red_ApplType
              if (ApplType === 1) {
                history.push("/custInfo");
                // window.location.href = './CustInfo_mr.html';
              } else if (ApplType === 2) {
                history.push("/CustAccountIndex");
                // window.location.href = './AccountType_mr.html';
              } else if (ApplType === 3) {
                // window.location.href = './CustInfoCC_mr.html';
              } else if (ApplType === 4) {
                // window.location.href = './CustInfoReKYC_mr.html';
              } else if (ApplType === 5) {
              }
            });
          } else if (respCode === "111") {
            history.push("/custInformation");
          }
          else {
            defaultMessage = respMsg;
            Swal.fire({
              title: "Success!",
              text: "OTP Validated Successfully!",
              icon: "info",
            }).then(() => {
              history.push("/ScheduleNow");
            });
          }
        } else {
          dispatch(storeCust("red_CustMob", ""));
          console.log("EX_Code: ", responseJSON.ResponseCode);
          Swal.fire("Alert!", responseJSON.ResponseMessage, "warning")

        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      })

    // dispatch(storeCust("red_CustMob", data.mobileNo));
    console.log("RED_Cust NEXT", RED_Cust);
  };

  // const handleChange = (event) => {
  //   console.log(event.target.name);
  //   setData({ ...data, [event.target.name]: event.target.checked });
  // };

  return (
    <LayoutCustNew>
      <Container maxWidth="sm">
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
                    <p className={classes.topHedaer} >
                      {i18next.t('custHeader')}
                      {/* Open Zero-Contact Video KYC Digital Account without any
                      paperwork. */}
                    </p>
                  </div>
                  <Typography variant="subtitle1" gutterBottom></Typography>
                  <Box m={5} />

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
                    <Box m={1} />
                    {/* <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.ckIndian}
                              onChange={handleChange}
                              className={classes.checkBoxArea}
                              style={{textAlign:"justify"}}
                              name="ckIndian"
                              color="primary"
                            />
                          }
                          label={i18next.t('custInstructionsOne')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.ckLocation}
                              onChange={checkBoxhandle}
                              name="ckLocation"
                              color="primary"
                            />
                          }
                          label={i18next.t('custInstructionsTwo')}
                        />
                      </FormGroup>

                      {checkboxError && (
                        <FormHelperText error>
                          Please Check Condition
                        </FormHelperText>
                      )}
                    </FormControl> */}
                    <Box m={4} />
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button
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
                          {i18next.t('btnGenerateOtp')}
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
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
                        label={i18next.t('labelOtp')}
                        type="password"
                        fullWidth
                        margin="normal"
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
                    {/* <Box m={1} /> */}
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
          </div>
        </Paper>
      </Container>
    </LayoutCustNew>
  );
}
