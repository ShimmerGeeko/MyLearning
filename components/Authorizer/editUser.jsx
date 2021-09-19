import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Tooltip, Switch, IconButton } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CommonAppbar from "../LayoutOp/CommonAppbar";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import CsvDownload from "react-json-to-csv";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import TechImg from "../../Images/bg_Landing1.png";

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
  modalPaper: {
    position: "absolute",
    width: 400,
    padding: theme.spacing(2, 4, 3),
  },

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

export default function CreteUser() {
  const classes = useStyles();
  const { userRole } = useSelector((state) => ({
    userRole: state.mainReducer.sesParamOpUserRole,
  }));
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [tabledata, setTabledata] = React.useState([]);
  const doc = new jsPDF();

  const handleClose = () => {
    setOpen(false);
  };
  function getModalStyle() {
    return {
      padding: "10px",
      width: "80%",
      height: "auto",
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }

  const body = (
    <>
      <div style={modalStyle} className={classes.modalPaper}>
        <Container component="main" maxWidth="md">
          <Paper elevation={3}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Edit User
              </Typography>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    defaultValue={tabledata.email || " "}
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    margin="normal"
                    defaultValue={tabledata.name || " "}
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
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
                    defaultValue={tabledata.surname || " "}
                    required
                    fullWidth
                    name="surname"
                    label="surname"
                    type="surname"
                    id="surname"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    margin="normal"
                    defaultValue={tabledata.place || " "}
                    required
                    fullWidth
                    name="place"
                    label="place"
                    type="place"
                    id="place"
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
                  // alignItems="center"
                  spacing={2}
                >
                  <Grid item md={6} xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.buttonArea}
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
      </div>
    </>
  );
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Last Name", field: "surname" },
      { title: "Email", field: "email" },
      { title: "Place", field: "place" },
    ],
    data: [
      {
        name: "Ahmed",
        surname: "Tomi",
        email: "ah@smthing.co.com",
        place: "Mumbai",
      },
      {
        name: "Raed",
        surname: "Labes",
        email: "rl@smthing.co.com",
        place: "Mumbai",
      },
      {
        name: "Yezzi",
        surname: "Min l3b",
        email: "ymin@cocococo.com",
        place: "Mumbai",
      },
    ],
  });
  const headers = [
    { label: "First Name", key: "name" },
    { label: "Last Name", key: "surname" },
    { label: "Email", key: "email" },
    { label: "Place", key: "place" },
  ];

  const data = [
    {
      name: "Ahmed",
      surname: "Tomi",
      email: "ah@smthing.co.com",
      place: "Mumbai",
    },
    {
      name: "Raed",
      surname: "Labes",
      email: "rl@smthing.co.com",
      place: "Mumbai",
    },
    {
      name: "Yezzi",
      surname: "Min l3b",
      email: "ymin@cocococo.com",
      place: "Mumbai",
    },
  ];
  const onViewChange = (data) => {
    const marginLeft = 90;
    doc.setFontSize(15);
    const title = "Report Card";
    const headers = [["NAME", "SURNAME", "EMAIL", "PLACE"]];
    const newdata = [[data.name, data.surname, data.email, data.place]];
    var img = new Image();
    img.src = TechImg;
    doc.addImage(img, "png", 10, 5, 15, 15);

    let content = {
      startY: 20,
      head: headers,
      body: newdata,
    };

    doc.text(title, marginLeft, 10);
    doc.autoTable(content);

    // doc.text("Hello world!", 10, 10);
    // doc.text("Hello world!", 45, 10);
    // doc.text("Hello world!", 80, 10);
    // doc.text("Hello world!", 115, 10);

    // doc.text("Hello world!", 10, 20);
    // doc.text("Hello world!", 45, 20);
    // doc.text("Hello world!", 80, 20);
    // doc.text("Hello world!", 115, 20);

    debugger;
    doc.save("a4.pdf");

    // setTabledata(data);
    // //modal open+popul
    // setOpen(true);
    // console.log("onViewChange ", data);
  };

  // const exportToCSV = (csvData, fileName) => {
  //   debugger;
  //   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // const fileExtension = '.xlsx';
  // debugger;
  //     const ws = XLSX.utils.json_to_sheet(csvData);
  //    debugger;
  //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //      debugger;
  //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //      debugger;
  //     const data = new Blob([excelBuffer], {type: fileType});
  //      debugger;
  //     FileSaver.saveAs(data, fileName + fileExtension);
  //      debugger;
  // }

  return (
    <>
      <CommonAppbar userRole={userRole} />

      <Container maxWidth="lg">
        <Box display="flex" p={1} className="inquire-table-card">
          <Box flexGrow={1}>
            <Typography variant="h5" noWrap className="inqurire-table-title">
              Edit User
            </Typography>
          </Box>
          <Box alignSelf="center">
            {/* <RefreshIcon onClick={getChannelList} /> */}
          </Box>
        </Box>

        {/* <Table
        data={userList}
        columns={state.columns}
        deleteHandler={deleteHandler}
        onViewChange={onViewChange}
      /> */}
        <Paper elevation={3}>
          <MaterialTable
            style={{ width: "100%" }}
            // title={props.title}
            data={state.data}
            columns={state.columns}
            options={{
              pageSizeOptions: [5, 10],
              search: true,
              filtering: true,
              showTitle: false,
              toolbar: false,

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
                  {/* <CSVLink data={[props.data]} filename={`${props.data.name}.csv`} headers={headers}>
                  Download
                </CSVLink> */}
                  <Tooltip title="Modify" placement="start-top">
                    <IconButton
                      onClick={(event) =>
                        props.action.onModifyClick(props.data)
                      }
                      style={{ padding: "unset" }}
                    >
                      <SaveIcon style={{ margin: "8px 12px" }} title="Update" />
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }}
          />
        </Paper>
        {/* <MaterialTable
     
          columns={[
            { title: 'name', field: 'name' },
            { title: 'surname', field: 'surname' },
            { title: 'birthYear', field: 'birthYear' },
            { title: 'birthYear', field: 'birthYear', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
          options={{
          pageSizeOptions: [5, 10],
          search: true,
          filtering: true,
          showTitle: false,
          toolbar: false,

          paging: true,
          pageSize: 5,
          rowStyle: {
            backgroundColor: "#fff",
          },

          actionsColumnIndex: -1,
        }}
        
          actions={[
    {
      icon: 'save',
      tooltip: 'Save User',
      onClick: (event, rowData) => {
        const fileName ="123";
        // <CsvDownload data={rowData} />
         //exportToCSV(Object.keys(rowData),fileName);
        console.log(rowData)
         // setOpen(true);
        // Do save operation
      }
    }
  ]}
          // title="Demo Title"
        /> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Container>
    </>
  );
}
