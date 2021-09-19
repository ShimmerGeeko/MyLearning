import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  FormHelperText,
  Divider,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles, ThemeProviderProps } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import LayoutCustApp from "./LayoutCustApp";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import HttpService from "../../HttpService";
import { useHistory, Redirect } from "react-router-dom";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import useFormStyles from "../common/css/useFormStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import i18next from "i18next";
import swal2 from "sweetalert2";

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   height: "100vh",
//   //   flexGrow: 1,
//   // },
//   // form: {
//   //   width: "100%",
//   // },
//   // headerContent: {
//   //   paddingTop: theme.spacing(2),
//   //   // paddingLeft: theme.spacing(4),
//   // },
//   // contentHeading: {
//   //   textAlign: "left",
//   //   fontWeight: "400",
//   //   color: "#555555",
//   //   paddingLeft: theme.spacing(3),
//   // },
//   // contentSubHeading: {
//   //   textAlign: "left",
//   //   // fontWeight: "400",
//   //   color: "#999999",
//   //   paddingTop: "10px",
//   //   paddingLeft: "10px",
//   // },
//   // headingDivider: {
//   //   // borderWidth: "1px",
//   //   // borderColor: "#673AB7",
//   //   marginTop: theme.spacing(1),
//   //   border: "1px solid #673AB7",
//   // },
//   // paper: {
//   //   // padding: theme.spacing(3, 6),
//   //   padding: theme.spacing(0, 4, 3, 4),
//   //   // justify: "center",
//   //   display: "flex",
//   //   // flexDirection: "column",
//   //   flexDirection: "row",
//   //   alignItems: "center",
//   //   textAlign: "center",
//   //   width: "100%", // Fix IE 11 issue.
//   // },
//   // button: {
//   //   margin: theme.spacing(4, 0, 0, 2),
//   //   textTransform: "none",
//   // },
//   // checkboxFormCtrl: {
//   //   display: "table",
//   //   paddingTop: theme.spacing(2),
//   //   textAlign: "left",
//   // },
//   // checkboxFormCtrlLabel: {
//   //   display: "table-cell",
//   //   fontSize: "0.9rem",
//   //   color: "#555555",
//   // },
//   // formControl: {
//   //   // margin: theme.spacing(1),
//   //   // minWidth: 120,
//   //   width: "100%",
//   //   textAlign: "left",
//   // },
//   // // submit: {
//   // //   margin: theme.spacing(4, 0, 0, 2),
//   // // },
//   // gridItemSppacing: {
//   //   padding: theme.spacing(2),
//   // },
//   // input: {
//   //   display: "none",
//   // },
//   contentHeading: {
//     textAlign: "left",
//     fontWeight: "400",
//     color: "#555555",
//     paddingLeft: theme.spacing(2),
//   },
//   headingDivider: {
//     // borderWidth: "1px",
//     // borderColor: "#673AB7",
//     marginTop: theme.spacing(1),
//     border: "1px solid #673AB7",
//   },
//   paper: {
//     // padding: theme.spacing(3, 6),
//     padding: theme.spacing(0, 4, 3, 4),
//     // justify: "center",
//     display: "flex",
//     // flexDirection: "column",
//     flexDirection: "row",
//     alignItems: "center",
//     textAlign: "center",
//     width: "100%", // Fix IE 11 issue.
//   },
//   formControl: {
//     // margin: theme.spacing(1),
//     // minWidth: 120,
//     width: "100%",
//     textAlign: "left",
//   },
//   input: {
//     display: "none",
//   },
// }));

const defaultValues = {
  Name: "",
  Fname: "",
  MName: "",
  Title: "",
  DOB: "",
  Gender: "",
  MaritalStatus: "",
  Email: "",
  Occupation: "",
  AnnualIncome: "",
  House: "",
  Locality: "",
  Landmark: "",
  PoliticalYN: "",
  State: "",
  District: "",
  City: "",
  PinCode: "",
  PAN: "",
  AadhaarCode: "",
  AadhaarFile: "",
};
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

