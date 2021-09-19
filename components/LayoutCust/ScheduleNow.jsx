import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Select,
  FormHelperText,
  InputLabel,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@material-ui/core";
import VerifiedUserSharpIcon from "@material-ui/icons/VerifiedUserSharp";
import { makeStyles, ThemeProviderProps } from "@material-ui/core/styles";
import AadharImg from "../../Images/Aadhar.png";
import PanImg from "../../Images/PAN.png";
import PhoneImg from "../../Images/Phone.png";
import PenImg from "../../Images/Pen_Paper.png";
import LoaderImg from "../../Images/Loader-Ellipsis-244px.gif";
import GlobeImg from "../../Images/Globe.png";
import Copyright from "../common/Copyright";
import LayoutCustNew from "./LayoutCustNew";
import { storeCust } from "../../redux/actions/mainAction";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../HttpService";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import { SignalCellularNull } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import swal2 from "sweetalert2";
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  // root: {
  //   height: "100vh",
  //   flexGrow: 1,
  // },
  // form: {
  //   width: "100%",
  // },
  // headerSpan: {
  //   fontSize: "0.9rem",
  //   fontWeight: "600",
  //   margin: "2px 4px",
  // },

  // headerContent: {
  //   paddingTop: theme.spacing(2),
  //   // paddingLeft: theme.spacing(4),
  // },
  // contentHeading: {
  //   textAlign: "center",
  //   fontWeight: "400",
  //   color: "#555555",
  //   padding: theme.spacing(1),
  // },

  // headingDivider: {
  //   // borderWidth: "1px",
  //   // borderColor: "#673AB7",
  //   marginTop: theme.spacing(1),
  //   border: "1px solid #673AB7",
  // },
  // paper: {
  //   // padding: theme.spacing(3, 6),
  //   padding: theme.spacing(0, 4, 3, 4),
  //   // justify: "center",
  //   display: "flex",
  //   // flexDirection: "column",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   textAlign: "center",
  //   width: "100%", // Fix IE 11 issue.
  // },
  // modelPaper: {
  //   position: "absolute",
  //   width: 400,
  //   color: "#673AB7",
  //   backgroundColor: "#f3f2f2",
  //   // border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 1, 2, 1),
  // },
  // button: {
  //   margin: theme.spacing(4, 0, 0, 2),
  //   textTransform: "none",
  // },
  // checkboxFormCtrl: {
  //   width: "100%",
  //   // display: "table",
  //   paddingTop: theme.spacing(2),
  //   // textAlign: "left",
  // },
  checkboxFormCtrlLabel : {
    marginBottom:"0px !important",
  },
  // formControl: {
  //   // margin: theme.spacing(1),
  //   // minWidth: 120,
  //   width: "100%",
  //   textAlign: "left",
  // },
  // // submit: {
  // //   margin: theme.spacing(4, 0, 0, 2),
  // // },

  contentHeading1: {
    textAlign: "center",
    // fontWeight: "400",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  contentHeading2: {
    textAlign: "center",
    // fontWeight: "400",
    fontSize: "1.3rem",
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontSize: "1rem",
    },
  },
  contentSubHeading: {
    textAlign: "center",
    // fontWeight: "400",
    fontSize: "2.5rem",
  },
  headingDivider: {
    marginTop: theme.spacing(1),
    borderBottom: "2px solid #1f91f3",
  },
  imageSty: {
    height: "5rem",
    // width: "rem",
  },
  buttonArea: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  paperModal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // padding: theme.spacing(3, 6),
    padding: theme.spacing(0, 2, 2, 2),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "column",
    alignItems: "center",
    // textAlign: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
    }
  },

  headerSpan: {
    fontWeight: "bold",
  },
  mainContainer: {
    // paddingLeft: theme.spacing(34),
    // paddingRight: theme.spacing(34),
    marginTop: theme.spacing(2),
    margin: "0 auto",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      // paddingLeft: theme.spacing(2),
      width: '95%',
      // paddingRight: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
  },
}));

const defaultValues = {
  checkIndian: false,
  checkLocation: false,
  checkAadhaar: false,
  CheckTerms: false,
  xLatitude: 0,
  min: "",
  sec: "",
  xLongitude: 0,
  clientPublicIP: "",
};

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

