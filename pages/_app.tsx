import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core";
import { useEffect } from "react";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
