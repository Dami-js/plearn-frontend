import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Theme,
  Typography,
  useTheme,
  Grid,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import RegistrationForm from "components/RegistrationForm";

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
            <Link href="/login">
              <Button>Login</Button>
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

  return (
    <div className={classes.root}>
      <Box mb={3}>
        <Typography variant="h4">Registration</Typography>
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
              <RegistrationForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegistrationForm isStudent />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
