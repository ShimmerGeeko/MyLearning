import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button } from "@material-ui/core";
import useTabFormStyles from "../common/css/useTabFromStyles";

function BasicDetails() {
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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

export default BasicDetails;
