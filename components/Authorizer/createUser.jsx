import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CommonAppbar from "../LayoutOp/CommonAppbar";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import swal2 from "sweetalert2";
import swal from "sweetalert";

import { useSelector } from "react-redux";
import HttpService from "../../HttpService";
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  mainButtonContainer: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}));

const defaultValues = {
  UserFirstName: "",
  UserLastName: "",
  UserMobileNo: "",
  UserEmailId: "",
  UserDOB: "",
  UserGender: "",
  UserRole: "",
  UserId: "",
};
const defaultErrors = {
  UserFirstName: "",
  UserLastName: "",
  UserMobileNo: "",
  UserEmailId: "",
  UserDOB: "",
  UserGender: "",
  UserRole: "",
  UserId: "",
};

export default function CreteUser() {
  const classes = useStyles();
  const [data, setData] = useState(defaultValues);
  const [errorarray, setErrorarray] = useState(defaultErrors);
  // const [UserFirstNameError, setUserFirstNameError] = useState("");
  // const [UserLastNameError, setUserLastNameError] = useState("");
  // const [UserMobileNoError, setUserMobileNoError] = useState("");
  // const [UserEmailIdError, setUserEmailIdError] = useState("");
  // const [UserDOBError, setUserDOBError] = useState("");
  //  const [UserGenderError, setUserGenderError] = useState("");
  //    const [UserRoleError, setUserRoleError] = useState("");
  const { userRole, userId } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
    userId: state.mainReducer.sesParamOpUserId,
  }));
  const validateCustomer = () => {
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexMob = /^\d+$/;
    if (data.UserFirstName.trim() == "") {
      setErrorarray({ ...errorarray, UserFirstName: "This Field is required" });
      return;
    } else if (data.UserLastName.trim() == "") {
      setErrorarray({ ...errorarray, UserLastName: "This Field is required" });
      return;
    } else if (data.UserGender.trim() == "") {
      setErrorarray({ ...errorarray, UserGender: "This Field is required" });
      return;
    } else if (data.UserEmailId.trim() == "") {
      setErrorarray({ ...errorarray, UserEmailId: "This Field is required" });
      return;
    } else if (!regex.test(data.UserEmailId)) {
      setErrorarray({ ...errorarray, UserEmailId: "Invalid Email Format" });
      return;
    } else if (data.UserId.trim() == "") {
      setErrorarray({ ...errorarray, UserId: "This Field is required" });
      return;
    } else if (data.UserMobileNo.trim() == "") {
      setErrorarray({ ...errorarray, UserMobileNo: "This Field is required" });
      return;
    } else if (!regexMob.test(data.UserMobileNo)) {
      setErrorarray({
        ...errorarray,
        UserMobileNo: "Only Numbers are Allowed",
      });
      return;
    }
    //else if (data.userRole.trim() == "") {
    //   setErrorarray({ ...errorarray, userRole: "This Field is required" });
    //   return;
    // }
    else {
      setErrorarray({
        ...errorarray,
        UserFirstName: "",
        UserLastName: "",
        UserMobileNo: "",
        UserEmailId: "",
        UserDOB: "",
        UserGender: "",
        UserRole: "",
        userId: "",
      });
    }
    console.log(data);

    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    const dataParam = {
      UserId: data.UserId,
      User: {
        UserFirstName: data.UserFirstName,
        UserLastName: data.UserLastName,
        UserMobileNo: data.UserMobileNo,
        UserEmailId: data.UserEmailId,
        UserDOB: data.UserDOB,
        UserGender: data.UserGender,
        UserRole: parseInt(data.UserRole),
      },
    };
    console.log("dataParam", dataParam);
    HttpService.PostAjaxData(dataParam, "SaveUserData/SaveUserDetails")
      //http://192.168.4.149/FinVkycDemoWebAPI/api/SaveUserData/SaveUserDetails
      .then((resp) => {
        const jsonData = resp.data;
        console.log("jsonData", jsonData);
        swal2.close();
        // if (jsonData.ResponseCode == "001") {
        //   swal("Alert", jsonData.ResponseMessage, "error");
        // }
        if (jsonData.ResponseCode == "000") {
          swal("Success!", jsonData.ResponseMessage, "success");
        } else {
          swal("Alert", jsonData.ResponseMessage, "error");
        }
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
    setErrorarray({ ...errorarray, [e.target.name]: "" });
  };

  useEffect(() => {
    console.log(errorarray.UserFirstNameErrors);
  }, []);

  return (
    <>
      <CommonAppbar userRole={userRole} />

      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create User
            </Typography>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserFirstName"
                  label="First Name"
                  name="UserFirstName"
                  autoComplete="UserFirstName"
                  value={data.UserFirstName}
                  onChange={handleChange}
                  error={errorarray.UserFirstName !== ""}
                  helperText={
                    errorarray.UserFirstName !== ""
                      ? errorarray.UserFirstName
                      : ""
                  }
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserLastName"
                  label="Last Name"
                  name="UserLastName"
                  autoComplete="UserLastName"
                  value={data.UserLastName}
                  onChange={handleChange}
                  error={errorarray.UserLastName !== ""}
                  helperText={
                    errorarray.UserLastName !== ""
                      ? errorarray.UserLastName
                      : ""
                  }
                  autoFocus
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserMobileNo"
                  label="Mobile Number"
                  name="UserMobileNo"
                  autoComplete="UserMobileNo"
                  value={data.UserMobileNo}
                  onChange={handleChange}
                  error={errorarray.UserMobileNo !== ""}
                  inputProps={{ maxLength: 10 }}
                  helperText={
                    errorarray.UserMobileNo !== ""
                      ? errorarray.UserMobileNo
                      : ""
                  }
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserEmailId"
                  label="Email Id"
                  name="UserEmailId"
                  autoComplete="UserEmailId"
                  value={data.UserEmailId}
                  onChange={handleChange}
                  error={errorarray.UserEmailId !== ""}
                  helperText={
                    errorarray.UserEmailId !== "" ? errorarray.UserEmailId : ""
                  }
                  autoFocus
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  type="date"
                  required
                  fullWidth
                  id="UserDOB"
                  label="Date Of Birth"
                  name="UserDOB"
                  //autoComplete="UserDOB"
                  value={data.UserDOB}
                  onChange={handleChange}
                  error={errorarray.UserDOB !== ""}
                  helperText={
                    errorarray.UserDOB !== "" ? errorarray.UserDOB : ""
                  }
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl
                  className="formControl"
                  error={errorarray.UserGender !== ""}
                >
                  <InputLabel id="UserGender">Gender</InputLabel>
                  <Select
                    labelId="UserGender"
                    id="UserGender"
                    fullWidth
                    name="UserGender"
                    value={data.UserGender}
                    //value={props.stateval.custTitle}
                    onChange={handleChange}
                  >
                    <MenuItem value="M">male</MenuItem>
                    <MenuItem value="F">female</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errorarray.UserGender !== "" ? errorarray.UserGender : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <FormControl
                  className="formControl"
                  error={errorarray.UserRole !== ""}
                >
                  <InputLabel id="UserRole">User Role</InputLabel>
                  <Select
                    labelId="UserRole"
                    id="UserRole"
                    fullWidth
                    name="UserRole"
                    value={data.UserRole}
                    //value={props.stateval.custTitle}
                    onChange={handleChange}
                  >
                    <MenuItem value="1">Super Admin</MenuItem>
                    <MenuItem value="2">Opertor</MenuItem>
                    <MenuItem value="3">Authorizer</MenuItem>
                    <MenuItem value="4">Auditor</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errorarray.UserRole !== "" ? errorarray.UserRole : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UserId"
                  label="User Id"
                  name="UserId"
                  //autoComplete="UserId"
                  value={data.UserId}
                  onChange={handleChange}
                  error={errorarray.UserId !== ""}
                  helperText={errorarray.UserId !== "" ? errorarray.UserId : ""}
                  autoFocus
                />
              </Grid>
            </Grid>

            <Box m={1} />

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid
                container
                direction="row"
                justify="center"
                className={classes.mainButtonContainer}
                spacing={2}
              >
                <Grid item md={6} xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Clear Data
                  </Button>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.buttonArea}
                    onClick={async () => {
                      await validateCustomer();
                    }}
                  >
                    Craete User
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* <Box mt={8}>
        <Copyright />
      </Box> */}
          </div>
        </Paper>
      </Container>
    </>
  );
}
