import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    input: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

const LecturerLogin = () => {
  const classes = useStyles();
  return (
    <form>
      <TextField
        className={classes.input}
        label="Email Address"
        variant="outlined"
        type="email"
      />
      <TextField
        className={classes.input}
        label="Password"
        type="password"
        variant="outlined"
      />
      <Button color="primary" variant="contained" size="large" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LecturerLogin;
