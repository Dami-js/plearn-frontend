import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
    default: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    default: PaletteOptions["primary"];
  }
}

let theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#0056d2",
    },
    default: {
      main: grey[900],
      light: grey[800],
      dark: grey[50],
    },
    neutral: {
      main: "#5c6ac4",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
