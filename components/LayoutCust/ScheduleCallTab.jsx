import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabsField: {
    "& button": {
      minWidth: 30,
      minHeight: 10,
      background: "#fff",
      color: "#000",
    },

    // borderRadius: "50px",
  },
  tabField: {
    textTransform: "none",
    background: "#fff",
    color: "#000",
    "& button": {
      minWidth: 30,
      minHeight: 10,
    },
    fontWeight: theme.typography.fontWeightRegular,
  },
  // appbarArea: {
  //   // boxShadow: "none",
  //   //  borderRadius: "50px",
  //   minHeight: 10,
  // },
  paper: {
    padding: theme.spacing(0, 4, 3, 4),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
}));

export default function ScheduleCallTab(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // const [slot, setSlot] = useState({
  let morningSlot = [];
  let afternoonSlot = [];
  let eveningSlot = [];
  // });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect(() => {

  const mSlot = props.slotList.filter((x) => {
    return x.SlotSessionId === "1";
  });
  const aSlot = props.slotList.filter((x) => {
    return x.SlotSessionId === "2";
  });
  const eSlot = props.slotList.filter((x) => {
    return x.SlotSessionId === "3";
  });

  // setSlot({
  //     ...slot,
  (morningSlot = mSlot), (afternoonSlot = aSlot), (eveningSlot = eSlot);
  // })
  // },[]);

  console.log("Tab props ", props);
  debugger;
  return (
    <div className={classes.root}>
      <label style={{ fontSize: "0.9rem" }}>
        Available Slots for{" "}
        {props.slotList.length !== 0 ? props.slotList[0].SchSlotDate : ""}
      </label>
      <Grid
        container
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ width: "fit-content" }}
      >
        <AppBar position="static" className={classes.appbarArea}>
          <Tabs
            inkBarStyle={{ background: "#fff" }}
            className={classes.tabsField}
            value={value}
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              className={classes.tabField}
              label="Morning"
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tabField}
              label="Afternoon"
              {...a11yProps(1)}
            />
            <Tab
              className={classes.tabField}
              label="Pre-Evening"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
      </Grid>

      <TabPanel value={value} index={0}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          {morningSlot.map((option) => (
            <Grid item lg={2} md={2} sm={4} xs={6}>
              <BootstrapSwitchButton
                checked={false}
                size="lg"
                onlabel={`${option.SchSlotStartTime.substr(
                  0,
                  2
                )} : ${option.SchSlotStartTime.substr(2, 2)}`}
                offlabel={[
                  option.SchSlotStartTime.slice(0, 2),
                  ":",
                  option.SchSlotStartTime.slice(2),
                ].join("")}
                offstyle="info"
                value={option}
                onChange={(e) => props.handleSlotChange(e, option)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          {afternoonSlot.map((option) => (
            <Grid item lg={2} md={2} sm={4} xs={6}>
              <BootstrapSwitchButton
                checked={false}
                size="lg"
                onlabel={`${option.SchSlotStartTime.substr(
                  0,
                  2
                )} : ${option.SchSlotStartTime.substr(2, 2)}`}
                offlabel={[
                  option.SchSlotStartTime.slice(0, 2),
                  ":",
                  option.SchSlotStartTime.slice(2),
                ].join("")}
                offstyle="info"
                value={option}
                onChange={(e) => props.handleSlotChange(e, option)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          {eveningSlot.map((option) => (
            <Grid item lg={2} md={2} sm={4} xs={6}>
              <BootstrapSwitchButton
                checked={false}
                size="lg"
                onlabel={`${option.SchSlotStartTime.substr(
                  0,
                  2
                )} : ${option.SchSlotStartTime.substr(2, 2)}`}
                offlabel={[
                  option.SchSlotStartTime.slice(0, 2),
                  ":",
                  option.SchSlotStartTime.slice(2),
                ].join("")}
                offstyle="info"
                value={option}
                onChange={(e) => props.handleSlotChange(e, option)}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </div>
  );
}
