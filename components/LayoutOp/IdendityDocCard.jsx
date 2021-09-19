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

function Idenditydoccard(props) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        // alignItems="flex-start"
        style={{ minHeight: "28.5rem" }}
      >
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" style={{ width: "100%", padding: "0.9rem 0.9rem 1.2rem" }}>
            <Box style={{ width: "100%", textAlign: "left", borderBottom: "2px solid #1f91f3" }}>
              <Typography variant="h6" gutterBottom>
                Identify Documents
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card
            elevation={0}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <Grid item xs={9} style={{ margin: "0 auto", textAlign: "center" }}>
              <Grid
                container
                direction="column"
                //justify="center"5
                item xs={12}
                alignItems="center"
              >


                <Box id="docType" style={{ width: "100%", textAlign: "left", fontSize: ".8rem" }}>ID Document Type</Box>
                <Select
                  // labelId="docType"
                  // style={{padding:"9.5px 14px"}}
                  id="docType"
                  variant="outlined"
                  fullWidth
                  name="docType"
                  value={props.docType}
                  onChange={props.handleIdendityDoc}
                >
                  <MenuItem value="">Please Select Proof</MenuItem>
                  <MenuItem value="0">PAN</MenuItem>
                  <MenuItem value="1">Aadhaar</MenuItem>
                  <MenuItem value="2">Signature</MenuItem>
                  {/* <MenuItem value="3">PassPort</MenuItem> */}
                </Select>
                {/* </FormControl> */}
              </Grid>
              <Box m={1} />
              <Grid item xs={12} style={{display: "flex"}}>
                <FormControlLabel
                  value="Front Image"
                  style={{ marginBottom: "0" }}
                  control={
                    <Radio
                      color="primary"
                      checked={props.selectedCameraImage === "frontImage"}
                      onChange={props.handleSelectedCameraImageChange}
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
                      checked={props.selectedCameraImage === "backImage"}
                      onChange={props.handleSelectedCameraImageChange}
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
                  size="small"
                  fullWidth
                  component="span"
                  onClick={props.takedocpicture}
                  style={{ textTransform: "none", fontSize: "smaller" }}
                  disabled={props.btnDisable}
                  startIcon={<PhotoCamera />}
                >
                  Take Doc Picture
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
              <Grid item xs={12}>
                {props.docType === "" ? (
                  // <Lightbox>
                  <img
                    id="imgDoc_0"
                    src={props.imgCanPan[props.selectedCameraImage]}
                    style={{ height: "10rem" }}
                  // style={{ height: "80%", width: "100%" }}
                  />
                ) : // </Lightbox>
                  null}
                {props.docType === "0" ? (
                  // <Lightbox>
                  <img
                    id="imgDoc_0"
                    src={props.imgCanPan[props.selectedCameraImage]}
                    style={{ height: "10rem" }}
                  // style={{ height: "80%", width: "100%" }}
                  />
                ) : // </Lightbox>
                  null}
                {props.docType === "1" ? (
                  <img
                    id="imgDoc_1"
                    src={props.imgCanAdhar[props.selectedCameraImage]}
                    style={{ height: "10rem" }}

                  // style={{ height: "80%", width: "100%" }}
                  />
                ) : null}
                {props.docType === "2" ? (
                  <img
                    id="imgDoc_2"
                    src={props.imgCanSign[props.selectedCameraImage]}
                    style={{ height: "10rem" }}

                  // style={{ height: "80%", width: "100%" }}
                  />
                ) : null}
                {props.docType === "3" ? (
                  <img
                    id="imgDoc_3"
                    src={props.imgCanPassport}
                    style={{ height: "10rem" }}

                  // style={{ height: "80%", width: "100%" }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Idenditydoccard;
