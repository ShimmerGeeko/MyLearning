import React, { Component } from "react";
import PropTypes from "prop-types";
import HttpService from "../../HttpService";
import { storeCust } from "../../redux/actions/mainAction";
import { trackPromise } from "react-promise-tracker";
import { connect } from "react-redux";
import swal from "sweetalert";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ScheduleCallTab from "./ScheduleCallTab";
import {
  Paper,
  Box,
  Grid,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import LayoutCustApp from "./LayoutCustApp";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
import swal2 from "sweetalert2";
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "950px",
    minWidth: "950px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "250px",
    },
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  buttonArea: {
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
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
    marginBottom: theme.spacing(4),
  },

  headerSpan: {
    fontWeight: "bold",
  },
  mainContainer: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
  },
  contentHeading1: {
    // textAlign: "center",
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
    //textAlign: "center",
    // fontWeight: "400",
    fontSize: "0.8rem",
    fontStyle: "italic",
    fontWeight: "100",
    color: "#424242",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
});

class Schedulecall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slotList_0: [],
      slotList_1: [],
      slotList_2: [],
      selectTime: [],
    };
  }

  componentDidMount() {
    const dataPara = {
      // CustMobNo: "9967451865",
      // CustId: "2205210000000191",
      CustMobNo: this.props.xCustMobNo,
      CustId: this.props.xCustId,
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

    HttpService.PostAjaxDataSCH(dataPara, "MainService/GetAvailableSchedule")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;

        var distinctDays = Array.from(
          new Set(responseJSON.SlotList.map((x) => x.SchSlotDay))
        );

        for (var i = 0; i < distinctDays.length; i++) {
          var DaySlot = responseJSON.SlotList.filter((x) => {
            return x.SchSlotDay === distinctDays[i];
          });
          this.setState({
            [`slotList_${i}`]: DaySlot,
          });
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  }
  handleSlotChange = (e, slot) => {
    debugger;
    if (e === false) {
      this.setState({
        selectTime: [],
      });
    } else {
      this.setState({
        selectTime: slot,
      });
    }
  };
  submitScheduleCall = () => {
    debugger;
    if (this.state.selectTime.length === 0) {
      swal("Alert!", "Please Select A Slot First!", "info");
      return false;
    }
    const dataPara = {
      CustMobNo: this.props.xCustMobNo,
      CustId: this.props.xCustId,

      SchSlotId: this.state.selectTime.SchSlotId,
      SchSlotDay: this.state.selectTime.SchSlotDay,
      SchSlotDate: this.state.selectTime.SchSlotDate,
      SchSlotStartTime: this.state.selectTime.SchSlotStartTime,
      SchSlotEndTime: this.state.selectTime.SchSlotEndTime,
    };
    console.log("BookAvailableSlot para", dataPara);
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxDataSCH(dataPara, "MainService/BookAvailableSlot")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("BookAvailableSlot res ", responseJSON);
        if (responseJSON.ResponseCode === "000") {
          swal(
            "Success!",
            `Your Call Is Scheduled At ${[
              this.state.selectTime.SchSlotStartTime.slice(0, 2),
              ":",
              this.state.selectTime.SchSlotStartTime.slice(2),
            ].join("")}. Details Will Be Sent To You Via Mail & SMS!`,
            "success"
          ).then(() => {
            this.props.history.push("/customer");
          });
        } else {
          swal("Alert!", responseJSON.ResponseMessage, "error");
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  };

  render() {
    debugger;
    console.log("slot ", this.state);
    const { classes } = this.props;
    return (
      <>
        <LayoutCustApp>
          <div className={classes.mainContainer}>
            {/* <Container maxWidth={false}> */}
            <Container>
              <Paper elevation={3}>
                <div className={classes.paper}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    //style={{ padding: "10px" }}
                  >
                    <Box m={1} />
                    <Grid item xs={12}>
                      <p className={classes.contentHeading1}>Schedule Call</p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className={classes.contentHeading2}>
                        Choose From The Available Slots
                      </p>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    //justify="flex-start"
                    // alignItems="flex-start"
                  >
                    <Grid item xs={12}>
                      <Divider
                        variant="fullWidth"
                        //className={classes.headingDivider}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    //justify="flex-start"
                    // alignItems="flex-start"
                  >
                    <Grid item xs={12}>
                      <Box
                        m={2}
                        //className={classes.headingDivider}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    // style={{ padding: "20px" }}
                  >
                    <Grid item>
                      <ScheduleCallTab
                        slotList={this.state.slotList_0}
                        handleSlotChange={this.handleSlotChange}
                      />
                    </Grid>
                    <Grid item>
                      <ScheduleCallTab
                        slotList={this.state.slotList_1}
                        handleSlotChange={this.handleSlotChange}
                      />
                    </Grid>
                    <Grid item>
                      <ScheduleCallTab
                        slotList={this.state.slotList_2}
                        handleSlotChange={this.handleSlotChange}
                      />
                    </Grid>

                    <Grid
                      container
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      justify="center"
                      alignItems="center"
                      style={{ padding: "3px 6px" }}
                    >
                      <Button
                        className={classes.buttonArea}
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{ margin: "4px 0px" }}
                        onClick={() => this.submitScheduleCall()}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Container>
          </div>
        </LayoutCustApp>
      </>
    );
  }
}

Schedulecall.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    xCustMobNo: state.mainReducer.red_CustMob,
    xCustId: state.mainReducer.red_CustId,
  };
};

