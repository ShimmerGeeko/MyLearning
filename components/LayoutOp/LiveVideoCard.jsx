import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
// import Lightbox from "lightbox2";
import PhoneIcon from "@material-ui/icons/Phone";
import Radio from "@material-ui/core/Radio";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Copyright from "../common/Copyright";
import Table from "@material-ui/core/Table";
import HttpService from "../../HttpService";
import StopIcon from "@material-ui/icons/Stop";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import TableHead from "@material-ui/core/TableHead";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import TableRow from "@material-ui/core/TableRow";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PhoneImg from "../../Images/tech1.png";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import CropIcon from "@material-ui/icons/Crop";
import Face from "@material-ui/icons/Face";
import swal from "sweetalert";
import Modal from "@material-ui/core/Modal";
import { useHistory, Route } from "react-router-dom";
//import { OperatorDashboard } from "./OperatorDashboard";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Box,
  Grid,
  Badge,
  NativeSelect,
  Divider,
  Checkbox,
  FormControl,
  FormLabel,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Hidden,
  IconButton,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import {
  webSocketURL,
  stunURL,
  turnURL,
  turnUsername,
  turnCredential,
} from "../../ApiConstant";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    background: "#1b489f",
    color: "#fff",
    borderRadius: "0px",
    padding: " 8px",
  },
  verificationTitle: {
    textAlign: "center",
    background: "#2b982b",
    marginTop: ".3rem",
    padding: "5px",
    color: "#fff",
    //paddingBottom: theme.spacing(2),
  },
  question: {
    textAlign: "center",
    background: "#0d47a1",
    color: "#fff",
    //paddingBottom: theme.spacing(2),
  },
  btnCircle: {
    background: "#000",
    //width:"10px"
  },
  closeButton: {
    borderRadius: "0px",
    background: "#ffffff96 !important",
    // "&:hover": { backgroundColor: "yellow" },
    // "&:focus": { backgroundColor: "yellow" }

  },
  mainDiv: {
    position: "relative",
    // display:"flex",
    width: "100%",
    //height:" 200px",
    // border: "3px solid #73AD21",
  },
  subDiv: {
    position: "absolute",
    width: "100%",
    bottom: "2%"
  },
  recImage: {
    animation: ".6s blink_effect infinite",
  },
}));

