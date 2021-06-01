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
            {pageProps.header && <Navbar />}
            <Component {...pageProps} />
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