// export default connect(mapStateToProps)(Schedulecall);
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Schedulecall)
);

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import HttpService from "../../HttpService";
// import { storeCust } from "../../redux/actions/mainAction";
// import { trackPromise } from "react-promise-tracker";
// import { Grid, Button } from "@material-ui/core";
// import swal from "sweetalert";
// import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// export default function Schedulecall(props) {
//   const [slot, setSlot] = useState({
//     slotList_0: [],
//     slotList_1: [],
//     slotList_2: []
//   })
//   const [selectTime, setTime] = useState([]);
//   const { xCustMobNo, xCustId } = useSelector(state => ({
//     xCustMobNo: state.mainReducer.red_CustMob,
//     xCustId: state.mainReducer.red_CustId,

//   }));
//   useEffect(() => {
//     debugger
//     const dataPara = {
//       CustMobNo: "9967451865",
//       CustId: "2205210000000191",
//       // CustMobNo: xCustMobNo,
//       // CustId: xCustId
//     };
//     console.log("Effect otp flag", dataPara);
//     trackPromise(
//       HttpService.PostAjaxDataSCH(dataPara, "MainService/GetAvailableSchedule")
//         .then((resp) => {
//           let responseJSON = resp.data;
//           console.log("GetAvailableSchedule res ", responseJSON)
//           // setSlot({
//           //   ...slot,
//           //   slotList: responseJSON.SlotList
//           // })
//           debugger
//           var distinctDays = Array.from(new Set(responseJSON.SlotList.map(x => x.SchSlotDay)));

//           for (var i = 0; i < distinctDays.length; i++) {
//             var DaySlot = responseJSON.SlotList.filter((x) => { return x.SchSlotDay === distinctDays[i] });
//             console.log(i + " ssss ", DaySlot)
//             setSlot({
//               ...slot,
//               [`slotList_${i}`]: DaySlot
//             })
//             //   GenerateSlots(DaySlot, i);
//           }
//         })
//         .catch((error) => {
//           console.log(error, "Response Error!");
//         })
//     );

//   }, []);

//   const GenerateSlots = (DaySlot, i) => {
//     console.log(DaySlot + " DaySlot ", i)
//   }

//   const handleSlotChange = (e, slot) => {
//     debugger
//     console.log("e ", e)
//     console.log("slot ", slot)
//     if (e === true) {
//       setTime([])
//     }
//     else {
//       setTime(slot)
//     }

