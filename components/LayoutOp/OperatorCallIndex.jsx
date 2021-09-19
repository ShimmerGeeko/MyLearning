
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import CheckIcon from '@material-ui/icons/Check';
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

import EditIcon from "@material-ui/icons/Edit";
import CropIcon from "@material-ui/icons/Crop";
import Face from "@material-ui/icons/Face";
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from "sweetalert";
import swal2 from "sweetalert2";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CancelIcon from "@material-ui/icons/Cancel";

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

import Modal from "@material-ui/core/Modal";
import { useHistory, Route } from "react-router-dom";
//import { OperatorDashboard } from "./OperatorDashboard";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
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
import Livevideocard from "./LiveVideoCard";
import Livenesscheckcard from "./LivenessCheckCard";
import Idenditydoccard from "./IdendityDocCard";
import AddressDocCard from "./AddressDocCard";
import Operatorbuttoncard from "./OperatorButtonCard";
import { Container } from "@material-ui/core";
import { storeCust } from "../../redux/actions/mainAction";
import InternetSpeed from "./InternetSpeed";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  titleModal: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  // rootProgress: {
  //   display: 'flex',
  //   '& > * + *': {
  //     marginLeft: theme.spacing(2),
  //   },
  // },
  corePaper: {
    marginTop: "1.5rem !important",
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    boxShadow: "0px 0px 5px 2px rgb(28 79 107 / 62%)",
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },

  coreContainer: {
    padding: "1.25rem",
  },
  containerOne: {
    minHeight: "25rem",
  },

  containerTwo: {
    minHeight: "25rem",
  },

  containerThree: {
    minHeight: "25rem",
  },

  containerFour: {
    minHeight: "25rem",
  },
  backGroundOne: {
    background: "linear-gradient(to top, #0082ff -95%, #00032a 100%) !important ",
    color: "#fff",
    paddingLeft: "20px",
    fontSize: "small",
    paddingTop: "5px",
    paddingBottom: "5px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "5px",
    },
  },
  backGroundTwo: {
    background: "linear-gradient(to top, #0082ff -95%, #00032a 100%) !important",
    color: "#fff",
    paddingLeft: "6rem",

    paddingTop: "5px",
    paddingBottom: "5px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
    },
  },
  label: {
    color: "#fff",
  },
  root: {
    color: "#fff",
  },
  verificationTitle: {
    textAlign: "center",
    background: "#2196f3",
    padding: theme.spacing(1),
    color: "#fff",
    //paddingBottom: theme.spacing(2),
  },
  question: {
    textAlign: "center",
    background: "#0d47a1",
    color: "#fff",
    //paddingBottom: theme.spacing(2),
  },
  liveVideoCardtitle: {
    textAlign: "center",
    background: "#1b489f",
    color: "#fff",

    padding: theme.spacing(1),
  },
  botttomBar: {
    // position: "fixed",
    // bottom: "0px",
    background: "#429ba9",
    color: "#fff",
    padding: theme.spacing(2),
  },
  buttonStyle: {
    borderRadius: "5em",

  },
  // bottom: {
  //   color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  // },
}));

//our username

var recorder;
var recordedBlobs = [];
var mediaRecorder;
var mediaRecorderLive;
var clientPublicIP;

let width = 324; // We will scale the photo width to this
let height = 312; // This will be computed based on the input stream

var canvas = null;
// var canPAN = null;
var canAadhaar = null;
var canSignature = null;
var canPassport = null;
var photo = null;
var btnTakePersonPhoto = null;

var cropper;
var cropperCtx = null;

var docphoto = null;
var docphotocanvas = null;
var docphotobtn = null;
var anchordocphotocanvas = null;
var selIdDocType = "0";
var selAddrDocType = "0";

var capImg = null;
var capDoc = null;
var imageURI = null;

var xCustMobNo = null;
var xCustId = null;
var xOperatorId = null;
var xOpUserCode = null;
var xLatitude = null;
var xLongitude = null;
var xBlobVideoData = null;

var xQuestionList;
var remoteStream;
var livenessFrames = [];
var framesCapturedCount = 0;
var frameCaptureInterval = 3000; //in milliseconds
var maxFrameSetCount = 10;
var livenessCanWidth = 400;
var livenessCanHeight = 320;

var flagRemoteStreamSet = false;
var addressMismatchFlag = false;
var addrProofTakenFlag = false;

var customerToken = "";

// var conn = null;
// var RTCPeerConn = null;
// var stream;
var remoteStream;
var dataChannel;
var videoFlag = 0;
// var videoImage = false;
var audioFlag = 0;
var audioImg = "false";
var streamType = "audio";
var customerLogin = false;

const contactDefaultImage = process.env.PUBLIC_URL + "/assets/images/contactDefault.png";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const defaultState = {
  VerificationCode: "",
  QuestionList: [],
  GeolocationData: [],
  CustBasicInfo: [],
  poa: [],
  poi: [],
  custRes: [],
  Iname: "",
  Pname: "",
  Aname: "",
  Igender: "",
  agender: "",
  pgender: "",
  Idob: "",
  adob: "",
  pdob: "",
  Ipin: "",
  apin: "",
  ppin: "",
  Icity: "",
  pcity: "",
  acity: "",
  Istate: "",
  astate: "",
  pstate: "",
  Icountry: "",
  pcountry: "",
  acountry: "",
  Ipan: "-",
  ppan: "-",
  apan: "-",
  pht: process.env.PUBLIC_URL + "/assets/images/contactDefault.png",
  panPht: process.env.PUBLIC_URL + "/assets/images/contactDefault.png",
};

