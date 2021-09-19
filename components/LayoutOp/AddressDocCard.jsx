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
  addressProof: {
    texttransform: "none",
    fontsize: "smaller",
    padding: "4px 10px",
  },
  headingDivider: {
    marginTop: theme.spacing(1),
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
  bold: {
    fontWeight: "500",
  },
  pos: {
    marginBottom: 12,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

function Addressdoccard(props) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        // alignItems="flex-start"
        style={{ minHeight: "28.5rem", margin: "0 auto" }}
      >
        {/* 1st section start */}
        <Grid xs={12}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <label
                style={{ color: props.selectedValue === "b" ? "red" : "green" }}
              >
                {props.addressLabel}
              </label>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value="Address Match"
                style={{ marginBottom: "0" }}
                control={
                  <Radio
                    color="primary"
                    checked={props.selectedValue === "a"}
                    onChange={props.handleChange}
                    value="a"
                  />
                }
                label="Address Match"
              />
              <FormControlLabel
                value="Address Mismatch"
                style={{ marginBottom: "0" }}
                control={
                  <Radio
                    color="primary"
                    checked={props.selectedValue === "b"}
                    onChange={props.handleChange}
                    value="b"
                  />
                }
                label="Address Mismatch"
              />
            </Grid>
          </Grid>
        </Grid>
        {/* 1st section end */}
        {/* <Box m={1} /> */}
        {/* 2nd section start */}
        <Grid xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
          // alignItems="center"
          >
            <Grid item xs={12} md={5}>
              {/* 1st card start */}
              {/* <Grid item xs={12}>
                <Box display="flex" justifyContent="center" p={1}>
                  <Box>
                    <Typography variant="h6">Id Document Type</Typography>
                  </Box>
                </Box>
              </Grid> */}

              <Grid item xs={12}>
                <Card
                  elevation={0}
                  style={{ paddingLeft: "15px", paddingRight: "15px" }}
                >
                  <Grid item xs={10} style={{ margin: "0 auto" }}>
                    <Grid
                      container
                      direction="column"
                      //justify="center"
                      alignItems="center"
                    >

                      {/* <FormControl className={classes.formControl}> */}

                      <Box id="addDocType" style={{ fontSize: ".8rem", width: "100%" }}>
                        Idendity Document Type
                      </Box>
                      <Select
                        labelId="addDocType"
                        variant="outlined"
                        id="addDocType"
                        style={{ margin: ".4rem 0" }}
                        fullWidth
                        name="addDocType"
                        value={props.addDocType}
                        onChange={props.handleChangeAddressDoc}
                      >
                        <MenuItem value="">Please Select Proof</MenuItem>
                        <MenuItem value="3">Passport</MenuItem>
                        <MenuItem value="4">Voter ID Card</MenuItem>
                        <MenuItem value="5">Electricity Bill</MenuItem>
                      </Select>
                      {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex" }}>
                      <FormControlLabel
                        value="Front Image"
                        style={{ marginBottom: "0" }}
                        control={
                          <Radio
                            color="primary"
                            checked={props.addressCameraImageChange === "frontImage"}
                            onChange={props.handleAddressCameraImageChange}
                            value="frontImage"
                          />
                        }
                        label="Front Image"
                      />
                      <FormControlLabel
                        value="Back Image"
                        style={{ marginBottom: "0" }}
                        control={
                          <Radio
                            color="primary"
                            checked={props.addressCameraImageChange === "backImage"}
                            onChange={props.handleAddressCameraImageChange}
                            value="backImage"
                          />
                        }
                        label="Back Image"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth

                        className={classes.addressProof}
                        startIcon={<CameraAltOutlinedIcon />}
                        onClick={props.clickAddressProof}
                        disabled={props.btnDisable}
                      >
                        Address Proof
                      </Button>
                    </Grid>
                    <Box m={1} />
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item>
                          <IconButton
                            color="primary"
                            aria-label="Initialize Cropper"
                            onClick={props.InitializeCropper}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            color="primary"
                            aria-label="Initialize Cropper"
                            onClick={props.CropAction}
                          >
                            <CropIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            color="primary"
                            aria-label="Destroy Cropper"
                            onClick={props.DestroyCropper}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box m={1} />
                    <Grid item xs={12} style={{ textAlign: "center" }}>

                      <img
                        id="imgAddDoc"
                        src={props.addressDoc}
                        style={{ height: "10rem" }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* 1st card end */}
            </Grid>
            <Grid item xs={12} md={7} style={{margin:"auto", padding:"0.8rem"}}>
              {/* 2nd card start */}
              <Grid item xs={12}>
                <Box
                  item
                  lg={12}
                  display="flex"
                  flexDirection="column"
                  style={{ width: "100%", textAlign: "justify" }}
                >
                  <Box lg={12} style={{ paddingBottom: "3px" }}>
                    Current Address
                  </Box>
                  <Box
                    lg={8}
                    style={{
                      border: "1px solid #ccc",
                      fontSize: "0.9rem",
                      height: "5.4rem",
                      overflowY: "scroll",
                      padding: "0px 10px 10px",

                    }}
                  >
                    <span>
                      <b className={classes.bold}>HOUSE: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.House
                        : null}
                    </span>
                    <span><br />
                      <b className={classes.bold}>LOCALITY: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.Locality
                        : null}
                    </span>
                    <span><br />
                      <b className={classes.bold}>LANDMARK: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.Landmark
                        : null}
                    </span> &ensp;
                    <span>

                      <b className={classes.bold}> CITY: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.City
                        : null}
                    </span>
                    <span><br />
                      <b className={classes.bold}>PIN: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.PinCode
                        : null}
                    </span>
                    <span>
                      &ensp;
                      <b className={classes.bold}>    DISTRICT: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.District
                        : null}
                    </span>
                    <span>
                      &ensp;
                      <b className={classes.bold}>   STATE: </b>
                      {props.custData.CustBasicInfo
                        ? props.custData.CustBasicInfo.State
                        : null}
                    </span>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  item
                  lg={12}
                  display="flex"
                  flexDirection="column"
                  style={{ width: "100%", textAlign: "justify" }}
                >
                  <Box lg={12} style={{ paddingTop: "10px" }}>
                    Aadhaar Address
                  </Box>
                  <Box
                    lg={8}
                    style={{
                      border: "1px solid #ccc",
                      fontSize: "0.9rem",
                      height: "5.4rem",
                      overflowY: "scroll",
                      padding: "0px 10px 10px",
                    }}
                  >
                    <span>
                      <b className={classes.bold}>HOUSE: </b>
                      {props.custData.poa ? props.custData.poa._house : null}
                    </span><br />
                    <span>
                      <b className={classes.bold}>LOCALITY: </b>
                      {props.custData.poa ? props.custData.poa._loc : null}
                    </span><br />
                    <span>
                      <b className={classes.bold}>LANDMARK: </b>
                      {props.custData.poa ? props.custData.poa._landmark : null}
                    </span><br />
                    <span>
                      <b className={classes.bold}>CITY: </b>
                      {props.custData.poa ? props.custData.poa._vtc : null}
                    </span>   &ensp;
                    <span>
                      <b className={classes.bold}>PIN: </b>{props.custData.poa ? props.custData.poa._pc : null}
                    </span>   &ensp;
                    <span>
                      <b className={classes.bold}>DISTRICT: </b>
                      {props.custData.poa ? props.custData.poa._dist : null}
                    </span>   &ensp;
                    <span>
                      <b className={classes.bold}>STATE: </b>
                      {props.custData.poa ? props.custData.poa._state : null}
                    </span>   &ensp;
                  </Box>
                </Box>
              </Grid>

              {/* 2nd card end */}
            </Grid>
          </Grid>
        </Grid>
        {/* 2nd section end */}
      </Grid>
    </>
  );
}

export default Addressdoccard;
