import { Grid } from '@material-ui/core';
import React from 'react';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function InternetSpeed(props) {
    return (
        <Grid container lg={12}>
            Speed:{props.upLink}
            <ArrowUpwardIcon />
            {props.downLink}
            <ArrowDownwardIcon /> KB/s
        </Grid>
    )
}