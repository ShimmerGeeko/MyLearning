import React, { useState, useEffect } from "react";
import CommonAppbar from "../LayoutOp/CommonAppbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { trackPromise } from "react-promise-tracker";
import HttpService from "../../HttpService";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import MaterialTable from "material-table";
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
  },

  marginLeftSide: {
    marginLeft: 10,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const defaultValues = {
  FromDate: "",
  ToDate: "",
};

function AuthorizerKYCStatus() {
  const classes = useStyles();
  const [data, setData] = useState(defaultValues);
  const [tabledata, setTableData] = useState([]);
  const [fromDateError, setFromDateError] = useState("");
  const [toDateError, setToDateError] = useState("");
  const { userRole, UserCode, UserId } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
    UserCode: state.mainReducer.sesParamOpUserCode,
    UserId: state.mainReducer.sesParamOpUserId,
  }));

  useEffect(() => {
    debugger;
    // const dataPara = {
    //   UserCode: String(userCode),
    //   UserId: userId,
    //   CallStatus: 3,
    // };

    if (
      userRole === null ||
      userRole === "" ||
      UserCode === null ||
      UserCode === "" ||
      UserId === null ||
      UserId === ""
    ) {
      <Link to="/" />;
    }
    // console.log("Effect otp flag", dataPara);
  }, []);

  const columns = [
    {
      title: "Application Type",
      field: "ApplicationType",
    },
    {
      title: "Reference Id",
      field: "CustId",
    },
    {
      title: "Customer Mobile",
      field: "CustMobNo",
    },
    {
      title: "Name",
      field: "Name",
    },
    {
      title: "PAN Number",
      field: "PanNumber",
    },
    {
      title: "Call Status",
      field: "CallStatus",
    },
    {
      title: "Auth Status",
      field: "AuthStatus",
    },
    {
      title: "Maker",
      field: "Maker",
    },
    {
      title: "Checker",
      field: "Checker",
    },
    {
      title: "Creation Date",
      field: "CreationDate",
    },
    {
      title: "Creation Time",
      field: "CreationTime",
    },
  ];

  const GetPendingCustomers = () => {
    if (data.FromDate.trim() == "") {
      setToDateError("");
      setFromDateError("This field is required");
      return;
    }
    if (data.ToDate.trim() == "") {
      setToDateError("This field is required");
      setFromDateError("");
      return;
    }
    let newFromDate = new Date(data.FromDate);
    let newToDate = new Date(data.ToDate);
    if (newFromDate > newToDate) {
      swal("Alert", "From Date Can not be greater than To Date", "error");
    } else {
      swal({
        title: "Loading...",
        text: "Please Wait",
        allowOutsideClick: false,
      });

      const dataPara = {
        UserId: UserId,
        FromDate: data.FromDate,
        ToDate: data.ToDate,
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
        HttpService.PostAjaxData(dataPara, "MainService/GetCustomerKYCRep")
          .then((resp) => {
            swal2.close();
            let responseJSON = resp.data;
            if (responseJSON.CustomerKYCDataList.length == 0) {
              swal("Alert!", "No Record Found!", "error");
            } else if (responseJSON.CustomerKYCDataList.length > 0) {
              setTableData(responseJSON.CustomerKYCDataList);
            } else {
              swal("Alert!", responseJSON.ResponseMessage, "error");
            }
            console.log("PendingAuthCustomers res ", responseJSON);
          })
          .catch((error) => {
            console.log(error, "Response Error!");
          })
      
    }
  };
  return (
    <div>
      <CommonAppbar userRole={userRole} />
      <div className={classes.marginLeftSide}>
        <Typography variant="h6" gutterBottom>
          DASHBOARD
        </Typography>
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Customer KYC Status List
          </Typography>
          <Divider />
          <Box m={2} />
          <form noValidate>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={12} lg={2} md={2} xl={2}>
                  <TextField
                    fullWidth
                    label="From Date"
                    value={data.FromDate}
                    autoComplete="off"
                    type="date"
                    autoFocus
                    onChange={(e) =>
                      setData({ ...data, FromDate: e.target.value })
                    }
                    error={fromDateError !== ""}
                    helperText={fromDateError !== "" ? fromDateError : ""}
                  />
                </Grid>

                <Grid item xs={12} lg={2} md={2} xl={2}>
                  <TextField
                    fullWidth
                    label="To Date"
                    value={data.ToDate}
                    autoComplete="off"
                    type="date"
                    autoFocus
                    onChange={(e) =>
                      setData({ ...data, ToDate: e.target.value })
                    }
                    error={toDateError !== ""}
                    helperText={toDateError !== "" ? toDateError : ""}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={12} lg={4} md={4} xl={4}>
                  <Button
                    onClick={GetPendingCustomers}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Generate
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={12} lg={4} md={4} xl={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled
                    fullWidth
                  >
                    Export excel
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={12} lg={12} md={12} xl={12}>
                  <MaterialTable
                    style={{ width: "100%" }}
                    title="Customer KYC Status List"
                    columns={columns}
                    options={{
                      pageSizeOptions: [5],
                      search: true,
                      sorting: false,
                      // toolbar: false,
                      paging: true,
                      pageSize: 5,
                      rowStyle: {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    </div>
  );
}

export default AuthorizerKYCStatus;
