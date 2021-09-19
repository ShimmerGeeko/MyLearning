import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StepTwo from "./steptwo";
import StepThree from "./stepthree";
import { storeCust } from "../../redux/actions/mainAction";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import i18next from "i18next";
import swal2 from "sweetalert2";
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
  Icon,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@material-ui/icons/Add";
import { trackPromise } from "react-promise-tracker";

import HttpService from "../../HttpService";
import Copyright from "../common/Copyright";
import LayoutCustApp from "../LayoutCust/LayoutCustApp";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import swal from "sweetalert";
import Stepone from "./stepone";
import Stepfour from "./stepfour";

const styles = (theme) => ({
  contentHeading: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "600",
    },
    color: "#555555",
    paddingLeft: theme.spacing(2),
  },
  contentSubHeading: {
    textAlign: "left",
    // fontWeight: "400",
    color: "#999999",
    paddingTop: "10px",
    paddingLeft: "13px",
  },

  headingDivider: {
    // borderWidth: "1px",
    // borderColor: "#673AB7",
    // marginTop: theme.spacing(1),
    // border: "1px solid #673AB7",
  },
  paper: {
    // padding: theme.spacing(3, 6),
    padding: theme.spacing(0, 2, 2, 2),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%",

    // Fix IE 11 issue.
  },

  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: "100%",
    textAlign: "left",
  },

  input: {
    display: "none",
  },
  outerBox: {
    padding: theme.spacing(3, 6),
  },
  headerSpan: {
    fontSize: "0.9rem",
    fontWeight: "600",
    margin: "2px 4px",
  },
  buttonArea: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
  mainContainer: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(6),
    },
  },
});
const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
class Accountopeninginfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productType: "",
      accType: "",
      modeofOperation: "",
      modeofOperationList: [],
      nominee: "",
      nomineeFlag: "N",
      jointrefFlag: "N",
      panNo: "",
      email: "",
      gardianRel: "",
      minorDate: "",
      fdate: "",
      gender: "",
      maritalStatus: "",
      fName: "",
      mName: "",
      accholderName: "",
      tds: "",
      custTitle: "",
      occupation: "",
      annualIncome: "",
      stateList: [],
      cityList: [],
      city: "",
      fstate: "",
      locality: "",
      district: "",
      house: "",
      houseError: "",
      landmark: "",
      pincode: "",
      gardianName: "",
      aadharCode: "",
      politicallyExposed: "",
      stateCityList: [],
      addfieldFlag: false,
      currentStep: 1,
      productTypeError: "",
      accTypeError: "",
      modeofOperationError: "",
      politicallyExposedError: "",
      annualIncomeError: "",
      occupationError: "",
      gardianNameEror: "",
      nomineeError: "",
      panNoError: "",
      emailError: "",
      gardianRelError: "",
      minorDateError: "",
      fdateError: "",
      genderError: "",
      maritalStatusError: "",
      fNameError: "",
      mNameError: "",
      accholderNameError: "",
      tdsError: "",
      jointCustNameError0: "",
      jointCustMob: "",
      jointCustNameError: "",
      jointCustMobNoError: "",
      custTitleError: "",
      stateError: "",
      cityError: "",
      localityError: "",
      districtError: "",
      aadharCodeError: "",
      aadharFileError: "",
      fileName: "",
      aadharFile: "",
      landmarkError: "",
      pincodeError: "",
      checkATM: false,
      checkCB: false,
      checkIB: false,
      inputFields: [{ id: uuidv4(), jointCustName: "", jointCustMob: "" }],
      nomineeFields: [
        {
          id: uuidv4(),
          NomineeTitle: "",
          NomineeName: "",
          NomineeRltn: "",
          NomineeDob: "",
          NomineeAdd1: "",
          NomineeAdd2: "",
          NomineeAdd3: "",
        },
      ],
    };

    // this.handleEvent = this.handleEvent.bind(this)
  }

  componentDidMount() {
    debugger;
    this.getStateList();
    if (this.props.JointRefId !== "NA") {
      const dataPara = { CustRefId: this.props.JointRefId };
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      HttpService.PostAjaxData(dataPara, "MainService/PrimaryCustDataForJoint")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;

          const MinorMOP = [
            { key: "1", value: "SELF" },
            { key: "5", value: "FATHER GUARDIAN" },
            { key: "6", value: "MOTHER GUARDIAN" },
            { key: "7", value: "LEGAL GUARDIAN" },
          ];

          const OtherMOP = [
            { key: "1", value: "SELF" },
            { key: "2", value: "JOINT" },
            { key: "3", value: "ANYONE" },
            { key: "4", value: "EITHER OR SURVIVOR" },
          ];
          const val = responseJSON.AccountType;
          if (val == "3") {
            this.setState({
              accTypeError: "",
              modeofOperationList: MinorMOP,
              productType: responseJSON.ProductType,
              accType: responseJSON.AccountType,
              modeofOperation: String(responseJSON.ModeOfOperation),
              tds: responseJSON.TDSYN,
              nomineeFlag: "N",
              jointrefFlag: "Y",
              nominee: responseJSON.NomineeYN,
              nomineeFields:
                responseJSON.NomineeDatas.length === 0
                  ? this.state.nomineeFields
                  : responseJSON.NomineeDatas,
            });
          } else {
            this.setState({
              accTypeError: "",
              modeofOperationList: OtherMOP,
              nomineeFlag: "N",
              jointrefFlag: "Y",
              productType: responseJSON.ProductType,
              accType: responseJSON.AccountType,
              modeofOperation: String(responseJSON.ModeOfOperation),
              tds: responseJSON.TDSYN,
              nominee: responseJSON.NomineeYN,
              nomineeFields:
                responseJSON.NomineeDatas.length === 0
                  ? this.state.nomineeFields
                  : responseJSON.NomineeDatas,
            });
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        });
    }
  }
  handleCBChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };
  handleNomineeChange = (e) => {
    this.setState(
      {
        nominee: e.target.value,
        nomineeError: "",
      },
      () => {
        if (this.state.nominee === "Y") {
          this.setState({
            nomineeFlag: "Y",
          });
        } else {
          this.setState({
            nomineeFlag: "N",
          });
        }
      }
    );
  };

  onFormSubmit = () => {
    debugger;
    if (this.state.aadharCode === "") {
      this.setState({
        aadharCodeError: "This Field is required",
      });
    } else {
      this.setState({
        aadharCodeError: "",
      });
    }
    if (this.state.fileName === "") {
      this.setState({
        aadharFileError: "This Field is required",
      });
    } else {
      this.setState({
        aadharFileError: "",
      });
    }
    this.stepOneValidation();
    this.stepTwoValidation();
    if (
      this.state.aadharCode === "" ||
      this.state.fileName === "" ||
      this.state.panNo === "" ||
      this.state.productType === "" ||
      this.state.modeofOperation === "" ||
      this.state.nominee === "" ||
      this.state.email === "" ||
      this.state.fdate === "" ||
      this.state.gender === "" ||
      this.state.fName === "" ||
      this.state.mName === "" ||
      this.state.accholderName === "" ||
      this.state.tds === "" ||
      this.state.custTitle === "" ||
      this.state.fstate === "" ||
      this.state.city === "" ||
      this.state.district === "" ||
      this.state.locality === "" ||
      this.state.landmark === "" ||
      this.state.pincode === ""
    ) {
      alert("Please Fill all Mandatory fields");
      return false;
    }

    var base64String = null;
    var reader = new FileReader();
    reader.readAsDataURL(this.state.aadharFile);
    reader.onload = () => {
      base64String = reader.result;
      base64String = base64String.split(",");

      if (base64String[1] != null && base64String[1] != "") {
        this.saveCustData(base64String[1]);
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
  };

  saveCustData(Afile) {
    try {
      debugger;
      let JointYN = "N";
      if (this.state.inputFields[0].jointCustName !== "") {
        JointYN = "Y";
      }
      const filterCust = this.state.inputFields.map((val) => {
        delete val.id;
        return val;
      });

      const filterNominee = this.state.nomineeFields.map((val) => {
        delete val.id;
        return val;
      });

      var para = {
        ApplType: this.props.appType,
        CustMobNo: this.props.custMob,
        PanNumber: this.state.panNo,
        ExistingCustYN: "N",
        CbsCustNo: 0,
        ProductType: this.state.productType,
        ModeOfOperation: parseInt(this.state.modeofOperation),
        AccountType: parseInt(this.state.accType),
        TDSYN: this.state.tds,
        Title: this.state.custTitle,
        custBasicInfo: {
          CustId: "",
          CustMobNo: "",
          Name: this.state.accholderName,
          FatherName: this.state.fName,
          MotherName: this.state.mName,
          DOB: this.state.fdate,
          Gender: this.state.gender,
          MaritalStatus: this.state.maritalStatus,
          Email: this.state.email,
          Occupation: this.state.occupation,
          AnnualIncome: this.state.annualIncome,
          PolitcallyExpYN: this.state.politicallyExposed,
          House: this.state.house,
          Locality: this.state.locality,
          Landmark: this.state.landmark,
          District: this.state.district,
          State: this.state.fstate,
          City: this.state.city,
          PinCode: this.state.pincode,
          // AadhaarRefId: "",
          // PanNumber: "",
        },
        MinorDOB: this.state.minorDate,
        GuardianName: this.state.gardianName,
        GuardianRelation: this.state.gardianRel,
        NomineeYN: this.state.nominee,
        NoOfNominee:
          this.state.inputFields[0].jointCustName === ""
            ? 0
            : this.state.nomineeFields.length,
        NomineeDatas:
          this.state.nomineeFields[0].NomineeName === "" ? [] : filterNominee,
        JointYN: JointYN,
        JointRefId: this.props.JointRefId,
        JointCustDatas:
          this.state.inputFields[0].jointCustName === "" ? [] : filterCust,
        ChequeBookYN: this.state.checkCB === true ? "Y" : "N",
        ATMCardYN: this.state.checkATM === true ? "Y" : "N",
        INETBankingYN: this.state.checkIB === true ? "Y" : "N",
        AadhaarZipInfo: {
          ZipFile: Afile,
          FilePassword: this.state.aadharCode,
        },
      };
      console.log("save form para ", para);
      swal2.fire({
        title: "Processing...",
        text: "Please Wait",
        imageUrl: processing,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      HttpService.PostAjaxData(para, "MainService/SaveCustomerIndAccData/")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          console.log("SaveCustomerIndAccData res ", responseJSON);
          debugger;
          if (responseJSON.ResponseCode === "000") {
            let respCustId = responseJSON.ResponseCustId;
            this.props.dispatch(storeCust("red_CustId", respCustId));
            //  dispatch(storeCust("red_CustId", respCustId));
            swal("Success!", "Details Submitted Successfully!", "success").then(
              () => {
                this.props.history.push("/CustReview");
              }
            );
          } else {
            swal("Alert", responseJSON.ResponseMessage, "error");
            //  history.push('/CustReview');
          }
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        });
    } catch (err) {
      swal("Alert", "Something Went Wrong: " + err, "error");
    }
  }

  getStateList = () => {
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

        this.setState({
          stateList: responseJSON.StateList,
          cityList: responseJSON.StateCityList,
        });
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  };

  handleStateData = (event) => {
    // setStateName(event.target.value)

    let filteredCity = this.state.cityList.filter((x) => {
      return x.StateCode === event.target.value;
    });
    this.setState(
      {
        fstate: event.target.value,
        stateCityList: filteredCity,
      },
      () => {
        if (this.state.fstate !== "") {
          this.setState({
            stateError: "",
          });
        }
      }
    );
  };
  handleAddFields = () => {
    debugger;

    this.setState({
      inputFields: [
        ...this.state.inputFields,
        { id: uuidv4(), jointCustName: "", jointCustMob: "" },
      ],
    });

    //  setInputFields([...inputFields, { id: uuidv4(),  jointCustName: '', jointCustMobNo: ''}])
  };
  handleAddNomineeFields = () => {
    debugger;

    this.setState({
      nomineeFields: [
        ...this.state.nomineeFields,
        {
          id: uuidv4(),
          NomineeTitle: "",
          NomineeName: "",
          NomineeRltn: "",
          NomineeDob: "",
          NomineeAdd1: "",
          NomineeAdd2: "",
          NomineeAdd3: "",
        },
      ],
    });

    //  setInputFields([...inputFields, { id: uuidv4(),  jointCustName: '', jointCustMobNo: ''}])
  };
  handleRemoveNomineeFields = (id) => {
    let values = this.state.nomineeFields;
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    this.setState({
      nomineeFields: values,
    });
    // setInputFields(values);
  };

  handleRemoveFields = (id) => {
    let values = this.state.inputFields;
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    this.setState({
      inputField: values,
    });
    // setInputFields(values);
  };
  handleNomineeChangeInput = (id, event) => {
    const newInputFields = this.state.nomineeFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    this.setState({
      nomineeFields: newInputFields,
    });
  };

  handleNumberChange = (e) => {
    debugger;
    var regex = /[0-9]|\./;
    let amtval = e.target.value;
    if (amtval != "") {
      if (regex.test(amtval)) {
        this.setState(
          {
            [e.target.name]: e.target.value,
          },
          () => {
            if (this.state.annualIncome !== "") {
              this.setState({
                annualIncomeError: "",
              });
            }
            if (this.state.pincode !== "") {
              this.setState({
                pincodeError: "",
              });
            }
          }
        );
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  handlePincodeChange = (e) => {
    debugger;
    let amtval = e.target.value;
    // if (amtval != "") {
    //   if (regex.test(amtval)) {
    //     this.setState({
    //       [e.target.name]: e.target.value,
    //       emailError: "",
    //     });
    //   } else {
    //     this.setState({
    //       emailError: "Invalid Email Format",
    //     });
    //   }
    // }
    if (amtval.length < 6) {
      debugger;
      this.setState({
        pincodeError: "Pincode should be atleast of 6 characters",
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        pincodeError: "",
      });
    }
  };
  handleEmailChange = (e) => {
    debugger;
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let amtval = e.target.value;
    if (amtval != "") {
      if (regex.test(amtval)) {
        this.setState({
          [e.target.name]: e.target.value,
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Invalid Email Format",
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  checkPanFormat = (e) => {
    var regex = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/;
    let val = e.target.value;
    if (regex.test(val)) {
      this.setState({
        panNoError: "",
      });
    } else {
      this.setState({
        panNoError: "Invalid Pan Format",
      });
    }
  };
  handleStringChange = (e) => {
    debugger;
    var regex = /^[a-zA-Z]*$/g;
    let amtval = e.target.value;
    if (amtval != "") {
      if (regex.test(amtval)) {
        this.setState(
          {
            [e.target.name]: e.target.value,
          },
          () => {
            if (this.state.occupation !== "") {
              this.setState({
                occupationError: "",
              });
            }
          }
        );
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleFileChange = (event) => {
    this.setState({
      fileName: event.target.files[0].name,
      aadharFile: event.target.files[0],
      aadharFileError: "",
    });
  };
  handleChangeCustname = (id, event) => {
    debugger;
    const newInputFields = this.state.inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    this.setState({
      inputFields: newInputFields,
    });
  };

  handleChangeInput = (id, event) => {
    debugger;
    var regex = /[0-9]|\./;
    let amtval = event.target.value;
    if (amtval.length <= 10) {
      if (amtval != "") {
        if (regex.test(amtval)) {
          const newInputFields = this.state.inputFields.map((i) => {
            if (id === i.id) {
              i[event.target.name] = event.target.value;
            }
            return i;
          });
          this.setState({
            inputFields: newInputFields,
          });
        }
      } else {
        const newInputFields = this.state.inputFields.map((i) => {
          if (id === i.id) {
            i[event.target.name] = event.target.value;
          }
          return i;
        });
        this.setState({
          inputFields: newInputFields,
        });
      }
    }
  };

  stepOneValidation = () => {
    if (this.state.accType == "") {
      this.setState({
        accTypeError: "This Field is required",
      });
    }
    if (this.state.productType == "") {
      this.setState({
        productTypeError: "This Field is required",
      });
    }
    if (this.state.panNo == "") {
      this.setState({
        panNoError: "This Field is required",
      });
    }
    if (this.state.modeofOperation == "") {
      this.setState({
        modeofOperationError: "This Field is required",
      });
    }
    if (this.state.nominee == "") {
      this.setState({
        nomineeError: "This Field is required",
      });
    }
    if (this.state.email == "") {
      this.setState({
        emailError: "This Field is required",
      });
    }

    if (this.state.fdate == "") {
      this.setState({
        fdateError: "This Field is required",
      });
    }
    if (this.state.gender == "") {
      this.setState({
        genderError: "This Field is required",
      });
    }
    if (this.state.maritalStatus == "") {
      this.setState({
        maritalStatusError: "This Field is required",
      });
    }
    if (this.state.fName == "") {
      this.setState({
        fNameError: "This Field is required",
      });
    }
    if (this.state.mName == "") {
      this.setState({
        mNameError: "This Field is required",
      });
    }
    if (this.state.accholderName == "") {
      this.setState({
        accholderNameError: "This Field is required",
      });
    }
    if (this.state.tds == "") {
      this.setState({
        tdsError: "This Field is required",
      });
    }
    if (this.state.custTitle == "") {
      this.setState({
        custTitleError: "This Field is required",
      });
    }
    if (this.state.accType == "3") {
      if (this.state.minorDate == "") {
        this.setState({
          minorDateError: "This Field is required",
        });
      }
      if (this.state.gardianName == "") {
        this.setState({
          gardianNameEror: "This Field is required",
        });
      }
      if (this.state.gardianRel == "") {
        this.setState({
          gardianRelError: "This Field is required",
        });
      }
    } else {
      if (this.state.politicallyExposed == "") {
        this.setState({
          politicallyExposedError: "This Field is required",
        });
      }
      if (this.state.annualIncome == "") {
        this.setState({
          annualIncomeError: "This Field is required",
        });
      }
      if (this.state.occupation == "") {
        this.setState({
          occupationError: "This Field is required",
        });
      }
    }
  };

  stepTwoValidation = () => {
    if (this.state.fstate == "") {
      this.setState({
        stateError: "This Field is required",
      });
    }
    if (this.state.city == "") {
      this.setState({
        cityError: "This Field is required",
      });
    }
    if (this.state.district == "") {
      this.setState({
        districtError: "This Field is required",
      });
    }
    if (this.state.house == "") {
      this.setState({
        houseError: "This Field is required",
      });
    }
    if (this.state.locality == "") {
      this.setState({
        localityError: "This Field is required",
      });
    }
    if (this.state.landmark == "") {
      this.setState({
        landmarkError: "This Field is required",
      });
    }
    if (this.state.pincode == "") {
      this.setState({
        pincodeError: "This Field is required",
      });
    }
  };
  StepFourValidation = () => {
    if (this.state.aadharCode == "") {
      this.setState({
        aadharCodeError: "This Field is required",
      });
    }
    if (this.state.fileName == "") {
      this.setState({
        aadharFileError: "This Field is required",
      });
    }
  };

  nextStep = (step) => {
    debugger;

    if (step === 2) {
      if (this.state.inputFields.length !== 0) {
        if (this.state.inputFields[0].jointCustName == "") {
          this.setState({
            jointCustNameError0: "This Field is required",
          });
        }
      }
      this.stepOneValidation();

      if (this.state.accType == "3") {
        if (
          this.state.minorDate === "" ||
          this.state.gardianName === "" ||
          this.state.gardianRel === ""
        ) {
          return false;
        }
      } else {
        if (
          this.state.politicallyExposed === "" ||
          this.state.annualIncome === "" ||
          this.state.occupation === ""
        ) {
          return false;
        }
      }

      if (
        this.state.panNo !== "" &&
        this.state.productType !== "" &&
        this.state.modeofOperation !== "" &&
        this.state.nominee !== "" &&
        this.state.email !== "" &&
        this.state.fdate !== "" &&
        this.state.gender !== "" &&
        this.state.fName !== "" &&
        this.state.mName !== "" &&
        this.state.accholderName !== "" &&
        this.state.tds !== "" &&
        this.state.custTitle !== ""
      ) {
        this.setState({
          currentStep: step,
        });
      }
    } else if (step === 3) {
      this.stepTwoValidation();
      if (
        this.state.fstate !== "" &&
        this.state.city !== "" &&
        this.state.district !== "" &&
        this.state.locality !== "" &&
        this.state.landmark !== "" &&
        this.state.pincode !== ""
      ) {
        this.setState({
          currentStep: step,
        });
      }
    } else if (step === 4) {
      this.setState({
        currentStep: step,
      });
    } else if (step === 5) {
      this.StepFourValidation();
      if (this.state.aadharCode !== "" || this.state.fileName !== "") {
        this.setState({
          currentStep: step,
        });
      }
    } else {
      this.setState({
        currentStep: step,
      });
    }
  };

  handleAccTypeChange = (e) => {
    const MinorMOP = [
      { key: "1", value: "SELF" },
      { key: "5", value: "FATHER GUARDIAN" },
      { key: "6", value: "MOTHER GUARDIAN" },
      { key: "7", value: "LEGAL GUARDIAN" },
    ];

    const OtherMOP = [
      { key: "1", value: "SELF" },
      { key: "2", value: "JOINT" },
      { key: "3", value: "ANYONE" },
      { key: "4", value: "EITHER OR SURVIVOR" },
    ];
    const val = e.target.value;
    if (val == "3") {
      this.setState({
        accTypeError: "",
        modeofOperationList: MinorMOP,
        accType: val,
      });
    } else {
      this.setState({
        accTypeError: "",
        modeofOperationList: OtherMOP,
        accType: val,
      });
    }
  };
  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        debugger;

        if (this.state.accType !== "") {
          this.setState({
            accTypeError: "",
          });
        }
        if (this.state.productType !== "") {
          this.setState({
            productTypeError: "",
          });
        }
        if (this.state.panNo !== "") {
          this.setState({
            panNoError: "",
          });
        }
        if (this.state.modeofOperation !== "") {
          this.setState({
            modeofOperationError: "",
          });
        }
        if (this.state.nominee !== "") {
          this.setState({
            nomineeError: "",
          });
        }
        if (this.state.email !== "") {
          this.setState({
            emailError: "",
          });
        }
        if (this.state.gardianRel !== "") {
          this.setState({
            gardianRelError: "",
          });
        }
        if (this.state.gardianName !== "") {
          this.setState({
            gardianNameEror: "",
          });
        }
        if (this.state.politicallyExposed !== "") {
          this.setState({
            politicallyExposedError: "",
          });
        }
        if (this.state.maritalStatus !== "") {
          this.setState({
            maritalStatusError: "",
          });
        }
        if (this.state.occupation !== "") {
          this.setState({
            occupationError: "",
          });
        }
        if (this.state.annualIncome !== "") {
          this.setState({
            annualIncomeError: "",
          });
        }
        if (this.state.minorDate !== "") {
          this.setState({
            minorDateError: "",
          });
        }
        if (this.state.fdate !== "") {
          this.setState({
            fdateError: "",
          });
        }
        if (this.state.gender !== "") {
          this.setState({
            genderError: "",
          });
        }
        if (this.state.maritalStatus !== "") {
          this.setState({
            maritalStatusError: "",
          });
        }
        if (this.state.fName !== "") {
          this.setState({
            fNameError: "",
          });
        }
        if (this.state.mName !== "") {
          this.setState({
            mNameError: "",
          });
        }
        if (this.state.accholderName !== "") {
          this.setState({
            accholderNameError: "",
          });
        }
        if (this.state.tds !== "") {
          this.setState({
            tdsError: "",
          });
        }
        if (this.state.custTitle !== "") {
          this.setState({
            custTitleError: "",
          });
        }
        if (this.state.fstate !== "") {
          this.setState({
            stateError: "",
          });
        }
        if (this.state.city !== "") {
          this.setState({
            cityError: "",
          });
        }
        if (this.state.district !== "") {
          this.setState({
            districtError: "",
          });
        }
        if (this.state.house !== "") {
          this.setState({
            houseError: "",
          });
        }
        if (this.state.locality !== "") {
          this.setState({
            localityError: "",
          });
        }
        if (this.state.landmark !== "") {
          this.setState({
            landmarkError: "",
          });
        }
        if (this.state.pincode !== "") {
          this.setState({
            pincodeError: "",
          });
        }
      }
    );
  };
  mopOnchange = (e) => {
    debugger;
    const accval = this.state.accType;
    const value = e.target.value;
    if (value != "1" && accval != "3") {
      this.setState({
        addfieldFlag: true,
        modeofOperation: value,
        modeofOperationError: "",
      });
    } else {
      this.setState({
        addfieldFlag: false,
        modeofOperation: value,
        modeofOperationError: "",
      });
    }
  };
  showStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <Stepone
              NextStep={this.nextStep}
              stateval={this.state}
              handleRemoveFields={this.handleRemoveFields}
              handleChange={this.handleChange}
              handleNumberChange={this.handleNumberChange}
              handleAddFields={this.handleAddFields}
              handleNomineeChangeInput={this.handleNomineeChangeInput}
              handleChangeInput={this.handleChangeInput}
              handleAccTypeChange={this.handleAccTypeChange}
              mopOnchange={this.mopOnchange}
              handleNomineeChange={this.handleNomineeChange}
              handleEmailChange={this.handleEmailChange}
              checkPanFormat={this.checkPanFormat}
              handleStringChange={this.handleStringChange}
              handleChangeCustname={this.handleChangeCustname}
            />
          </>
        );
      case 2:
        return (
          <>
            <StepTwo
              NextStep={this.nextStep}
              stateval={this.state}
              handleStateData={this.handleStateData}
              handleChange={this.handleChange}
              handlePincodeChange={this.handlePincodeChange}
              handleNumberChange={this.handleNumberChange}
            />
          </>
        );
      case 3:
        return (
          <>
            <StepThree
              NextStep={this.nextStep}
              stateval={this.state}
              handleRemoveNomineeFields={this.handleRemoveNomineeFields}
              handleNomineeChange={this.handleNomineeChange}
              handleAddNomineeFields={this.handleAddNomineeFields}
              handleNomineeChangeInput={this.handleNomineeChangeInput}
            />
          </>
        );
      case 4:
        return (
          <>
            <Stepfour
              NextStep={this.nextStep}
              stateval={this.state}
              handleChange={this.handleChange}
              handleFileChange={this.handleFileChange}
              handleCBChange={this.handleCBChange}
              onFormSubmit={this.onFormSubmit}
            />
          </>
        );
    }
  };

  render() {
    const { classes } = this.props;
    console.log("state  ", this.state);
    return (
      <>
        <LayoutCustApp>
          <Container maxWidth="xl" className={classes.mainContainer}>
            <Paper elevation={3}>
              {/*start top header */}

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Box m={2} />
                </Grid>
              </Grid>

              {/* <Grid item xs={12}>
              <CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} />
            </Grid> */}
              <Grid item xs={12}>
                <Typography
                  component="h2"
                  variant="h6"
                  className={classes.contentHeading}
                >
                  {i18next.t("custInfoAccountHeader")}
                </Typography>
              </Grid>
              <Box m={2} />
              <Grid item xs={12}>
                <Divider
                  variant="fullWidth"
                  className={classes.headingDivider}
                />
              </Grid>
              <Box m={1} />
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Stepper
                  style={{ width: "100%" }}
                  activeStep={this.state.currentStep - 1}
                  orientation="horizontal"
                >
                  <Step>
                    <StepLabel onClick={() => this.nextStep(1)}></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={() => this.nextStep(2)}></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={() => this.nextStep(3)}></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={() => this.nextStep(4)}></StepLabel>
                  </Step>
                </Stepper>
              </Grid>

              {/* <div className={classes.paper}>
                 <Grid container justify="flex-start" spacing={2}> */}
              {this.showStep(this.state.currentStep)}
              {/* </Grid>
                </div> */}

              {/*end top header */}
            </Paper>
          </Container>
        </LayoutCustApp>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    appType: state.mainReducer.red_ApplType,
    custMob: state.mainReducer.red_CustMob,
    JointRefId: state.mainReducer.JointRefId,
  };
};

Accountopeninginfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Accountopeninginfo)
);
// ggggggggggggggg
