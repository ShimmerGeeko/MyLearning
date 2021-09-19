import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PersonIcon from "@material-ui/icons/Person";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import  i18next from 'i18next';

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    fontWeight: "bold",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    fill: "#673AB7",
  },
  breadcrumbHeading: {
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(1),
    margin: theme.spacing(0, 2, 1, 2),
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs(props) {
  const classes = useStyles();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator=">"
      className={classes.breadcrumbHeading}
    >
      {/* <Link color="inherit" href="/" onClick={handleClick} className={classes.link}> */}
      {/* <Link color="inherit" href="/customer" className={classes.link}> */}
      <Link color="inherit" href="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
         {i18next.t('Home')}
      </Link>
      {/* {props.children} */}
      <Typography color="textSecondary" className={classes.link}>
        {props.bcBool.AO.display && (
          <>
            <AccountBalanceIcon className={classes.icon} />
             {i18next.t('AccountOpening')}
          </>
        )}
        {props.bcBool.BK.display && (
          <>
            <PersonIcon className={classes.icon} />
            {i18next.t('BasicVKYC')}
          </>
        )}
        {props.bcBool.CC.display && (
          <>
            <CreditCardIcon className={classes.icon} />
            {i18next.t('CreditCard')}
          </>
        )}
        {props.bcBool.RK.display && (
          <>
            <AccountCircleIcon className={classes.icon} />
            {i18next.t('ReKYC')}
          </>
        )}
      </Typography>
    </Breadcrumbs>
  );
}
