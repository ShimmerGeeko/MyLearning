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
  Checkbox,
  FormControlLabel,
  Divider,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles, ThemeProviderProps } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import LayoutCust from "../LayoutCust/LayoutCust";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../HttpService";
import { useHistory, Redirect } from "react-router-dom";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import useFormStyles from "../common/css/useFormStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import dayjs from "dayjs";
import  i18next from 'i18next';
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

const defaultValues = {
  Name: "",
  Fname: "ccc",
  MName: "",
  Title: "",
  DOB: "",
  Gender: "",
  MaritalStatus: "",
  Email: "",
  selDocType: "",
  DocFile: "",
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

let allCity = [];
let allDistrict = [];
let allstate = [];

export default function CustInfoReKYC() {
  const classes = useFormStyles();
  const {
    handleSubmit,
    register,
    trigger,
    getValues,
    reset,
    setValue,
    control,
    errors,
  } = useForm({
    defaultValues,
    // reValidateMode: "onBlur",
    mode: "onBlur",
    shouldUnregister: false,
  });

  const RED_Cust = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery("(min-width:380px)");
  const history = useHistory();
  const [step, setStep] = useState({ stepOne: true });
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [selectedStateList, setSelectedStateList] = useState([]);
  const [selectedDistrictList, setSelectedDistrictList] = useState([]);
  const [selectedCityList, setSelectedCityList] = useState([]);
  const [fileName, setfileName] = useState();
  const [docfileName, setDocfileName] = useState();
  const [aadharFile, setaadharFile] = useState();
  const [stateName, setStateName] = useState("");
  const [checkedBox, setCheckedBox] = useState({
    checked: false,
  });

  function handleChange(event) {
    setfileName(event.target.files[0].name);
  }

  const handleCheckBox = (event) => {
    setCheckedBox({ ...checkedBox, [event.target.name]: event.target.checked });
  };

  function handleFileChange(event) {
    setDocfileName(event.target.files[0].name);
  }

  useEffect(() => {
    const dataPara = {
      TableName: "D500025",
      PicklistName: "pick1",
      ParamArr: "",
      TBVal: "",
      Pagen: 0,
      Tot: 100,
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
      HttpService.PostCBSAjaxData(
        dataPara,
        "CustomControls/ListGetInitPicklist"
      )
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("ListGetInitPicklist state res ", responseJSON);
          setStateList(responseJSON.PickDt);
          allstate = responseJSON.PickDt;
          loadState();
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  }, []);

  const loadState = () => {
    const dataPara = {
      OrgId: 0,
      LookupCode: 101023,
      LkTableName: "lkdRec",
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
      HttpService.PostCBSAjaxData(dataPara, "CustomControls/ListGetInitLookup")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log(" ListGetInitLookup district res ", responseJSON);
          setDistrictList(responseJSON);
          allDistrict = responseJSON;
          loadCity();
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  };
  const loadCity = () => {
    const dataPara = {
      TableName: "D500028",
      PicklistName: "pick2",
      ParamArr: "",
      TBVal: "",
      Pagen: 0,
      Tot: 100,
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
      HttpService.PostCBSAjaxData(
        dataPara,
        "CustomControls/ListGetInitPicklist"
      )
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data.PickDt;
          responseJSON = responseJSON.filter((x) => {
            return x.CntryCd === "IN";
          });
          setCityList(responseJSON);
          allCity = responseJSON;
          console.log(" ListGetInitPicklist city res ", responseJSON);
          getCBSCustData();
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  };
  const getCBSCustData = () => {
    var OperationDate = new Date();
    const dataPara = {
      CustNo: parseInt(RED_Cust.sesParamCBSCustNo),
      inParam: {
        mplLBrCode: 0,
        // mplOprnDate: "2021-01-18",
        mplOprnDate: OperationDate.toISOString(),
        mplUserCd1: "string",
        mplUserCd2: 0,
        mplStnNo: 0,
        ProgMode: 8,
        mplPrgParam: "string",
        mplHomeCurCd: "string",
        mplGrpCd: 0,
      },
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
      HttpService.PostCBSAjaxData(
        dataPara,
        "MainService/GetAllCustomerMasterNew"
      )
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          let individual = responseJSON.individual;
          let keydata = responseJSON.key;
          setValue("Name", keydata.Longname);
          setValue("Title", keydata.NameTitle);
          setValue("Email", keydata.EmailId);
          setValue("House", keydata.Add1);
          setValue("Locality", keydata.Add2);
          setValue("Landmark", keydata.Add3);
          setValue("City", keydata.CityCd);
          setValue("PAN", keydata.PanNoDesc);
          setValue("Fname", individual.Fathername);
          setValue("Gender", individual.SexCode);
          setValue("MName", individual.Mothername);
          setValue("DOB", dayjs(individual.Dob).format("YYYY-MM-DD"));
          setValue("PinCode", keydata.PinCode);
          let ms = individual.MaritalStatus;
          setValue(
            "MaritalStatus",
            ms === 1
              ? "S"
              : ms === 2
              ? "M"
              : ms === 3
              ? "D"
              : ms === 4
              ? "W"
              : ""
          );

          console.log(" GetAllCustomejjjrMasterNew res ", responseJSON);

          setStateDistrictList();
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  };

  const setStateDistrictList = () => {
    const values = getValues();
    console.log(" dejbufgggfggggger;");
    let filteredCity = allCity.filter((x) => {
      return x.PlaceCd.trim() === values.City;
    });

    setSelectedCityList(filteredCity);

    let filteredState = allstate.filter((x) => {
      return x.StateCd.trim() === filteredCity[0].StateCd.trim();
    });

    console.log("filteredState", filteredState);
    setSelectedStateList(filteredState);

    let filteredDistrict = allDistrict.filter((x) => {
      return x.LookupIDDb.trim() === filteredCity[0].District.toString();
    });

    setSelectedDistrictList(filteredDistrict);

    setValue("State", filteredState[0].StateCd);
    setValue("District", filteredDistrict[0].LookupIDDb);
  };
  const handleCity = (e) => {
    console.log("hiiiiiiiiiiii");
    debugger;
    let filteredDistrict = allDistrict.filter((x) => {
      return x.LookupIDDb.trim() === e.target.value;
    });
    debugger;
    console.log("filteredDistrict", filteredDistrict);
  };
  const onSubmit = (data) => {
    InitFileParse(data);
  };

  function InitFileParse(data) {
    console.log(data, "data");
    var base64String = null;
    var reader = new FileReader();

    reader.readAsDataURL(data.AadhaarFile[0]);

    reader.onload = function () {
      base64String = reader.result;
      base64String = base64String.split(",");

      if (base64String[1] != null && base64String[1] != "") {
        InitDocFileParse(data, base64String[1]);
        // saveCustData(data, base64String[1]);
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

  function InitDocFileParse(data, adharfile) {
    var base64String = null;
    var reader = new FileReader();
    reader.readAsDataURL(data.DocFile[0]);
    reader.onload = function () {
      base64String = reader.result;
      base64String = base64String.split(",");
      saveCustData(data, base64String[1], adharfile);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      base64String = "File Read Error!";
      swal("Alert", "Invalid Aadhaar File!", "error");
      return base64String;
    };
  }

  function saveCustData(data, docFile, adharfile) {
    console.log();
    try {
      var dataPara = {
        ApplType: parseInt(RED_Cust.red_ApplType),
        Title: data.Title,
        CustMobNo: RED_Cust.red_CustMob,
        // aadhaarNo: "",
        PanNumber: data.PAN,
        AadhaarZipInfo: {
          ZipFile: adharfile,
          FilePassword: data.AadhaarCode,
        },
        custBasicInfo: {
          CustId: "",
          CustMobNo: "",
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
        DocumentProofData: {
          DocProofType: parseInt(data.selDocType),
          ImgDocProof: docFile,
        },
      };
      console.log("datapara ", dataPara);

      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false
      });
        HttpService.PostAjaxData(dataPara, "MainService/SaveCustomerData/")
          .then((resp) => {
            swal2.close();
            let responseJSON = resp.data;
            console.log("SaveCustomerData res ", responseJSON);

            if (responseJSON.ResponseCode === "000") {
              let respCustId = responseJSON.ResponseCustId;
              // dispatch(storeCust("red_CustId", "1503210000000087"));
              //  dispatch(storeCust("red_CustMob", "5646456546"));
              dispatch(storeCust("red_CustId", respCustId));
              swal(
                "Success!",
                "Details Submitted Successfully!",
                "success"
              ).then(() => {
                history.push("/CustReview");
              });
            } else {
              swal("Alert", responseJSON.ResponseMessage, "error");
              return;
              // history.push("/CustReview");
            }
          })
          .catch((error) => {
            console.log(error, "Response Error!");
          })
      
    } catch (err) {
      swal("Alert", "Something Went Wrong: " + err, "error");
    }
  }

  const handleStateData = (event) => {
    setStateName(event.target.value);
    // let filteredCity = cityList.filter((x) => {
    //   return x.StateCode === event.target.value;
    // });

    // console.log("filteredCity res ", filteredCity);
    // setStateCityList(filteredCity);
  };

  return (
    <LayoutCust>
      <Container maxWidth={matchesSm ? "xl" : "false"}>
        <Paper elevation={matchesSm ? 3 : 0}>
          {/*start top header */}
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Box m={1} />
            <Grid item xs={12}>
              <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    component="h2"
                    variant="h6"
                    className={classes.contentHeading}
                  >
                     {i18next.t('custInfoHeader')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    className={classes.contentSubHeading}
                  >
                    <i>{i18next.t('custInfoAadhar')}</i>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" className={classes.headingDivider} />
            </Grid>
          </Grid>
          {/*end top header */}
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
          >
            <div className={classes.paper}>
              <Grid container justify="flex-start" spacing={2}>
                {step.stepOne ? (
                  <>
                    {/* step one start */}
                    <Grid item xs={12}>
                      <Box m={1} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t('custFieldTitle')}
                            name="Title"
                            autoComplete="off"
                          />
                        }
                        name="Title"
                        defaultValue=""
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "This Field is required!",
                          },
                        }}
                      />
                      {errors.Title && (
                        <FormHelperText error>
                          {errors.Title.message}
                        </FormHelperText>
                      )}

                      {/* 
                      <FormControl className={classes.formControl}>
                        <InputLabel>Title {i18next.t('btnSubmit')}</InputLabel>
                        <Controller
                          as={
                            <Select fullWidth autoFocus>
                              <MenuItem value="MR">Mr.</MenuItem>
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
                      )} */}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t('custFieldName')}
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
                            label={i18next.t('custFieldFather')}
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
                            label={i18next.t('custFieldMother')}
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            name="DOB"
                            label={i18next.t('custFieldDob')}
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldGender')}</InputLabel>
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldMaritalStatus')}</InputLabel>
                        <Controller
                          as={
                            <Select>
                              <MenuItem value="S">Single</MenuItem>
                              <MenuItem value="M">Married</MenuItem>
                              <MenuItem value="D">Divorced</MenuItem>
                              <MenuItem value="W">Widowed</MenuItem>
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
                            label={i18next.t('custFieldEmail')}
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
                            label={i18next.t('custFieldBusiness')}
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t('custFieldIncome')}
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t('custFieldHome')}
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
                            label={i18next.t('custFieldArea')}
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
                            label={i18next.t('custFieldLandMark')}
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldPolitics')}</InputLabel>
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

                    <Grid container justify="flex-start">
                      <Grid container item lg={12} md={12} sm={12} xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checked"
                              checked={checkedBox.checked}
                              onChange={handleCheckBox}
                              color="primary"
                            />
                          }
                          label={i18next.t('custFieldUpdateAdress')}
                        />
                      </Grid>
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
                  <InputLabel>State {i18next.t('btnSubmit')}</InputLabel>
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
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldState')}</InputLabel>
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
                                onChange(e);
                                handleStateData(e);
                              }}
                              onBlur={(e) => {
                                onBlur(e);
                              }}
                              disabled={checkedBox.checked ? false : true}
                              value={value ? value : ""}
                              name={name}
                            >
                              {selectedStateList.map((option) => (
                                <MenuItem
                                  key={option.StateCd}
                                  value={option.StateCd}
                                >
                                  {option.StateDesc}
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
                        <InputLabel>{i18next.t('custFieldCity')}</InputLabel>
                        <Controller
                          control={control}
                          name="City"
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
                                onChange(e);
                                handleCity(e);
                              }}
                              onBlur={(e) => {
                                onBlur(e);
                              }}
                              value={value ? value : ""}
                              name={name}
                            >
                              {cityList.map((option) => (
                                <MenuItem
                                  key={option.PlaceCd}
                                  value={option.PlaceCd}
                                >
                                  {option.PlaceCdDesc.trim()}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                      {errors.City && (
                        <FormHelperText error>
                          {errors.City.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>City {i18next.t('btnSubmit')}</InputLabel>
                        <Controller
                          as={
                            <Select
                              disabled={checkedBox.checked ? false : true}
                              onChange={handleCity}
                            >
                              {cityList.map((option) => (
                                <MenuItem
                                  key={option.PlaceCd}
                                  value={option.PlaceCd}
                                >
                                  {option.PlaceCdDesc.trim()}
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
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldDistrict')}</InputLabel>
                        <Controller
                          as={
                            <Select
                              disabled={checkedBox.checked ? false : true}
                            >
                              {selectedDistrictList.map((option) => (
                                <MenuItem
                                  key={option.LookupIDDb}
                                  value={option.LookupIDDb}
                                >
                                  {option.LookupDescriprionDb}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          name="District"
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
                      {errors.District && (
                        <FormHelperText error>
                          {errors.District.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <Controller
                        as={
                          <TextField
                            disabled={checkedBox.checked ? false : true}
                            fullWidth
                            label={i18next.t('custFieldPincode')}
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
                    <Grid container justify="center">
                      <Grid container item lg={3} md={3} sm={6} xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="button"
                          className={classes.button}
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
                              console.log("result", result);
                              setStep({ stepOne: false });
                            }
                          }}
                        >
                         {i18next.t('btnNextNew')}
                        </Button>
                      </Grid>
                    </Grid>

                    {/* end step one */}
                  </>
                ) : (
                  <>
                    {/* start step 2 */}
                    <Grid item xs={12}>
                      <Box m={1} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <Controller
                        as={
                          <TextField
                            fullWidth
                            label={i18next.t('custFieldPanCard')}
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
                            label={i18next.t('custFieldAAdharCard')}
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
                           {i18next.t('custFieldAAdharFile')}
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

                    <Grid item xs={12} sm={6} md={4} xl={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel>{i18next.t('custFieldDocs')}</InputLabel>
                        <Controller
                          as={
                            <Select fullWidth>
                              <MenuItem value="7">Salary Slip</MenuItem>
                              <MenuItem value="6">Bank Statement</MenuItem>
                            </Select>
                          }
                          name="selDocType"
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
                      {errors.selDocType && (
                        <FormHelperText error>
                          {errors.selDocType.message}
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
                        <Grid item>
                          <input ref={register} type="file" name="DocFile" />
                        </Grid>
                      </Grid>{" "}
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
                        {i18next.t('custFieldOffLineAadhar')}
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

                    <Grid container justify="center" spacing={2}>
                      <Grid container item lg={3} md={3} sm={6} xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="button"
                          className={classes.button}
                          onClick={() => setStep({ stepOne: true })}
                        >
                         {i18next.t('btnPrevious')}
                        </Button>
                      </Grid>
                      <Grid container item lg={3} md={3} sm={6} xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                          // onClick={this._showHideComp.bind(null, false)}
                        >
                          {i18next.t('btnSubmit')}
                        </Button>
                      </Grid>
                    </Grid>

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
    </LayoutCust>
  );
}
