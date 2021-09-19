import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Copyright from '../common/Copyright';
//import Content from '../common/Content';
import LayoutCust from './LayoutCust';
import CustInstruction_1 from './CustInstruction_1';

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
    paddingBottom: theme.spacing(1)
  },
  headingDivider: {
    borderWidth: "1px",
    borderColor: "#673AB7"
  },
  paper: {
    margin: theme.spacing(3, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
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

//export function LayoutCust({ loggedIn, logout, login }) {
export default function CustHome() {
  const classes = useStyles();

  return (
    <LayoutCust>
      <Grid container justify="center">
        <Grid container
          item
          xs={12}
          sm={10}
          md={8}
          lg={8}
          component={Paper}
          direction="row"
          elevation={6}
          square
        // alignItems="center"
        // justify="center"
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography component="h2" variant="h6" className={classes.contentHeading}>
              Instructions
              </Typography>
            <Divider variant="middle" className={classes.headingDivider} />
          </Grid>
          <Grid className={classes.paper}>
            <CustInstruction_1 />
            <Grid item>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              //   onClick={login}
              >
                CONTINUE
                </Button>
                </Grid>
            <Box mt={3}>
              <Copyright />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </LayoutCust>
  );
}

