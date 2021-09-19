import { makeStyles } from "@material-ui/core/styles";

const useAccountForm = makeStyles((theme) => ({
  paper: {
    // padding: theme.spacing(3, 6),
    padding: theme.spacing(0, 2, 2, 2),
    // justify: "center",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "column",
    //alignItems: "center",
    //textAlign: "center",
    width: "100%",

    // Fix IE 11 issue.
  },
}));

export default useAccountForm;
