import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
} from "@material-ui/core";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(8),
      },
    },
    topBar: {
      backgroundColor: theme.palette.primary.main,
      paddingBlock: theme.spacing(2),
      color: "#fff",
    },
    titleBarText: {
      fontSize: theme.spacing(2.6),
      fontWeight: 700,
    },
    input: {
      width: "100%",
    },
    formContainer: {},
  })
);

const AddNewCourse = () => {
  const [category, setCategory] = useState<any>("");
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.topBar}>
        <Container>
          <Typography className={classes.titleBarText}>
            Create new course
          </Typography>
        </Container>
      </Paper>
      <Container>
        <Box my={4}>
          <form>
            <Box mb={3}>
              <TextField
                className={classes.input}
                label="Enter Course Title"
                variant="outlined"
                type="text"
              />
            </Box>
            <Box mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl variant="outlined" className={classes.input}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Age"
                    >
                      <MenuItem value="Activist">Activist</MenuItem>
                      <MenuItem value="Pragmatist">Pragmatist</MenuItem>
                      <MenuItem value="Theorist">Theorist</MenuItem>
                      <MenuItem value="Reflector">Reflector</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl variant="outlined" className={classes.input}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Age"
                    >
                      <MenuItem value="Activist">Activist</MenuItem>
                      <MenuItem value="Pragmatist">Pragmatist</MenuItem>
                      <MenuItem value="Theorist">Theorist</MenuItem>
                      <MenuItem value="Reflector">Reflector</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box mb={3}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={7}
                variant="outlined"
                className={classes.input}
              />
            </Box>
            <Box mb={3}>
              <TextField
                id="outlined-multiline-static"
                label="Requirement"
                multiline
                rows={7}
                variant="outlined"
                className={classes.input}
              />
            </Box>
            <Box mb={3}>
              <TextField
                id="outlined-multiline-static"
                label="What you will learn"
                multiline
                rows={7}
                variant="outlined"
                className={classes.input}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton>
                <CloudUploadIcon />
              </IconButton>
              <Box component="p" fontWeight="bold" ml={2}>
                Upload document
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

AddNewCourse.getInitialProps = async (context: NextPageContext) => {
  const props = { header: true, footer: true };
  return { ...props };
};

export default AddNewCourse;
