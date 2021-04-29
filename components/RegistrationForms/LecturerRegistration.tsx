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

const LecturerRegistration = () => {
  const classes = useStyles();
  const [title, setTitle] = useState<any>("");
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
        <InputLabel id="demo-simple-select-outlined-label">Title</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Mr">Mr.</MenuItem>
          <MenuItem value="Dr">Dr.</MenuItem>
          <MenuItem value="Prof">Prof.</MenuItem>
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

export default LecturerRegistration;