function Livevideocard(props) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        // alignItems="flex-start"
        style={{ minHeight: "35.6rem" }}
      >
        {/* <Box style={{ margin: "3px" }} /> */}
        <Grid item xs={12}>
          <Box display="flex" alignSelf="center" justifyContent="center" p={1}>
            <Box>
              <Typography variant="h6">
                Live Video Verification
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <Box m={1} /> */}
        <Grid item style={{ padding: "5px" }}>
          <Paper elevation={2} className={classes.title}>
            {props.custData.Iname ? props.custData.Iname : "No User Found"} - {props.custData.Iname ? props.custNumber ? props.custNumber : "" : ""}
          </Paper>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Grid item xs={10} style={{ padding: "0px 15px", margin: "0 auto -37px" }}>
            <div className={classes.mainDiv}>
              <video
                id="remoteVideo"
                className="videoSty form-control"
                poster="assets/images/contactDefault.png"
                playsInline
                autoPlay
              ></video>
              {!props.recordbtn?
                 <div style={{ position: "absolute", top: "3%", marginLeft: "1%", marginTop: "1%", display: "block" }}>
              <img className={classes.recImage} src={ process.env.PUBLIC_URL + "/assets/images/recordIcon.jpg"} 
              style={{ width: "32px", height: "20px" }} />
            </div>:""}

            <div className={classes.subDiv}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{ margin: "0px -2rem" }}
              >
                <Grid item>
                  <IconButton className={classes.closeButton}
                  // classes={{
                  //   root: classes.closeButton,
                  //   focusVisible: classes.closeButton
                  // }}

                    onClick={props.CallToCustomer}
                    disabled={!props.btnDisable}>
                    <CallIcon style={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton className={classes.closeButton}
                  //  classes={{
                  //   root: classes.closeButton,
                  //   focusVisible: classes.closeButton
                  // }} 
                  onClick={props.hangUpBtn}
                    disabled={props.btnDisable}

                  >
                    <CallEndIcon style={{ fontSize: "1.2rem", }} />
                  </IconButton>
                </Grid>

                {props.recordbtn ? (
                  <Grid item >
                    <IconButton  className={classes.closeButton}
                    // classes={{
                    //   root: classes.closeButton,
                    //   focusVisible: classes.closeButton
                    // }}
                     onClick={props.startRecoding}
                      disabled={props.btnDisable}

                    > <VideoCallIcon style={{ fontSize: "1.2rem", }} />
                    </IconButton>

                  </Grid>
                ) : (
                  <Grid item lg={3} >
                    <IconButton className={classes.closeButton}
                    //  classes={{
                    //   root: classes.closeButton,
                    //   focusVisible: classes.closeButton
                    // }}
                     onClick={props.stopRecording}
                      disabled={props.btnDisable}

                    > <StopIcon style={{ fontSize: "1.2rem", }} />
                    </IconButton>

                  </Grid>
                )}


              </Grid>
              <Grid item>
                <video
                  id="localVideo"
                  className="form-control local-video-inset"
                  autoPlay
                  muted="muted"
                  playsInline
                  style={{ height: "auto !important" }}
                ></video>

              </Grid>
            </div>
            </div>

          {/* <Grid item style={{ position: "relative" }}>
            <video
              id="remoteVideo"
              className="videoSty form-control"
              poster="assets/images/contactDefault.png"
              autoPlay
            ></video>
            <video
              id="localVideo"
              className="form-control local-video-inset "
              autoPlay
              muted="muted"
              style={{ height: "auto !important", position: "absolute" }}
            ></video>
            <div
              id="recordIcon"
              style={{
                position: "absolute",
                top: "3%",
                marginLeft: "3%",
                marginTop: "1%",
                display: "none",
              }}
            >
              <img
                className="blink"
                src="assets/images/recordIcon.jpg"
                style={{ width: "42px", height: "20px" }}
              />
            </div>
            <Grid className="recordDiv">
              <img
                className="blink"
                src="assets/images/recordIcon.jpg"
                style={{ width: "42px", height: "20px" }}
              />
            </Grid>
            <Grid item container direction="row" className="call_btnrow">
              <Grid item lg={3} flexDirection="row" style={{ margin: "3px" }}>
               
              <IconButton classes={{
              root: classes.closeButton,
              focusVisible: classes.closeButton
            }}
              
              onClick={props.CallToCustomer}
                  disabled={!props.btnDisable}>
              <CallIcon  style={{ fontSize: "1.2rem"}} />
           </IconButton>
               
              
              </Grid>
              <Grid item lg={3} style={{ margin: "3px" }}>

                   
              <IconButton classes={{
              root: classes.closeButton,
                focusVisible: classes.closeButton
            }}  onClick={props.hangUpBtn}
            disabled={props.btnDisable}
              
            >
                <CallEndIcon  style={{ fontSize: "1.2rem", }} />
            </IconButton>
              
              </Grid>
              {props.recordbtn ? (
                <Grid item lg={3} style={{ margin: "3px" }}>
                  <IconButton classes={{
                root: classes.closeButton,
                focusVisible: classes.closeButton
              }}  onClick={props.startRecoding}
              disabled={props.btnDisable}
              
            > <VideoCallIcon style={{ fontSize: "1.2rem", }} />
            </IconButton>
                
                </Grid>
              ) : (
                <Grid item lg={3} style={{ margin: "3px" }}>
                        <IconButton classes={{
              root: classes.closeButton,
              focusVisible: classes.closeButton
            }}  onClick={props.stopRecording}
            disabled={props.btnDisable}
              
            > <StopIcon style={{ fontSize: "1.2rem", }} />
            </IconButton>
                 
                </Grid>
              )}
            </Grid>
          </Grid>
         */}


          <Grid item>
            <Paper className={classes.verificationTitle}>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>Verification Code:</Grid>
                <Grid item>
                  {props.custData.VerificationCode
                    ? props.custData.VerificationCode
                    : "Not Found"}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Box m={1} />
          <Grid item>
            <Paper
              elevation={2}
              style={{ maxHeight: 50, overflow: "auto" }}
              className={classes.question}
            >
              {props.custData.QuestionList.length > 0 ? (
                props.custData.QuestionList.map((que, index) => (
                  <List key={index}>
                    <ListItemText primary={que.Question} />
                  </List>
                ))
              ) : (
                <>
                  <List>
                    <ListItemText primary="Nothing to show" />
                  </List>
                  <List>
                    <ListItemText primary="" />
                  </List>
                </>
              )}
            </Paper>
          </Grid>
          <Box m={1} />
          <Grid item>
            <Box
              display="flex"
              alignSelf="center"
              justifyContent="center"
              p={1}
            >
              <Box>
                <div
                  onClick={props.ViewVideoSession}
                  style={{ fontStyle: "italic", cursor: "pointer" }}
                >
                  <OndemandVideoIcon /> View Recorded Session
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}
export default Livevideocard;
