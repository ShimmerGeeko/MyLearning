import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#556cd6',#673AB7
      main: "#673AB7",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    info: {
      main: "#fff",
      main: "#fff",
    },
  },
  overrides: {
    MuiTabs: {
      root: {
        background: "#fff",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        fontSize: "13px",
        whiteSpace: "nowrap",
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "14px",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "14px",
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: "14px",
        //color: "#aaa",
      },
    },
    MuiListItem: {
      root: {
        fontSize: "14px",
      },
    },

    MuiSelect: {
      select: {
        fontSize: "14px !important",
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "14px !important",
      },
    },
    MuiFormControlLabel:{
      label:{
        textAlign:"justify"
      }
    },
    
  },
});

export default theme;
