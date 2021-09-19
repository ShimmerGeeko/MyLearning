import React from "react";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import  i18next from 'i18next';
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme();

theme.typography.h1 = {
    fontSize: '1.1rem',
    '@media (min-width:400px)': {
        fontSize: '1.1rem',
    },
    '@media (min-width:600px)': {
        fontSize: '1.3rem',
    },
    '@media (min-width:800px)': {
        fontSize: '1.44rem',
    },
    '@media (min-width:1000px)': {
        fontSize: '1.55rem',
    },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2rem',
//   },
}

theme.typography.h3 = {
    fontSize: '0.9rem',
    '@media (min-width:400px)': {
      fontSize: '0.9rem',
    },
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
    '@media (min-width:800px)': {
      fontSize: '1.2rem',
    },
    '@media (min-width:1000px)': {
      fontSize: '1.3rem',
    },
}

theme.typography.h4 = {
    fontSize: '0.85rem',
    '@media (min-width:400px)': {
      fontSize: '0.85rem',
    },
    '@media (min-width:600px)': {
      fontSize: '0.95rem',
    },
    '@media (min-width:800px)': {
      fontSize: '1.05rem',
    },
    '@media (min-width:1000px)': {
      fontSize: '1.05rem',
    },
}


const useStyles = makeStyles((theme) => ({
    instructionText: {
        color: "#555555",
        fontWeight: "800",
        textAlign:"center"
      },
}));

export default function CustInstruction_1() {
    const classes = useStyles();
    
    return (
        <ThemeProvider theme={theme}>
        <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
  spacing={1}
>
<Grid item xs={12}>
 <Typography component="h1" variant="h1" gutterBottom className={classes.instructionText}> {i18next.t('CustHeading_1')}</Typography>
</Grid>
<Grid item xs={12}>
            <Typography component="h3" variant="h3" gutterBottom className={classes.instructionText}> {i18next.t('CustHeading_2')}</Typography>

</Grid>
<Grid item xs={12}>
            <Typography component="h4" variant="h4" className={classes.instructionText}> {i18next.t('CustHeading_3')}</Typography>

</Grid>
</Grid>
           
        </ThemeProvider>
    )
}