export default function CustIndex() {
  const classes = useFormStyles();
  const { handleSubmit, register, trigger, getValues, reset, control, errors } =
    useForm({
      defaultValues,
      // reValidateMode: "onBlur",
      mode: "onBlur",
      shouldUnregister: false,
    });

  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(min-width:380px)");
  const matchesSmBtn = useMediaQuery("(min-width:450px)");
  const history = useHistory();
  const [step, setStep] = useState({ stepOne: true });
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateCityList, setStateCityList] = useState([]);
  const [fileName, setfileName] = useState();
  const [stateName, setStateName] = useState();

  function handleChange(event) {
    setfileName(event.target.files[0].name);
  }

  useEffect(() => {
    const dataPara = { customerMobileNumber: "NA" };
    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    HttpService.PostAjaxData(dataPara, "MainService/GetStateCityData")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("state res ", responseJSON);
        setStateList(responseJSON.StateList);
        setCityList(responseJSON.StateCityList);
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  }, []);

  const onSubmit = (data) => {
    InitFileParse(data);
  };

  function InitFileParse(data) {
    debugger;
    var base64String = null;
    var reader = new FileReader();
    reader.readAsDataURL(data.AadhaarFile[0]);
    reader.onload = function () {
      base64String = reader.result;
      base64String = base64String.split(",");

      if (base64String[1] != null && base64String[1] != "") {
        saveCustData(data, base64String[1]);
      } else {
        swal("Alert", "Invalid Aadhaar File!", "error");
        return;
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      base64String = "File Read Error!";
      swal("Alert", "Invalid Aadhaar File!", "error");
      return base64String;
    };
  }

  function saveCustData(data, fileData) {
    try {
      debugger;

      var dataPara = {
        ApplType: RED_Cust.red_ApplType,
        Title: data.Title,
        CustMobNo: RED_Cust.red_CustMob,
        // aadhaarNo: "",
        PanNumber: data.PAN,
        AadhaarZipInfo: {
          ZipFile: fileData,
          FilePassword: data.AadhaarCode,
        },
        custBasicInfo: {
          CustId: RED_Cust.red_CustId,
          CustMobNo: RED_Cust.red_CustMob,
          Name: data.Name,
          FatherName: data.Fname,
          MotherName: data.MName,
          DOB: data.DOB,
          Gender: data.Gender,
          MaritalStatus: data.MaritalStatus,
          Email: data.Email,
          Occupation: data.Occupation,
          AnnualIncome: data.AnnualIncome,
          PolitcallyExpYN: data.PoliticalYN,
          House: data.House,
          Locality: data.Locality,
          Landmark: data.Landmark,
          District: data.District,
          State: data.State,
          City: data.City,
          PinCode: data.PinCode,
          // AadhaarRefId: "",
          // PanNumber: "",
        },
      };
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      HttpService.PostAjaxData(dataPara, "MainService/SaveCustomerData/")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("state res ", responseJSON);
          debugger;
          if (responseJSON.ResponseCode === "000") {
            let respCustId = responseJSON.ResponseCustId;
            // dispatch(storeCust("red_CustId", "1503210000000087"));
            //  dispatch(storeCust("red_CustMob", "5646456546"));
            dispatch(storeCust("red_CustId", respCustId));
            swal("Success!", "Details Submitted Successfully!", "success").then(
              () => {
                history.push("/CustReview");
              }
            );
          } else {
            swal("Alert", responseJSON.ResponseMessage, "error");
            return;
            // history.push("/CustReview");
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        });
    } catch (err) {
      swal("Alert", "Something Went Wrong: " + err, "error");
    }
  }

  console.log("errors", errors);

  const handleStateData = (event) => {
    debugger;
    console.log("target val ", event);
    setStateName(event.target.value);
    let filteredCity = cityList.filter((x) => {
      return x.StateCode === event.target.value;
    });

    console.log("filteredCity res ", filteredCity);
    setStateCityList(filteredCity);
  };
  console.log("cityList ", cityList);
  return (
    <LayoutCustApp>
      <Container
        maxWidth="xl"
        className={classes.mainContainer}
      >
        <Paper elevation={matchesSm ? 3 :3}>
          {/*start top header */}
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Box m={1} />
            {/* <Grid item xs={12}>
              <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
            </Grid> */}
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <Typography
                    component="h2"
                    variant="h6"
                    className={classes.contentHeading}
                  >
                    {i18next.t("custInfoHeader")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    className={classes.contentSubHeading}
                  >
                    <i>{i18next.t("custInfoAadhar")}</i>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Box m={1} />
            <Grid item xs={12}>
              <Divider variant="fullWidth" className={classes.headingDivider} />
            </Grid>
          </Grid>
          {/*end top header */}
          <Box m={1} />
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
          >
            <div className={classes.paper}>
              <Grid container justify="flex-start" spacing={matchesSm ? 3 : 2}>
                {step.stepOne ? (
                  <>
                    {/* step one start */}
                    {/* <Grid item xs={12}>
                      <Box m={1} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel> {i18next.t("custFieldTitle")}</InputLabel>
                        <Controller
                          as={
                            <Select fullWidth>
                              <MenuItem value="Mr">Mr.</MenuItem>
                              <MenuItem value="Miss">Miss.</MenuItem>
                              <MenuItem value="Mrs">Mrs.</MenuItem>
                            </Select>
                          }
                          name="Title"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                        />
                      </FormControl>
                      {errors.Title && (
                        <FormHelperText error>
                          {errors.Title.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldName")}
                            name="Name"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Name"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Only Alphabets and Spaces are allowed!",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum 4 characters are required",
                          },
                          // validate: {
                          //     value: Name.trim() === '',
                          //     message: "Requiredddd"
                          // }
                        }}
                      />
                      {errors.Name && (
                        <FormHelperText error>
                          {errors.Name.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldFather")}
                            name="Fname"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Fname"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Only Alphabets and Spaces are allowed!",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum 4 characters are required",
                          },
                        }}
                      />
                      {errors.Fname && (
                        <FormHelperText error>
                          {errors.Fname.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldMother")}
                            name="MName"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="MName"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Only Alphabets and Spaces are allowed!",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum 4 characters are required",
                          },
                        }}
                      />
                      {errors.MName && (
                        <FormHelperText error>
                          {errors.MName.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <Controller
                        as={
                          <TextField
                            name="DOB"
                            label={i18next.t("custFieldDob")}
                            type="date"
                            className={classes.formControl}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        }
                        name="DOB"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                        }}
                      />
                      {errors.DOB && (
                        <FormHelperText error>
                          {errors.DOB.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t("custFieldGender")}</InputLabel>
                        <Controller
                          as={
                            <Select fullWidth>
                              <MenuItem value="M">Male</MenuItem>
                              <MenuItem value="F">Female</MenuItem>
                            </Select>
                          }
                          name="Gender"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                        />
                      </FormControl>
                      {errors.Gender && (
                        <FormHelperText error>
                          {errors.Gender.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>
                          {i18next.t("custFieldMaritalStatus")}
                        </InputLabel>
                        <Controller
                          as={
                            <Select>
                              <MenuItem value="Single">Single</MenuItem>
                              <MenuItem value="Married">Married</MenuItem>
                            </Select>
                          }
                          name="MaritalStatus"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                        />
                      </FormControl>
                      {errors.MaritalStatus && (
                        <FormHelperText error>
                          {errors.MaritalStatus.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldEmail")}
                            name="Email"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Email"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            // value: /S+@S+.S+/,
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Id format!",
                          },
                        }}
                      />
                      {errors.Email && (
                        <FormHelperText error>
                          {errors.Email.message}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldBusiness")}
                            name="Occupation"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Occupation"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Only Alphabets and Spaces are allowed!",
                          },
                        }}
                      />
                      {errors.Occupation && (
                        <FormHelperText error>
                          {errors.Occupation.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldIncome")}
                            name="AnnualIncome"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="AnnualIncome"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Only Numbers are allowed!",
                          },
                        }}
                      />
                      {errors.AnnualIncome && (
                        <FormHelperText error>
                          {errors.AnnualIncome.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldHome")}
                            name="House"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="House"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          // pattern: {
                          //   value: /^[a-zA-Z ]*$/,
                          //   message: "Only Alphabets and Spaces are allowed!",
                          // },
                        }}
                      />
                      {errors.House && (
                        <FormHelperText error>
                          {errors.House.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldArea")}
                            name="Locality"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Locality"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          // pattern: {
                          //   value: /^[a-zA-Z ]*$/,
                          //   message: "Only Alphabets and Spaces are allowed!",
                          // },
                        }}
                      />
                      {errors.Locality && (
                        <FormHelperText error>
                          {errors.Locality.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldLandMark")}
                            name="Landmark"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="Landmark"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          // pattern: {
                          //   value: /^[a-zA-Z ]*$/,
                          //   message: "Only Alphabets and Spaces are allowed!",
                          // },
                        }}
                      />
                      {errors.Landmark && (
                        <FormHelperText error>
                          {errors.Landmark.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>
                          {i18next.t("custFieldPolitics")}
                        </InputLabel>
                        <Controller
                          as={
                            <Select>
                              <MenuItem value="Y">Yes</MenuItem>
                              <MenuItem value="N">No</MenuItem>
                            </Select>
                          }
                          name="PoliticalYN"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                        />
                      </FormControl>
                      {errors.PoliticalYN && (
                        <FormHelperText error>
                          {errors.PoliticalYN.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    {/* <Grid
                  container
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  xs={12}
                  className={classes.gridItemSppacing}>
                  <FormControl className={classes.formControl}>
                  <InputLabel>State</InputLabel>
                    <Select
                      name='Statexx'
                      value=''
                      onChange={(e) => {
                        handleStateData(e)
                      }}
                      ref={register({ required: true })}
                    >
                      {stateList.map(option => (
                        <MenuItem key={option.StateCode} value={option.StateCode}>
                          {option.StateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.State && (
                    <FormHelperText error>{errors.State.message}</FormHelperText>
                  )}
                </Grid> */}
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t("custFieldState")}</InputLabel>
                        <Controller
                          control={control}
                          name="State"
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                          render={({ onChange, value, onBlur, name }) => (
                            <Select
                              onChange={(e) => {
                                debugger;
                                onChange(e);
                                handleStateData(e);
                              }}
                              onBlur={(e) => {
                                onBlur(e);
                              }}
                              value={value ? value : ""}
                              name={name}
                            >
                              {stateList.map((option) => (
                                <MenuItem
                                  key={option.StateCode}
                                  value={option.StateCode}
                                >
                                  {option.StateName}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                      {errors.State && (
                        <FormHelperText error>
                          {errors.State.message}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t("custFieldCity")}</InputLabel>
                        <Controller
                          as={
                            <Select>
                              {stateCityList.map((option) => (
                                <MenuItem
                                  key={option.CityCode}
                                  value={option.CityName}
                                >
                                  {option.CityName}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="City"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          }}
                        />
                      </FormControl>
                      {errors.City && (
                        <FormHelperText error>
                          {errors.City.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldDistrict")}
                            name="District"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="District"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Only Alphabets and Spaces are allowed!",
                          },
                        }}
                      />
                      {errors.District && (
                        <FormHelperText error>
                          {errors.District.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} xl={2}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldPincode")}
                            name="PinCode"
                            autoComplete="off"
                            inputProps={{ maxLength: 6 }}
                          />
                        }
                        name="PinCode"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /^\d+$/,
                            message: "Only Numbers are allowed!",
                          },
                          minLength: {
                            value: 6,
                            message: "Minimum 6 characters",
                          },
                        }}
                      />
                      {errors.PinCode && (
                        <FormHelperText error>
                          {errors.PinCode.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <Box m={1} />
                    </Grid>
                    <Grid container item justify="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        className={classes.buttonArea}
                        onClick={async () => {
                          const result = await trigger([
                            "Name",
                            "Fname",
                            "MName",
                            "DOB",
                            "Gender",
                            "MaritalStatus",
                            "Email",
                            "Occupation",
                            "AnnualIncome",
                            "House",
                            "Locality",
                            "Landmark",
                            "PoliticalYN",
                            "State",
                            "District",
                            "City",
                            "PinCode",
                          ]);
                          if (result) {
                            setStep({ stepOne: false });
                          }
                        }}
                      >
                        {i18next.t("btnNextNew")}
                      </Button>
                    </Grid>

                    {/* end step one */}
                  </>
                ) : (
                  <>
                    {/* start step 2 */}
                    {/* <Grid item xs={12}>
                      <Box m={1} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldPanCard")}
                            name="PAN"
                            autoComplete="off"
                            inputProps={{
                              maxLength: 10,
                              style: { textTransform: "uppercase" },
                            }}
                          />
                        }
                        name="PAN"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          pattern: {
                            value: /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/,
                            message: "Invalid PAN format!",
                          },
                          minLength: {
                            value: 10,
                            message: "Minimum 10 characters required!",
                          },
                        }}
                      />
                      {errors.PAN && (
                        <FormHelperText error>
                          {errors.PAN.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t("custFieldAAdharCard")}
                            name="AadhaarCode"
                            autoComplete="off"
                            inputProps={{ maxLength: 100 }}
                          />
                        }
                        name="AadhaarCode"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum 4 characters are required!",
                          },
                        }}
                      />
                      {errors.AadhaarCode && (
                        <FormHelperText error>
                          {errors.AadhaarCode.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <Box m={2} />
                        </Grid>
                        <Box ml={1} style={{ color: "#555555" }}>
                          {fileName}
                        </Box>
                        <label
                          htmlFor="icon-button-file"
                          style={{ width: "100%" }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            component="span"
                            startIcon={<CloudUploadIcon />}
                          >
                            {i18next.t("custFieldAAdharFile")}
                          </Button>
                        </label>
                        <input
                          name="AadhaarFile"
                          className={classes.input}
                          id="icon-button-file"
                          type="file"
                          accept=".zip"
                          onChange={handleChange}
                          ref={register({
                            required: {
                              value: true,
                              message: "This Field is required!",
                            },
                          })}
                        />
                        <Grid container style={{ marginTop: "8px" }}>
                          {errors.AadhaarFile && (
                            <FormHelperText error>
                              {errors.AadhaarFile.message}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      justify="flex-end"
                    >
                      <b>
                        <span style={{ fontWeight: "400" }}>
                          {i18next.t("custFieldOffLineAadhar")}
                        </span>
                        <i>
                          <a
                            href="https://resident.uidai.gov.in/offline-kyc"
                            target="_blank"
                          >
                            https://resident.uidai.gov.in/offline-kyc
                          </a>
                        </i>
                      </b>
                    </Grid>
                    <Grid item xs={12}>
                      <Box m={1} />
                    </Grid>

                    <div style={{ width: "100%" }}>
                      <Box
                        display="flex"
                        flexDirection={matchesSmBtn ? "row" : "column"}
                        justifyContent={matchesSmBtn ? "flex-end" : "center"}
                      >
                        <Box p={1}>
                          <Button
                            variant="contained"
                            fullWidth={matchesSmBtn ? false : true}
                            color="primary"
                            type="button"
                            className={classes.buttonArea}
                            onClick={() => setStep({ stepOne: true })}
                          >
                            {i18next.t("btnPrevious")}
                          </Button>
                        </Box>
                        <Box p={1}>
                          <Button
                            fullWidth
                            variant="contained"
                            fullWidth={matchesSmBtn ? false : true}
                            color="primary"
                            type="submit"
                            className={classes.buttonArea}
                            // onClick={this._showHideComp.bind(null, false)}
                          >
                            {i18next.t("btnSubmit")}
                          </Button>
                        </Box>
                      </Box>
                    </div>
                    {/* end step 2 */}
                  </>
                )}

                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box mt={2} mb={3}>
                    <Copyright />
                  </Box>
                </Grid> */}
              </Grid>
            </div>
          </form>
        </Paper>
      </Container>
    </LayoutCustApp>
  );
}
