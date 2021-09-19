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
import DoneIcon from '@material-ui/icons/Done';
import PhonelinkEraseIcon from '@material-ui/icons/PhonelinkErase';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
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

const useStyles = makeStyles((theme) => ({}));

function Operatorbuttoncard(props) {
  const classes = useStyles();

  return (
    <>
      <Card
        style={{
          width: "100%",
          padding: "10px",
          textAlign: "center",
        }}
        variant="outlined"
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
          style={{
            marginLeft: "20px",
          }}
        >
          <Grid item container lg={3} md={3} sm={6} xs={12}>
            <Button
              variant="contained"
              onClick={props.OperatorAcceptRequest}
              disabled={props.btnDisable}
              className="opbtn"
              color="primary"
              startIcon={<DoneIcon />}
            >
              ACCEPT
            </Button>
          </Grid>
          <Grid item container lg={3} md={3} sm={6} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={props.OperatorRejectRequest}
              disabled={props.btnDisable}
              className="opbtn"
              startIcon={<PhonelinkEraseIcon />}
            >
              REJECT
            </Button>
          </Grid>
          <Grid item container lg={3} md={3} sm={6} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={props.OperatorHoldRequest}
              disabled={props.btnDisable}
              className="opbtn"
              startIcon={<HelpOutlineIcon />}
            >
              HOLD
            </Button>
          </Grid>
          <Grid item container lg={3} md={3} sm={6} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={props.OperatorDropRequest}
              className="opbtn"
              disabled={props.btnDisable}
              startIcon={<SignalWifiOffIcon />}
            >
              DROP
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Operatorbuttoncard;
