import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    input: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

const StudentRegistration = () => {
  const classes = useStyles();
  const [level, setLevel] = useState<any>("100");
  return (
    <form>
      <TextField
        className={classes.input}
        label="Firstname"
        variant="outlined"
        type="text"
      />
      <TextField
        className={classes.input}
        label="Lastname"
        variant="outlined"
        type="text"
      />
      <FormControl variant="outlined" className={classes.input}>
        <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          label="Level"
        >
          <MenuItem value="100">100</MenuItem>
          <MenuItem value="200">200</MenuItem>
          <MenuItem value="300">300</MenuItem>
          <MenuItem value="400">400</MenuItem>
          <MenuItem value="500">500</MenuItem>
        </Select>
      </FormControl>
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
        Register
      </Button>
    </form>
  );
};

export default StudentRegistration;
