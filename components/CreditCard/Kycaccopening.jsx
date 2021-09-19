import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SendIcon from "@material-ui/icons/Send";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import BadgeRight from '../common/CustomBadgeRight';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { CardContent, CardHeader, Card } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Copyright from "../common/Copyright";
import LayoutCust from "../LayoutCust/LayoutCust";
import PersonIcon from '@material-ui/icons/Person';
import { storeCust } from "../../redux/actions/mainAction";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { useDispatch, useSelector } from "react-redux";

import HttpService from "../../HttpService";
import swal from "sweetalert";
import CustBreadcrumb from '../common/CustBreadcrumb';
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        flexGrow: 1,
    },
    contentHeading: {
        textAlign: "center",
        fontWeight: "400",
        color: "#555555",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    headingDivider: {
        // borderWidth: "1px",
        // borderColor: "#673AB7",
        marginTop: theme.spacing(1),
        border: "1px solid #673AB7",
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
    //   form: {
    //     width: "100%", // Fix IE 11 issue.
    //     marginTop: theme.spacing(1),
    //     justify: "center"
    //   },
    button: {
        // margin: theme.spacing(3, 0, 2),
        marginBottom: 0,
        textTransform: "none",
    },
    checkboxFormCtrl: {
        display: "table",
        paddingTop: theme.spacing(2),
        textAlign: "left",
    },
    checkboxFormCtrlLabel: {
        display: "table-cell",
        fontSize: "0.9rem",
        color: "#555555",
    },
    submit: {
        margin: theme.spacing(4, 0, 0),
    },
    gridItemSppacing: {
        padding: theme.spacing(1),
    },
}));

const defaultValues = {
    mobileNo: "",
    txtOTP: "",

    otpGenerated: false,
    otpLabel: 'Submit'
};
var respCode = "";
var respMsg = "";

