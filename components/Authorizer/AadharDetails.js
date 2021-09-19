import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, Box } from "@material-ui/core";
import useTabFormStyles from "../common/css/useTabFromStyles";
import PhoneImg from "../../Images/bg_Landing1.png";
function AadharDetails() {
  const classes = useTabFormStyles();
  return (
    <>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Box border={1} p={1}>
                <img src={PhoneImg} className={classes.imageSty} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box m={1} />
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="primary">
            Accept
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="primary">
            Reject
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="primary">
            Hold
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AadharDetails;
