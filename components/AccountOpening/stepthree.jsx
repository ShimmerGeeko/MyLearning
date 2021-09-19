import React from "react";
import { connect } from "react-redux";
import StepTwo from "./steptwo";
import StepThree from "./stepthree";
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
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import { trackPromise } from "react-promise-tracker";

import HttpService from "../../HttpService";
import RemoveIcon from "@material-ui/icons/Remove";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles, ThemeProviderProps } from "@material-ui/core/styles";
import Copyright from "../common/Copyright";
import LayoutCust from "../LayoutCust/LayoutCust";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import { storeCust } from "../../redux/actions/mainAction";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, Redirect } from "react-router-dom";
import swal from "sweetalert";
import CustBreadcrumb from "../common/CustBreadcrumb";
import { NavLink } from "react-router-dom";
import  i18next from 'i18next';
import useAccountForm from '../common/css/useAccountForm';

export default function Stepthree(props) {
   const classes = useAccountForm();
  return (
    <> <div className={classes.paper}>
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
     
         
            {props.stateval.nomineeFields.map((inputField) => (
            <>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={12}
                >
                  <FormControl className="formControl">
                    <InputLabel id="NomineeTitle">{i18next.t('custFieldNomineeTitle')}</InputLabel>
                    <Select
                      labelId="NomineeTitle"
                      id="NomineeTitle"
                      name="NomineeTitle"
                      fullWidth
                      value={inputField.NomineeTitle}
                      disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                      onChange={(event) =>
                        props.handleNomineeChangeInput(inputField.id, event)
                      }
                    >
                      <MenuItem value="Mr">Mr.</MenuItem>
                      <MenuItem value="Miss">Miss.</MenuItem>
                      <MenuItem value="Mrs">Mrs.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  xs={12}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                >
                  <TextField
                    id="NomineeName"
                    label={i18next.t('custFieldNomineeName')}
                    fullWidth
                    name="NomineeName"
                    value={inputField.NomineeName}
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={12}
                >
                  <TextField
                    id="NomineeRltn"
                    label={i18next.t('custFieldNomineeRelation')}
                    fullWidth
                    name="NomineeRltn"
                    value={inputField.NomineeRltn}
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={12}
                >
                  <TextField
                    id="NomineeDob"
                    label={i18next.t('custFieldNomineeDob')}
                    fullWidth
                    type="date"
                    onChange={props.handleChange}
                    value={inputField.NomineeDob}
                    name="NomineeDob"
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  xs={12}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                >
                  <TextField
                    label={i18next.t('custFieldNomineeRAdress1')}
                    fullWidth
                    name="NomineeAdd1"
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    value={inputField.NomineeAdd1}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={12}
                >
                  <TextField
                    label={i18next.t('custFieldNomineeRAdress2')}
                    fullWidth
                    name="NomineeAdd2"
                    value={inputField.NomineeAdd2}
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={3}
                  sm={6}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={12}
                >
                  <TextField
                    label={i18next.t('custFieldNomineeRAdress3')}
                    fullWidth
                    name="NomineeAdd3"
                    value={inputField.NomineeAdd3}
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                    onChange={(event) =>
                      props.handleNomineeChangeInput(inputField.id, event)
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={1}
                  sm={2}
                  xs={2}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                >
                  <IconButton
                    disabled={props.stateval.nomineeFields.length === 1}
                    onClick={() =>
                      props.handleRemoveNomineeFields(inputField.id)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={1}
                  sm={2}
                  style={{
                    cursor: props.stateval.nominee === "Y" ? "" : "no-drop",
                  }}
                  xs={2}
                >
                  <IconButton
                    onClick={props.handleAddNomineeFields}
                    disabled={props.stateval.jointrefFlag === "Y" ? true : props.stateval.nominee === "Y" ? false : true}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </>
            ))}
        </Grid>
      
        <Grid container item justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "4px" }}
              onClick={() => props.NextStep(2)}
            >
              {i18next.t('btnPrevious')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "4px" }}
              onClick={() => props.NextStep(4)}
            >
              {i18next.t('btnNextNew')}
            </Button>
          </Grid>
        </Grid>
     </Grid>
                </div>
    </>
  );
}
