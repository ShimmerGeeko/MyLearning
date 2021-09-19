import React, { useEffect, useState } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import FaceSharpIcon from "@material-ui/icons/FaceSharp";
import PersonAddSharpIcon from "@material-ui/icons/PersonAddSharp";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
import PhonelinkEraseSharpIcon from "@material-ui/icons/PhonelinkEraseSharp";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../HttpService";
import { storeCust } from "../../redux/actions/mainAction";
import { trackPromise } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import Swal from "sweetalert2";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import { Tooltip } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CommonAppbar from "./CommonAppbar";

const useStyles = makeStyles((theme) => ({
  infoBox: {
    // boxShadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    height: "80px",
    // width: "100%",
    display: "flex",
    backgroundColor: "#f50057",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },

  paper: {
    // margin: theme.spacing(3, 5),
    padding: theme.spacing(2, 4, 5, 4),
    justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%", // Fix IE 11 issue.
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));
export function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const matchesSm = useMediaQuery("(min-width:350px)");
  const dispatch = useDispatch();
  const [custList, setCustList] = useState([]);
  const [callLog, setCallLog] = useState({});
  const { userRole, userCode, userId } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
    userCode: state.mainReducer.sesParamOpUserCode,
    userId: state.mainReducer.sesParamOpUserId,
  }));

  const RED_Cust = useSelector((state) => state.mainReducer);

function getQueCustomer(){
  const dataPara = {
    UserCode: String(userCode),
    UserId: userId,
    Status: 1,
  };
  console.log("Effect otp flag", dataPara);
  // trackPromise(
    HttpService.PostAjaxData(dataPara, "MainService/GetQueuedCustomer")
      .then((resp) => {
        let responseJSON = resp.data;
        console.log("GetQueuedCustomer res ", responseJSON);
        setCustList(responseJSON.CustomerList);
        setCallLog(responseJSON.OperatorCallLog);
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      })
  // );
}

  useEffect(() => {
   
    getQueCustomer();
    const interval = setInterval(() => {
     
      getQueCustomer();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  //setInterval(()=>{  getQueCustomer(); }, 10000);
  // setInterval(()=>{
   
  // },10000);
  const alertData = (data) => {
    var CustId = data.CustId;
    var CustMobNo = data.CustMobNo;
    debugger;

    dispatch(storeCust("red_OperatorRefId", CustId));
    dispatch(storeCust("red_OperatorMobileNo", CustMobNo));

    if (CustId != null && CustMobNo != "") {
      debugger;
      Swal.fire({
        title: "Are You Sure?",
        text: "Your Session Will Start With Customer: " + CustMobNo,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, I Am Sure!",
        cancelButtonText: "No, Not Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/OperatorCallIndex");
        }
      });
    } else {
      Swal.fire("Alert!", "Please Select A Customer", "error");
    }
  };

  const columns = [
    {
      title: "Slot ID",
      field: "SchSlotId",
      cellStyle: {
        width: "5%",
      },
    },
    {
      title: "Slot Day",
      field: "SchSlotDay",
    },
    {
      title: "Slot Date",
      field: "SchSlotDate",
    },
    {
      title: "Reference Id",
      field: "CustId",
      // cellStyle: {
      //   width: "28%"
      // },
    },
    {
      title: "Customer Mobile",
      field: "CustMobNo",
    },
    {
      title: "Name As Aadhaar",
      field: "NameAsAadhaar",
    },
    {
      title: "Status",
      field: "Status",
    },
  ];
  return (
    <>
      <CommonAppbar userRole={userRole} />{" "}
      <Grid container justify="center" spacing={2} className={classes.paper}>
        <Grid container item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="sidegrid"
            style={{ color: "#673AB7" }}
          >
            Dashboard
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={matchesSm ? 4 : 2}
        >
          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#3f51b5" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={matchesSm ? 5 : 4}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <FaceSharpIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Pending Customers</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {/* 0 */}
                        {custList.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#f50057" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={5}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <PersonAddSharpIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Calls Attended</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {callLog.CallsAttended}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#2196f3" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={5}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <CheckIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Calls Accepted</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {callLog.CallsAccepted}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#2196f3" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={5}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <ContactSupportIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Calls put on hold</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {callLog.CallsHold}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#2196f3" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={5}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <WifiOffIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Call Dropped</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {callLog.CallsDropped}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} lg={4} md={4} xl={4}>
            <div className={classes.infoBox} style={{ background: "#f50057" }}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={5}
              >
                <Grid
                  item
                  // lassName={classes.infoBoxIcon}
                  style={{
                    marginLeft: "1rem",
                    background: "rgba(0, 0, 0, 0.15)",
                    display: "inline-block",
                  }}
                >
                  <PhonelinkEraseSharpIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item>Calls Rejected</Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        {callLog.CallsRejected}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <MaterialTable
          style={{ width: "100%" }}
          title="Active Customers"
          columns={columns}
          data={custList}
          options={{
            pageSizeOptions: [2, 5, 10],
            search: true,
            filtering: true,
            showTitle: true,
            toolbar: true,

            paging: true,
            pageSize: 5,
            rowStyle: {
              backgroundColor: "#fff",
            },

            actionsColumnIndex: -1,
          }}
          actions={[
            {
              title: "Action",

              tooltip: "Select",

              onModifyClick: (event) => {
                alertData(event);
              },
            },
          ]}
          components={{
            Action: (props) => (
              <>
                <Tooltip title="Modify" placement="start-top">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // style={{ margin: "2px 1px" }}
                    onClick={() => props.action.onModifyClick(props.data)}
                  >
                    Start Session
                  </Button>
                </Tooltip>
              </>
            ),
          }}
        />
        {/* <MaterialTable
          style={{ width: "100%" }}
          title="Active Customers"
          columns={columns}
          data={custList}
          options={{
            pageSizeOptions: [5],
            search: true,
            sorting: false,
            paging: true,
            pageSize: 5,
            rowStyle: {
              backgroundColor: "#fff",
            },
          }}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: () => alertData(),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        /> */}
      </Container>
    </>
  );
}
