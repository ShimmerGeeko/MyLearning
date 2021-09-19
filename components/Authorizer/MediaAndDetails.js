import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, Box } from "@material-ui/core";
import useTabFormStyles from "../common/css/useTabFromStyles";
import PhoneImg from "../../Images/bg_Landing1.png";

function MediaAndDetails() {
  const classes = useTabFormStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        //justify="center"
        //alignItems="center"
        spacing={2}
      >
        {/* 1st container starts */}
        <Grid item xs={12} sm={12} md={4}>
          <Grid
            container
            direction="column"
            // justify="flex-start"
            //alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        {/* 1st container ends */}
        {/* 2nd container starts */}
        <Grid item xs={12} sm={12} md={4}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Box border={1} p={1}>
                    <img src={PhoneImg} className={classes.imageSty} />
                  </Box>
                </Grid>
                <Grid item>ddd</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Box border={1} p={1}>
                    <img src={PhoneImg} className={classes.imageStyTwo} />
                  </Box>
                </Grid>
                <Grid item>ddd</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Box border={1} p={1}>
                    <img src={PhoneImg} className={classes.imageSty} />
                  </Box>
                </Grid>
                <Grid item>ddd</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Box border={1} p={1}>
                    <img src={PhoneImg} className={classes.imageSty} />
                  </Box>
                </Grid>
                <Grid item>ddd</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* 2nd container ends */}
        {/* 3rd container starts */}
        <Grid item xs={12} sm={12} md={4}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              {" "}
              <Box border={1} p={1}>
                <img src={PhoneImg} className={classes.imageStyThree} />
              </Box>
            </Grid>
            <Grid item>ddd</Grid>
          </Grid>
        </Grid>
        {/* 3rd container ends */}
      </Grid>
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

export default MediaAndDetails;
