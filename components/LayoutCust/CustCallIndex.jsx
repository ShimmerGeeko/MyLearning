import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import VerifiedUserSharpIcon from "@material-ui/icons/VerifiedUserSharp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HttpService from "../../HttpService";
import Copyright from "../common/Copyright";
import PhoneImg from "../../Images/tech1.png";
import FlipCameraIosOutlinedIcon from "@material-ui/icons/FlipCameraIosOutlined";
import CallIcon from "@material-ui/icons/Call";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import TechImg from "../../Images/tech1.png";

import {
  webSocketURL,
  stunURL,
  turnURL,
  turnUsername,
  turnCredential,
} from "../../ApiConstant";

import {
  Box,
  Grid,
  CardHeader,
  Divider,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import LayoutCustApp from "./LayoutCustApp";
import swal2 from "sweetalert2";
import { Link } from "@material-ui/core";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    height: "100vh",
    width: "100%",
    background: `url(${TechImg})`,
    // backgroundImage: `url(${TechImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center-bottom",
    //marginBottom: theme.spacing(4),
    overflow: "scroll",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 5,
    // paddingBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
    },
    // backgroundColor: "rgba(0,0,0,.3)",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },

  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down(312)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  containerOne: {
    minHeight: "25rem",
  },
  containerTwo: {
    minHeight: "25rem",
  },
  containerThree: {
    minHeight: "30rem",
  },
  cardRoot: {
    margin: "20px",
  },
  mainRelative: {
    position: "relative",
    height: "270px",
    border: "1px solid #696969",
  },
  subAbsolute: {
    position: "absolute",
    // height:"100%",
    width: "100%",
    bottom: "10px",
  },
  mainRelCard: {
    maxHeight: "400px",
    maxWidth: "200px",
  },
}));


var clientPublicIP;

// var RTCPeerConn = null;
var stream;
var remoteStream;
var dataChannel;

let camToggle = 0;

var xCustMobNo;
var xCustId;


// var localVideo = null;
// var remoteVideo = null;

const contactDefaultImage = "assets/images/contactDefault.png";