export default function OperatorCallIndex() {
  const defaultSignatureState = {
    frontImage: contactDefaultImage,
    backImage: contactDefaultImage,
  }
  
  const defaultPanState = {
    frontImage: contactDefaultImage,
    backImage: contactDefaultImage,
  }
  
  
  const defaultAadharState = {
    frontImage: contactDefaultImage,
    backImage: contactDefaultImage,
  }
  
  var name;
  var connectedUser;
  const classes = useStyles();
  const matchesMd = useMediaQuery("(min-width:960px)");
  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [selectedCameraImage, setSelectedCameraImage] = useState("frontImage");
  const [addressCameraImageChange, setAddressCameraImageChange] = useState("frontImage");
  const [addressLabel, setAddressLabel] = React.useState("");
  const [addDocType, setAddDocType] = React.useState("");
  const [btnDisable, setBtnDisable] = React.useState(true);
  const [cfbtnDisable, setcfBtnDisable] = React.useState(true);
  const [cardCheck, setCardCheck] = React.useState({
    panCheck: false,
    adharCheck: true,
    passPortCheck: false,
  });
  // const [adhharcard, setAdhharcard] = React.useState(false);
  // const [pancardCheck, setPancardCheck] = React.useState(false);
  // const [passportCheck, setPassportCheck] = React.useState(false);

  const [recordbtn, setRecordbtn] = useState(true);
  const [capturedImage, setCapturedImage] = useState("");
  const [livenessBtn, setLivenessBtn] = useState(true);
  const [ckCode, setckCode] = useState(false);
  const [ckFace, setckFace] = useState(false);
  const [ckDoc, setckDoc] = useState(false);
  const [ckSignDoc, setckSignDoc] = useState(false);

  const [upLink, setUpLink] = useState(0);
  // var upLink = useRef(0);

  const [docColumn, setDocColumn] = useState("20");

  // var downLink = useRef(0);

  const [downLink, setDownLink] = useState(0);

  const [custData, setCustData] = useState(defaultState);
  const [liveNessStatus, setLiveNessStatus] = useState("-Pending-");
  const [docType, setDocType] = useState("");
  const [imgCanPan, setImgCanPan] = useState(defaultPanState);
  const [imgCanAdhar, setImgCanAdhar] = useState(defaultAadharState);
  const [imgCanSign, setImgCanSign] = useState(defaultSignatureState);
  const [imgCanPassport, setImgCanPassport] = useState(contactDefaultImage);
  const [addressDoc, setAddressDoc] = useState(contactDefaultImage);
  const [open, setOpen] = React.useState(false);
  const [ImagePopUp, setImagePopUp] = useState(false);
  const [btnIceConnStats, setBtnIceConnStats] = useState("Not Connected");
  const [modalStyle] = React.useState(getModalStyle);
  const canPAN = useRef();
  const [recordedSession, setrecordedSession] = useState("");
  const [videoImage, setVideoImage] = useState(false);
  // var distanceFloat = useRef(null);
  const [distanceFloat, setDistanceFload] = useState("");
  const [fullImage, setFullImage] = useState(contactDefaultImage);
  const [showingProgress, setShowingProgress] = useState(false);
  const [passportData, setPassportData] = useState({
    Dob: "",
    Doe: "",
    Name: "",
    PassportNumber: "",
    Surname: "",
  });
  var connect = useRef(null);
  var RTCPeerConn = useRef(null);
  var stream = useRef(null);

  var initRestart;
  // console.log("stream after useEffect is called", stream);
  const handleClose = () => {
    setOpen(false);
  };
  const handleFullImageClose = () => {
    setImagePopUp(false);
  }
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectedCameraImageChange = (event) => {
    setSelectedCameraImage(event.target.value);
  }

  const handleAddressCameraImageChange = (event) => {
    setAddressCameraImageChange(event.target.value)
  }
  const handleChangeAddressDoc = (event) => {
    setAddDocType(event.target.value);
  };

  const handleSelectColumn = (event) => {
    setDocColumn(event.target.value);
    if (event.target.value == "10") {
      setCardCheck({
        ...cardCheck,
        panCheck: true,
        adharCheck: false,
        passPortCheck: false,
      });
    } else if (event.target.value == "20") {
      setCardCheck({
        ...cardCheck,
        panCheck: false,
        adharCheck: true,
        passPortCheck: false,
      });
    } else if (event.target.value == "30") {
      setCardCheck({
        ...cardCheck,
        panCheck: false,
        adharCheck: false,
        passPortCheck: true,
      });
    }
  };
  const body = (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box mt={1} flexGrow={1}>
                  <p className={classes.titleModal}>Verification Video</p>
                </Box>
                <Box alignSelf="center">
                  <IconButton
                    //color="primary"
                    aria-label="cancel"
                    component="span"
                    onClick={handleClose}
                  >
                    <CancelIcon />
                  </IconButton>
                  <br />
                </Box>
              </Box>
            </div>

            <video
              id="viewremoteVideo"
              src={recordedSession}
              style={{ height: "400px", maxHeight: "400px" }}
              autoPlay
              playsInline
              controls
            ></video>
          </div>
        </Fade>
      </Modal>
    </>

  );

  const ImageBody = (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={ImagePopUp}
        onClose={handleFullImageClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ImagePopUp}>
          <div className={classes.paperModal}>
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box mt={1} flexGrow={1}>
                  <p className={classes.titleModal}>Full Image</p>
                </Box>
                <Box alignSelf="center">
                  <IconButton
                    //color="primary"
                    aria-label="cancel"
                    component="span"
                    onClick={handleFullImageClose}
                  >
                    <CancelIcon />
                  </IconButton>
                  <br />
                </Box>
              </Box>
            </div>

            <img
              id="viewremoteVideo"
              src={fullImage}
              style={{ height: "400px", maxHeight: "400px" }}

            />
          </div>
        </Fade>
      </Modal>
    </>

  );


  const handleIdendityDoc = (e) => {
    setDocType(e.target.value);
  };
  useEffect(() => {
    debugger
    //* Instantiate Global elements */

    canvas = document.getElementById('canvas');
    // canPAN = document.getElementById('canPAN');
    canAadhaar = document.getElementById('canAadhaar');
    canSignature = document.getElementById('canSignature');
    canPassport = document.getElementById('canPassport');

    //Signaling Server
    firstCall();

    const interval = setInterval(() => {

      inBoundLasts()
      // console.log("conoleing interval");
      remoteInBoundLasts()
      outBoundLasts()

    }, 3000);

    //undo
    return () => {
      debugger
      clearInterval(interval);
      clearInterval(initRestart);
      // console.log("call back call")
      if (stream !== null) {
        stream.current.getVideoTracks().forEach((track) => {
          track.stop();
        });

        stream.current.getAudioTracks().forEach((track) => {
          track.stop();
        });
      }
      send({
        type: "leave",
        name: RED_Cust.red_OperatorMobileNo,
      });
      connect = "";
    }
  }, []);
  function firstCall() {
    connect.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // console.log("connect.current connection", connect.current);
    document.getElementById('imgContactDefault');
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;

      var image = new Image();
      image.onload = function () {
        context.drawImage(image, 0, 0, width, height);
      };
      image.src = process.env.PUBLIC_URL + '/assets/images/contactDefault.png';
      // document.getElementById('xPanPhoto').src = './images/contactDefault.png';
    }

    name = RED_Cust.sesParamOpUserId

    //when we got a message from a signaling server 
    connect.current.onmessage = function (msg) {
      // console.log("Got message", msg.data);
      var data = JSON.parse(msg.data);

      switch (data.type) {
        case "login":
          debugger;
          handleLogin(data.success);
          break;
        //when somebody wants to call us 
        case "offer":
          handleCall(data.offer, data.name);
          //  handleOffer(data.offer,data.name);	 
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        //when a remote peer sends an ice candidate to us 
        case "candidate":
          handleCandidate(data.candidate);
          break;
        case "leave":
          handleLeave();
          break;
        default:
          break;
      }
    };

    connect.current.onerror = function (err) {
      console.log("connect.current error", err);
      swal({
        title: "Alert!",
        text: "Failed To Establish Connection!",
        type: "error",
        confirmButtonText: "Retry"
      }).then((value) => {
        // window.location.reload();
      })
    };

    connect.current.onopen = function () {
      console.log("Connected to the signaling server");
      clientPublicIP = 'NA';
      InitVideo();
    };
  }
  function GetClientPublicIP() {
    try {
      // $.getJSON("https://api.ipify.org?format=json",
      //    function (data) {
      //       clientPublicIP = data.ip;
      //       console.log("IPA >>>", data.ip);
      //       InitVideo();
      //    });
      // clientPublicIP = 'NA';
      // InitVideo();
    } catch (error) {
      clientPublicIP = "NA";
      InitVideo();
      console.log("Unable to get client's IP Address", error);
    }
  }

  function InitVideo() {
    if (videoImage == true) {
      setVideoImage(false);
      stopVideo();

      console.log("Video Image True");
      return;
    }

    if (name.length > 0 && videoFlag == 0) {
      send({
        type: "login",
        name: name,
      });
      setVideoImage(true)
      videoFlag = 1;
      // streamType = "video";
      // audioFlag = 1;
      // streamType = "video";
      //mainPanel.style.display = "block";
      return;
    }

    if (videoImage == false) {
      setVideoImage(true)
      startVideo();

      console.log("Video Image False");
      return;
    }
  }

  //alias for sending JSON encoded messages
  function send(message) {
    try {
      //attach the other peer username to our messages
      if (connectedUser) {
        message.name = connectedUser;
      }
      connect.current.send(JSON.stringify(message));
      // connect.current.onopen = () => connect.current.send(JSON.stringify(message));
    } catch (err) {
      swal({
        title: "Alert!",
        text: err,
        type: "error",
        confirmButtonText: "Retry",
      }).then((value) => {
        // window.location.reload();
      });
    }
  }

  //Start video if video is off
  function startVideo() {
    if (stream.current !== null) {
      // console.log("Inside Start Video");
      stream.current.getVideoTracks()[0].enabled = true;
    }
  }

  //stop video if video is started
  function stopVideo() {
    console.log("Inside stop video", stream);
    if (strea !== null) {
      stream.current.getVideoTracks().forEach((track) => {
        track.stop();
      });

      stream.current.getAudioTracks().forEach((track) => {
        track.stop();
      });
      videoFlag = 0;
    }
    // stream.current.getVideoTracks()[0].enabled = false;

    stream = null;

  }

  function handleLogin(success) {
    if (success === false) {
      swal("Alert!", "Operartor " + name + " Already Logged In", "error");
    } else {
      console.log("Inside Handle login");
      //**********************
      //Starting a peer connection
      //**********************
      console.log("Starting Peer Video");
      //getting local video stream.current

      // navigator.webkitGetUserMedia(
      //   { video: { aspectRatio: { ideal: 1 } }, audio: true },
      //   function (myStream) {
      if (!("mediaDevices" in navigator)) {
        navigator.mediaDevices = {};
      }

      if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(new Error("getUserMedia Not Implemented"));
          }

          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices.getUserMedia({ video: { aspectRatio: { ideal: 1 } }, audio: true }).then((myStream) => {
        // console.log("Inside Get User Media");
        stream.current = myStream;

        localVideo.srcObject = stream.current;
        localVideo.play();

        // console.log(localVideo, 'console in localVideo');
        // Need Implementation
        GetCustomerDataForOperator();

        // console.log("Local video started");
        // console.log(stream.current.getTracks());
        //using Google public stun server
        var configuration = {
          iceServers: [
            { url: stunURL },
            {
              url: turnURL,
              username: turnUsername,
              credential: turnCredential,
            },
          ],
          //"iceServers": [{ "url": "stun:stun2.1.google.com:19302" }, { "url": "turn:turn.bistri.com:80", "username": "homeo", "credential": "homeo" }]
        };

        // RTCPeerConn.current = new webkitRTCPeerConnection(configuration, {
        //   optional: [{ RTCDataChannel: true }],
        // });
        RTCPeerConn.current = new RTCPeerConnection(configuration, { optional: [{ RTCDataChannel: true }] });
        // setup stream.current listening
        RTCPeerConn.current.addStream(stream.current);

        //when a remote user adds stream.current to the peer connection
        RTCPeerConn.current.onaddstream = function (e) {
          //remoteVideo.src = window.URL.createObjectURL(e.stream.current);
          remoteStream = e.stream;
          remoteVideo.srcObject = e.stream;
          remoteVideo.play();

          flagRemoteStreamSet = true;
          //  btnAuthorize.disabled = false;
          //  btnDrop.disabled = false;
          //  btnReject.disabled = false;
          //  btnHold.disabled = false;
          //  btnTakePersonPhoto.disabled = false;
          //  docphotobtn.disabled = false;
          //  startRecoding.disabled = false;
          //  hangUpBtn.disabled = false;
          //  initCropperBtnX.disabled = false;
          //  destroyCropperBtnX.style.display = 'none';
          //  initCropperBtnAddrX.disabled = false;
          //  destroyCropperBtnAddrX.style.display = 'none';
          //  SetCustomerOperatorMapping();
        };

        // Setup ice handling
        RTCPeerConn.current.onicecandidate = function (event) {
          if (event.candidate) {
            send({
              type: "candidate",
              candidate: event.candidate,
            });
          }
        };

        RTCPeerConn.current.oniceconnectionstatechange = (event) => {
          RTCPeerConn.current.iceConnectionState;
          var btnIceConnStats = btnIceConnStats;
          if (RTCPeerConn.current.iceConnectionState === "checking") {
            setBtnIceConnStats("Connecting...");
            //    btnIceConnStats.innerHTML = 'Connecting...';
            //    btnIceConnStats.className = 'btn btn-sm btn-info';
          } else if (RTCPeerConn.current.iceConnectionState === "connected") {
            setBtnIceConnStats("Connected");
            //    btnIceConnStats.innerHTML = 'Connected';
            //    btnIceConnStats.className = 'btn btn-sm btn-success';
          } else if (RTCPeerConn.current.iceConnectionState === "failed") {
            setBtnIceConnStats("Failed");
            // remoteVideo.srcObject = null;
            //    btnIceConnStats.innerHTML = 'Failed';
            //    btnIceConnStats.className = 'btn btn-sm btn-danger';
            // swal('Alert!', 'Unable To Establish Peer Connection!', 'error');
            //    swal({
            //       title: "Reconnecting...",
            //       text: "Please Wait",
            //       // type: "info",
            //       // icon: "info",
            //       imageUrl: "./images/Loader-Ellipsis-244px.gif",
            //       //buttons: false,
            //       showConfirmButton: true,
            //       // showCancelButton: false,
            //       // closeOnConfirm: false,
            //       // showLoaderOnConfirm: false,
            //       allowOutsideClick: false
            //    });
            // $('#remoteVideo').attr("poster", "./images/Loader-Ellipsis-244px.gif");
            console.log("Promise => Ice Failed >>>");


            // RestartIce();


          } else if (RTCPeerConn.current.iceConnectionState === "disconnected") {
            // remoteVideo.srcObject = null;
            setBtnIceConnStats("Disconnected");
            // btnIceConnStats.innerHTML = 'Disconnected';
            // btnIceConnStats.className = 'btn btn-sm btn-danger';
            // swal('Alert!', 'Peer Disconnected!', 'error');
            //    swal({
            //       title: "Reconnecting...",
            //       text: "Please Wait",
            //       // type: "info",
            //       // icon: "info",
            //       imageUrl: "./images/Loader-Ellipsis-244px.gif",
            //       //buttons: false,
            //       showConfirmButton: true,
            //       // showCancelButton: false,
            //       // closeOnConfirm: false,
            //       // showLoaderOnConfirm: false,
            //       allowOutsideClick: false
            //    });
            console.log("Promise => Ice Disconnected >>>");
            // RestartIce();
          } else if (RTCPeerConn.current.iceConnectionState === "closed") {
            // Current local peer has shut down and is no longer handling requests.
            // Shall require a refresh
            setBtnIceConnStats("Closed");

            console.log("Closing Peer Connection")
            // remoteVideo.srcObject = null;
            //    btnIceConnStats.innerHTML = 'Closed';
            //    btnIceConnStats.className = 'btn btn-sm btn-danger';

            // swal("Alert!", "Local Peer Connection Closed!", "error");
          }
        };

        RTCPeerConn.current.ondatachannel = handleChannelCallback;
        //Putting code for data communication
        dataChannel = RTCPeerConn.current.createDataChannel("channel2", {
          reliable: true,
        });

        console.log("Data Channel Created");
        dataChannel.onopen = handleDataChannelOpen;
        dataChannel.onmessage = handleDataChannelMessageReceived;
        dataChannel.onerror = handleDataChannelError;
        dataChannel.onclose = handleDataChannelClose;

        /*dataChannel.onerror = function (error) { 
                   console.log("Ooops...error:", error); 
                   }; 
           
              console.log("DataChannel Ready State  : " + dataChannel.readyState);
           
              dataChannel.onmessage = function (event) { 
                    chatArea.innerHTML += connectedUser + ": " + event.data + "<br />"; 
              }; 
           
              dataChannel.onclose = function () { 
                    console.log("data channel is closed"); 
              };*/
      },
        function (error) {
          console.log(error);
          swal("Alert!", "Either Camera and Microphone is not available or you need to provide Permission for the application to access the device", "error").then(() => {
            history.push("/");
          });
        }
      );
    }
  }

  // console.log("localVideo",localVideo.srcObject);
  // console.log("remoteVideo", remoteVideo.srcObject);
  function handleLeave() {

    debugger;
    connectedUser = null;
    name = null;


    RTCPeerConn.current.close();
    RTCPeerConn.current.onicecandidate = null;
    RTCPeerConn.current.onaddstream = null;


    // swal({
    //   title: "Alert!",
    //   text: "Customer Has Ended The Call!",
    //   type: "info",

    // }).then(() => {
    //   history.push("/Dashboard");
    // });


    const dataPara = {
      CustId: RED_Cust.red_OperatorRefId,
      CustMobNo: RED_Cust.red_OperatorMobileNo,
    };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    console.log("dataPara reponse", dataPara)
    HttpService.PostAjaxData(
      dataPara,
      "MainService/CheckCustomerStatusOnDisconnect"
    )
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("CheckCustomerStatusOnDisconnect res ", responseJSON);
        if (responseJSON.ResponseCode === "000") {
          var zResponse = responseJSON.Response;
          if (zResponse.CallStatus === 2) {
            // callStatusSpan.innerHTML = "Waiting for Operator to connect...";
            // callStatusSpan.className = 'blink';

            swal({
              title: "Alert!",
              text: "Operator Disconnected, Please Wait For Someone To Join!",
              type: "info",
            }).then(() => {
              setVideoImage(false)
              // window.location.href =("/")
              dispatch(storeCust("red_OperatorRefId", ""));
              dispatch(storeCust("red_OperatorMobileNo", ""));
              history.push("/Dashboard")

              // videoImage = false;
              setReload();
            });
          } else if (zResponse.CallStatus === 3) {
            // swal({
            //   title: "Alert!",
            //   text:
            //     "Your KYC Request Has Been Submitted For Further Processing, Your Reference Number Is : " +
            //     zResponse.CustId,
            //   type: "success",
            // }).then(() => {

            //   // window.location.href =("/")
            //   setVideoImage(false)

            //   // history.push("/customer");
            //   history.push("/Dashboard");
            // });
            dispatch(storeCust("red_OperatorRefId", ""));
            dispatch(storeCust("red_OperatorMobileNo", ""));
            console.log("Your KYC Request Has Been Submitted For Further Processing, Your Reference Number Is : ", zResponse.CustId);
          } else if (zResponse.CallStatus === 4) {
            swal({
              title: "Alert!",
              text:
                "Your KYC Request Has Been Put On Hold, Your Reference Number Is : " +
                zResponse.CustId +
                ". You Will Receive An Email And A Text Message For The Same!",
              type: "info",
            }).then(() => {
              // history.push("/customer");

              // window.location.href =("/")
              setVideoImage(false)
              // videoImage = false;
              dispatch(storeCust("red_OperatorRefId", ""));
              dispatch(storeCust("red_OperatorMobileNo", ""));
              history.push("/Dashboard");
            });
          } else if (zResponse.CallStatus === 5) {
            swal({
              title: "Alert!",
              text:
                "Your KYC Request Has Been Rejected, Your Reference Number Is : " +
                zResponse.CustId +
                ". You Will Receive An Email And A Text Message For The Same!",
              type: "info",
            }).then(() => {
              // history.push("/customer");

              // window.location.href =("/")
              setVideoImage(false)
              dispatch(storeCust("red_OperatorRefId", ""));
              dispatch(storeCust("red_OperatorMobileNo", ""));
              history.push("/Dashboard");
            });
          } else if (zResponse.CallStatus === 6) {
            swal({
              title: "Alert!",
              text: "Call Dropped",
              type: "info",
            }).then(() => {
              // history.push("/customer");

              // window.location.href =("/")
              setVideoImage(false)
              dispatch(storeCust("red_OperatorRefId", ""));
              dispatch(storeCust("red_OperatorMobileNo", ""));
              history.push("/Dashboard");
            });
          } else {
            swal({
              title: "Alert!",
              text: "Your Call Has Ended Unexpectedly, Kindly Restart Your Call!",
              type: "error",
            }).then(() => {

              // window.location.reload();
              setVideoImage(false)
              dispatch(storeCust("red_OperatorRefId", ""));
              dispatch(storeCust("red_OperatorMobileNo", ""));
              history.push("/Dashboard");
              // window.location.href =("/")
              // setReload();
            });
          }
        } else {
          swal("Alert!", responseJSON.ResponseMessage, "error");
          console.log(responseJSON.ResponseCode);
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      })

  }

  //Accept or Decline the offer

  function handleCall(offer, name) {
    //     connectedUser = name;
    //     RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(offer));
    //     var callIconHtml = '<i class="fa fa-phone mr-2 blink" aria-hidden="true" style="font-weight:bold; font-size:large;"></i>';
    //     alertify.confirm(callIconHtml + ' Operator ' + connectedUser + ' is calling...', function (e) {
    //        if (e) {
    //           handleOffer(offer, name);
    //        } else {
    //           // Rejected
    //        }
    //     }).set({ labels: { ok: 'Accept', cancel: 'Decline' } });
    //     //.set({labels:{ok:'Accept', cancel: 'Decline'}, padding: false});
  }

  // //when somebody sends us an offer
  function handleOffer(offer, name) {
    //     // connectedUser = name;
    //     // RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(offer));
    //     //create an answer to an offer
    //     RTCPeerConn.current.createAnswer(function (answer) {
    //     RTCPeerConn.current.setLocalDescription(answer);
    //        send({
    //           type: "answer",
    //           answer: answer
    //        });
    //     }, function (error) {
    //        alertify.alert("Error While Creating An Answer");
    //     });
    //     console.log("Executed the Original Offer");
    //     console.log("Data Channel Ready State in handle offer " + dataChannel.readyState);
  }

  //when we got an answer from a remote user
  function handleAnswer(answer) {
    RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(answer));
  }

  //when we got an ice candidate from a remote user
  function handleCandidate(candidate) {
    RTCPeerConn.current.addIceCandidate(new RTCIceCandidate(candidate));
  }

  var handleDataChannelError = function (error) {
    console.log("dataChannel.OnError:", error);
  };

  var handleDataChannelClose = function (event) {
    console.log("dataChannel.OnClose", event);
  };

  var handleDataChannelOpen = function (event) {
    console.log("dataChannel.OnOpen", event);

    //  dataChannel.send("Init DataChannel Open!");
  };

  var handleDataChannelMessageReceived = function (event) {
    console.log("dataChannel.OnMessage:", event);
    //chatArea.innerHTML += connectedUser + ": " + event.data + "<br />";
    console.log("Message Received on Channel");
  };

  var handleChannelCallback = function (event) {
    dataChannel = event.channel;
    dataChannel.onopen = handleDataChannelOpen;
    dataChannel.onmessage = handleDataChannelMessageReceived;
    dataChannel.onerror = handleDataChannelError;
    dataChannel.onclose = handleDataChannelClose;
  };

  const changeCard = (e) => {
    console.log("adhaarCheck call", e.target.value);
    setAdhharcard(!adhharcard);
  };

  const clickAddressProof = () => {
    if (addDocType === "") {
      return false;
    }
    try {
      GetCurrentRemoteVidDimension();
      clearAddrDocPhoto();
      if (width && height) {
        var tempCanvasSign = document.createElement("canvas");
        var tempCanvasSignCtx = tempCanvasSign.getContext("2d");
        tempCanvasSign.width = width;
        tempCanvasSign.height = height;
        tempCanvasSignCtx.drawImage(remoteVideo, 0, 0, width, height);

        var addressImage = tempCanvasSign.toDataURL();
        setAddressDoc(addressImage);
        // document.getElementById('anchordocAddrCanvas').href = dataUrlAddrCan;
      } else {
        clearAddrDocPhoto();
      }
    } catch (err) {
      console.log(err);
    }
  };
  function clearAddrDocPhoto() {
    setAddressDoc(contactDefaultImage);
  }

  function btnLivenessStartRecord() {

    // btnLivenessStartRecord.addEventListener("click", function () {
    // btnLivenessStartRecord.style.display = 'none';
    // recordIcon.style.display = 'block';
    // btnLivenessStopRecord.style.display = 'block';
    var options = { mimeType: "video/webm;codecs=vp9" };
    // var options = { mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"' };
    try {
      mediaRecorderLive = new MediaRecorder(remoteStream, options);
    } catch (e) {
      console.log("Exception while creating mediaRecorderLive:", e);
      return;
    }

    mediaRecorderLive.ondataavailable = handleDataAvailable;
    mediaRecorderLive.start();
    setLivenessBtn(false);
    mediaRecorderLive.onstop = (event) => {
      let superBufferLive = new Blob(recordedBlobs, { type: "video/webm" });
      InitLivenessCheck(superBufferLive);
    };
  }

  function btnLivenessStopRecord() {

    //  btnLivenessStopRecord.addEventListener("click", function () {
    // btnLivenessStopRecord.style.display = 'none';
    // recordIcon.style.display = 'none';
    // btnLivenessStopRecord_Spinner.style.display = 'block';
    // btnLivenessStartRecord.style.display = 'block';
    mediaRecorderLive.stop();
    setLivenessBtn(false);
  }

  // //Event handler for Reject
  // const btnReject = () => {
  //     alertify.prompt('Reason For REJECTION', ''
  //         , function (evt, value) {
  //             if (value.trim() === '') {
  //                 return false;
  //                 // alertify.error('Oops! Reason cannot Be Blank!')
  //             }
  //             else {
  //                 OperatorAuthHRD('M_REJECT', value.trim());
  //             }
  //         }
  //         , function () {
  //             alertify.error('Please Enter Reason/Remark!')
  //         });
  // }

  //Event handler for Accept

  // console.log("selectedValue of address", selectedValue)
  const OperatorAcceptRequest = () => {

    // let ckFace = ckFace;
    // let ckDoc = ckDoc;
    // let ckSignDoc = ckSignDoc;
    // let ckCode = ckCode;
    let AddrMatch = selectedValue == "b" ? true : false;
    let xCurrentVerifyCodeOp = custData.VerificationCode;

    // if (ckFace === false) {
    //   swal("Alert!", "Please Complete Face Matching!", "error");
    //   return;
    // }
    // if (ckDoc === false) {
    //   swal("Alert!", "Please Capture Document Picture!", "error");
    //   return;
    // }
    // if (ckSignDoc === false) {
    //   swal("Alert!", "Please Capture Signature Picture!", "error");
    //   return;
    // }
    // if (ckCode === false) {
    //   swal("Alert!", "Please Conduct Liveness Check!", "error");
    //   return;
    // }
    // if (radAddrMatchY.checked === false && radAddrMatchN.checked === false) {
    //     swal('Alert!', 'Please Verify If The Address Matches Or Not!', 'error');
    //     return;
    // }
    let photoCan = document.getElementById("canvas");
    let zCustPhoto = photoCan.toDataURL();
    let imgPan = imgCanPan;
    let imgAadhaar = imgCanAdhar;
    let imgsign = imgCanSign;
    let imgPassword = imgCanPassport;
    let imgaddrsDoc = addressDoc;
    let CustRecSession = recordedSession;
    let AddressPhotoFlag = null;
    if (AddrMatch === true) {
      if (imgaddrsDoc === contactDefaultImage) {
        swal("Alert!", "Please Take Address Proof Photo!", "error");
        return;
      } else {
        AddressPhotoFlag = "Y";
      }
    } else {
      AddressPhotoFlag = "N";
    }

    if (CustRecSession === "") {
      console.log("Video src empty");
      swal("Alert!", "Please Record Session!", "error");
      return;
    }
    if (xBlobVideoData === null) {
      console.log("Video Blob empty");
      swal("Alert!", "Please Record Session And Try Again!", "error");
      return;
    }

    var formData = new FormData();
    formData.append("UserCode", RED_Cust.sesParamOpUserCode);
    formData.append("UserId", RED_Cust.sesParamOpUserId);
    formData.append("CustId", RED_Cust.red_OperatorRefId);
    formData.append("CustMobNo", RED_Cust.red_OperatorMobileNo);
    formData.append("FaceMatchFlag", "Y");
    formData.append("DocPhotoFLag", "Y");
    formData.append("SignaturePhotoFlag", "Y");
    formData.append("AddressPhotoFlag", AddressPhotoFlag);
    formData.append("SecCodeVerifiedFlag", "Y");
    formData.append("VerificationCode", xCurrentVerifyCodeOp);
    formData.append("ActionType", "M_ACCEPT");
    formData.append("CreatedByIP", clientPublicIP);
    formData.append("Remark", "NA");

    formData.append("IdDocType", docType);
    formData.append("ImgDocument", imgCanPan);
    formData.append("ImgSignature", imgCanSign);
    formData.append("ImgCustomer", zCustPhoto);
    formData.append("PoaDocType", addDocType);
    formData.append("ImgPOA", imgaddrsDoc);
    formData.append("VideoSession", xBlobVideoData);

    //Question List
    if (custData.QuestionList.length > 0) {
      for (let i = 0; i < custData.QuestionList.length; i++) {
        formData.append(
          "QuestionDatas[" + i + "].SrNo",
          parseInt(custData.QuestionList[i].SrNo)
        );
        formData.append(
          "QuestionDatas[" + i + "].ApplType",
          parseInt(custData.QuestionList[i].ApplType)
        );
        formData.append(
          "QuestionDatas[" + i + "].LangCode",
          custData.QuestionList[i].LangCode
        );
        formData.append(
          "QuestionDatas[" + i + "].Question",
          custData.QuestionList[i].Question
        );
      }
    }
    console.log("Form data ", formData);
    // swal2.fire({
    //   title: "Processing...",
    //   text: "Please Wait",        
    //   imageUrl: processing,
    //   imageWidth: 100,
    //   imageHeight: 100,     
    //   showConfirmButton: false,        
    //   allowOutsideClick: false
    // });
    let custIdR = RED_Cust.red_OperatorRefId;
    // trackPromise(
    HttpService.PostAjaxData(formData, "MainService/OperatorAuthAccept")
      .then((resp) => {
        // swal2.close();
        debugger;
        console.log("OperatorAuthAccept res ", resp)
        if (resp.data.ResponseCode == "000") {
          // sessionStorage.setItem("sesParamSelectedCustId", '');
          // sessionStorage.setItem("sesParamSelectedCustMobNo", '');
          console.log("resp", resp);
          console.log("custIdR", custIdR);
          console.log("RED_Cust.red_OperatorRefId", RED_Cust.red_OperatorRefId);


          stopVideo();
          swal2.fire({
            title: "Success!",
            text: "Done! Customer Data Submitted For Further Processing! Customer Reference Number Is: " + custIdR,
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, I Am Sure!",
            cancelButtonText: "No, Not Now!",
          }).then((result) => {
            send({
              type: "leave",
              name: RED_Cust.red_OperatorMobileNo,
            });
            history.push('/Dashboard');

          });


        }
        else {
          swal('Alert!', resp.ResponseMessage, 'error');
          console.log("Failed Maker ACCEPT!")
          console.log(responseJSON.ResponseCode);
        }

      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
    // );
  };

  //Event handler for Hold
  const OperatorHoldRequest = () => {
    swal("Reason For HOLD", {
      content: "input",
    }).then((value) => {
      if (value.trim() === "") {
        swal("Oops! Reason cannot Be Blank!");
        return false;
      } else {
        OperatorAuthHRD("M_HOLD", value.trim());
      }
    });
  };

  //Event handler for Reject
  const OperatorRejectRequest = () => {
    swal("Reason For Reject", {
      content: "input",
    }).then((value) => {
      if (value.trim() === "") {
        swal("Oops! Reason cannot Be Blank!");
        return false;
      } else {
        OperatorAuthHRD("M_REJECT", value.trim());
      }
    });
  };

  //Event handler for Drop
  const OperatorDropRequest = () => {
    swal("Reason For DROP", {
      content: "input",
    }).then((value) => {
      if (value.trim() === "") {
        swal("Oops! Reason cannot Be Blank!");
        return false;
      } else {
        OperatorAuthHRD("M_DROP", value.trim());
      }
    });
  };

  //Event handler for Reject
  const OperatorAuthHRD = (actionType, remark) => {
    // var xCurrentVerifyCodeOp = document.getElementById('xVerifyCodeOp').value;
    var xCurrentVerifyCodeOp = custData.VerificationCode;
    // swalLoader('ok');
    // swal({
    //     title: "Processing...",
    //     text: "Please Wait",
    //     // type: "info",
    //     // icon: "info",
    //     imageUrl: "assets/images/Loader-Ellipsis-244px.gif",
    //     //buttons: false,
    //     showConfirmButton: false,
    //     // showCancelButton: false,
    //     // closeOnConfirm: false,
    //     // showLoaderOnConfirm: false,
    //     allowOutsideClick: false
    // });
    var dataPara = {
      CustId: RED_Cust.red_OperatorRefId,
      //CustId: "2205210000000191",
      // CustMobNo: "9967451865",

      // UserId: xOperatorId,
      UserId: RED_Cust.sesParamOpUserId,
      // CustId: xCustId,
      CustMobNo: RED_Cust.red_OperatorMobileNo,
      VerificationCode: xCurrentVerifyCodeOp,
      ActionType: actionType,
      Remark: remark,
      CreatedByIP: "NA",
      //CreatedByIP: clientPublicIP
    };

    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });


    // trackPromise(
    HttpService.PostAjaxData(dataPara, "MainService/OperatorAuthHRD")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("OperatorAuthHRD res ", responseJSON);
        if (responseJSON.ResponseCode === "000") {
          sessionStorage.setItem("sesParamSelectedCustId", "");
          sessionStorage.setItem("sesParamSelectedCustMobNo", "");

          swal({
            title: "Success!",
            text: "Operation Complete!",
            type: "success",
          }).then(() => {
            // window.location.href = "http://localhost:3000/OperatorDashboard";
            send({
              type: "leave",
              name: RED_Cust.red_OperatorMobileNo,
            });
            history.push('/Dashboard');
          });
        } else {
          swal("Alert!", responseJSON.ResponseMessage, "error");
          console.log("Failed Maker R/H!");
          console.log(responseJSON.ResponseCode);
        }
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
    // );
  };

  async function GetCustomerDataForOperator() {
    var dataPara = {
      //    UserId: xOperatorId,
      CustId: RED_Cust.red_OperatorRefId,
      CustMobNo: RED_Cust.red_OperatorMobileNo,

      UserId: "FINOP1",
      //  CustId: "3103210000000102",
      // CustId: "2205210000000191",
      // CustMobNo: "9967451865"
    };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    // trackPromise(
    HttpService.PostAjaxData(
      dataPara,
      "MainService/GetCustomerDataForOperator"
    )
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("GetCustomerDataForOperator res ", responseJSON);
        setCustData({
          ...custData,
          VerificationCode: responseJSON.VerificationCode,
          QuestionList: responseJSON.QuestionList,
          GeolocationData: responseJSON.Geolocation,
          CustBasicInfo: responseJSON.CustBasicInfo,
          poa: responseJSON.Uiddata.Poa,
          poi: responseJSON.Uiddata.Poi,
          custRes: responseJSON,
          Iname: responseJSON.CustBasicInfo.Name,
          Pname: "-",
          Aname: responseJSON.Uiddata.Poi._name,
          Igender: responseJSON.CustBasicInfo.Gender,
          agender: responseJSON.Uiddata.Poi._gender,
          pgender: "-",
          Idob: responseJSON.CustBasicInfo.DOB,
          adob: responseJSON.Uiddata.Poi._dob,
          pdob: "-",
          Ipin: responseJSON.CustBasicInfo.PinCode,
          apin: responseJSON.Uiddata.Poa._pc,
          ppin: "-",
          Icity: responseJSON.CustBasicInfo.City,
          pcity: "-",
          acity: responseJSON.Uiddata.Poa._vtc,
          Istate: responseJSON.CustBasicInfo.State,
          astate: responseJSON.Uiddata.Poa._state,
          pstate: "-",
          Icountry: responseJSON.CustBasicInfo.Name,
          pcountry: "-",
          acountry: responseJSON.Uiddata.Poa._country,
          Ipan: "-",
          ppan: "-",
          apan: "-",
          pht: "data:image/png;base64, " + responseJSON.Uiddata.Pht,
        });
        var CityMatch = responseJSON.CityMatch;
        var PinCodeMatch = responseJSON.PinCodeMatch;
        var DistrictMatch = responseJSON.DistrictMatch;
        var StateMatch = responseJSON.StateMatch;
        var HouseSoundX = responseJSON.HouseSoundX;
        var LocalitySoundX = responseJSON.LocalitySoundX;
        var LandmarkSoundX = responseJSON.LandmarkSoundX;

        var lblAddrMismatch = document.getElementById("lblAddrMismatch");

        // District Match Tentative
        // if(CityMatch != 'Y' || PinCodeMatch != 'Y' || DistrictMatch != 'Y' || StateMatch != 'Y') {
        if (CityMatch != "Y" || PinCodeMatch != "Y" || StateMatch != "Y") {
          setSelectedValue("b");
          setAddressLabel(
            "Current Address Does Not Match With Aadhaar Address. Please Verify!"
          );
        } else if (
          HouseSoundX < 2 ||
          LocalitySoundX < 2 ||
          LandmarkSoundX < 2
        ) {
          setSelectedValue("b");
          setAddressLabel(
            "Current Address And Aadhaar Address Does Not Appear To Be Similar. Please Verify!"
          );
        } else {
          setSelectedValue("a");
          setAddressLabel(
            "Current Address And Aadhaar Address Appear To Be Similar. Please Verify!"
          );
        }

        // setVCode(responseJSON.Response)
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
    // );
    // $.ajax({
    //    type: "POST",
    //    url: serviceURL + "/api/MainService/GetCustomerDataForOperator",
    //    dataType: "JSON",
    //    data: JSON.stringify(Data),
    //    contentType: "application/json; charset=utf-8",
    //    success: function (responseData) {
    //       var responseJSON = JSON.parse(JSON.stringify(responseData));
    //       if (responseJSON.ResponseCode === "000") {
    //          swal.close();
    //          document.getElementById('callTobName').innerHTML = responseJSON.CustBasicInfo.Name;
    //          var xDocPhoto = document.getElementById('xDocPhoto');
    //          var anchorxDocPhoto = document.getElementById('anchorxDocPhoto');
    //          var xName = document.getElementById('xName');
    //          var xGender = document.getElementById('xGender');
    //          var xDOB = document.getElementById('xDOB');
    //          //var xAddress = document.getElementById('xAddress');

    //          var xPincode = document.getElementById('xPincode');
    //          var xCity = document.getElementById('xCity');
    //          var xState = document.getElementById('xState');
    //          var xCountry = document.getElementById('xCountry');
    //          var xVerifyCodeOp = document.getElementById('xVerifyCodeOp');
    //          var xRandomQuestions = document.getElementById('xRandomQuestions');

    //          xName.value = responseJSON.Uiddata.Poi._name;
    //          xGender.value = responseJSON.Uiddata.Poi._gender;
    //          xDOB.value = responseJSON.Uiddata.Poi._dob;
    //          //xAddress.value = responseJSON.Uiddata.Poa.house + ' ' + responseJSON.Uiddata.Poa.loc + '. ' + responseJSON.Uiddata.Poa.po + '. LANDMARK: ' + responseJSON.Uiddata.Poa.landmark + ' DISTRICT: ' + responseJSON.Uiddata.Poa.dist;
    //          document.getElementById('aHouse').innerHTML = responseJSON.Uiddata.Poa._house;
    //          document.getElementById('aLocality').innerHTML = responseJSON.Uiddata.Poa._loc;
    //          document.getElementById('aPO').innerHTML = responseJSON.Uiddata.Poa._po;
    //          document.getElementById('aStreet').innerHTML = responseJSON.Uiddata.Poa._street;
    //          document.getElementById('aLandmark').innerHTML = responseJSON.Uiddata.Poa._landmark;
    //          // document.getElementById('aSubdistrict').innerHTML = responseJSON.Uiddata.Poa.subdist;
    //          document.getElementById('aDistrict').innerHTML = responseJSON.Uiddata.Poa._dist;
    //          document.getElementById('bName').value = responseJSON.CustBasicInfo.Name;
    //          if (responseJSON.CustBasicInfo.Gender === 'M') {
    //             document.getElementById('bGender').value = 'Male';
    //          }
    //          else {
    //             document.getElementById('bGender').value = 'Female';
    //          }
    //          // document.getElementById('bGender').value = responseJSON.CustBasicInfo.Gender;
    //          document.getElementById('bDOB').value = responseJSON.CustBasicInfo.DOB;
    //          document.getElementById('bPinCode').value = responseJSON.CustBasicInfo.PinCode;
    //          document.getElementById('bCity').value = responseJSON.CustBasicInfo.City;
    //          document.getElementById('bState').value = responseJSON.CustBasicInfo.State;
    //          document.getElementById('bCountry').value = 'India';

    //          document.getElementById('bHouse').innerHTML = responseJSON.CustBasicInfo.House;
    //          document.getElementById('bLocality').innerHTML = responseJSON.CustBasicInfo.Locality;
    //          document.getElementById('bLandmark').innerHTML = responseJSON.CustBasicInfo.Landmark;
    //          document.getElementById('bCity').innerHTML = responseJSON.CustBasicInfo.City;
    //          document.getElementById('bPinCode').innerHTML = responseJSON.CustBasicInfo.PinCode;
    //          document.getElementById('bDistrict').innerHTML = responseJSON.CustBasicInfo.District;
    //          document.getElementById('bState').innerHTML = responseJSON.CustBasicInfo.State;

    //          document.getElementById('CustLat').innerHTML = responseJSON.Geolocation.Latitude;
    //          document.getElementById('CustLong').innerHTML = responseJSON.Geolocation.Longitude;

    //          xPincode.value = responseJSON.Uiddata.Poa._pc;
    //          xCity.value = responseJSON.Uiddata.Poa._vtc;
    //          xState.value = responseJSON.Uiddata.Poa._state;
    //          xCountry.value = responseJSON.Uiddata.Poa._country;
    //          xDocPhoto.src = "data:image/png;base64, " + responseJSON.Uiddata.Pht;

    //          //const blob = base64toBlob(responseJSON.Uiddata.Pht, 'image/png');
    //          //const blobUrl = URL.createObjectURL(blob);
    //          anchorxDocPhoto.href = "data:image/png;base64, " + responseJSON.Uiddata.Pht;
    //          xVerifyCodeOp.value = responseJSON.VerificationCode;
    //          xQuestionList = [];
    //          xQuestionList = responseJSON.QuestionList;
    //          xRandomQuestions.value = "1. " + responseJSON.QuestionList[0].Question + "\n" + "2. " + responseJSON.QuestionList[1].Question;
    //          // xRandomQuestions.value = "1. " + "What is your mother's maiden name?";

    //          var CityMatch = responseJSON.CityMatch;
    //          var PinCodeMatch = responseJSON.PinCodeMatch;
    //          var DistrictMatch = responseJSON.DistrictMatch;
    //          var StateMatch = responseJSON.StateMatch;
    //          var HouseSoundX = responseJSON.HouseSoundX;
    //          var LocalitySoundX = responseJSON.LocalitySoundX;
    //          var LandmarkSoundX = responseJSON.LandmarkSoundX;

    //          var lblAddrMismatch = document.getElementById('lblAddrMismatch');

    //          // District Match Tentative
    //          // if(CityMatch != 'Y' || PinCodeMatch != 'Y' || DistrictMatch != 'Y' || StateMatch != 'Y') {
    //          if (CityMatch != 'Y' || PinCodeMatch != 'Y' || StateMatch != 'Y') {
    //             addressMismatchFlag = false;
    //             lblAddrMismatch.innerHTML = 'Current Address Does Not Match With Aadhaar Address. Please Verify!';
    //             lblAddrMismatch.style.color = 'red';
    //          }
    //          else if (HouseSoundX < 2 || LocalitySoundX < 2 || LandmarkSoundX < 2) {
    //             addressMismatchFlag = false;
    //             lblAddrMismatch.innerHTML = 'Current Address And Aadhaar Address Does Not Appear To Be Similar. Please Verify!';
    //             lblAddrMismatch.style.color = 'red';
    //          }
    //          else {
    //             addressMismatchFlag = true;
    //             lblAddrMismatch.innerHTML = 'Current Address And Aadhaar Address Appear To Be Similar. Please Verify!'
    //             lblAddrMismatch.style.color = 'green';
    //          }
    //      //    InitAddrMismatch();
    //       }
    //       else {
    //          console.log(responseJSON.ResponseMessage);
    //          swal({
    //             title: "Alert!",
    //             text: 'Unable To Fetch Customer Data!',
    //             type: "error"
    //          }, function () {
    //             // window.location.href = './Operator/OperatorDashboard.html';
    //             window.history.back();
    //          });
    //       }
    //    },
    //    error: function () {
    //    }
    // });
  }
  function InitAddrMismatch() {
    var prev = null;
    $("#divAddrMismatch :input").change(function () {
      prev ? prev.value : null;
      if (this !== prev) {
        prev = this;
      }
      if (this.id === "radMismatchN" && radMismatchN.checked) {
        document.getElementById("ddlAddrDocType").disabled = false;
        document.getElementById("docAddrphotobtn").disabled = false;
      } else {
        document.getElementById("ddlAddrDocType").disabled = true;
        document.getElementById("docAddrphotobtn").disabled = true;
      }
    });
  }

  //initiating a call
  const CallToCustomer = () => {
    console.log("Inside the Callbtn");
    var callToUsername = RED_Cust.red_OperatorMobileNo;

    if (callToUsername == null || callToUsername == "") {
      swal("Alert!", "Opps, Need A Username To Call!", "error");
      return;
    }

    if (callToUsername.length > 0) {
      connectedUser = callToUsername;
      if (remoteVideo.srcObject != null && remoteVideo.srcObject != "") {
        swal(
          "Alert!",
          "You Are Already In A Call, Please Hang Up And Try",
          "error"
        );
        return;
      }

      // create an offer
      RTCPeerConn.current.createOffer(
        function (offer) {
          send({
            type: "offer",
            offer: offer,
          });

          RTCPeerConn.current.setLocalDescription(offer);
          setBtnDisable(false);
        },
        function (error) {
          swal("Alert!", "Error While Creating An Offer", "error");
        }
      );
    }
  };

  function GetCurrentRemoteVidDimension() {
    height = remoteVideo.videoHeight;
    width = remoteVideo.videoWidth;
  }

  // Ice Restart #BEGIN
  function RestartIce() {
    initRestart = setInterval(() => {
      console.log("Ice connectionState >>>", RTCPeerConn.current.connectionState);
      if (
        RTCPeerConn.current.connectionState === "disconnected" ||
        RTCPeerConn.current.connectionState === "failed"
      ) {
        console.log("Create Restart Offer >>>", RTCPeerConn.current.connectionState);
        RTCPeerConn.current.createOffer({ iceRestart: true })
          .then(function (offer) {
            send({
              type: "restartoffer",
              offer: offer,
            });
          })
          .then(RTCPeerConn.current.setLocalDescription());
      }
      if (RTCPeerConn.current.iceConnectionState === "connected") {
        // $('#remoteVideo').removeAttr("poster");
        swal("Alert!", "Reconnected", "success");
        clearInterval(initRestart);
      } else if (RTCPeerConn.current.iceConnectionState === "closed") {
        // swal({
        //     title: "Alert!",
        //     text: 'Connection Closed!',
        //     type: "error"
        // }, function () {
        //     //  window.location.href = './Operator/OperatorDashboard.html';
        //     // window.history.back();
        // });
        swal(
          {
            title: "Alert!",
            text: "Connection Closed!",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#2b982b",
            confirmButtonText: "Proceed With Reconnection!",
            cancelButtonText: "Proceed Without Reconnection!",
          },
          function (isConfirm) {
            if (isConfirm) {
              history.push("/OperatorDashboard");
              // window.location.href = './Operator/OperatorDashboard.html';
            } else {
            }
          }
        );
      }
    }, 500);
  }


  // console.log("upLink Speed", upLink);
  // Ice Restart #END

  //     // Get RTC stats

  // var upLink = document.getElementById('upLink');
  // var downLink = document.getElementById('downLink');

  // Outbound RTC
  let outBoundLastResult;

  function outBoundLasts() {

    if (!RTCPeerConn.current) {
      return;
    }
    if (RTCPeerConn.current.connectionState !== 'connected') {
      // upLink.innerHTML = '0';
      setUpLink(0)

      // console.log("uplink ", upLink)
      // upLink = 0;
      // downLink.innerHTML = '0';
      return;
    }
    const sender = RTCPeerConn.current.getSenders()[1];
    if (!sender) {
      return;
    }
    sender.getStats().then(res => {
      res.forEach(report => {
        let bytes;
        let headerBytes;
        let packets;
        if (report.type === 'outbound-rtp') {
          if (report.isRemote) {
            return;
          }
          const now = report.timestamp;
          bytes = report.bytesSent;
          headerBytes = report.headerBytesSent;

          packets = report.packetsSent;
          if (outBoundLastResult && outBoundLastResult.has(report.id)) {
            const deltaT = now - outBoundLastResult.get(report.id).timestamp;
            // calculate bitrate
            const bitrate = 8 * (bytes - outBoundLastResult.get(report.id).bytesSent) / deltaT;
            const headerrate = 8 * (headerBytes - outBoundLastResult.get(report.id).headerBytesSent) / deltaT;

            //calculate UpLink
            const KiloBytesPerSec = (bytes - outBoundLastResult.get(report.id).bytesSent) / 1024;
            // upLink.innerHTML = parseInt(KiloBytesPerSec);
            let ulink = parseInt(KiloBytesPerSec);


            setUpLink(ulink)

            // upLink = ulink;

            // append to chart
            // bitrateSeries.addPoint(now, bitrate);
            // headerrateSeries.addPoint(now, headerrate);
            // bitrateGraph.setDataSeries([bitrateSeries, headerrateSeries]);
            // bitrateGraph.updateEndDate();

            // calculate number of packets and append to chart
            // packetSeries.addPoint(now, packets -
            //   outBoundLastResult.get(report.id).packetsSent);
            // packetGraph.setDataSeries([packetSeries]);
            // packetGraph.updateEndDate();
          }
        }
      });
      outBoundLastResult = res;
    });
  }
  // Inbound RTC
  let inBoundLastResult;
  function inBoundLasts() {
    if (!RTCPeerConn.current) {
      return;
    }
    if (RTCPeerConn.current.connectionState != 'connected') {
      //downLink.innerHTML = '0';
      setDownLink(0)

      // downLink = 0;

      return;
    }
    const receiver = RTCPeerConn.current.getReceivers()[1];
    if (!receiver) {
      return;
    }
    receiver.getStats().then(res => {
      res.forEach(report => {
        let bytes;
        let headerBytes;
        let packets;
        if (report.type === 'inbound-rtp') {
          if (report.isRemote) {
            return;
          }
          const now = report.timestamp;
          bytes = report.bytesReceived;
          headerBytes = report.headerBytesReceived;

          packets = report.packetsReceived;
          if (inBoundLastResult && inBoundLastResult.has(report.id)) {
            const deltaT = now - inBoundLastResult.get(report.id).timestamp;
            // calculate bitrate
            const bitrate = 8 * (bytes - inBoundLastResult.get(report.id).bytesReceived) / deltaT;
            const headerrate = 8 * (headerBytes - inBoundLastResult.get(report.id).headerBytesReceived) / deltaT;

            //calculate UpLink
            const KiloBytesPerSec = (bytes - inBoundLastResult.get(report.id).bytesReceived) / 1024;
            let dlink = parseInt(KiloBytesPerSec);


            setDownLink(dlink)

            // downLink = dlink

            // append to chart
            // bitrateSeries.addPoint(now, bitrate);
            // headerrateSeries.addPoint(now, headerrate);
            // bitrateGraph.setDataSeries([bitrateSeries, headerrateSeries]);
            // bitrateGraph.updateEndDate();

            // calculate number of packets and append to chart
            // packetSeries.addPoint(now, packets -
            //   inBoundLastResult.get(report.id).packetsSent);
            // packetGraph.setDataSeries([packetSeries]);
            // packetGraph.updateEndDate();
          }
        }
      });
      inBoundLastResult = res;
    });
  }


  // Remote Inbound RTC
  // console.log(downLink, "downLink current");
  // console.log(upLink, "upLInk");
  let remoteInBoundLastResult;

  function remoteInBoundLasts() {
    if (!RTCPeerConn.current) {
      return;
    }
    if (RTCPeerConn.current.connectionState != 'connected') {
      // downLink.innerHTML = '0';
      setDownLink(0)

      // downLink = 0;
      return;
    }
    const sender = RTCPeerConn.current.getSenders()[1];
    if (!sender) {
      return;
    }
    sender.getStats().then(res => {
      res.forEach(report => {
        if (report.type === 'remote-inbound-rtp') {
          const now = report.timestamp;
          if (remoteInBoundLastResult && remoteInBoundLastResult.has(report.id)) {
            const deltaT = now - remoteInBoundLastResult.get(report.id).timestamp;

            const LocalPacketLoss = report.packetsLost;
            localPacketLoss.innerHTML = LocalPacketLoss;
          }
        }
      });
      remoteInBoundLastResult = res;
    });
  }
  //Custom Methods


  function takeFullPicture() {
    try {
      GetCurrentRemoteVidDimension();

      var tempPersonCanvas = document.createElement("canvas");
      var tempPersonCanvasCtx = tempPersonCanvas.getContext("2d");
      tempPersonCanvas.width = width;
      tempPersonCanvas.height = height;
      tempPersonCanvasCtx.drawImage(remoteVideo, 0, 0, width, height);
      var ImageDataURL = tempPersonCanvas.toDataURL();
      setFullImage(ImageDataURL);
    } catch (error) {
      console.log(error, "this is error");
    }
  }

  function takepicture() {


    // var btnTakePersonPhoto_Spinner = document.getElementById('btnTakePersonPhoto_Spinner');
    // var btnTakePersonPhoto_LoadingText = document.getElementById('btnTakePersonPhoto_LoadingText');
    // var btnTakePersonPhoto_ButtonText = document.getElementById('btnTakePersonPhoto_ButtonText');
    // etcfBtnDisable(false);
    try {
      //    btnTakePersonPhoto.disabled = true;
      //    btnTakePersonPhoto_ButtonText.style.display = "none";
      //    btnTakePersonPhoto_Spinner.style.display = "inline-block";
      //    btnTakePersonPhoto_LoadingText.style.display = "block";

      GetCurrentRemoteVidDimension();

      var tempPersonCanvas = document.createElement("canvas");
      var tempPersonCanvasCtx = tempPersonCanvas.getContext("2d");
      tempPersonCanvas.width = width;
      tempPersonCanvas.height = height;
      tempPersonCanvasCtx.drawImage(remoteVideo, 0, 0, width, height);

      //    swal({
      //       title: "Detecting Face...",
      //       text: "Please Wait",
      //       // type: "info",
      //       // icon: "info",
      //       imageUrl: "./images/Loader-Ellipsis-244px.gif",
      //       buttons: false,
      //       showConfirmButton: false,
      //       // showCancelButton: false,
      //       // closeOnConfirm: false,
      //       // showLoaderOnConfirm: false,
      //       allowOutsideClick: false
      //    });

      // var ImageDataURL = docphotocanvas.toDataURL();
      // tempPersonCanvas.toDataURL());

      var ImageDataURL = tempPersonCanvas.toDataURL();

      var ImageData = ImageDataURL.split(",");
      var b64Image = ImageData[1];

      var Data = {
        image: b64Image,
      };
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false
      });
      // trackPromise(
      // HttpService.PostAjaxDataDetectServer1(Data, "7064", "/MaskDetection")
      HttpService.PostAjaxDataDetectServerMaskDetection(Data)
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("OperatorAuthAccept res ", responseJSON);
          if (responseJSON.ResponseCode === "000") {
            setcfBtnDisable(false);
            var faceBoundaryImage =
              "data:image/png;base64," +
              responseJSON.ResponseMessage.OutputImage;
            setCapturedImage(responseJSON.ResponseMessage.OutputImage);
            clearphoto();
            var context = canvas.getContext("2d");
            if (width && height) {
              canvas.width = width;
              canvas.height = height;
              context.drawImage(tempPersonCanvas, 0, 0, width, height);

              var image = new Image();
              image.onload = function () {
                context.drawImage(image, 0, 0, width, height);
                var dataUrlCustPhotoCan = canvas.toDataURL();
                // document.getElementById('anchorxCustPhoto').href = dataUrlCustPhotoCan
              };
              image.src = faceBoundaryImage;
              // matchphotobtn.disabled = false;
              // matchPanphotobtn.disabled = false;
            } else {
              clearphoto();
            }
          } else if (responseJSON.ResponseCode === "100") {
            // matchphotobtn.disabled = true;
            // matchPanphotobtn.disabled = true;
            setcfBtnDisable(true);
            clearphoto();
            swal(
              "Alert!",
              "Unable To Detect Any Face, Please Try Again!",
              "error"
            );
          } else if (responseJSON.ResponseCode === "101") {
            // matchphotobtn.disabled = true;
            // matchPanphotobtn.disabled = true;
            setcfBtnDisable(true);
            clearphoto();
            swal(
              "Alert!",
              "Face Mask Detected, Please Remove Your Mask And Try Again!",
              "error"
            );
          } else if (responseJSON.ResponseCode === "102") {
            // matchphotobtn.disabled = true;
            // matchPanphotobtn.disabled = true;
            setcfBtnDisable(true);
            clearphoto();
            swal(
              "Alert!",
              "More Than One Face Detected, Capture Photo With A Single Face!",
              "error"
            );
          } else {
            // matchphotobtn.disabled = true;
            // matchPanphotobtn.disabled = true;
            setcfBtnDisable(true);
            console.log("ERR >>> ", responseJSON.ResponseCode);
            clearphoto();
            swal(
              "Alert!",
              "Failed To Detect Any Face, Please Try Again!",
              "error"
            );
          }
        })
        .catch((error) => {
          clearphoto();
          //  matchphotobtn.disabled = true;
          //  matchPanphotobtn.disabled = true;
          //  btnTakePersonPhoto.disabled = false;
          console.log("ERR >>> ", err);
          swal("Alert!", "Face Detection Service Is Unavailable!", "error");
        });
      // );
    } catch (err) {
      console.log(err);
      clearphoto();
      //    matchphotobtn.disabled = true;
      //    btnTakePersonPhoto.disabled = false;
    }
  }
  // console.log("capturedImage", capturedImage)
  function clearphoto() {
    try {
      var context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL("image/png");
      //photo.setAttribute('src', data);
    } catch (err) {
      console.log(err);
    }
  }

  function takedocpicture() {
    // var docphotobtn_Spinner = document.getElementById('docphotobtn_Spinner');
    // var docphotobtn_LoadingText = document.getElementById('docphotobtn_LoadingText');
    // var docphotobtn_ButtonText = document.getElementById('docphotobtn_ButtonText');

    // if (
    //   // imgCanAdhar !== contactDefaultImage &&
    //   (imgCanPan !== contactDefaultImage) &&
    //   // imgCanPassport !== contactDefaultImage &&
    //   // (imgCanSign !== contactDefaultImage)
    // ) {
    if (docType === "") {
      return false;
    }
    // console.log("imgCanPan", imgCanPan);

    if (imgCanPan !== contactDefaultImage) {
      setckDoc(true);
      console.log(ckDoc, 'DOCUMENT CHECK')
    }

    try {
      // docphotobtn.disabled = true;
      // docphotobtn_ButtonText.style.display = "none";
      // docphotobtn_Spinner.style.display = "inline-block";
      // docphotobtn_LoadingText.style.display = "block";

      // cleardocphoto();
      GetCurrentRemoteVidDimension();
      if (width && height) {
        var selIdDocType = docType;
        if (selIdDocType === "2") {
          //Signature

          var tempCanvasSign = document.createElement("canvas");
          var tempCanvasSignCtx = tempCanvasSign.getContext("2d");
          tempCanvasSign.width = width;
          tempCanvasSign.height = height;
          tempCanvasSignCtx.drawImage(remoteVideo, 0, 0, width, height);

          var signatureImage = tempCanvasSign.toDataURL();
          if (selectedCameraImage === "frontImage") {
            setImgCanSign({ ...imgCanSign, frontImage: signatureImage });
          } else {
            setImgCanSign({ ...imgCanSign, backImage: signatureImage });
          }
          setckSignDoc(true);
          if (imgCanPan !== contactDefaultImage) {
            setckDoc(true);
            console.log(ckDoc, 'DOCUMENT CHECK')
          }
          else {
            setckDoc(false);
          }

          /* Old Logic
                    var context = canSignature.getContext('2d');
                    canSignature.width = width;
                    canSignature.height = height;
                    context.drawImage(remoteVideo, 0, 0, width, height);

                    var dataUrlSignCan = canSignature.toDataURL();
                    anchordocphotocanvas.href = dataUrlSignCan;
                    */

          //set state for signature check in header
          // var ckSignDoc = document.getElementById('ckSignDoc');
          // ckSignDoc.checked = true;
          // docphotobtn.disabled = false;
          // docphotobtn_Spinner.style.display = "none";
          // docphotobtn_LoadingText.style.display = "none";
          // docphotobtn_ButtonText.style.display = "block";
        } else if (selIdDocType === "0") {
          // PAN
          cleardocphoto("0");
          PanDetection();
        } else if (selIdDocType === "1") {
          // Aadhaar
          cleardocphoto("1");
          AadhaarDetection();
        } else if (selIdDocType === "3") {
          // Aadhaar
          cleardocphoto("3");
          PassPortDetection();
        }
      } else {
        console.log("Heigth Width Not Defined!");
      }
    } catch (err) {
      console.log(err);
      // cleardocphoto();
      // docphotobtn.disabled = false;
      // docphotobtn_Spinner.style.display = "none";
      // docphotobtn_LoadingText.style.display = "none";
      // docphotobtn_ButtonText.style.display = "block";
    }
  }
  // console.log("imgCanSign image", imgCanSign)
  function PanDetection() {
    try {
      var tempCanvasPan = document.createElement("canvas");
      var tempCanvasPanCtx = tempCanvasPan.getContext("2d");
      tempCanvasPan.width = width;
      tempCanvasPan.height = height;
      tempCanvasPanCtx.drawImage(remoteVideo, 0, 0, width, height);

      var ImageDataURL = tempCanvasPan.toDataURL();
      if (selectedCameraImage === "backImage") {
        setImgCanPan({ ...imgCanPan, backImage: ImageDataURL });
        return;
      }
      var ImageData = ImageDataURL.split(",");
      var b64Image = ImageData[1];

      var Data = {
        image: b64Image,
      };
      swal2.fire({
        title: "Processing...",
        text: "Validating Pancard",
        // type: "info",
        // icon: "info",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        //buttons: false,
        showConfirmButton: false,
        // showCancelButton: false,
        // closeOnConfirm: false,
        // showLoaderOnConfirm: false,
        allowOutsideClick: false
      });
      // trackPromise(
      // HttpService.PostAjaxDataDetectServer1(Data, "7060", "/PanDetection")
      HttpService.PostAjaxDataDetectServerPancard(Data)
        .then((resp) => {
          let responseJSON = resp.data;
          swal2.close();
          console.log("PanDetection res ", responseJSON);
          if (responseJSON.ResponseCode === "000") {
            var faceBoundedImage =
              "data:image/png;base64," +
              responseJSON.ResponseMessage.OutputImage;
            setImgCanPan({ ...imgCanPan, frontImage: faceBoundedImage });
            //Document Checkbox flag set to true
            // ckDoc.checked = false;
            if (imgCanSign !== contactDefaultImage) {
              setckDoc(true);
              console.log(ckDoc, 'DOCUMENT CHECK')
            }
            else {
              setckDoc(false);
            }

            if (responseJSON.FaceDetectFlag != true) {
              setCustData({ ...custData, panPht: contactDefaultImage });
              // swal('Alert!', 'Document Verified But Unable To Detect Face In Document, You Can Try Again', 'info');
              swal({
                title: "Alert!",
                text: "Document Verified But Unable To Detect Face Image!",
                icon: "info",
                buttons: ["Retake Photo", "Accept"],
                // showCancelButton: true,
                // confirmButtonColor: "#2b982b",
                // confirmButtonText: 'Accept',
                // cancelButtonText: "Retake Photo"
              }).then((isConfirm) => {
                if (isConfirm) {
                  InitPanOCR(b64Image);
                } else {
                  //Document Checkbox flag set to false
                  // ckDoc.checked = false;
                  // setImgCanPan(contactDefaultImage);
                  setImgCanPan({ ...imgCanPan, frontImage: contactDefaultImage });
                  setCustData({ ...custData, panPht: contactDefaultImage });
                }
              });
            } else {
              var panFaceImage =
                "data:image/png;base64," +
                responseJSON.ResponseMessage.FaceImage;
              setCustData({ ...custData, panPht: panFaceImage });
              InitPanOCR(b64Image);
            }

            /* Old canvas logic
                          var context = canPAN.current.getContext('2d');
                          canPAN.current.width = width;
                          canPAN.current.height = height;
  
                          var image = new Image();
                          image.onload = function () {
                              context.drawImage(image, 0, 0, width, height);
                              var dataUrlPhotoAadharCan = canPAN.current.toDataURL();
                              setImgCanPan(dataUrlPhotoAadharCan);
                              // anchordocphotocanvas.href = dataUrlPhotoAadharCan;
                          };
                          image.src = faceBoundedImage;
                          */

            // InitPanOCR(b64Image);
            // ckDoc.checked = true;
            // docphotobtn.disabled = false;
            // docphotobtn_Spinner.style.display = "none";
            // docphotobtn_LoadingText.style.display = "none";
            // docphotobtn_ButtonText.style.display = "block";
          } else {
            // docphotobtn.disabled = false;
            // docphotobtn_Spinner.style.display = "none";
            // docphotobtn_LoadingText.style.display = "none";
            // docphotobtn_ButtonText.style.display = "block";

            //Document Checkbox flag set to false
            // ckDoc.checked = false;
            console.log("ERR >>> ", responseJSON.ResponseCode);
            cleardocphoto("0");
            swal("Alert!", "Invalid PAN document!", "error");
          }
        })
        .catch((error) => {
          cleardocphoto("0");
          //  matchphotobtn.disabled = true;
          //  matchPanphotobtn.disabled = true;
          //  btnTakePersonPhoto.disabled = false;

          //Document Checkbox flag set to false
          // ckDoc.checked = false;
          console.log("ERR >>> ", err);
          swal("Alert!", "Face Detection Service Is Unavailable!", "error");
        });
      // );
    } catch (err) {
      console.log("PanDetection Err >>>", err);
    }
  }

  function PassPortDetection() {
    try {

      var tempCanvasPassport = document.createElement("canvas");
      var tempCanvasPassportCtx = tempCanvasPassport.getContext("2d");
      tempCanvasPassport.width = width;
      tempCanvasPassport.height = height;
      tempCanvasPassportCtx.drawImage(remoteVideo, 0, 0, width, height);

      var ImageDataURL = tempCanvasPassport.toDataURL();
      var ImageData = ImageDataURL.split(",");
      var b64Image = ImageData[1];

      var Data = {
        image: b64Image,
      };
      console.log("passport parameter ", Data);
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false
      });
      // trackPromise(
      // HttpService.PostAjaxDataDetectAPI(Data, "7060", "/PassportOCR")
      HttpService.PostAjaxDataDetectAPI_PassportOcr(Data)
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("PassportOCR api ", responseJSON);
          //    if (responseJSON.PassportDetectionFlag === true) {

          if (responseJSON.ResponseCode === "000") {
            setPassportData({
              ...passportData,
              Dob: responseJSON.Response.PassportMrz.Dob,
              Doe: responseJSON.Response.PassportMrz.Doe,
              Name: responseJSON.Response.PassportMrz.Name,
              PassportNumber:
                responseJSON.Response.PassportMrz.PassportNumber,
              Surname: responseJSON.Response.PassportMrz.Surname,
            });
            if (responseJSON.PassportDetectionFlag === true) {
            } else {
            }
          } else if (responseJSON.ResponseCode === "100") {
          } else if (responseJSON.ResponseCode === "999") {
          }
          //  }

          //     var faceBoundedImage = 'data:image/png;base64,' + responseJSON.ResponseMessage.OutputImage;
          //     setImgCanPan(faceBoundedImage);

          //     if (responseJSON.FaceDetectFlag != true) {
          //         setCustData({ ...custData, panPht: contactDefaultImage })
          //         // swal('Alert!', 'Document Verified But Unable To Detect Face In Document, You Can Try Again', 'info');
          //         swal({
          //             title: 'Alert!',
          //             text: 'Document Verified But Unable To Detect Face Image!',
          //             icon: 'info',
          //             buttons: ['Retake Photo', 'Accept']

          //         }).then((isConfirm) => {
          //             if (isConfirm) {
          //                 InitPanOCR(b64Image);
          //             }
          //             else {

          //                 setImgCanPan(contactDefaultImage);
          //                 setCustData({ ...custData, panPht: contactDefaultImage });
          //             }
          //         });
          //     }
          //     else {
          //         var panFaceImage = 'data:image/png;base64,' + responseJSON.ResponseMessage.FaceImage;
          //         setCustData({ ...custData, panPht: panFaceImage })
          //         InitPanOCR(b64Image);
          //     }

          // }
          // else {

          //     console.log('ERR >>> ', responseJSON.ResponseCode);
          //     cleardocphoto('0');
          //     swal('Alert!', 'Invalid PAN document!', 'error');
          // }
        })
        .catch((error) => {
          cleardocphoto("0");

          console.log("ERR >>> ", err);
          swal("Alert!", "Face Detection Service Is Unavailable!", "error");
        });
      // );
    } catch (err) {
      console.log("PanDetection Err >>>", err);
    }
  }

  function InitPanOCR(imageData) {
    try {

      var aadhaarFullName = custData.Aname;
      // var aadhaarFullName = "SHREEDHAR PRAMOD DESAI";

      var Data = {
        image: imageData,
        firstname: aadhaarFullName,
      };
      swal2.fire({
        title: "Analyzing PAN Document...",
        text: "Please Wait",
        // type: "info",
        // icon: "info",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        buttons: false,
        showConfirmButton: false,
        // showCancelButton: false,
        // closeOnConfirm: false,
        // showLoaderOnConfirm: false,
        allowOutsideClick: false
      });

      // trackPromise(
      // HttpService.PostAjaxDataDetectServer2(Data, "7068", "/PanOCR")
      HttpService.PostAjaxDataDetectServerPanOcr(Data)
        .then((resp) => {

          console.log("OCR resp ", resp.data);
          let responseJSON = resp.data;
          swal2.close();
          if (responseJSON.ResponseCode === "000") {

            var ResponsePanData = responseJSON.ResponseMessage;
            if (ResponsePanData != null) {
              if (
                ResponsePanData.FirstName.trim().toUpperCase() !=
                aadhaarFullName.trim().toUpperCase()
              ) {
                // swal('Alert!', 'Name On PAN Does Not Match With Name On Aadhaar', 'info');
                swal({
                  title: "Alert!",
                  text: "Name On PAN Does Not Match With Name On Aadhaar",
                  icon: "warning",
                  buttons: ["Re-analyze", "Accept"],
                }).then((isConfirm) => {
                  if (isConfirm) {
                    setCustData({
                      ...custData,
                      Pname: ResponsePanData.FirstName.trim(),
                      pdob: ResponsePanData.Dob.trim(),
                      ppan: ResponsePanData.PanNumber.trim(),
                    });
                  } else {
                    setCustData({
                      ...custData,
                      Pname: "-",
                      pdob: "-",
                      ppan: "-",
                    });
                  }
                });
              } else {
                setCustData({
                  ...custData,
                  Pname: ResponsePanData.FirstName.trim(),
                  pdob: ResponsePanData.Dob.trim(),
                  ppan: ResponsePanData.PanNumber.trim(),
                });
              }
            }
          } else {
            swal(
              "Alert!",
              "Poor Image Quality! Unable to Perform OCR.",
              "info"
            );
          }
        })
        .catch((error) => {

          //  matchphotobtn.disabled = true;
          //  matchPanphotobtn.disabled = true;
          //  btnTakePersonPhoto.disabled = false;
          console.log("ERR >>> ", err);
          swal("Alert!", "PAN Analysis Service Is Unavailable!", "error");
          cleardocphoto("0");
        });
      // );
    } catch (err) {

      console.log("PAN OCR Err >>>", err);
    }
  }

  function AadhaarDetection() {
    try {
      var tempCanvasAadhaar = document.createElement("canvas");
      var tempCanvasAadhaarCtx = tempCanvasAadhaar.getContext("2d");
      tempCanvasAadhaar.width = width;
      tempCanvasAadhaar.height = height;
      tempCanvasAadhaarCtx.drawImage(remoteVideo, 0, 0, width, height);

      var ImageDataURL = tempCanvasAadhaar.toDataURL();

      if (selectedCameraImage === "backImage") {
        setImgCanAdhar({ ...imgCanAdhar, backImage: ImageDataURL });
        return;
      }
      var ImageData = ImageDataURL.split(",");
      var b64Image = ImageData[1];

      var Data = {
        image: b64Image,
      };
      swal2.fire({
        title: "Validating Document...",
        text: "Please Wait",
        // type: "info",
        // icon: "info",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        buttons: false,
        showConfirmButton: false,
        // showCancelButton: false,
        // closeOnConfirm: false,
        // showLoaderOnConfirm: false,
        allowOutsideClick: false
      });
      // trackPromise(
      // HttpService.PostAjaxDataDetectServer1(Data, "7063", "/AadhaarDetection")
      HttpService.PostAjaxDataDetectServerAadharcard(Data)
        .then((resp) => {
          let responseJSON = resp.data;
          console.log("AadhaarDetection res ", responseJSON);
          swal2.close();
          if (responseJSON.ResponseCode === "000") {
            var faceBoundedMaskImage =
              "data:image/png;base64," +
              responseJSON.ResponseMessage.OutputImage;

            setImgCanAdhar({ ...imgCanAdhar, backImage: faceBoundedMaskImage });
            // setImgCanAdhar(faceBoundedMaskImage);

            /* Old Logic
                          var context = canPAN.getContext('2d');
                          canPAN.width = width;
                          canPAN.height = height;
  
                          var image = new Image();
                          image.onload = function () {
                              context.drawImage(image, 0, 0, width, height);
                              var dataUrlPhotoAadharCan = canAadhaar.toDataURL();
                              setImgCanAdhar(dataUrlPhotoAadharCan);
                              // anchordocphotocanvas.href = dataUrlPhotoAadharCan;
                          };
                          image.src = faceBundedMaskImage;
                          */
          } else {
            // docphotobtn.disabled = false;
            // docphotobtn_Spinner.style.display = "none";
            // docphotobtn_LoadingText.style.display = "none";
            // docphotobtn_ButtonText.style.display = "block";
            console.log("ERR >>> ", responseJSON.ResponseCode);
            cleardocphoto("1");
            swal("Alert!", "Invalid Aadhaar document!", "error");
          }
        })
        .catch((error) => {
          cleardocphoto("1");
          //  matchphotobtn.disabled = true;
          //  matchPanphotobtn.disabled = true;
          //  btnTakePersonPhoto.disabled = false;
          console.log("ERR >>> ", err);
          swal("Alert!", "AadhaarDetection Service Is Unavailable!", "error");
        });
      // );
    } catch (err) {
      console.log("AadhaarDetection Err >>>", err);
    }
  }

  function cleardocphoto(canvasType) {
    if (canvasType === "0") {
      // var context = canPAN.current.getContext('2d');
      // context.fillStyle = "#FFF";
      // context.fillRect(0, 0, canPAN.current.width, canPAN.current.height);
      setImgCanPan(defaultPanState);
      setCustData({ ...custData, panPht: contactDefaultImage });
      // var ckDoc = document.getElementById('ckDoc');
      // ckDoc.checked = false;
    } else if (canvasType === "1") {
      // var context = canAadhaar.getContext('2d');
      // context.fillStyle = "#FFF";
      // context.fillRect(0, 0, canAadhaar.width, canAadhaar.height);
      setImgCanAdhar(defaultAadharState);
      // var ckDoc = document.getElementById('ckDoc');
      // ckDoc.checked = false;
    } else if (canvasType === "2") {
      // var context = canSignature.getContext('2d');
      // context.fillStyle = "#FFF";
      // context.fillRect(0, 0, canSignature.width, canSignature.height);
      setImgCanSign(defaultSignatureState);
      // var ckSignDoc = document.getElementById('ckSignDoc');
      // ckSignDoc.checked = false;
    } else if (canvasType === "3") {
      // var context = canPassport.getContext('2d');
      // context.fillStyle = "#FFF";
      // context.fillRect(0, 0, canPassport.width, canPassport.height);
      setImgCanPassport(contactDefaultImage);
    }
  }
  async function CompareFace() {
    swal2.fire({
      title: "Comparing Face ...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    // const input1 = document.getElementById("canvas");
    var refim = custData.pht.split(",");
    // const input2 = document.getElementById("xDocPhoto");
    var dataPara = {
      refimage: refim[1],
      targetimage: capturedImage
    }


    await HttpService.PostAjaxDataCompareFace(dataPara).then(res => {
      swal2.close();
      console.log(res, "response of the api");

      debugger;
      // distanceFloat.current = 0.4;
      if (res.data.Response.FaceVerificationValue > 0.6) {
        swal2.close();
        setckFace(false);
        swal(
          "Alert!",
          "Face Match Unsuccessful, Customer's Face Does Not Match With The Id Document's Face Image!",
          "error"
        );
      } else {
        setckFace(true);
        var distance = parseFloat(res.data.Response.FaceVerificationValue).toFixed(2);
        setDistanceFload(distance);
        swal2.close();
        swal("Alert!", "Face Match Successful!", "success");
        setShowingProgress(false);
        setcfBtnDisable(true);
      }

    }).catch(err => {
      console.log(err, "Error")
    })

  }


  function startRecoding() {

    var options = { mimeType: "video/webm;codecs=vp9" };
    try {
      mediaRecorder = new MediaRecorder(remoteStream, options);
    } catch (e) {
      console.log("Exception while creating MediaRecorder:", e);
      return;
    }

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    setRecordbtn(false);
    mediaRecorder.onstop = (event) => {
      let superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
      var videoSrc = window.URL.createObjectURL(superBuffer);
      setrecordedSession(videoSrc);
      // viewremoteVideo.controls = true;
      // viewremoteVideo.play();
      // convertBlobTobase64(superBuffer);
      xBlobVideoData = superBuffer;
      // if (passiveLiveCkBool) {
      //    InitLivenessCheck(xBlobVideoData);
      // }
    };
  }

  //Recording Data handled
  function handleDataAvailable(event) {
    console.log("Handle Data Function Invoked");
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
      recordedBlobs = [];
      recordedBlobs.push(event.data);
    }
  }

  //Event handler for stop recording
  function stopRecording() {
    mediaRecorder.stop();
    setRecordbtn(true);

  }

  //hang up
  function hangUpBtn() {
    HangUpAndReload();
    stopVideo();

  }

  function HangUpAndReload() {
    // mediaRecorderLive.stop();
    // mediaRecorder.stop();
    debugger;
    send({
      type: "leave",
      name: RED_Cust.red_OperatorMobileNo,
    });

    setBtnDisable(true);

    //Reload local/operator User Screen
    // window.location = './pages/Operator/OperatorDashboard.html'
  }

  //Liveness Check

  function InitLivenessCheck(blobData) {

    // var livenessStatsBadge = document.getElementById('livenessStatsBadge');
    // livenessStatsBadge.innerHTML = "- PENDING -";
    try {
      // var aadhaarImgSrc = document.getElementById('xDocPhoto').src;
      var aadhaarImgSrc = custData.pht;
      var aadhaarImgData = aadhaarImgSrc.split(",");
      var inputImageAdhr = aadhaarImgData[1];

      var formData = new FormData();
      formData.append("inputfile", blobData, xCustId + ".webm");
      formData.append("refimage", inputImageAdhr);
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        // type: "info",
        // icon: "info",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        //buttons: false,
        showConfirmButton: false,
        // showCancelButton: false,
        // closeOnConfirm: false,
        // showLoaderOnConfirm: false,
        allowOutsideClick: false
      });
      // trackPromise(
      // HttpService.PostAjaxDataDetectServer1_Multipart(
      //   formData,
      //   "7069",
      //   "/LivenessCheck"
      // )
      HttpService.PostAjaxDataDetectServer_LivenessCheck(
        formData
      )
        .then((resp) => {
          let responseJSON = resp.data;
          swal2.close();
          console.log("OperatorAuthAccept res ", responseJSON);
          if (responseJSON.ResponseCode === "000") {
            // swal('Alert!', responseJSON.ResponseMessage, 'success');
            setLiveNessStatus("- SUCCESS -");
            //livenessStatsBadge.innerHTML = "- SUCCESS -";
          } else {
            // swal('Alert!', responseJSON.ResponseMessage, 'error');
            setLiveNessStatus("- FAILURE -");
            // livenessStatsBadge.innerHTML = "- FAILURE -";
            console.log("LivenessCheck >>>", responseJSON.ResponseMessage);
          }
        })
        .catch((error) => {
          clearphoto();
          //  matchphotobtn.disabled = true;
          //  matchPanphotobtn.disabled = true;
          //  btnTakePersonPhoto.disabled = false;
          console.log("ERR >>> ", err);
          swal("Alert!", "Face Detection Service Is Unavailable!", "error");
        });
      // );
      //    $.ajax({
      //       type: 'POST',
      //       url: LivenessCheckURL,
      //       data: formData,
      //       processData: false,
      //       contentType: false,
      //       success: function (responseData) {
      //          
      //          btnLivenessStopRecord_Spinner.style.display = 'none';
      //          btnLivenessStartRecord.style.display = 'block';
      //          var responseJSON = JSON.parse(JSON.stringify(responseData));
      //          if (responseJSON.ResponseCode === "000") {
      //             // swal('Alert!', responseJSON.ResponseMessage, 'success');
      //             livenessStatsBadge.innerHTML = "- SUCCESS -";
      //          }
      //          else {
      //             // swal('Alert!', responseJSON.ResponseMessage, 'error');
      //             livenessStatsBadge.innerHTML = "- FAILURE -";
      //             console.log("LivenessCheck >>>", responseJSON.ResponseMessage);
      //          }
      //       },
      //       error: function (err) {
      //         //  btnLivenessStopRecord_Spinner.style.display = 'none';
      //         //  btnLivenessStartRecord.style.display = 'block';
      //         //  livenessStatsBadge.innerHTML = "- PENDING -";
      //          console.log("LivenessCheck err >>>", err);
      //       }
      //    });
    } catch (error) {
      //    btnLivenessStopRecord_Spinner.style.display = 'none';
      //    btnLivenessStartRecord.style.display = 'block';
      //    livenessStatsBadge.innerHTML = "- PENDING -";
      console.log("LivenessCheck Catch error >>>", error);
    }
  }

  function InitializeCropper() {

    cropperCtx = null;
    var elementId = "imgDoc_" + docType;
    cropperCtx = document.getElementById(elementId);
    if (cropper) {
      cropper.destroy();
    }
    cropper = new Cropper(cropperCtx);
  }

  function CropAction() {

    if (!cropper) {
      swal("Alert!", "Please Initialize Cropper!", "error");
      return;
    }
    var croppedDataURL = cropper.getCroppedCanvas().toDataURL();
    if (selectedCameraImage === "frontImage") {
      switch (docType) {
        case "0":
          setImgCanPan({ ...imgCanPan, frontImage: croppedDataURL });
          console.log(imgCanPan, "console after cropping image");

          break;
        case "1":

          setImgCanAdhar({ ...imgCanAdhar, frontImage: croppedDataURL });
          break;
        case "2":

          setImgCanSign({ ...imgCanSign, frontImage: croppedDataURL });
          break;
        default:
          console.log("destroy frontimage");
          break;
      }

    } else {
      switch (docType) {
        case "0":

          setImgCanPan({ ...imgCanPan, backImage: croppedDataURL });
          console.log(imgCanPan, "console after cropping image");
          break;
        case "1":
          setImgCanAdhar({ ...imgCanAdhar, backImage: croppedDataURL });
          break;
        case "2":
          setImgCanSign({ ...imgCanSign, backImage: croppedDataURL });
          break;
        default:
          //  cropper.destroy();
          console.log("default case");
          break;
      }
    }
    cropper.destroy();


    // if (docType === "0") {
    //   setImgCanPan({...defaultAadharState, croppedDataURL});
    // } else if (docType === "1") {
    //   setImgCanAdhar(croppedDataURL);
    // } else if (docType === "2") {
    //   setImgCanSign(croppedDataURL);
    // }
    // cropper.destroy();
  }

  function DestroyCropper() {
    if (!cropper) {
      // initCropperBtn.style.display = 'block';
      // destroyCropperBtn.style.display = 'none';
      // cropBtn.style.display = 'none';
    } else {
      cropper.destroy();
      // initCropperBtn.style.display = 'block';
      // destroyCropperBtn.style.display = 'none';
      // cropBtn.style.display = 'none';
    }
    // if (cropperCanCtx.id === 'docSignCanvas') {
    //     document.getElementById('anchordocSignCanvas').setAttribute('href', cropperCanCtx.toDataURL());
    //     document.getElementById('anchordocSignCanvas').setAttribute('data-lightbox', 'lightImgdocSignCanvas');
    // }
    // else {
    //     var selAncId = 'anchor' + cropperCanCtx.id;
    //     document.getElementById(selAncId).setAttribute('href', cropperCanCtx.toDataURL());
    //     document.getElementById(selAncId).setAttribute('data-lightbox', 'lightImgdocphotoCanvas');
    // }
  }
  const ViewVideoSession = () => {
    setOpen(true);
  };
  const ViewFullImageSession = () => {
    setImagePopUp(true);
  }
  // console.log("uplink vv fff ", upLink)
  return (
    <>
      <Container component="main" maxWidth="xl">
        <div className={classes.corePaper}>
          {/* START header */}

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            //spacing={1}
            className={classes.backGroundOne}
          >
            <Grid item xs={6} sm={6} md={2}>
              You are: {RED_Cust.sesParamOpUserId}
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              Local Packet Loss: 0
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              Local Retransmitted Packets: 0
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              {/* Speed:{upLink}
              <ArrowUpwardIcon />
              {downLink}
              <ArrowDownwardIcon /> KB/s */}
              <InternetSpeed
                upLink={upLink}
                downLink={downLink}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              Stream Connection
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <Button variant="contained" color="primary">
                {btnIceConnStats}
              </Button>
            </Grid>
          </Grid>
          <Divider light />
          <Grid
            container
            direction="row"
            justify="space-around"
            //alignItems="center"
            className={classes.backGroundTwo}
          >
            <Grid item xs={6} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ckCode}
                    onChange={(e) => setckCode(e.target.checked)}
                    style={{ padding: "0px 2px", color: "#fff" }}
                    name="checkedB"
                    color="primary"
                  // disabled
                  />
                }
                label={
                  <Typography className={classes.label}>
                    Security Code Verified
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ckFace}
                    style={{ padding: "0px 2px", color: "#fff" }}
                    name="checkedB"
                    color="primary"
                    disabled
                  />
                }
                label={
                  <Typography className={classes.label}>Face Match</Typography>
                }
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ckDoc}
                    style={{ padding: "0px 2px", color: "#fff" }}
                    name="checkedB"
                    color="primary"
                    disabled
                  />
                }
                label={
                  <Typography className={classes.label}>
                    Document Captured
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ckSignDoc}
                    style={{ padding: "0px 2px", color: "#fff" }}
                    name="checkedB"
                    color="primary"
                    disabled
                  />
                }
                label={
                  <Typography className={classes.label}>
                    Signature Captured
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          {/* end header */}
          {/* <Box m={1} /> */}
          <div className={classes.coreContainer}>
            <Grid
              container
              direction="row"
              // justify="flex-start"
              // alignItems="center"
              spacing={2}
            >
              {/* START FIRST card */}
              <Grid item xs={12} md={4}>
                <Paper className="box-shadow">
                  <Livevideocard
                    custData={custData}
                    custNumber={RED_Cust.red_OperatorMobileNo}
                    CallToCustomer={CallToCustomer}
                    hangUpBtn={hangUpBtn}
                    startRecoding={startRecoding}
                    stopRecording={stopRecording}
                    btnDisable={btnDisable}
                    recordbtn={recordbtn}
                    ViewVideoSession={ViewVideoSession}
                  />

                </Paper>
              </Grid>
              {/* end FIRST card */}

              <Grid item xs={12} md={8}>
                <Paper className="box-shadow">
                  {/* <Livenesscheckcard
                    custData={custData}
                    cardCheck={cardCheck}
                    docColumn={docColumn}
                    handleSelectColumn={handleSelectColumn}
                    cfbtnDisable={cfbtnDisable}
                    livenessBtn={livenessBtn}
                    btnDisable={btnDisable}
                    liveNessStatus={liveNessStatus}
                    takepicture={takepicture}
                    CompareFace={CompareFace}
                    btnLivenessStartRecord={btnLivenessStartRecord}
                    btnvivenessStopRecord={btnLivenessStopRecord}
                  /> */}

                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    // alignItems="flex-start"
                    style={{ minHeight: "35.7rem" }}
                  >
                    {/* <Box style={{ margin: "3px" }} /> */}
                    <Grid container item>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"

                        style={{ padding: "7px" }}
                      >
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" style={{ paddingLeft: "5px" }}>
                            Details
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                          // spacing={1}
                          >
                            <Grid item>
                              <Button
                                // className= "with-opacity"
                                variant="contained"
                                disabled
                                // size="small"
                                // style={classes.buttonStyle, {fontSize:"85%", color:"black",borderRadius:"5em"}}
                                style={{ fontSize: "85%", borderRadius: "5em" }}
                              >
                                LIVENESS CHECK
                              </Button>
                            </Grid>

                            <Grid item>
                              {" "}
                              {livenessBtn ? (
                                <Button
                                  onClick={btnLivenessStartRecord}
                                  disabled={btnDisable} style={{ minWidth: "48px" }}
                                >
                                  <VideoCallIcon className="video-recording-button with-opacity" />
                                </Button>
                              ) : (
                                <Button
                                  onClick={btnLivenessStopRecord}
                                  disabled={btnDisable}
                                >
                                  <VideoCallIcon />
                                </Button>
                              )}
                            </Grid>

                            <Grid item>
                              <Button
                                // className={classes.buttonStyle}
                                variant="contained"
                                size="small"
                                color="#fce4ec"
                                style={{ fontSize: "85%", color: "#fff", textTransform: "uppercase", backgroundColor: "#e1b42b", borderRadius: "5em" }}
                              >
                                {liveNessStatus}
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box m={matchesMd ? 0 : 1} />
                    {/* table start */}

                    <Grid
                      container
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ padding: "5px" }}
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
                            <TableCell style={{ width: "20%", color: "#fff" }}>
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
                                  value={docColumn}
                                  onChange={handleSelectColumn}
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
                            {/* {cardCheck.panCheck ?
                                                            <TableCell style={{ width: "40%" }}>PAN</TableCell>
                                                            :
                                                            cardCheck.adharCheck ?
                                                                <TableCell style={{ width: "40%" }}>AADHAAR</TableCell>
                                                                :
                                                                cardCheck.passPortCheck ?
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
                            <TableCell>{custData.Iname}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.Pname}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.Aname}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.Pname}</TableCell> :
                                                            <TableCell>{custData.Aname}</TableCell>} */}
                          </TableRow>
                          <TableRow key="2">
                            <TableCell component="th" scope="row">
                              Gender
                            </TableCell>
                            <TableCell>{custData.Igender}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.pgender}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.agender}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.pgender}</TableCell> :
                                                            <TableCell>{custData.agender}</TableCell>} */}
                          </TableRow>
                          <TableRow key="3">
                            <TableCell component="th" scope="row">
                              DOB
                            </TableCell>
                            <TableCell>{custData.Idob}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.pdob}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.adob}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.pdob}</TableCell> :
                                                            <TableCell>{custData.adob}</TableCell>} */}
                          </TableRow>
                          <TableRow key="4">
                            <TableCell component="th" scope="row">
                              Postal Code
                            </TableCell>
                            <TableCell>{custData.Ipin}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.ppin}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.apin}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.ppin}</TableCell> :
                                                            <TableCell>{custData.apin}</TableCell>} */}
                          </TableRow>
                          <TableRow key="5">
                            <TableCell component="th" scope="row">
                              City
                            </TableCell>
                            <TableCell>{custData.Icity}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.pcity}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.acity}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.pcity}</TableCell> :
                                                            <TableCell>{custData.acity}</TableCell>} */}
                          </TableRow>
                          <TableRow key="6">
                            <TableCell component="th" scope="row">
                              State
                            </TableCell>
                            <TableCell>{custData.Istate}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.pstate}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.astate}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.pstate}</TableCell> :
                                                            <TableCell>{custData.astate}</TableCell>} */}
                          </TableRow>
                          <TableRow key="7">
                            <TableCell component="th" scope="row">
                              Country
                            </TableCell>
                            <TableCell>{custData.Icountry}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.pcountry}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.acountry}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.pcountry}</TableCell> :
                                                            <TableCell>{custData.acountry}</TableCell>} */}
                          </TableRow>
                          <TableRow key="8">
                            <TableCell component="th" scope="row">
                              PAN Number
                            </TableCell>
                            <TableCell>{custData.Ipan}</TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>{custData.ppan}</TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>{custData.apan}</TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>-</TableCell>
                            ) : (
                              ""
                            )}
                            {/* {adhharcard ?
                                                            <TableCell>{custData.ppan}</TableCell> :
                                                            <TableCell>{custData.apan}</TableCell>} */}
                          </TableRow>
                          <TableRow key="9">
                            <TableCell component="th" scope="row">
                              <Grid item lg={12}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  component="span"
                                  onClick={takepicture}
                                  style={{
                                    width: "100%",
                                    textTransform: "none",
                                    marginBottom: "8px",
                                    fontSize: "smaller",
                                  }}
                                  disabled={btnDisable}
                                  startIcon={<PhotoCamera />}
                                >
                                  Take Photo
                                </Button>
                              </Grid>
                              <Grid item lg={12}>
                                {/* {showingProgress !== true ? <Button */}
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  component="span"
                                  // className={classes.rootProgress}
                                  onClick={CompareFace}
                                  style={{
                                    width: "100%",
                                    textTransform: "none",
                                    fontSize: "smaller",
                                  }}
                                  disabled={cfbtnDisable}
                                  startIcon={<Face />}
                                >
                                  Compare Face
                                </Button>
                                {/*  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component="span"
                                    // className={classes.rootProgress}
                                    style={{
                                      width: "100%",
                                      textTransform: "none",
                                      fontSize: "smaller",
                                    }}
                                    disabled
                                    startIcon={<CircularProgress style={{ height: "1em", width: "1em" }} />}>Compare Face</Button>} */}
                              </Grid>
                              <Grid item lg={12}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  component="span"
                                  onClick={takeFullPicture}
                                  style={{
                                    width: "100%",
                                    textTransform: "none",
                                    marginTop: "8px",
                                    fontSize: "smaller",
                                  }}
                                  disabled={btnDisable}
                                  startIcon={<PhotoCamera />}
                                >
                                  Full Image
                                </Button>
                              </Grid>
                            </TableCell>
                            <TableCell>
                              <Grid item lg={11} style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                                <canvas
                                  id="canvas"
                                  className="form-control operator-small"
                                // style={{ height: "120px", width:"120px" }}
                                ></canvas>
                                <p style={{ width: "26%" }}>Face Match {ckFace === true ? <CheckIcon style={{ color: "green" }} /> : <CloseIcon style={{ color: "red" }} />} {distanceFloat !== '' ? distanceFloat : ''}</p>
                              </Grid>
                            </TableCell>
                            {cardCheck.panCheck ? (
                              <TableCell>
                                <Grid item lg={5}>
                                  <img
                                    id="xPanPhoto"
                                    src={custData.panPht}
                                    className="form-control operator-small"
                                  // style={{ height: "120px", width:"120px" }}
                                  ></img>
                                </Grid>
                              </TableCell>
                            ) : cardCheck.adharCheck ? (
                              <TableCell>
                                <Grid item lg={5}>
                                  <img
                                    id="xDocPhoto"
                                    src={custData.pht}
                                    className="form-control operator-small"
                                  // style={{ height: "119px" }}
                                  ></img>
                                </Grid>
                              </TableCell>
                            ) : cardCheck.passPortCheck ? (
                              <TableCell>
                                <Grid item lg={5}>
                                  <img
                                    id="xpasswordPhoto"
                                    src={custData.pht}
                                    className="form-control operator-small"
                                  // style={{ height: "119px" }}
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
                    <Grid item style={{ padding: "0px 5px" }}>
                      <Paper className={classes.botttomBar}>
                        <Grid
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                        >
                          <Grid item xs={12} md={4}>
                            <Grid
                              container
                              direction="row"
                              justify="end"
                              alignItems="flex-start"
                            >
                              <Grid item>Current Location :</Grid>
                              <Grid item>India</Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Grid
                              container
                              direction="row"
                              justify="end"
                              alignItems="flex-start"
                            >
                              <Grid item>Latitude :</Grid>
                              <Grid item>
                                {custData.GeolocationData
                                  ? custData.GeolocationData.Latitude
                                  : null}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Grid
                              container
                              direction="row"
                              justify="end"
                              alignItems="flex-start"
                            >
                              <Grid item>Longitude : </Grid>
                              <Grid item>
                                {custData.GeolocationData
                                  ? custData.GeolocationData.Longitude
                                  : null}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>


                    </Grid>
                    {/* <Box> */}
                    <div
                      onClick={ViewFullImageSession}
                      style={{ fontStyle: "italic", cursor: "pointer", margin: "0 auto" }}
                    >
                      <AccessibilityNewIcon /> View Full Image
                    </div>
                    {/* </Box> */}
                  </Grid>
                </Paper>
              </Grid>
              {/* end second card */}
            </Grid>

            {/* END FIRST SECTION */}
            <Box m={2} />
            {/* START SECOND SECTION */}
            <Grid
              container
              direction="row"
              // justify="center"
              // alignItems="center"
              spacing={2}
            >
              {/* START FIRST card */}
              <Grid item xs={12} md={4}>
                <Paper className="box-shadow">
                  <Idenditydoccard

                    takedocpicture={takedocpicture}
                    btnDisable={btnDisable}
                    InitializeCropper={InitializeCropper}
                    CropAction={CropAction}
                    DestroyCropper={DestroyCropper}
                    docType={docType}
                    selectedCameraImage={selectedCameraImage}
                    handleSelectedCameraImageChange={handleSelectedCameraImageChange}
                    imgCanPan={imgCanPan}
                    imgCanAdhar={imgCanAdhar}
                    imgCanSign={imgCanSign}
                    imgCanPassport={imgCanPassport}
                    handleIdendityDoc={handleIdendityDoc}
                  />
                </Paper>
              </Grid>
              {/* end FIRST card */}

              {/* START second card */}
              <Grid item xs={12} md={8}>
                <Paper className="box-shadow">
                  <AddressDocCard
                    addressLabel={addressLabel}
                    selectedValue={selectedValue}
                    addDocType={addDocType}
                    handleChange={handleChange}
                    handleChangeAddressDoc={handleChangeAddressDoc}
                    clickAddressProof={clickAddressProof}
                    btnDisable={btnDisable}
                    InitializeCropper={InitializeCropper}
                    CropAction={CropAction}
                    DestroyCropper={DestroyCropper}
                    addressDoc={addressDoc}
                    custData={custData}
                    addressCameraImageChange={addressCameraImageChange}
                    handleAddressCameraImageChange={handleAddressCameraImageChange}
                  />
                </Paper>
              </Grid>
              {/* end second card */}
            </Grid>
          </div>
          {/* end SECOND SECTION */}

          {/* start bottom SECTION */}
          <Grid container direction="column">
            <Grid item>
              <Operatorbuttoncard
                btnDisable={btnDisable}
                OperatorAcceptRequest={OperatorAcceptRequest}
                OperatorRejectRequest={OperatorRejectRequest}
                OperatorHoldRequest={OperatorHoldRequest}
                OperatorDropRequest={OperatorDropRequest}
              />
            </Grid>
          </Grid>
          {/* end bottom SECTION */}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Modal
          open={ImagePopUp}
          onClose={handleFullImageClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {ImageBody}
        </Modal>
      </Container>
    </>
  );
}







