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
  IconButton,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import i18next from "i18next";
import useAccountForm from "../common/css/useAccountForm";

export default function Stepone(props) {
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
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <FormControl
                className="formControl"
                error={props.stateval.productTypeError !== ""}
              >
                <InputLabel id="productType">
                  {i18next.t("custFieldProductType")}
                </InputLabel>
                <Select
                  labelId="productType"
                  id="productType"
                  name="productType"
                  fullWidth
                  disabled={props.stateval.jointrefFlag === "Y" ? true : false}
                  value={props.stateval.productType}
                  onChange={props.handleChange}
                >
                  <MenuItem value="SAVINGS">SAVINGS ACCOUNT</MenuItem>
                  <MenuItem value="CURRENT">CURRENT ACCOUNT</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.productTypeError !== ""
                    ? props.stateval.productTypeError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <FormControl
                className="formControl"
                error={props.stateval.accTypeError !== ""}
              >
                <InputLabel id="accType">
                  {i18next.t("custFieldAccountType")}
                </InputLabel>
                <Select
                  labelId="accType"
                  id="accType"
                  fullWidth
                  name="accType"
                  value={props.stateval.accType}
                  disabled={props.stateval.jointrefFlag === "Y" ? true : false}
                  onChange={props.handleAccTypeChange}
                >
                  <MenuItem value="1">NORMAL</MenuItem>
                  <MenuItem value="2">SENIOR CITIZEN</MenuItem>
                  <MenuItem value="3">MINOR</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.accTypeError !== ""
                    ? props.stateval.accTypeError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl
                className="formControl"
                error={props.stateval.modeofOperationError !== ""}
              >
                <InputLabel id="modeofOperation">
                  {i18next.t("custFieldModeOfOperation")}
                </InputLabel>
                <Select
                  labelId="modeofOperation"
                  id="modeofOperation"
                  fullWidth
                  name="modeofOperation"
                  disabled={props.stateval.jointrefFlag === "Y" ? true : false}
                  value={props.stateval.modeofOperation}
                  onChange={props.mopOnchange}
                >
                  {props.stateval.modeofOperationList
                    ? props.stateval.modeofOperationList.map((e, key) => {
                        return (
                          <MenuItem key={key} value={e.key}>
                            {e.value}
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
                <FormHelperText>
                  {props.stateval.modeofOperationError !== ""
                    ? props.stateval.modeofOperationError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl
                className="formControl"
                error={props.stateval.tdsError !== ""}
              >
                <InputLabel id="tds">{i18next.t("custFieldTds")}</InputLabel>
                <Select
                  labelId="tds"
                  id="tds"
                  name="tds"
                  fullWidth
                  value={props.stateval.tds}
                  disabled={props.stateval.jointrefFlag === "Y" ? true : false}
                  onChange={props.handleChange}
                >
                  <MenuItem value="N">NO</MenuItem>
                  <MenuItem value="Y">YES</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.tdsError !== ""
                    ? props.stateval.tdsError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl
                className="formControl"
                error={props.stateval.custTitleError !== ""}
              >
                <InputLabel id="custTitle">
                  {i18next.t("custFieldTitle")}
                </InputLabel>
                <Select
                  labelId="custTitle"
                  id="custTitle"
                  fullWidth
                  name="custTitle"
                  value={props.stateval.custTitle}
                  onChange={props.handleChange}
                >
                  <MenuItem value="Mr">Mr.</MenuItem>
                  <MenuItem value="Miss">Miss.</MenuItem>
                  <MenuItem value="Mrs">Mrs.</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.custTitleError !== ""
                    ? props.stateval.custTitleError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}>
              <TextField
                id="accholderName"
                label={i18next.t("custFieldNameNewAccount")}
                name="accholderName"
                fullWidth
                value={props.stateval.accholderName}
                onChange={props.handleChange}
                error={props.stateval.accholderNameError !== ""}
                helperText={
                  props.stateval.accholderNameError !== ""
                    ? props.stateval.accholderNameError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="fName"
                label={i18next.t("custFieldFather")}
                name="fName"
                fullWidth
                value={props.stateval.fName}
                onChange={props.handleChange}
                error={props.stateval.fNameError !== ""}
                helperText={
                  props.stateval.fNameError !== ""
                    ? props.stateval.fNameError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="mName"
                label={i18next.t("custFieldMother")}
                name="mName"
                fullWidth
                value={props.stateval.mName}
                onChange={props.handleChange}
                error={props.stateval.mNameError !== ""}
                helperText={
                  props.stateval.mNameError !== ""
                    ? props.stateval.mNameError
                    : ""
                }
              />
            </Grid>
            {props.stateval.accType !== "3" ? (
              <Grid item xs={12} sm={6} md={2} xl={2}>
                <FormControl
                  className="formControl"
                  error={props.stateval.maritalStatusError !== ""}
                >
                  <InputLabel id="maritalStatus">
                    {i18next.t("custFieldMaritalStatus")}
                  </InputLabel>
                  <Select
                    labelId="maritalStatus"
                    id="maritalStatus"
                    name="maritalStatus"
                    fullWidth
                    value={props.stateval.maritalStatus}
                    onChange={props.handleChange}
                  >
                    <MenuItem value="S">Single</MenuItem>
                    <MenuItem value="M">Married</MenuItem>
                  </Select>
                  <FormHelperText>
                    {props.stateval.maritalStatusError !== ""
                      ? props.stateval.maritalStatusError
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl
                className="formControl"
                error={props.stateval.genderError !== ""}
              >
                <InputLabel id="gender">
                  {i18next.t("custFieldGender")}
                </InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  fullWidth
                  value={props.stateval.gender}
                  onChange={props.handleChange}
                >
                  <MenuItem value="M">MALE</MenuItem>
                  <MenuItem value="F">FEMALE</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.genderError !== ""
                    ? props.stateval.genderError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <TextField
                id="date"
                label={i18next.t("custFieldDob")}
                fullWidth
                type="date"
                onChange={props.handleChange}
                value={props.stateval.fdate}
                name="fdate"
                InputLabelProps={{
                  shrink: true,
                }}
                error={props.stateval.fdateError !== ""}
                helperText={
                  props.stateval.fdateError !== ""
                    ? props.stateval.fdateError
                    : ""
                }
              />
            </Grid>
            {props.stateval.accType == "3" ? (
              <>
                <Grid item xs={12} sm={6} md={3} xl={3}>
                  <TextField
                    id="date"
                    label={i18next.t("custFieldMinorDOB")}
                    type="date"
                    onChange={props.handleChange}
                    fullWidth
                    value={props.stateval.minorDate}
                    name="minorDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={props.stateval.minorDateError !== ""}
                    helperText={
                      props.stateval.minorDateError !== ""
                        ? props.stateval.minorDateError
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3} xl={3}>
                  <TextField
                    id="gardianName"
                    label={i18next.t("custFieldGuardianName")}
                    fullWidth
                    name="gardianName"
                    value={props.stateval.gardianName}
                    onChange={props.handleChange}
                    error={props.stateval.gardianNameEror !== ""}
                    helperText={
                      props.stateval.gardianNameEror !== ""
                        ? props.stateval.gardianNameEror
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} xl={3}>
                  <TextField
                    id="gardianRel"
                    label={i18next.t("custFieldGuardianRelation")}
                    fullWidth
                    name="gardianRel"
                    value={props.stateval.gardianRel}
                    onChange={props.handleChange}
                    error={props.stateval.gardianRelError !== ""}
                    helperText={
                      props.stateval.gardianRelError !== ""
                        ? props.stateval.gardianRelError
                        : ""
                    }
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={6} md={3} xl={3}>
                <FormControl
                  className="formControl"
                  error={props.stateval.politicallyExposedError !== ""}
                >
                  <InputLabel id="politicallyExposed">
                    {i18next.t("custFieldPolitics")}
                  </InputLabel>
                  <Select
                    labelId="politicallyExposed"
                    id="demo-simple-select"
                    fullWidth
                    name="politicallyExposed"
                    value={props.stateval.politicallyExposed}
                    onChange={props.handleChange}
                  >
                    <MenuItem value="N">NO</MenuItem>
                    <MenuItem value="Y">YES</MenuItem>
                  </Select>
                  <FormHelperText>
                    {props.stateval.politicallyExposedError !== ""
                      ? props.stateval.politicallyExposedError
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <TextField
                id="email"
                label={i18next.t("custFieldEmail")}
                name="email"
                fullWidth
                value={props.stateval.email}
                onChange={props.handleChange}
                onBlur={props.handleEmailChange}
                error={props.stateval.emailError !== ""}
                helperText={
                  props.stateval.emailError !== ""
                    ? props.stateval.emailError
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <TextField
                id="panNo"
                label={i18next.t("custFieldPanCard")}
                fullWidth
                name="panNo"
                value={props.stateval.panNo}
                onChange={props.handleChange}
                onBlur={props.checkPanFormat}
                error={props.stateval.panNoError !== ""}
                helperText={
                  props.stateval.panNoError !== ""
                    ? props.stateval.panNoError
                    : ""
                }
              />
            </Grid>
            {props.stateval.accType !== "3" ? (
              <>
                <Grid item xs={12} sm={6} md={2} xl={2}>
                  <TextField
                    id="annualIncome"
                    label={i18next.t("custFieldIncome")}
                    fullWidth
                    name="annualIncome"
                    value={props.stateval.annualIncome}
                    onChange={props.handleNumberChange}
                    error={props.stateval.annualIncomeError !== ""}
                    helperText={
                      props.stateval.annualIncomeError !== ""
                        ? props.stateval.annualIncomeError
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={2} xl={2}>
                  <TextField
                    id="occupation"
                    label={i18next.t("custFieldBusiness")}
                    fullWidth
                    name="occupation"
                    value={props.stateval.occupation}
                    onChange={props.handleStringChange}
                    error={props.stateval.occupationError !== ""}
                    helperText={
                      props.stateval.occupationError !== ""
                        ? props.stateval.occupationError
                        : ""
                    }
                  />
                </Grid>
              </>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <FormControl
                className="formControl"
                error={props.stateval.nomineeError !== ""}
              >
                <InputLabel id="nominee">
                  {i18next.t("custFieldNominee")}
                </InputLabel>
                <Select
                  labelId="nominee"
                  id="demo-simple-select"
                  fullWidth
                  name="nominee"
                  disabled={props.stateval.jointrefFlag === "Y" ? true : false}
                  value={props.stateval.nominee}
                  onChange={props.handleChange}
                >
                  <MenuItem value="N">NO</MenuItem>
                  <MenuItem value="Y">YES</MenuItem>
                </Select>
                <FormHelperText>
                  {props.stateval.nomineeError !== ""
                    ? props.stateval.nomineeError
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            {props.stateval.addfieldFlag ? (
              <>
                <Grid
                  container
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  justift="flex-start"
                  className="gridItemSppacing"
                >
                  <Button
                    variant="contained"
                    // color="primary"
                    style={{ margin: "4px 0px", backgroundColor: "#fff" }}
                    startIcon={<PersonAddIcon />}
                    onClick={props.handleAddFields}
                  >
                    {i18next.t("btnAddJointCustomer")}
                  </Button>
                </Grid>
                {props.stateval.inputFields.map((inputField, id) => (
                  <Grid
                    container
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    spacing={2}
                    style={{ width: "100%" }}
                  >
                    <Grid item xs={12} sm={6} md={3} xl={3}>
                      <TextField
                        id={id}
                        label={i18next.t("custFielJointCustName")}
                        fullWidth
                        name="jointCustName"
                        value={inputField.jointCustName}
                        onChange={(event) =>
                          props.handleChangeCustname(inputField.id, event)
                        }
                      />
                    </Grid>
                    <Grid item xs={10} sm={5} md={3} xl={3}>
                      <TextField
                        id="jointCustMob"
                        label={i18next.t("custFielJointCustMobile")}
                        fullWidth
                        name="jointCustMob"
                        value={inputField.jointCustMob}
                        onChange={(event) =>
                          props.handleChangeInput(inputField.id, event)
                        }
                      />
                    </Grid>
                    <Grid item xs={2} sm={1} md={1}>
                      <IconButton
                        disabled={props.stateval.inputFields.length === 1}
                        onClick={() => props.handleRemoveFields(inputField.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                    {/* <Grid item lg={1} md={1} sm={2} xs={2}>
                      <IconButton onClick={props.handleAddFields}>
                        <AddIcon />
                      </IconButton>
                    </Grid> */}
                  </Grid>
                ))}
              </>
            ) : (
              ""
            )}
          </Grid>
          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" className="commonButton" disabled>
                Previous
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                className="commonButton"
                color="primary"
                onClick={() => props.NextStep(2)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