export default function ScheduleNow() {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  console.log("RED_Cust >>>", RED_Cust);

  const { handleSubmit, register, trigger, getValues, reset, control, errors } =
    useForm({
      defaultValues,
      reValidateMode: "onChange",
    });
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    console.log("RED_Cust PREV", RED_Cust);
    callNow();
  };
  // hhhuuuuuuuuuu

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
    // trackPromise(
    //     HttpService.GetJsonData("https://api.ipify.org?format=json")
    //         .then((resp) => {
    //             console.log("GetJsonData ", resp)
    //             if (resp.status == 200) {
    //                 setData({
    //                     ...data,
    //                     clientPublicIP: resp.data.ip

    //                 })
    //             }
    //             else {
    //                 setData({
    //                     ...data,
    //                     clientPublicIP: [],

    //                 })
    //             }

    //         })
    //         .catch((error) => {
    //             console.log(error, "Unable to get client's IP Address!");
    //         })
    // );
  }, [open]);

  const checkBoxhandle = (e) => {

    console.log(e.target.checked + " checkbox handler ", navigator);
    if (e.target.checked === true) {
      try {
        if (navigator.geolocation) {
          // navigator.geolocation.getCurrentPosition(showPosition);
          //New Implementation
          // navigator.geolocation.getCurrentPosition(
          //   function (position) {
          //     let lats = position.coords.latitude;
          //     let longs = position.coords.longitude;
          //     console.log("position ", position);
          //     if (lats != null && lats != "" && longs != null && longs != "") {
          //       console.log(
          //         position.coords.latitude + "," + position.coords.longitude
          //       );
          //       setData({
          //         ...data,
          //         xLatitude: lats,
          //         xLongitude: longs,
          //       });
          //       // xLatitude = lats;
          //       // xLongitude = longs;
          //       //  document.getElementById('ck2').checked = true;
          //     } else {
          //       swal("Alert!", "Unable To Fetch Location!", "error");
          //       return;
          //     }
          //   },
          //   function () {
          //     debugger;
          //     setData({
          //       ...data,
          //       checkLocation: false,
          //     });
          //     // document.getElementById('ck2').checked = false;
          //   }
          // );
          navigator.geolocation.getCurrentPosition(showPosition, showError);

          function showPosition(position) {
            setData({
              ...data,
              xLatitude: position.coords.latitude,
              xLongitude: position.coords.longitude,
            });
            // k = "Latitude: " + position.coords.latitude +
            //     "<br>Longitude: " + position.coords.longitude;
            // console.log(k, "Latitude and Longitude")
          }

          function showError(error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setErrorMessage("Please allow location access.");
                break;
              case error.POSITION_UNAVAILABLE:
                setErrorMessage("Location information is unavailable");
                break;
              case error.TIMEOUT:
                setErrorMessage("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                setErrorMessage("An unknown error occurred.");
                break;
              default:
                console.log(error);
            }
            swal("Alert!", "Unable To Fetch Location!", "error");
            return;
          }
          console.log("errorMessage", errorMessage);
        } else {
          swal("Alert!", "Geolocation not supported by this browser!", "error");
        }
      } catch (err) {
        swal("Alert!", "Geolocation not supported!", "error");
        return;
      }
    } else {
      console.log("errorrrrr");
    }
  };

  const callNow = () => {
    debugger;
    console.log("callNow state ", data);
    if (
      data.xLatitude == 0 ||
      data.xLatitude == null ||
      data.xLongitude == 0 ||
      data.xLongitude == null
    ) {
      //document.getElementById('ck2').checked = false;
      swal("Alert!", "Unable To Fetch Geolocation!", "error");
      return;
    } else {
      // swal({
      //     title: "Processing...",
      //     text: "Please Wait",
      //     // type: "info",
      //     // icon: "info",
      //     imageUrl: { LoaderImg },
      //     buttons: false,
      //     showConfirmButton: false,
      //     // showCancelButton: false,
      //     // closeOnConfirm: false,
      //     // showLoaderOnConfirm: false,
      //     allowOutsideClick: false,
      // });
      SaveCustomerPermissionData();
    }
  };

  const SaveCustomerPermissionData = () => {
    dispatch(storeCust("red_latitude", data.xLatitude));
    dispatch(storeCust("red_longitude", data.xLongitude));
    let dataPara = {
      CustId: RED_Cust.red_CustId, // RED_Cust.red_CustId,
      CustMobNo: RED_Cust.red_CustMob, //RED_Cust.red_CustMob,
      LocationPermYN: "Y",
      Geolocation: {
        Latitude: data.xLatitude,
        Longitude: data.xLongitude,
      },
      IndianCitizenYN: "Y",
      AadhaarPermYN: "Y",
      NomineeDeclYN: "N",
      TCYN: "Y",
      CreatedByIP: "NA", //data.clientPublicIP
    };
    console.log("SaveCustomerPermissionData ", dataPara);
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(dataPara, "MainService/SaveCustomerPermissionData")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("SaveCustomerPermissionData res ", responseJSON);
        if (responseJSON.ResponseCode === "000") {
          GetLiveCallSchedule();
        } else {
          console.log(responseJSON.ResponseCode);
          swal("Alert!", responseJSON.ResponseMessage, "error");
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  };

  const GetLiveCallSchedule = () => {
    let dataPara = {
      CustId: RED_Cust.red_CustId, // RED_Cust.red_CustId,
      CustMobNo: RED_Cust.red_CustMob, //RED_Cust.red_CustMob,
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
    HttpService.PostAjaxDataSCH(dataPara, "MainService/GetLiveCallSchedule")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("GetLiveCallSchedule res ", responseJSON);
        debugger;

        if (responseJSON.ResponseCode === "000") {
          //   swal.close();
          console.log(responseJSON.Response.Message);
          let SlotId = responseJSON.Response.SlotId;
          let SlotBound = responseJSON.Response.SlotBound;
          let SchSlotDay = responseJSON.Response.SchSlotDay;
          let SlotDate = responseJSON.Response.SlotDate;
          let SlotDateDisplay = responseJSON.Response.SlotDateDisplay;
          let SlotStartTime = responseJSON.Response.SlotStartTime;
          let SlotStartTimeDisplay = responseJSON.Response.SlotStartTimeDisplay;
          let SchSlotEndTime = responseJSON.Response.SchSlotEndTime;
          let ServerDate = responseJSON.ServerTimeResponse.ServerDate;
          let ServerTime = responseJSON.ServerTimeResponse.ServerTime;

          if (SlotBound === "2") {
            //Upper Bound
            //Final
            // showCounterModal(SlotDateDisplay, SlotStartTimeDisplay, ServerDate, ServerTime);
            //Demo

            history.push("/CustCallIndex");

            // DemoCounterModal();
          } else {
            // alert("slot Bound 1")
            //Final
            // DemoCounterModal();
            history.push("/CustCallIndex");

            // if(selLang === "MR") {
            //     window.location.href = "./CustCallIndex_mr.html";
            // }
            // else {
            //     window.location.href = "./CustCallIndex.html";
            // }
          }
        } else if (responseJSON.ResponseCode === "200") {
          let SlotDateDisplay = responseJSON.Response.SlotDateDisplay;
          let SlotStartTimeDisplay = responseJSON.Response.SlotStartTimeDisplay;
          let ServerDate = responseJSON.ServerTimeResponse.ServerDate;
          let ServerTime = responseJSON.ServerTimeResponse.ServerTime;
          //Final
          // showCounterModal(SlotDateDisplay, SlotStartTimeDisplay, ServerDate, ServerTime);
          //Demo

          // DemoCounterModal();

          history.push("/CustCallIndex");
        } else if (responseJSON.ResponseCode === "101") {
          swal({
            title: "Alert!",
            text:
              responseJSON.Response.Message + ". Please Reschedule Your Call!",
            type: "error",
          });
          // , function () {
          //     window.location.href = "./ScheduleLater.html";
          // });
        } else {
          console.log(responseJSON.ResponseCode);
          swal({
            title: "Alert!",
            text: responseJSON.Response.Message,
            type: "error",
          });
          // , function () {
          //     window.location.href = "./ScheduleLater.html";
          // });
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  };

  const showCounterModal = (
    SlotDateDisplay,
    SlotStartTimeDisplay,
    serverDate,
    serverTime
  ) => {
    // Set the date we're counting down to
    let serverCountdownDate = SlotDateDisplay + " " + SlotStartTimeDisplay;
    let countDownDate = new Date(serverCountdownDate).getTime();

    let serverNowDate = new Date(serverDate + " " + serverTime);
    let serverNowDateTime = serverNowDate.getTime();
    if (countDownDate - serverNowDateTime < 0) {
      alert("CustCallIndex_mr.html");
      // if(selLang === "MR") {
      //     window.location.href = "./CustCallIndex_mr.html";
      // }
      // else {
      //     window.location.href = "./CustCallIndex.html";
      // }
      return;
    }

    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      // var now = new Date().getTime();

      serverNowDate.setSeconds(serverNowDate.getSeconds() + 1);
      let serverClock = serverNowDate.getTime();
      let distance = countDownDate - serverClock;

      // Time calculations for days, hours, minutes and seconds
      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setData({
        ...data,
        min: minutes.toString().padStart(2, "0"),
        sec: seconds.toString().padStart(2, "0"),
      });

      // If the count down is over, write some text
      if (distance <= 0) {
        clearInterval(x);
        setData({
          ...data,
          min: "00",
          sec: "00",
        });
        history.push("/");
        // history.push("/customer");
        // if (selLang === "MR") {
        //     window.location.href = "./CustCallIndex_mr.html";
        // }
        // else {
        //     window.location.href = "./CustCallIndex.html";
        // }
      }
    }, 1000);
    setOpen(true);
  };
  function onScheduleCall() {
    history.push("/ScheduleCall");
  }

  function DemoCounterModal() {
    var timeleft = 11;
    var downloadTimer = setInterval(function () {
      timeleft--;
      setData({
        ...data,
        min: "00",
        sec: timeleft.toString().padStart(2, "0"),
      });
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        history.push("/CustCallIndex");
        // if(selLang === "MR") {
        //     window.location.href = "./CustCallIndex_mr.html";
        // }
        // else {
        //     window.location.href = "./CustCallIndex.html";
        // }
      }
    }, 1000);
    setOpen(true);
  }

  const body = (
    <>
      <div className={classes.paperModal}>
        <Grid
          item
          lg={12}
          container
          direction="row"
          className={classes.modelPaper}
        >
          <Grid lg={12} md={12} className="headerName">
            <span>Your Call Will Start In</span>
          </Grid>

          <Box
            item
            lg={12}
            flexDirection="row"
            style={{ width: "100%", textAlign: "center", display: "flex" }}
          >
            <Grid
              lg={6}
              md={6}
              className="bg-gradient-5 countdown-circles"
              justify="center"
            >
              <div style={{ display: "grid", justifyContent: "center" }}>
                <span
                  style={{
                    fontSize: "4rem",
                    fontWeight: "700",
                    marginBottom: "5px",
                  }}
                >
                  {data.min}
                </span>
                Min
              </div>
            </Grid>
            <Grid
              lg={6}
              md={6}
              className="bg-gradient-5 countdown-circles"
              justify="center"
            >
              <div style={{ display: "grid", justifyContent: "center" }}>
                <span
                  style={{
                    fontSize: "4rem",
                    fontWeight: "700",
                    marginBottom: "5px",
                  }}
                >
                  {data.sec}
                </span>
                Sec
              </div>
            </Grid>
          </Box>
        </Grid>
      </div>
    </>
    // <div style={modalStyle} className={classes.modelPaper}>
    //     <div className="bg-gradient-5 text-white shadow p-5 text-center mb-5 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-centered"
    //         style={{color: "#673ab7", backGround: "#f3f2f2"}}>
    //         <p className="mb-0 text-uppercase" style={{fontSize: "1.6rem", fontWeight: "700"}}>Your
    //                                     Call Will Start In</p>
    //         <div id="clock"
    //             className="countdown-circles d-flex flex-wrap justify-content-center pt-4">
    //             <div className="holder m-2"><span id="min" className="h1"
    //                 style={{fontSize: "4rem", fontWeight: "700"}}>{data.min}</span>
    //                                         Min</div>
    //             <div className="holder m-2"><span id="sec" className="h1"
    //                 style={{fontSize: "4rem", fontWeight: "700"}}>{data.sec}</span>
    //                                         Sec</div>
    //         </div>
    //     </div>
    // </div>
  );
  return (
    <LayoutCustNew>
      <div className={classes.mainContainer}>
        {/* <Container maxWidth={false}> */}
        <Container>
          <Paper elevation={3}>
            <div className={classes.paper}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Box m={1} /> 
                  <Grid item xs={12}>
                    <p className={classes.contentHeading1}>
                    {i18next.t("SNHeader")}
                     
                    </p>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider
                      variant="middle"
                      className={classes.headingDivider}
                    />
                  </Grid>

                  <Box m={1} />

                  <Grid item xs={12}>
                    <p className={classes.contentHeading2}>
                    {i18next.t("SNContent")}
                    
                    </p>
                  </Grid>
                </Grid>

                <Box m={1} />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <VerifiedUserSharpIcon />
                    {i18next.t("SNContent1")}
                  
                  </Grid>
                  <Grid item xs={12}>
                    <Box m={1} />
                  </Grid>
                </Grid>
                <Box m={1} />

                <div style={{ width: "100%" }}>
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <Box p={1}>
                      {" "}
                      <img src={AadharImg} className={classes.imageSty} />
                    </Box>
                    <Box p={1}>
                      <img src={PanImg} className={classes.imageSty} />
                    </Box>
                    <Box p={1}>
                      {" "}
                      <img src={PhoneImg} className={classes.imageSty} />
                    </Box>
                    <Box p={1}>
                      <img src={PenImg} className={classes.imageSty} />
                    </Box>
                    <Box p={1}>
                      <img src={GlobeImg} className={classes.imageSty} />
                    </Box>
                  </Box>
                </div>
                <Box m={1} />
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  style={{ paddingLeft: "20px" }}
                >
                  <Grid item xs={12} className="schedulCall-checkbox-grid">
                    <FormControlLabel
                      className={classes.checkboxFormCtrl}
                      control={
                        <Checkbox
                          name="checkIndian"
                          color="primary"
                          aria-invalid={errors.checkIndian ? "true" : "false"}
                          inputRef={register({ required: true })}
                        />
                      }
                      label={i18next.t("checkIndian")}
                      classes={{ label: classes.checkboxFormCtrlLabel }}
                    />
                    {errors.checkIndian && (
                      <FormHelperText error>
                         {i18next.t("mandatoryInstn1")}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} className="schedulCall-checkbox-grid">
                    <FormControlLabel
                      className={classes.checkboxFormCtrl}
                      control={
                        <Checkbox
                          name="checkLocation"
                          onChange={checkBoxhandle}
                          color="primary"
                          aria-invalid={errors.checkLocation ? "true" : "false"}
                          inputRef={register({ required: true })}
                        />
                      }
                      label={i18next.t("checkLocation")}
                      classes={{ label: classes.checkboxFormCtrlLabel }}
                    />
                    {errors.checkLocation && (
                      <FormHelperText error>
                        {i18next.t("mandatoryInstn1")}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} className="schedulCall-checkbox-grid">
                    <FormControlLabel
                      className={classes.checkboxFormCtrl}
                      control={
                        <Checkbox
                          name="checkAadhaar"
                          // checked={data.ckLocation}
                          // onChange={handleChange}
                          color="primary"
                          aria-invalid={errors.checkAadhaar ? "true" : "false"}
                          inputRef={register({ required: true })}
                        />
                      }
                      label={i18next.t("checkAadhaar")}
                      classes={{ label: classes.checkboxFormCtrlLabel }}
                    />
                    {errors.checkAadhaar && (
                      <FormHelperText error>
                         {i18next.t("mandatoryInstn1")}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} className="schedulCall-checkbox-grid">
                    <FormControlLabel
                      className={classes.checkboxFormCtrl}
                      control={
                        <Checkbox
                          name="CheckTerms"
                          // checked={data.ckLocation}
                          // onChange={handleChange}
                          color="primary"
                          aria-invalid={errors.CheckTerms ? "true" : "false"}
                          inputRef={register({ required: true })}
                        />
                      }
                      label={i18next.t("CheckTerms")}
                      classes={{ label: classes.checkboxFormCtrlLabel }}
                    />
                    {errors.CheckTerms && (
                      <FormHelperText error>
                       {i18next.t("mandatoryInstn1")}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.buttonArea}
                          // onClick={() => setStep({ stepOne: true })}
                        >
                          {i18next.t("startcall")}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.buttonArea}
                          onClick={handleSubmit(onScheduleCall)}
                          // onClick={onScheduleCall}
                        >
                          {i18next.t("schedulecall")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Box m={1} />
              </form>
              <Modal
                open={open}
                className={classes.modal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </div>
          </Paper>
        </Container>
      </div>
    </LayoutCustNew>
  );
}
