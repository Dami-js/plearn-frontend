import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { signIn } from "next-auth/client";
import { FormEvent, useState } from "react";

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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const values = {
      username,
      password,
    };

    signIn("credentials", {
      ...values,
      callbackUrl: `http://localhost:3000`,
    });
    console.log(values);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className={classes.input}
        label="Email Address"
        variant="outlined"
        type="email"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <TextField
        className={classes.input}
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        fullWidth
      >
        Login
      </Button>
    </form>
  );
};

export default LecturerLogin;
