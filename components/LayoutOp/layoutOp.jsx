import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { trackPromise } from "react-promise-tracker";
import Paper from "@material-ui/core/Paper";
import HttpService from "../../HttpService";
import { storeCust } from "../../redux/actions/mainAction";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import Content from "../common/Content";
import { useHistory } from "react-router-dom";
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
  },
  image: {
    // backgroundImage: "url(img/wallpaper2-min.PNG)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
    marginBottom: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(4, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//   export function LayoutCust({ loggedIn, logout, login }) {
export default function LayoutCust() {
  const classes = useStyles();
  const history = useHistory();
  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });
  const loginHandler = () => {
    // history.push("/OperatorDashboard")
    const dataPara = {
      UserId: login.userName,
      Password: login.password,
    };
    console.log("login para ", dataPara);
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false
    });
      HttpService.PostAjaxData(dataPara, "Login/ValidateLogin")
        .then((resp) => {
          swal2.close()
          let responseJSON = resp.data;
          console.log("ValidateLogin res ", responseJSON);
          if (responseJSON.ResponseCode === "000") {
            if (responseJSON.UserRole === 1) {
              console.log("Admin Login!");
              dispatch(storeCust("sesParamOpUserId", responseJSON.UserId));
              dispatch(storeCust("sesParamOpUserCode", responseJSON.UserCode));
              dispatch(storeCust("sesParamOpUserRole", responseJSON.UserRole));
              history.push("/AdminDashboard");
              // sessionStorage.setItem("sesParamOpUserId", responseJSON.UserId);
              // sessionStorage.setItem("sesParamOpUserCode", responseJSON.UserCode);
              // sessionStorage.setItem("sesParamOpUserRole", responseJSON.UserRole);
              // window.location.href = "./AdminDashboard.html"
            } else if (responseJSON.UserRole === 2) {
              console.log("Operator Login!");
              dispatch(storeCust("sesParamOpUserId", responseJSON.UserId));
              dispatch(storeCust("sesParamOpUserCode", responseJSON.UserCode));
              dispatch(storeCust("sesParamOpUserRole", responseJSON.UserRole));
              history.push("/Dashboard");
              // sessionStorage.setItem("sesParamOpUserId", responseJSON.UserId);
              // sessionStorage.setItem("sesParamOpUserCode", responseJSON.UserCode);
              // sessionStorage.setItem("sesParamOpUserRole", responseJSON.UserRole);
              // window.location.href = "./OperatorDashboard.html"
            } else if (responseJSON.UserRole === 3) {
              console.log("Authorizer Login!");
              console.log("Operator Login!");
              dispatch(storeCust("sesParamOpUserId", responseJSON.UserId));
              dispatch(storeCust("sesParamOpUserCode", responseJSON.UserCode));
              dispatch(storeCust("sesParamOpUserRole", responseJSON.UserRole));
              history.push("/AuthorizerDashboard");
              // sessionStorage.setItem("sesParamOpUserId", responseJSON.UserId);
              // sessionStorage.setItem("sesParamOpUserCode", responseJSON.UserCode);
              // sessionStorage.setItem("sesParamOpUserRole", responseJSON.UserRole);
              // window.location.href = "./AuthorizerDashboard.html"
            } else {
              console.log(responseJSON.UserRole);
              // swal("UserType: " + responseJSON.UserType + "User Not Found!", "", "error");
              swal(
                "Code: " + responseJSON.ResponseCode + " User Not Found!",
                "",
                "error"
              );
            }
          } else {
            // swal("Code: " + responseJSON.ResponseCode + " User Not Found!", "", "error");
            swal("Alert!", responseJSON.ResponseMessage, "error");
            console.log(responseJSON.ResponseCode);
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  };

  const handleChange = (e) => {

    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <Content>
      {/* <CssBaseline /> */}
      {/* <Grid container justify="center" className={classes.image}> */}
      <Grid container justify="center">
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          component={Paper}
          direction="row"
          elevation={6}
          square
          // alignItems="center"
          // justify="center"
        >
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={login.userName}
                onChange={handleChange}
                id="email"
                label="Email Address"
                name="userName"
                autoFocus
              />
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={login.password}
                onChange={handleChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginHandler}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Content>
  );
}
