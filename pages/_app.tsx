import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Navbar from "components/Navbar";
import { Provider } from "next-auth/client";
import App, { AppProps, AppContext } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import queryClient from "utils/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import theme from "utils/theme";
import "./app.css";
import LayoutProvider from "contexts/Layout";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ showSpinner: true });

const handleRouteChange = (url) => {
  NProgress.start();
};

const handleRouteChangeComplete = (url) => {
  NProgress.done();
};

Router.events.on("routeChangeStart", handleRouteChange);
Router.events.on("routeChangeComplete", handleRouteChangeComplete);
Router.events.on("routeChangeError", handleRouteChangeComplete);

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
        <QueryClientProvider client={queryClient}>
          <Provider session={pageProps.session}>
            <LayoutProvider useLayout={pageProps.useLayout}>
              <Component {...pageProps} />
            </LayoutProvider>
          </Provider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitailProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
