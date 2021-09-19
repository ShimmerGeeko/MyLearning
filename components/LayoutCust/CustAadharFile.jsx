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


import LayoutCustApp from "./LayoutCustApp";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";

import HttpService from "../../HttpService";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import Container from "@material-ui/core/Container";
import useFormStyles from "../common/css/useFormStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import i18next from "i18next";
import swal2 from "sweetalert2";



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

export default function CustAadharFile() {
  const RED_Cust = useSelector((state) => state.mainReducer);
  const classes = useFormStyles();
  const { handleSubmit, register, trigger, getValues, reset,setValue, control, errors } =
    useForm({
      defaultValues,
      // reValidateMode: "onBlur",
      mode: "onBlur",
      shouldUnregister: false,

    });
//  setValue("PAN", RED_Cust.basic_CustomerData.PAN);
 
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(min-width:380px)");
  const matchesSmBtn = useMediaQuery("(min-width:450px)");
  const history = useHistory();
  // const [step, setStep] = useState({ stepOne: false });
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
    // swal2.fire({
    //   title: "Processing...",
    //   text: "Please Wait",
    //   imageUrl: processing,
    //   imageWidth: 100,
    //   imageHeight: 100,
    //   showConfirmButton: false,
    //   allowOutsideClick: false,
    // });

    // HttpService.PostAjaxData(dataPara, "MainService/GetStateCityData")
    //   .then((resp) => {
    //     swal2.close();
    //     let responseJSON = resp.data;
    //     console.log("state res ", responseJSON);
    //     setStateList(responseJSON.StateList);
    //     setCityList(responseJSON.StateCityList);
    //   })
    //   .catch((error) => {
    //     console.log(error, "Response Error!");
    //   });
  }, []);

  const onSubmit = (data) => {
    console.log("RED_Cust", RED_Cust)
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
        Title: RED_Cust.basic_CustomerData.Title,
        CustMobNo: RED_Cust.basic_CustomerData.CustMobNo,
        // aadhaarNo: "",
        PanNumber: data.PAN,
        AadhaarZipInfo: {
          ZipFile: fileData,
          FilePassword: data.AadhaarCode,
        },
        custBasicInfo: {
          CustId: RED_Cust.basic_CustomerData.CustId,
          CustMobNo: RED_Cust.basic_CustomerData.CustMobNo,
          Name: RED_Cust.basic_CustomerData.Name,
          FatherName: RED_Cust.basic_CustomerData.FatherName,
          MotherName: RED_Cust.basic_CustomerData.MotherName,
          DOB: RED_Cust.basic_CustomerData.DOB,
          Gender: RED_Cust.basic_CustomerData.Gender,
          MaritalStatus: RED_Cust.basic_CustomerData.MaritalStatus,
          Email: RED_Cust.basic_CustomerData.Email,
          Occupation: RED_Cust.basic_CustomerData.Occupation,
          AnnualIncome: RED_Cust.basic_CustomerData.AnnualIncome,
          PolitcallyExpYN: RED_Cust.basic_CustomerData.PolitcallyExpYN,
          House: RED_Cust.basic_CustomerData.House,
          Locality: RED_Cust.basic_CustomerData.Locality,
          Landmark: RED_Cust.basic_CustomerData.Landmark,
          District: RED_Cust.basic_CustomerData.District,
          State: RED_Cust.basic_CustomerData.State,
          City: RED_Cust.basic_CustomerData.City,
          PinCode: RED_Cust.basic_CustomerData.PinCode,
          // AadhaarRefId: "",
          // PanNumber: "",
        },
      };
      console.log(JSON.stringify(dataPara), "stringfy");
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
                          {/* <Button
                            variant="contained"
                            fullWidth={matchesSmBtn ? false : true}
                            color="primary"
                            type="button"
                            className={classes.buttonArea}
                            onClick={() => setStep({ stepOne: true })}
                          >
                            {i18next.t("btnPrevious")}
                          </Button> */}
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
