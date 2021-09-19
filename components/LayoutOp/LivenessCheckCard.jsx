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
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  root: {
    width: "95%",
    minWidth: 275,
    boxShadow: "0px 0px 5px 2px rgb(28 79 107 / 62%)",
  },

  headerRoot: {
    flexGrow: 1,
    // backgroundImage: "url(../../Images/tech1.png)"
  },
  headingDivider: {
    marginTop: "8px",
    border: "1px solid #0000",

    // width:'90% !important'
  },
  headerSpan: {
    fontSize: "0.9rem",
    fontWeight: "600",
    margin: "2px 4px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  menuButton: {
    marginRight: "16px",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: "8px",
    textAlign: "center",
  },
  botttomBar: {
    // position: "fixed",
    // bottom: "0px",
    background: "#1b489f",
    color: "#fff",
    padding: "16px",
  },
  buttonStyle: {
    borderRadius: "5em",
  },
}));

function Livenesscheckcard(props) {
  const classes = useStyles();
  const matchesMd = useMediaQuery("(min-width:960px)");
  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        // alignItems="flex-start"
        style={{ minHeight: "32rem" }}
      >
        <Box m={1} />
        {/* <Grid item> */}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h6" style={{ paddingLeft: "5px" }}>
                Details
              </Typography>
            </Grid>
            <Grid  container
                direction="row"
                justify="space-around"
                alignItems="center"item xs={12} md={6}>
              <Grid
              item xs={12} md={6} 
                // spacing={1}
              >
                <Grid item>
                  <Button
                    className={classes.buttonStyle}
                    variant="contained"
                    size="small"
                  >
                    Liveness Check
                  </Button>
                </Grid>

                <Grid item>
                  {" "}
                  {props.livenessBtn ? (
                    <button
                      onClick={props.btnLivenessStartRecord}
                      disabled={props.btnDisable}
                    >
                      <VideoCallIcon />
                    </button>
                  ) : (
                    <button
                      onClick={props.btnLivenessStopRecord}
                      disabled={props.btnDisable}
                    >
                      <VideoCallIcon />
                    </button>
                  )}
                </Grid>

                <Grid item>
                  <Button
                    className={classes.buttonStyle}
                    variant="contained"
                    size="small"
                    color="#fce4ec"
                  >
                    {props.liveNessStatus}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        {/* </Grid> */}
        {/* <Box style={{margin:"0.4rem"}} /> */}
        <Box m={matchesMd ? 0 : 1} style={{color:"black"}}/>
        {/* table start */}

        <Grid
          container
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ padding:"0 5px 5px" }}
        >
          {/* <ReactTable
                                                data={data}
                                                columns={columns}
                                                showPaginationBottom={false}
                                                defaultPageSize={5}
                                                className="-striped -highlight tblWidth"

                                            /> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%", color: "#fff",padding:"5px !important" }}>
                  FIELD
                </TableCell>
                <TableCell style={{ width: "40%", color: "#fff" }}>
                  INPUT
                </TableCell>
                <TableCell style={{ width: "40%", color: "#fff" }}>
                  <FormControl style={{ width: "100%" }}>
                    <NativeSelect
                      style={{
                        outline: "none",
                        borderBottom: "0px",
                        color: "#fff",
                      }}
                      value={props.docColumn}
                      onChange={props.handleSelectColumn}
                    >
                      <option style={{ color: "black" }} value="10">
                        PAN
                      </option>
                      <option style={{ color: "black" }} value="20">
                        AADHAAR
                      </option>
                      <option style={{ color: "black" }} value="30">
                        PASSPORT
                      </option>
                    </NativeSelect>
                  </FormControl>
                </TableCell>
                {/* {props.cardCheck.panCheck ?
                                                            <TableCell style={{ width: "40%" }}>PAN</TableCell>
                                                            :
                                                            props.cardCheck.adharCheck ?
                                                                <TableCell style={{ width: "40%" }}>AADHAAR</TableCell>
                                                                :
                                                                props.cardCheck.passPortCheck ?
                                                                    <TableCell style={{ width: "40%" }}>PASSPORT</TableCell>: ""} */}
                {/* {adhharcard ?
                                                            <TableCell style={{ width: "40%" }}>PAN</TableCell>
                                                            :
                                                            <TableCell style={{ width: "40%" }}>AADHAAR</TableCell>} */}

                {/* <TableCell style={{ textAlign: "end" }}><button onClick={changeCard}><SkipNextIcon /></button></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1">
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell>{props.custData.Iname}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.Pname}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.Aname}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.Pname}</TableCell> :
                                                            <TableCell>{props.custData.Aname}</TableCell>} */}
              </TableRow>
              <TableRow key="2">
                <TableCell component="th" scope="row">
                  Gender
                </TableCell>
                <TableCell>{props.custData.Igender}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.pgender}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.agender}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.pgender}</TableCell> :
                                                            <TableCell>{props.custData.agender}</TableCell>} */}
              </TableRow>
              <TableRow key="3">
                <TableCell component="th" scope="row">
                  DOB
                </TableCell>
                <TableCell>{props.custData.Idob}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.pdob}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.adob}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.pdob}</TableCell> :
                                                            <TableCell>{props.custData.adob}</TableCell>} */}
              </TableRow>
              <TableRow key="4">
                <TableCell component="th" scope="row">
                  Postal Code
                </TableCell>
                <TableCell>{props.custData.Ipin}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.ppin}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.apin}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.ppin}</TableCell> :
                                                            <TableCell>{props.custData.apin}</TableCell>} */}
              </TableRow>
              <TableRow key="5">
                <TableCell component="th" scope="row">
                  City
                </TableCell>
                <TableCell>{props.custData.Icity}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.pcity}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.acity}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.pcity}</TableCell> :
                                                            <TableCell>{props.custData.acity}</TableCell>} */}
              </TableRow>
              <TableRow key="6">
                <TableCell component="th" scope="row">
                  State
                </TableCell>
                <TableCell>{props.custData.Istate}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.pstate}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.astate}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.pstate}</TableCell> :
                                                            <TableCell>{props.custData.astate}</TableCell>} */}
              </TableRow>
              <TableRow key="7">
                <TableCell component="th" scope="row">
                  Country
                </TableCell>
                <TableCell>{props.custData.Icountry}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.pcountry}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.acountry}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.pcountry}</TableCell> :
                                                            <TableCell>{props.custData.acountry}</TableCell>} */}
              </TableRow>
              <TableRow key="8">
                <TableCell component="th" scope="row">
                  PAN Number
                </TableCell>
                <TableCell>{props.custData.Ipan}</TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>{props.custData.ppan}</TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>{props.custData.apan}</TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>adha name</TableCell>
                ) : (
                  ""
                )}
                {/* {adhharcard ?
                                                            <TableCell>{props.custData.ppan}</TableCell> :
                                                            <TableCell>{props.custData.apan}</TableCell>} */}
              </TableRow>
              <TableRow key="9">
                <TableCell component="th" scope="row">
                  <Grid item lg={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component="span"
                      onClick={props.takepicture}
                      style={{
                        width: "100%",
                        textTransform: "none",
                        marginBottom: "8px",
                        fontSize: "smaller",
                      }}
                      disabled={props.btnDisable}
                      startIcon={<PhotoCamera />}
                    >
                      Take Photo
                    </Button>
                  </Grid>
                  <Grid item lg={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component="span"
                      onClick={props.CompareFace}
                      style={{
                        width: "100%",
                        textTransform: "none",
                        fontSize: "smaller",
                      }}
                      disabled={props.cfbtnDisable}
                      startIcon={<Face />}
                    >
                      Compare Face
                    </Button>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid item lg={5}>
                    <canvas
                      id="canvas"
                      className="form-control"
                      style={{ height: "200px" }}
                    ></canvas>
                  </Grid>
                </TableCell>
                {props.cardCheck.panCheck ? (
                  <TableCell>
                    <Grid item lg={5}>
                      <img
                        id="xPanPhoto"
                        src={props.custData.panPht}
                        className="form-control"
                        style={{ height: "200px" }}
                      ></img>
                    </Grid>
                  </TableCell>
                ) : props.cardCheck.adharCheck ? (
                  <TableCell>
                    <Grid item lg={5}>
                      <img
                        id="xDocPhoto"
                        src={props.custData.pht}
                        className="form-control"
                        style={{ height: "200px" }}
                      ></img>
                    </Grid>
                  </TableCell>
                ) : props.cardCheck.passPortCheck ? (
                  <TableCell>
                    <Grid item lg={5}>
                      <img
                        id="xDocPhoto"
                        src={props.custData.pht}
                        className="form-control"
                        style={{ height: "200px" }}
                      ></img>
                    </Grid>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        {/* table end */}
        <Grid item>
          <Paper elevation={2} className={classes.botttomBar}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12} md={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>Current Location :</Grid>
                  <Grid item>India</Grid>
                </Grid>
              </Grid>

              <Grid item  xs={12} md={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>Latitude :</Grid>
                  <Grid item>
                    {props.custData.GeolocationData
                      ? props.custData.GeolocationData.Latitude
                      : null}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item  xs={12} md={4}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>Longitude : </Grid>
                  <Grid item>
                    {props.custData.GeolocationData
                      ? props.custData.GeolocationData.Longitude
                      : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Livenesscheckcard;
