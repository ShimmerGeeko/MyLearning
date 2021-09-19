import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { Tooltip, Switch, Button } from "@material-ui/core";
import HttpService from "../../HttpService";
import { storeCust } from "../../redux/actions/mainAction";
import CommonAppbar from "../LayoutOp/CommonAppbar";
import swal2 from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { useHistory, Route } from "react-router-dom";

const processing =
  process.env.PUBLIC_URL + "/assets/images/Loader-Ellipsis-244px.gif";

export default function AuthorizerDashboard(props) {
  const { userRole, userCode, userId } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
    userCode: state.mainReducer.sesParamOpUserCode,
    userId: state.mainReducer.sesParamOpUserId,
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const [custList, setCustList] = useState([]);
  useEffect(() => {
    debugger;
    const dataPara = {
      UserCode: String(userCode),
      UserId: userId,
      CallStatus: 3,
    };
    console.log("Effect otp flag", dataPara);

    swal2.fire({
      title: "Processing...",
      text: "Please Wait",
      imageUrl: processing,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    HttpService.PostAjaxData(dataPara, "MainService/PendingAuthCustomers")
      .then((resp) => {
        swal2.close();
        let responseJSON = resp.data;
        console.log("PendingAuthCustomers res ", responseJSON);
        setCustList(responseJSON.PendingAuthCustList);
      })
      .catch((error) => {
        console.log(error, "Response Error!");
      });
  }, []);

  const onViewChange = (data) => {
    console.log("data ", data);
    dispatch(storeCust("pending_custId", data.CustId));
    history.push("/AuthorizerCk");
  };
  const columns = [
    {
      title: "REference Id",
      field: "CustId",
      cellStyle: {
        width: "5%",
      },
    },
    {
      title: "Customer No",
      field: "CustMobNo",
    },
    {
      title: "Name As Aadhar",
      field: "Name",
    },
    {
      title: "PAN",
      field: "PanNumber",
    },
    {
      title: "Maker",
      field: "Maker",
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

  return (
    <>
      <CommonAppbar userRole={userRole} />
      <Container maxWidth="lg">
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
            DASHBOARD
          </Grid>
        </Grid>
        <Box m={1} />
        {/* <Card
          variant="outlined"
          style={{ width: "100%", margin: "20px 1px 5px 1px" }}
        > */}
        <Paper elevation={3}>
          <MaterialTable
            style={{ width: "100%" }}
            title="Pending Customers"
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
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                title: "Action",
                tooltip: "Select",
                onModifyClick: (event) => {
                  onViewChange(event);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <>
                  <Tooltip title="Modify" placement="start-top">
                    <Box boxShadow={4}>
                      <Button
                        //color="primary"
                        size="small"
                        onClick={(event) =>
                          props.action.onModifyClick(props.data)
                        }
                        style={{
                          paddingLeft: "1.2rem",
                          paddingRight: "1.2rem",
                          background: "#673AB7",
                          color: "#fff",
                          borderRadius: "0em",
                        }}
                      >
                        Select
                      </Button>
                    </Box>
                  </Tooltip>
                </>
              ),
            }}
          />
        </Paper>
        {/* </Card> */}
      </Container>
    </>
  );
}
