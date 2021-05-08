import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Navbar from "components/Navbar";
import App, { AppProps, AppContext } from "next/app";
import { useEffect } from "react";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const MyApp = ({ Component, pageProps }: AppProps) => {
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
        {pageProps.header && <Navbar />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

MyApp.getInitailProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