//   }
//   const submitScheduleCall = () => {
//     debugger
//     if (selectTime.length === 0) {
//       swal(
//         "Alert!",
//         "Please Select A Slot First!",
//         "info"
//       )
//       return false;
//     }
//     const dataPara = {
//       CustMobNo: xCustMobNo,
//       CustId: xCustId,

//       SchSlotId: selectTime.SchSlotId,
//       SchSlotDay: selectTime.SchSlotDay,
//       SchSlotDate: selectTime.SchSlotDate,
//       SchSlotStartTime: selectTime.SchSlotStartTime,
//       SchSlotEndTime: selectTime.SchSlotEndTime
//     };
//     console.log("BookAvailableSlot para", dataPara);
//     // trackPromise(
//     //   HttpService.PostAjaxDataSCH(dataPara, "MainService/BookAvailableSlot")
//     //     .then((resp) => {
//     //       let responseJSON = resp.data;
//     //       console.log("BookAvailableSlot res ", responseJSON)
//     //       if (responseJSON.ResponseCode === "000") {
//     //         swal(
//     //           "Success!",
//     //           `Your Call Is Scheduled At ${selectTime.SchSlotStartTime.substr(0, 2)} : ${selectTime.SchSlotStartTime.substr(2, 2)} Hours Details Will Be Sent To You Via Mail & SMS!`,
//     //           "success"
//     //         ).then(() => {
//     //           history.push("/customer");
//     //         });
//     //       }
//     //       else {
//     //         swal(
//     //           "Alert!",
//     //           responseJSON.ResponseMessage,
//     //           "error"
//     //         )
//     //       }

//     //     })
//     //     .catch((error) => {
//     //       console.log(error, "Response Error!");
//     //     })
//     // );

//   }
//   console.log("slot ", slot)
//   console.log("time ", selectTime)
//   return (
//     <>
//       <h1>Schedule Call</h1>
//       <Grid container justify="center">
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//           <label>call 1</label>
//           </Grid>

//           {slot.slotList_0.map((option) => (
//             <Grid container item lg={2} md={2} sm={4} xs={6} style={{ padding: "2px 4px" }}>
//               <BootstrapSwitchButton checked={true} size="lg" onlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`} offlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`}
//                 onstyle="danger" offstyle="success" value={option} onChange={(e) => handleSlotChange(e, option)} />
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//           <label>call 2</label>
//           </Grid>

//           {slot.slotList_1.map((option) => (
//             <Grid container item lg={2} md={2} sm={4} xs={6} style={{ padding: "2px 4px" }}>
//               <BootstrapSwitchButton checked={true} size="lg" onlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`} offlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`}
//                 onstyle="danger" offstyle="success" value={option} onChange={(e) => handleSlotChange(e, option)} />
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//         <Grid container item lg={12} md={12} sm={12} xs={12} style={{ padding: "3px 6px" }}>
//           <label>call 3</label>
//           </Grid>
//           {slot.slotList_2.map((option) => (
//             <Grid container item lg={2} md={2} sm={4} xs={6} style={{ padding: "2px 4px" }}>
//               <BootstrapSwitchButton checked={true} size="lg" onlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`} offlabel={`${option.SchSlotStartTime.substr(0, 2)} : ${option.SchSlotStartTime.substr(2, 2)}`}
//                  value={option} onChange={(e) => handleSlotChange(e, option)} />
//             </Grid>
//           ))}
//         </Grid>
//         {/* <BootstrapSwitchButton
//             checked={false}
//             onlabel='Admin User'
//             onstyle='danger'
//             offlabel='Regular User'
//             offstyle='success'

//           // onChange={() => {
//           //   this.setState({ isUserAdmin: checked })
//           // }}
//           /> */}

//         <Grid container item lg={12} md={12} sm={12} xs={12} justify="center" style={{ padding: "3px 6px" }}>
//           <Button variant="contained"
//             color="primary"
//             style={{ margin: "4px 0px" }}
//             onClick={() => submitScheduleCall()}>
//             Submit
//           </Button>

//         </Grid>
//       </Grid>

//     </>
//   )
// }
