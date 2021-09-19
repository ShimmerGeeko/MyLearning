import React from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import i18next from "i18next";
import useAccountForm from "../common/css/useAccountForm";

export default function Steptwo(props) {
  const classes = useAccountForm();
  return (
    <>
      {" "}
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
              <FormControl
                className="formControl"
                error={props.stateval.stateError !== ""}
              >
                <InputLabel id="fstate">
                  {i18next.t("custFieldState")}
                </InputLabel>
                <Select
                  labelId="fstate"
                  id="fstate"
                  name="fstate"
                  fullWidth
                  value={props.stateval.fstate}
                  onChange={props.handleStateData}
                >
                  {props.stateval.stateList.map((option) => (
                    <MenuItem key={option.StateCode} value={option.StateCode}>
                      {option.StateName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {props.stateval.stateError !== ""
                    ? props.stateval.stateError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <FormControl
                className="formControl"
                error={props.stateval.cityError !== ""}
              >
                <InputLabel id="city">{i18next.t("custFieldCity")}</InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  name="city"
                  fullWidth
                  value={props.stateval.city}
                  onChange={props.handleChange}
                >
                  {props.stateval.stateCityList.map((option) => (
                    <MenuItem key={option.CityCode} value={option.CityCode}>
                      {option.CityName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {props.stateval.stateError !== ""
                    ? props.stateval.stateError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="district"
                label={i18next.t("custFieldDistrict")}
                fullWidth
                name="district"
                value={props.stateval.district}
                onChange={props.handleChange}
                error={props.stateval.districtError !== ""}
                helperText={
                  props.stateval.districtError !== ""
                    ? props.stateval.districtError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="house"
                label={i18next.t("custFieldHome")}
                fullWidth
                name="house"
                value={props.stateval.house}
                onChange={props.handleChange}
                error={props.stateval.houseError !== ""}
                helperText={
                  props.stateval.houseError !== ""
                    ? props.stateval.houseError
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="locality"
                label={i18next.t("custFieldArea")}
                fullWidth
                name="locality"
                value={props.stateval.locality}
                onChange={props.handleChange}
                error={props.stateval.localityError !== ""}
                helperText={
                  props.stateval.localityError !== ""
                    ? props.stateval.localityError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="landmark"
                label={i18next.t("custFieldLandMark")}
                fullWidth
                name="landmark"
                value={props.stateval.landmark}
                onChange={props.handleChange}
                error={props.stateval.landmarkError !== ""}
                helperText={
                  props.stateval.landmarkError !== ""
                    ? props.stateval.landmarkError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="pincode"
                label={i18next.t("custFieldPincode")}
                fullWidth
                name="pincode"
                inputProps={{ maxLength: 6 }}
                value={props.stateval.pincode}
                onChange={props.handleNumberChange}
                onBlur={props.handlePincodeChange}
                error={props.stateval.pincodeError !== ""}
                helperText={
                  props.stateval.pincodeError !== ""
                    ? props.stateval.pincodeError
                    : ""
                }
              />
            </Grid>
          </Grid>

          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "4px" }}
                onClick={() => props.NextStep(1)}
              >
                {i18next.t("btnPrevious")}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "4px" }}
                onClick={() => props.NextStep(3)}
              >
                {i18next.t("btnNextNew")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