export default function Kycaccopening() {
    const classes = useStyles();
    const history = useHistory();
    const [badgeIA, setbadgeIA] = useState({ BadgeText: 'Individual', BadgeNumber: 'Account', BadgeColor: '#FFF' });
    const [badgeOA, setbadgeOA] = useState({ BadgeText: 'Organization', BadgeNumber: 'Account', BadgeColor: '#FFF' });
    const {
        handleSubmit,
        register,
        trigger,
        getValues,
        reset,
        control,
        errors,
    } = useForm({
        defaultValues,
        reValidateMode: "onChange",
    });
    const [data, setData] = useState(defaultValues);
    const [otpValid, setOtpValid] = useState(false);
    const RED_Cust = useSelector((state) => state.mainReducer);
    const dispatch = useDispatch();

    var ApplType = RED_Cust.red_ApplType;
    console.log("ApplType >>>", RED_Cust);
    useEffect(() => {
        console.log("Effect otp flag", data);
    }, [data]);

    const validateCustomer = (value) => {
        debugger
        const Data = { custMobNo: value };
        swal2.fire({
            title: "Processing...",
            text: "Please Wait",
            imageUrl: processing,
            imageWidth: 100,
            imageHeight: 100,
            showConfirmButton: false,
            allowOutsideClick: false
          });
            HttpService.PostAjaxData(Data, "MainService/ValidateCustomer")
                .then((resp) => {
                    swal2.close();
                    console.log("ValidateCustomer ", resp)
                    let responseJSON = resp.data;
                    respCode = responseJSON.ResponseCode;
                    respMsg = responseJSON.ResponseMessage;
                    if (responseJSON.ResponseCode === "000") {
                        GenerateOTP(value);
                    }
                    else if (responseJSON.ResponseCode === "100") {
                        dispatch(storeCust("red_CustId", responseJSON.Response));
                        GenerateOTP(value);
                    }
                    else if (responseJSON.ResponseCode === "104" || responseJSON.ResponseCode === "105") {
                        dispatch(storeCust("red_CustId", responseJSON.Response));
                        GenerateOTP(value);
                    }
                    else {
                        swal("Alert", responseJSON.ResponseMessage, "error");
                    }
                })
                .catch((error) => {
                  //  setState.otpGenerated = false;
                    setData({ ...data,otpGenerated: false });
                    console.log(error, "Response Error!");
                })
        
    };

    function GenerateOTP(customerMobileNumber) {
        const Data = { MobNo: customerMobileNumber };
        swal2.fire({
            title: "Processing...",
            text: "Please Wait",
            imageUrl: processing,
            imageWidth: 100,
            imageHeight: 100,
            showConfirmButton: false,
            allowOutsideClick: false
          });
            HttpService.PostAjaxData(Data, "MainService/GenerateOTP")
                .then((resp) => {
                    swal2.close()
                    let responseJSON = resp.data;
                    if (responseJSON.ResponseCode === "000") {
                        setData({ ...data, otpGenerated: true });
                        console.log('OTP >>>', responseJSON.Response.OTP);
                        swal("Success", "Your OTP Is " + responseJSON.Response.OTP, "success");
                    } else {
                       // setState.otpGenerated = false;
                        setData({ ...data, otpGenerated: false });
                        console.log("EX_Code: ", responseJSON.ResponseCode);
                        swal("Alert!", responseJSON.ResponseMessage, "warning");
                    }
                })
                .catch((error) => {
                   // setState.otpGenerated = false;
                    setData({ ...data,otpGenerated: false });
                    console.log(error, "Response Error!");
                })
        
    };

    const onSubmit = (data) => {
        // setData(data);
        debugger
        var defaultMessage = "";
        var defaultIcon = "";
        console.log("RED_Cust PREV", RED_Cust);
        const Data = { MobNo: data.mobileNo, OTP: data.txtOTP };
        swal2.fire({
            title: "Processing...",
            text: "Please Wait",
            imageUrl: processing,
            imageWidth: 100,
            imageHeight: 100,
            showConfirmButton: false,
            allowOutsideClick: false
          });
            HttpService.PostAjaxData(Data, "MainService/ValidateOTP")
                .then((resp) => {
                    swal2.close();
                    let responseJSON = resp.data;
                    if (responseJSON.ResponseCode === "000") {
                        dispatch(storeCust("red_CustMob", data.mobileNo));
                        if (respCode === "000") { // fresh customer
                            defaultMessage = respMsg;
                            swal({
                                title: "Success!",
                                text: "OTP Validated Successfully",
                                icon: "success"
                            }).then(() => {
                                //ApplType from Redux red_ApplType
                                if (ApplType === 1) {
                                    history.push('/custInfo');
                                    // window.location.href = './CustInfo_mr.html';
                                }
                                else if (ApplType === 2) {
                                    setOtpValid(true)
                                    // history.push('/CustAccountIndex');
                                    // window.location.href = './AccountType_mr.html';
                                }
                                else if (ApplType === 3) { 
                                    history.push('/Custinfocc');
                                    // window.location.href = './CustInfoCC_mr.html';
                                }
                                else if (ApplType === 4) {
                                    // window.location.href = './CustInfoReKYC_mr.html';
                                }
                                else if (ApplType === 5) {
                                }
                            });
                        }
                        else {
                            defaultMessage = respMsg;
                            swal({
                                title: "Success!",
                                text: defaultMessage,
                                icon: "info"
                            }).then(() => {
                                history.push('/ScheduleNow');
                            });
                        }


                    } else {
                        dispatch(storeCust("red_CustMob", ''));
                        console.log("EX_Code: ", responseJSON.ResponseCode);
                        swal("Alert!", responseJSON.ResponseMessage, "warning");
                    }
                })
                .catch((error) => {
                    console.log(error, "Response Error!");
                })
        
        // dispatch(storeCust("red_CustMob", data.mobileNo));
        console.log("RED_Cust NEXT", RED_Cust);
    };

    const nextFormOA = () => {
        swal('Coming Soon...', '', 'info');
        return;
    }
    const nextFormIA = () => {
        history.push('/custInfo');
    }
    // const handleChange = (event) => {
    //   console.log(event.target.name);
    //   setData({ ...data, [event.target.name]: event.target.checked });
    // };
    console.log("errors", errors);

    return (
        <LayoutCust>
            <Grid container justify='center'>
                <Grid
                    container
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={6}
                    component={Paper}
                    direction='row'
                    elevation={6}
                    square>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{ marginTop: "16px" }}><CustBreadcrumb bcBool={RED_Cust.red_CustBreadcrumb} /></div>

                        <Divider variant='middle' className={classes.headingDivider} />
                    </Grid>


                    {/* <form noValidate onSubmit={handleSubmit((data) => setData(data))}> */}
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>

                        <Grid container className={classes.paper}>

                            <Grid
                                container
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                className={classes.paper}>
                                <PhoneIphoneIcon />
                                <Grid item>
                                    <Controller
                                        as={
                                            <TextField
                                                // variant="outlined"
                                                margin='normal'
                                                // required
                                                fullWidth
                                                label='Mobile Number'
                                                name='mobileNo'
                                                autoComplete='off'
                                                inputProps={{ maxLength: 10 }}

                                                autoFocus
                                            />
                                        }
                                        name='mobileNo'
                                        defaultValue=''
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
                                                value: 10,
                                                message: "Enter 10 digit Mobile Number!",
                                            },
                                        }}
                                    />
                                    {errors.mobileNo && (
                                        <FormHelperText error>
                                            {errors.mobileNo.message}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            {!data.otpGenerated ?
                                <>
                                    <Grid
                                        container
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        className={classes.gridItemSppacing}
                                        style={{ paddingBottom: 0 }}>
                                        <Button
                                            fullWidth
                                            size='medium'
                                            variant='contained'
                                            color='primary'
                                            name='btnGenOTP'
                                            type='button'
                                            className={classes.button}

                                            onClick={async () => {
                                                const result = await trigger("mobileNo");
                                                if (result) {
                                                    const valMobNo = getValues("mobileNo");
                                                    console.log("get Val Mob:", valMobNo);
                                                    data.otpLabel = 'Resend OTP';
                                                    setData({ ...data, otpLabel: data.otpLabel });
                                                    validateCustomer(valMobNo);
                                                }
                                            }}>
                                            {data.otpLabel}
                                        </Button>
                                    </Grid>
                                </> : 
                                <>
                            <Grid
                                container
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                className={classes.gridItemSppacing}>
                                <Controller
                                    as={
                                        <TextField
                                            name='txtOTP'
                                            label='OTP'
                                            type='password'
                                            fullWidth
                                            margin='normal'
                                            autoComplete='off'
                                            inputProps={{ maxLength: 6 }}
                                        />
                                    }
                                    name='txtOTP'
                                    defaultValue=''
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This Field is required!",
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Only Number are allowed!",
                                        },
                                        minLength: { value: 6, message: "Enter 6 digit OTP!" },
                                    }}
                                />
                                {errors.txtOTP && (
                                    <FormHelperText error>
                                        {errors.txtOTP.message}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid
                                container
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                className={classes.gridItemSppacing}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    className={classes.submit}
                                //   onClick={this._showHideComp.bind(null, false)}
                                >
                                    SUBMIT
                                    </Button>
                            </Grid> </>}

                        </Grid>
                    </form>

                </Grid>
            </Grid>
        </LayoutCust>
    );
}

