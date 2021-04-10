import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
//const arcGrey = "#868686";
const progress1 = "#92b41f";
const progress2 = "#fa9d2e";

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      green: progress1,
      orange: progress2,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },

  typography: {
    fontWeight: 100,
  },
});
