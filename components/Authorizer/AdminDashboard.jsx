import React, { useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import HttpService from "../../HttpService";
import FaceSharpIcon from "@material-ui/icons/FaceSharp";
import { storeCust } from "../../redux/actions/mainAction";
import { trackPromise } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import swal from "sweetalert";
import Badge from "@material-ui/core/Badge";
import clsx from "clsx";
import CommonAppbar from "../LayoutOp/CommonAppbar";
import swal2 from "sweetalert2";
const processing = process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      backgroundColor: "#e91e63",
    },
  },
  shape: {
    backgroundColor: "#e91e63",
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  infoBox: {
    backgroundColor: "#e91e63",
    height: "80px",
  },
  infoBoxIcon: {
    display: "inline-block",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: "80px",
  },
  infoBoxIconI: {
    color: "#fff",
    fontSize: "50px",
    lineHeight: "80px",
  },
  infoBoxContent: {
    display: "inline-block",
    padding: "7px 10px",
  },
  infoBoxText: {
    fontSize: "13px",
    marginTop: "11px",
    color: "#fff",
  },
  infoBoxNumber: {
    fontWeight: "normal",
    fontSize: "26px",
    marginTop: "-4px",
    color: "#fff",
  },
}));

export default function AdminDashboard(props) {
  const classes = useStyles();
  const rectangle = <div className={classes.shape} />;
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  const { opUserId, opUserRole } = useSelector((state) => ({
    opUserId: state.mainReducer.sesParamOpUserId,
    opUserRole: state.mainReducer.sesParamOpUserRole,
  }));
  const { userRole } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
  }));
  const dispatch = useDispatch();

  const clearData = () => {
    const dataPara = {
      UserId: opUserId,
      UserRole: parseInt(opUserRole),
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
      HttpService.PostAjaxData(dataPara, "Login/ClearTransactionFlowData")
        .then((resp) => {
          swal2.close();
          let responseJSON = resp.data;
          if (responseJSON.ResponseCode == "000") {
            swal({
              title: "Success!",
              text: "Successfully cleared Data",
              icon: "info",
            });
          } else {
            swal("Alert!", "error", "warning");
          }
          console.log("ClearTransactionFlowData res ", responseJSON);
        })
        .catch((error) => {
          console.log(error, "Response Error!");
        })
    
  };

  useEffect(() => {
    console.log("Effect otp flag", "dataPara");
  }, []);

  return (
    <>
      <CommonAppbar userRole={userRole} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <div
          onClick={() => {
            clearData();
          }}
        >
          <div className={classes.root}>
            <Badge color="#e91e63">
              <div style={{ height: "80px" }} className={classes.infoBox}>
                <div className={classes.infoBoxIcon}>
                  <i className={classes.infoBoxIconI}>
                    <ClearIcon fontSize="large" />
                  </i>
                </div>
                <div className={classes.infoBoxContent}>
                  <div className={classes.infoBoxText}>clearR</div>
                  <div className={classes.infoBoxNumber}>Customer Data</div>
                </div>
              </div>
            </Badge>
          </div>
        </div>
      </Grid>
    </>
  );
}
