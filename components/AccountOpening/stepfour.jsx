import React from "react";
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
import useAccountForm from "../common/css/useAccountForm";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import i18next from "i18next";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function Stepfour(props) {
  const classes = useAccountForm();
  const matchesMd = useMediaQuery("(min-width:450px)");
  return (
    <>
      <div className={classes.paper}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="formContainer"
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="aadharCode"
                label={i18next.t("custFieldAAdharCard")}
                fullWidth
                name="aadharCode"
                value={props.stateval.aadharCode}
                onChange={props.handleChange}
                error={props.stateval.aadharCodeError !== ""}
                helperText={
                  props.stateval.aadharCodeError !== ""
                    ? props.stateval.aadharCodeError
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <Box m={1} />
              <Box ml={1} style={{ color: "#555555" }}>
                {props.stateval.fileName}
              </Box>
              <label htmlFor="icon-button-file" style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  {i18next.t("custFieldAAdharFile")}
                </Button>
              </label>
              <input
                name="AadhaarFile"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                accept=".zip"
                onChange={props.handleFileChange}
              />
              <FormHelperText style={{ color: "red" }}>
                {props.stateval.aadharFileError !== ""
                  ? props.stateval.aadharFileError
                  : ""}
              </FormHelperText>
              <Grid container style={{ marginTop: "8px" }}></Grid>
            </Grid>
            <Box m={1} />
            <Grid
              container
              direction={matchesMd ? "row" : "column"}
              spacing={1}
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.stateval.checkATM}
                      onChange={props.handleCBChange}
                      name="checkATM"
                      color="primary"
                    />
                  }
                  label={i18next.t("custFieldATMCard")}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.stateval.checkCB}
                      onChange={props.handleCBChange}
                      name="checkCB"
                      color="primary"
                    />
                  }
                  label={i18next.t("custFieldChequeBook")}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.stateval.checkIB}
                      onChange={props.handleCBChange}
                      name="checkIB"
                      color="primary"
                    />
                  }
                  label={i18next.t("custFieldInternetBank")}
                />
              </Grid>
            </Grid>
            <Box m={1} />

            <Grid
              container
              direction="column"
              lg={12}
              md={12}
              sm={12}
              xs={12}
              justify="flex-start"
              alignItems="flex-start"
              // className="gridItemSppacing"
            >
              <Grid item>
                <b>
                  <span style={{ fontWeight: "400" }}>
                    {i18next.t("custFieldOffLineAadhar")}
                  </span>
                  <i>
                    <a
                      href="https://resident.uidai.gov.in/offline-kyc"
                      target="_blank"
                    >
                      https://resident.uidai.gov.in/offline-kyc
                    </a>
                  </i>
                </b>
              </Grid>
            </Grid>
            <Box m={1} />
          </Grid>

          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "4px" }}
                onClick={() => props.NextStep(3)}
              >
                {i18next.t("btnPrevious")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "4px" }}
                onClick={props.onFormSubmit}
              >
                {i18next.t("btnSubmit")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
