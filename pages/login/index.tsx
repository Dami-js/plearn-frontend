import {
  AppBar,
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { createPost, fetchTodos } from "pages/api/queries";
import { useRouter } from "next/router";
import Alert from "components/Alert";
import LoginForm from "components/LoginForms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "90vh",
      padding: theme.spacing(2),
    },
    formArea: {
      width: "100%",
    },
    tab: {
      width: "50%",
    },
    appBar: {
      border: "none",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingY={3}>
          <div>{children}</div>
          <Box textAlign="center" marginY={3}>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </Box>
        </Box>
      )}
    </div>
  );
}

const Login = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(true);
  const { query } = useRouter();

  return (
    <div className={classes.root}>
      {query.error && query.error == "CredentialsSignin" && (
        <Alert severity="error" open={open} onClose={() => setOpen(false)}>
          Incorrect login details
        </Alert>
      )}
      {query.reg && query.reg == "success" && (
        <Alert open={open} onClose={() => setOpen(false)}>
          Registration successful! Please login.
        </Alert>
      )}
      <Box mb={3}>
        <Typography variant="h4">Login</Typography>
      </Box>
      <Grid container justify="center">
        <Grid item md={3}>
          <div className={classes.formArea}>
            <AppBar
              className={classes.appBar}
              position="static"
              variant="outlined"
              color="transparent"
            >
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={value}
                onChange={handleChange}
              >
                <Tab className={classes.tab} label="Lecturer" />
                <Tab className={classes.tab} label="Student" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <LoginForm isStudent />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