export default function CustCallIndex(props) {
  var videoFlag = 0;
  var videoImage = false;
  var name;
  var connectedUser;
  const classes = useStyles();
  const history = useHistory();
  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const [vcode, setVCode] = useState("Waiting for Verification Code...");
  const [callStatus, setCallStatus] = useState(
    "Waiting for Operator To connect..."
  );
  const [connStatus, setConnStatus] = useState("Not Connected");
  const [videoFaceConfig, setVideoFaceConfig] = useState(false);
  var connect = useRef(null);
  const [reload, setReload] = useState();

  const [upLink, setUpLink] = useState(0);
  const [downLink, setDownLink] = useState(0);

  var RTCPeerConn = useRef(null);
  //client js
  // var videos = useRef(null);
  useEffect(() => {
    firstCall();
    return () => {
      if (stream !== null) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });

        stream.getAudioTracks().forEach((track) => {
          track.stop();
        });

        // send({
        //   type: "leave",
        //   // name: RED_Cust.red_OperatorMobileNo,
        // });
      }
    }
  }, []);
  function firstCall() {
    console.log("RED_Cust res custcallindex ", RED_Cust);
    const supports = navigator.mediaDevices.getSupportedConstraints();
    // let videoFaceConfig = null;
    if (!supports["facingMode"]) {
      //  videoFaceConfig = false;
      setVideoFaceConfig(false);
      swal(
        "Alert!",
        "This browser does not support Multi Camera Switch!",
        "warning"
      );
    } else {
      setVideoFaceConfig(true);
      // videoFaceConfig = true;
    }
    name = RED_Cust.red_CustMob; //'5646456546';// Redux CustMobNo
    //Signaling Server
    connect.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    ///Socket Region #BEGIN
    connect.current.onopen = function () {
      console.log("Connected to the signaling server");
      clientPublicIP = "NA";
      InitVideo();
    };

    //when we got a message from a signaling server
    connect.current.onmessage = function (msg) {

      // console.log("Got message", msg.data);
      var data = JSON.parse(msg.data);
      debugger;
      switch (data.type) {
        case "login":
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
      console.log("Got error", err);
      swal({
        title: "Alert!",
        text: "Failed To Establish Connection!",
        type: "error",
        confirmButtonText: "Retry",
      }).then(() => {
        history.push("/CustCallIndex");
      });
    };

    //alias for sending JSON encoded messages
    function send(message) {
      try {
        //attach the other peer username to our messages
        if (connectedUser) {
          message.name = connectedUser;
        }
        connect.current.send(JSON.stringify(message));
      } catch (err) {
        swal({
          title: "Alert!",
          text: err,
          type: "error",
          confirmButtonText: "Retry",
        }).then(() => {
          history.push("/CustCallIndex");
        });
      }

    }

    function callocation() {
      var latitude = RED_Cust.red_latitude;
      var longitude = RED_Cust.red_longitude;
      console.log("latitude", latitude);
      console.log("longitude", longitude);

    }

    var handleDataChannelError = function (error) {
      console.log("dataChannel.OnError:", error);
    };

    var handleDataChannelClose = function (event) {
      console.log("dataChannel.OnClose", event);
    };

    var handleDataChannelOpen = function (event) {
      console.log("dataChannel.OnOpen", event);
      // dataChannel.send("Init DataChannel Open!");
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

    ///Socket Region #END

    function InitVideo() {
      if (videoImage == true) {
        videoImage = false;
        stopVideo();
        // videoImage = true;
        // console.log("Video Image True");
        return;
      }

      if (name.length > 0 && videoFlag == 0) {
        send({
          type: "login",
          name: name,
        });
        videoImage = true;
        videoFlag = 1;
        // streamType = "video";
        // audioFlag = 1;
        // streamType = "video";
        //mainPanel.style.display = "block";
        return;
      }

      if (videoImage == false) {
        videoImage = true;
        startVideo();
        console.log("Video Image False");
        return;
      }
    }

    //Start video if video is off
    function startVideo() {
      console.log("Inside Start Video");
      stream.getVideoTracks()[0].enabled = true;
    }

    //stop video if video is started
    function stopVideo() {
      console.log("Inside stop video");
      stream.getVideoTracks()[0].enabled = false;
      stream.getVideoTracks().forEach((track) => {
        track.stop();
      });

      stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
    }

    function handleLogin(success) {
      if (success === false) {
        alert("Oops! Username Already Taken, Try Something Else!");
      } else {
        console.log("Inside Handle login");
        //**********************
        //Starting a peer connection
        //**********************
        console.log("Starting Peer Video");
        //getting local video stream
        if (!("mediaDevices" in navigator)) {
          navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            debugger;
            if (!getUserMedia) {
              return Promise.reject(new Error("getUserMedia Not Implemented"));
            }

            return new Promise((resolve, reject) => {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        navigator.mediaDevices.getUserMedia({ video: { aspectRatio: { ideal: 1 } }, audio: true }).then((myStream) => {
          console.log("Inside Get User Media", myStream);
          stream = myStream;
          //         if ("srcObject" in videos) {
          //           videos.srcObject = stream;
          //       } else {
          //           //old version
          //           videos.src = window.URL.createObjectURL(stream);
          //       }
          // console.log(videos.current, "videos current")
          localVideo.srcObject = stream;
          localVideo.play();

          //Need Implementation
          GenerateCustomerVerificationCode();

          console.log("Local video started");
          console.log(stream.getTracks());
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
          };

          // RTCPeerConn.current = new webkitRTCPeerConnection(configuration, {
          //   optional: [{ RTCDataChannel: true }],
          // });
          RTCPeerConn.current = new RTCPeerConnection(configuration, { optional: [{ RTCDataChannel: true }] });
          // setup stream listening
          RTCPeerConn.current.addStream(stream);

          //when a remote user adds stream to the peer connection, we display it
          RTCPeerConn.current.onaddstream = function (e) {
            //  remoteVideo.src = window.URL.createObjectURL(e.stream);

            remoteStream = e.stream;
            remoteVideo.srcObject = e.stream;
            remoteVideo.play();
          };
          console.log("remoteVideo stream", remoteVideo);
          console.log("localVideo stream", localVideo);
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
            // var btnIceConnStats = document.getElementById('btnIceConnStats');
            if (RTCPeerConn.current.iceConnectionState === "checking") {
              setConnStatus("Connecting...");
              // btnIceConnStats.innerHTML = 'Connecting...';
              // btnIceConnStats.className = 'btn bg-orange btn-lg btn-block';
            } else if (RTCPeerConn.current.iceConnectionState === "connected") {
              setConnStatus("Connected");
              // btnIceConnStats.innerHTML = 'Connected';
              // btnIceConnStats.className = 'btn bg-green btn-lg btn-block';
            } else if (RTCPeerConn.current.iceConnectionState === "failed") {
              remoteVideo.srcObject = null;
              // btnIceConnStats.innerHTML = 'Failed';
              setConnStatus("Failed");
              // btnIceConnStats.className = 'btn bg-red btn-lg btn-block';

              swal("Alert!", "Unable To Establish Peer Connection!", "error").then(() => {
                document.getElementById("back").click()
              });
            } else if (RTCPeerConn.current.iceConnectionState === "disconnected") {
              setConnStatus("Disconnected");
              // remoteVideo.srcObject = null;
              // btnIceConnStats.innerHTML = 'Disconnected';
              // btnIceConnStats.className = 'btn bg-red btn-lg btn-block'
              // handleLeave();
              swal("Alert!", "Peer Disconnected!", "error").then(() => {


                document.getElementById("back").click()
                // setReload();
              });
            } else if (RTCPeerConn.current.iceConnectionState === "closed") {
              // Current local peer has shut down and is no longer handling requests.
              // Shall require a refresh
              remoteVideo.srcObject = null;
              setConnStatus("Closed");
              // btnIceConnStats.innerHTML = 'Closed';
              // btnIceConnStats.className = 'btn bg-red btn-lg btn-block';
              swal("Alert!", "Local Peer Connection Closed!", "error").then(() => {


                document.getElementById("back").click()
                // setReload();
              });
            }
          };

          RTCPeerConn.current.ondatachannel = handleChannelCallback;

          //Putting code for data communication

          dataChannel = RTCPeerConn.current.createDataChannel("channel1", {
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
              document.getElementById("back").click()
            });
          }
        );
      }
    }

    console.log("remoteVideo of", remoteVideo);
    console.log("localVideo of", localVideo);
    console.log("stream", stream);

    // console.log("remoteVideo.srcObject", remoteVideo.srcObject);
    // console.log("stream.getTracks()", stream.getTracks());
    //Accept or Decline the offer
    function handleCall(offer, name) {
      debugger;
      connectedUser = name;
      RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(offer));
      const imageUrl = process.env.PUBLIC_URL + "/assets/images/incommingCall-scaled.gif";
      swal({
        title: "Incomming Call",
        text: "Operator " + connectedUser + " is calling...",
        icon: imageUrl,
        buttons: ["Decline", "Accept"],
        dangerMode: false,
      }).then((isConfirm) => {
        if (isConfirm) {
          debugger;
          setCallStatus("Connected");
          handleOffer(offer, name);
          // var callStatusSpan = document.getElementById('callStatusSpan');
          // callStatusSpan.innerHTML = "Connected";
          // callStatusSpan.className = '';
          // swal.close();
        } else {
          debugger;
          //Rejected
          // swal.close();
        }
      });
    }

    //when somebody sends us an offer
    function handleOffer(offer, name) {
      // connectedUser = name;
      // RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(offer));

      //create an answer to an offer
      RTCPeerConn.current.createAnswer(
        function (answer) {
          RTCPeerConn.current.setLocalDescription(answer);

          send({
            type: "answer",
            answer: answer,
          });
        },
        function (error) {
          swal("Alert!", "Error While Creating An Answer", "error");
        }
      );
      console.log("Executed the Original Offer");
      console.log(
        "Data Channel Ready State in handle offer " + dataChannel.readyState
      );
      /////
    }

    function handleLeave() {
      // const handleLeave = ()=> {
      debugger;
      connectedUser = null;
      remoteVideo.srcObject = null;
      localVideo.srcObject = null;

      RTCPeerConn.current.close();
      RTCPeerConn.current.onicecandidate = null;
      RTCPeerConn.current.onaddstream = null;

      debugger;

      const dataPara = {
        CustId: RED_Cust.red_CustId,
        CustMobNo: RED_Cust.red_CustMob,
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
                stopVideo();
                videoImage = false;
                document.getElementById("back").click();
                // setReload();
              });
            } else if (zResponse.CallStatus === 3) {
              swal({
                title: "Alert!",
                text:
                  "Your KYC Request Has Been Submitted For Further Processing, Your Reference Number Is : " +
                  zResponse.CustId,
                type: "success",
              }).then(() => {
                stopVideo();
                videoImage = false;
                document.getElementById("back").click()
                // history.push("/customer");
                // history.push("/");
              });
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
                stopVideo();
                videoImage = false;
                document.getElementById("back").click();
                // history.push("/");
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
                stopVideo();
                videoImage = false;
                document.getElementById("back").click();
                // history.push("/");
              });
            } else if (zResponse.CallStatus === 6) {
              swal({
                title: "Alert!",
                text: "Call Dropped",
                type: "info",
              }).then(() => {
                // history.push("/customer");
                stopVideo();
                videoImage = false;
                document.getElementById("back").click();
              });
            } else {
              swal({
                title: "Alert!",
                text: "Your Call Has Ended Unexpectedly, Kindly Restart Your Call!",
                type: "error",
              }).then(() => {
                stopVideo();
                // window.location.reload();
                videoImage = false;
                // history.push("/");

                document.getElementById("back").click();
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

    //when we got an answer from a remote user
    function handleAnswer(answer) {
      RTCPeerConn.current.setRemoteDescription(new RTCSessionDescription(answer));
    }
    //when we got an ice candidate from a remote user
    function handleCandidate(candidate) {
      RTCPeerConn.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
    ///Socket Region #END
    async function GenerateCustomerVerificationCode() {
      const dataPara = {
        CustId: RED_Cust.red_CustId,
        CustMobNo: RED_Cust.red_CustMob,
        CreatedByIP: "NA",
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
      HttpService.PostAjaxData(
        dataPara,
        "MainService/GenerateCustomerVerificationCode"
      )
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log(
            "GenerateCustomerVerificationCode res ",
            resp
          );
          if (resp.data.ResponseCode == "100") {
            swal({
              title: "Alert!",
              text: resp.data.ResponseMessage,
              icon: "error",
            }).then(() => {
              stopVideo();
              document.getElementById("back").click()

            });
          }
          setVCode(responseJSON.Response);
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })

    }

    ///Service Calling
    // async function GenerateCustomerVerificationCode() {
    //     var Data = {
    //         CustId: xCustId,
    //         CustMobNo: xCustMobNo,
    //         CreatedByIP: clientPublicIP
    //     };
    //     $.ajax({
    //         type: "POST",
    //         url: serviceURL + "/api/MainService/GenerateCustomerVerificationCode",
    //         dataType: "JSON",
    //         data: JSON.stringify(Data),
    //         contentType: "application/json; charset=utf-8",
    //         success: function (responseData) {
    //             var responseJSON = JSON.parse(JSON.stringify(responseData));
    //             if (responseJSON.ResponseCode === "000") {
    //                 console.log("Verification Code Generated!")
    //                 document.getElementById('btnVerificationCode').innerHTML = responseJSON.Response;
    //                 document.getElementById('btnVerificationCodeNoti').innerHTML = responseJSON.Response;
    //                 swal.close();
    //             }
    //             else {
    //                 swal('Alert!', responseJSON.ResponseMessage, 'error');
    //                 console.log(responseJSON.ResponseCode);
    //             }
    //         },
    //         error: function () {
    //         }
    //     });
    // }

    // Get RTC stats

    // var upLink = document.getElementById('upLink');
    // var downLink = document.getElementById('downLink');

    // Outbound RTC
    let outBoundLastResult;
    window.setInterval(() => {
      if (!RTCPeerConn.current) {
        return;
      }
      if (RTCPeerConn.current.connectionState != "connected") {
        // upLink.innerHTML = '0';
        setUpLink(0);
        // downLink.innerHTML = '0';
        return;
      }
      const sender = RTCPeerConn.current.getSenders()[1];
      if (!sender) {
        return;
      }
      sender.getStats().then((res) => {
        res.forEach((report) => {
          let bytes;
          let headerBytes;
          let packets;
          if (report.type === "outbound-rtp") {
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
              const bitrate =
                (8 * (bytes - outBoundLastResult.get(report.id).bytesSent)) /
                deltaT;
              const headerrate =
                (8 *
                  (headerBytes -
                    outBoundLastResult.get(report.id).headerBytesSent)) /
                deltaT;

              //calculate UpLink
              const KiloBytesPerSec =
                (bytes - outBoundLastResult.get(report.id).bytesSent) / 1024;
              // upLink.innerHTML = parseInt(KiloBytesPerSec);
              let ulink = parseInt(KiloBytesPerSec);
              setUpLink(ulink);
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
    }, 1000);

    // Inbound RTC
    let inBoundLastResult;
    window.setInterval(() => {
      if (!RTCPeerConn.current) {
        return;
      }
      if (RTCPeerConn.current.connectionState != "connected") {
        //downLink.innerHTML = '0';
        setDownLink(0);
        return;
      }
      const receiver = RTCPeerConn.current.getReceivers()[1];
      if (!receiver) {
        return;
      }
      receiver.getStats().then((res) => {
        res.forEach((report) => {
          let bytes;
          let headerBytes;
          let packets;
          if (report.type === "inbound-rtp") {
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
              const bitrate =
                (8 * (bytes - inBoundLastResult.get(report.id).bytesReceived)) /
                deltaT;
              const headerrate =
                (8 *
                  (headerBytes -
                    inBoundLastResult.get(report.id).headerBytesReceived)) /
                deltaT;

              //calculate UpLink
              const KiloBytesPerSec =
                (bytes - inBoundLastResult.get(report.id).bytesReceived) / 1024;
              let dlink = parseInt(KiloBytesPerSec);
              setDownLink(dlink);
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
    }, 3000);
  }
  const capture = async (facingMode) => {
    const options = {
      audio: true,
      video: {
        facingMode,
        aspectRatio: { ideal: 1 },
      },
    };

    try {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }

      stream = await navigator.mediaDevices.getUserMedia(options);
      debugger;

      RTCPeerConn.current.getSenders()[0].replaceTrack(stream.getAudioTracks()[0]);
      RTCPeerConn.current.getSenders()[1].replaceTrack(stream.getVideoTracks()[0]);
    } catch (e) {
      swal("Alert!", e, "error");
      return;
    }
    localVideo.srcObject = null;
    localVideo.srcObject = stream;
    localVideo.play();
  };
  // const handleLeave = () => {
  //     debugger
  //     // connectedUser = null;
  //     // remoteVideo.srcObject = null;

  //     // RTCPeerConn.close();
  //     // RTCPeerConn.onicecandidate = null;
  //     // RTCPeerConn.onaddstream = null;
  //     const dataPara = { CustId: RED_Cust.red_CustId, CustMobNo: RED_Cust.red_CustMob };
  //     trackPromise(
  //         HttpService.PostAjaxData(dataPara, "MainService/CheckCustomerStatusOnDisconnect")
  //             .then((resp) => {
  //                 let responseJSON = resp.data;
  //                 console.log("CheckCustomerStatusOnDisconnect res ", responseJSON)

  //             })
  //             .catch((error) => {
  //                 console.log(error, "Response Error!");
  //             })
  //     );
  // }
  const camflip = () => {
    debugger;
    console.log("camflip");
    if (videoFaceConfig === true) {
      debugger;
      let camToggle = 0;
      camToggle = 1 - camToggle;
      if (camToggle === 0) {
        capture("user");
      } else {
        capture("environment");
      }
    } else {
      document.getElementById("btnFlip").disabled = true;
    }
  };

  return (
    // <LayoutCust>
    <>
      <Paper className={classes.mainFeaturedPost}>
        <div className={classes.overlay}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.title}>
                    Video KYC | One Stop KYC Solution
                  </Typography>
                </Grid>
                <Grid item> <i className="material-icons">notifications</i></Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.paper}>
            <Grid
              container
              direction="row"
              //justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              {/* 1st container start */}
              <Grid item xs={12} md={4} xl={12}>
                <Container component="main" maxWidth="sm">
                  <Paper className={classes.containerOne} elevation={3}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginLeft: "10px", paddingTop: "15px" }}
                    >
                      Operator
                    </Typography>
                    <Box m={3} />
                    <Divider variant="middle" />
                    <Box m={3} />

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item style={{ border: "1px solid #696969" }}>
                        <video
                          id="remoteVideo"
                          className="form-control"
                          poster={contactDefaultImage}
                          autoPlay
                          playsInline
                          style={{ height: "270px", width: "100%" }}
                        ></video>
                      </Grid>
                    </Grid>
                  </Paper>
                </Container>
              </Grid>
              {/* 1st container end */}
              {/* 2nd container start */}

              <Grid item xs={12} md={4} xl={12}>
                <Container component="main" maxWidth="sm">
                  <Paper elevation={3} className={classes.containerTwo}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginLeft: "10px", paddingTop: "15px" }}
                    >
                      You
                    </Typography>
                    <Box m={3} />
                    <Divider variant="middle" />
                    <Box m={3} />

                    <Card
                      elevation={0}
                      style={{ paddingLeft: "40px", paddingRight: "40px" }}
                    >
                      <div className={classes.mainRelative}>
                        <video
                          id="localVideo"
                          className="form-control"
                          autoPlay
                          playsInline
                          muted="muted"
                          poster={contactDefaultImage}
                          style={{ height: "95%", width: "100%" }}
                        ></video>
                        <div className={classes.subAbsolute}>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item xs={12}>
                              <button id="btnFlip" onClick={camflip}>
                                <FlipCameraIosOutlinedIcon />
                              </button>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Card>

                    {/*                   
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <video
                          id="localVideo"
                          className="form-control"
                          autoPlay
                          muted="muted"
                          poster={contactDefaultImage}
                          style={{ height: "95%", width: "100%" }}
                        ></video>
                      </Grid>
                      <Grid item>
                        <button id="btnFlip" onClick={camflip}>
                          <FlipCameraIosOutlinedIcon />
                        </button>
                      </Grid>
                    </Grid> */}
                  </Paper>
                </Container>
              </Grid>
              {/* 2nd container end */}
              {/* 3rd container start */}
              <Grid item xs={12} md={4} xl={12}>
                <Container component="main" maxWidth="sm">
                  <Paper elevation={3} className={classes.containerThree}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginLeft: "10px", paddingTop: "15px" }}
                    >
                      Details
                    </Typography>
                    <Box m={3} />
                    <Divider variant="middle" />
                    <Box m={3} />

                    <Card elevation={0} className={classes.cardRoot}>
                      <Grid
                        container
                        direction="column"
                      //justify="center"
                      //alignItems="flex-start"
                      >
                        <Grid item xs={12}>
                          <VerifiedUserSharpIcon
                            style={{ paddingRight: "5px" }}
                          />
                          Verification Code
                        </Grid>
                        <Box m={0.5} />
                        <Grid item xs={12}>
                          <p style={{ fontSize: "0.7rem" }}>
                            Please read it out to the Operator, when asked.
                          </p>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{
                              backgroundColor: "#228b22",
                              color: "#fff",
                              cursor: "default",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                            }}
                          >
                            {vcode}
                          </Button>
                        </Grid>
                        <Box m={1} />
                        <Divider variant="middle" />
                        <Box m={1} />
                        <Grid item xs={12}>
                          <CallIcon style={{ paddingRight: "5px" }} />
                          Call Status
                        </Grid>
                        <Box m={1} />
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{
                              backgroundColor: "#6495ed",
                              color: "#fff",
                              cursor: "default",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                            }}
                          >
                            <span
                              className={
                                callStatus ==
                                  "Waiting for Operator To connect..."
                                  ? "blink"
                                  : " "
                              }
                            >
                              {callStatus}
                            </span>
                          </Button>
                        </Grid>

                        <Box m={1} />
                        <Divider variant="middle" />
                        <Box m={1} />
                        <Grid item xs={12}>
                          <SignalWifi4BarIcon style={{ paddingRight: "5px" }} />
                          Stream Connection Status
                        </Grid>
                        <Box m={1} />
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            style={{
                              backgroundColor: "#6495ed",
                              color: "#fff",
                              cursor: "default",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                            }}
                          >
                            <span
                              className={
                                connStatus == "Not Connected" ? " " : " "
                              }
                            >
                              {connStatus}
                            </span>
                          </Button>
                        </Grid>
                        <Box m={1} />
                        <Divider variant="middle" />
                        <Box m={1} />
                        <Grid item xs={12}>
                          <LocationOnIcon style={{ paddingRight: "5px" }} />
                          Location
                        </Grid>
                        <Grid item xs={12}>
                          <p style={{ paddingRight: "5px" }}>Mumbai, India</p>
                        </Grid>
                      </Grid>
                    </Card>
                  </Paper>
                </Container>
              </Grid>
              {/* 3rd container end */}
            </Grid>
          </div>
        </div>
      </Paper>

      <Link id="back" href="/VideoKyc/"></Link>
    </>
  );
}
// ghghgh
