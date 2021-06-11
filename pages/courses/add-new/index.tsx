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
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Alert from "components/Alert";
import { useMutation } from "react-query";
import { ResponseError } from "utils/types";
import { useRouter } from "next/router";
import { createCourse } from "pages/api/queries";
import { redirect } from "utils/functions";
import Link from "next/link";

const WYSIWYGCKEditor = dynamic(() => import("components/WYSIWYGCKEditor"), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      position: "relative",

      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(8),
      },
    },
    topBar: {
      backgroundColor: theme.palette.primary.main,
      paddingBlock: theme.spacing(2),
      borderRadius: 0,
      color: "#fff",
    },
    titleBarText: {
      fontSize: theme.spacing(2.6),
      fontWeight: 700,
    },
    input: {
      width: "100%",
    },
    fileInput: {
      display: "none",
    },
    formContainer: {},
    loadingScreen: {
      position: "fixed",
      background: "#000000c9",
      width: "100%",
      height: "100%",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    loadingScreenLoader: {
      color: "#ffffff",
    },
  })
);

const AddNewCourse = ({ session }) => {
  const [error, setError] = useState<any>(null);
  const [title, setTitle] = useState<any>("");
  const [course, setCourse] = useState<any>("");
  const [learningStyle, setLearningStyle] = useState<any>("");
  const [level, setLevel] = useState<any>("");
  const [courseCode, setCourseCode] = useState<any>("");
  const [courseUnit, setCourseUnit] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [thumbnail, setThumbnail] = useState<File | any>(null);
  const [material, setMaterial] = useState<File | any>(null);
  const classes = useStyles();
  const [openDialog, setDialog] = useState(false);

  const router = useRouter();

  const handleFileInput = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleNewCourse = () => {
    setTitle("");
    setCourse("");
    setLearningStyle("");
    setLevel("");
    setCourseCode("");
    setCourseUnit("");
    setContent("");
    setThumbnail(null);
    setMaterial(null);
    setDialog(false);
  };

  const {
    mutate,
    data,
    isLoading,
    error: qError,
  } = useMutation(createCourse, {
    mutationKey: "create-course",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // for (var key of formData.entries()) {
    //   console.log(key);
    // }
    const values = {
      title,
      course,
      learningStyle,
      level,
      courseCode,
      courseUnit,
      createdBy: session?.user?.user?._id,
      content,
      thumbnail,
      material,
    };
    for (var value of Object.entries(values)) {
      if (value[1] == null || value[1] == "") {
        setError(`${value[0]} cannot be empty!`);
        return;
      }
    }

    if (thumbnail?.size > 2000000) {
      setError(`Thumbnail image size is greater than 2MB`);
      return;
    }

    if (material?.size > 2000000) {
      setError(`Material image size is greater than 2MB`);
      return;
    }

    mutate(values, {
      onError: (error: ResponseError, variables, context) => {
        const { response } = error;
        setError(response.data.message);
        console.log(response);
      },
      onSuccess: (data, variables, context) => {
        console.log(data);
        setDialog(true);
        // router.push("/login?reg=success");/
      },
    });
  };

  return (
    <>
      <div className={classes.root}>
        {isLoading && (
          <div className={classes.loadingScreen}>
            <CircularProgress
              className={classes.loadingScreenLoader}
              color="inherit"
              size={30}
            />
            <Box my={3}>
              <Typography className={classes.loadingScreenLoader}>
                Saving, Please wait...
              </Typography>
            </Box>
          </div>
        )}
        {error && (
          <Alert
            severity="error"
            open={Boolean(error)}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        <Paper elevation={0} className={classes.topBar}>
          <Container>
            <Typography className={classes.titleBarText}>
              Create new course
            </Typography>
          </Container>
        </Paper>
        <Container>
          <Box my={4}>
            <form onSubmit={handleSubmit} encType="multipart/form-​data">
              <Box mb={3}>
                <TextField
                  className={classes.input}
                  label="Enter Course Title"
                  variant="outlined"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  className={classes.input}
                  label="Enter Course Of Study"
                  placeholder="e.g Micro-Biology"
                  variant="outlined"
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Box>

              <Box mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={3}>
                    <FormControl variant="outlined" className={classes.input}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Learning Style
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={learningStyle}
                        onChange={(e) => setLearningStyle(e.target.value)}
                        label="Age"
                      >
                        <MenuItem value="Activist">Activist</MenuItem>
                        <MenuItem value="Pragmatist">Pragmatist</MenuItem>
                        <MenuItem value="Theorist">Theorist</MenuItem>
                        <MenuItem value="Reflector">Reflector</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <FormControl variant="outlined" className={classes.input}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Level
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        label="Age"
                      >
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="200">200</MenuItem>
                        <MenuItem value="300">300</MenuItem>
                        <MenuItem value="400">400</MenuItem>
                        <MenuItem value="500">500</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Box mb={3}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Course code"
                        variant="outlined"
                        className={classes.input}
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Box mb={3}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Course unit"
                        variant="outlined"
                        className={classes.input}
                        value={courseUnit}
                        onChange={(e) => setCourseUnit(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box my={3} minHeight="500px">
                <WYSIWYGCKEditor
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </Box>
              <Box>
                <Box>
                  <input
                    accept="image/*"
                    className={classes.fileInput}
                    id="thumbnail-file"
                    type="file"
                    onChange={(e) => handleFileInput(e, setThumbnail)}
                  />
                  <label htmlFor="thumbnail-file">
                    <Button component="span">
                      <Box component="span" px={1}>
                        <CloudUploadIcon />
                      </Box>
                      Upload thumbnail
                    </Button>
                  </label>
                  {thumbnail && (
                    <Typography color="primary">{thumbnail.name}</Typography>
                  )}
                </Box>
                <Box my={3}>
                  <input
                    accept="application/pdf"
                    className={classes.fileInput}
                    id="material-file"
                    type="file"
                    onChange={(e) => handleFileInput(e, setMaterial)}
                  />
                  <label htmlFor="material-file">
                    <Button component="span">
                      <Box component="span" px={1}>
                        <CloudUploadIcon />
                      </Box>
                      Upload material (PDF only)
                    </Button>
                  </label>
                  {material && (
                    <Typography color="primary">{material.name}</Typography>
                  )}
                </Box>
              </Box>
              <Box my={10} display="flex" justifyContent="flex-end">
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
                <Box mx={2} component="span" />
                <Link href="/profile">
                  <Button color="default" variant="contained">
                    Cancel
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </Container>
      </div>

      <Dialog aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogTitle id="simple-dialog-title">
          Course create successfully!
        </DialogTitle>
        <Box m={5} display="flex" justifyContent="center">
          <Button color="primary" variant="contained" onClick={handleNewCourse}>
            Create new course
          </Button>
          <Box mx={2} />
          <Link href="/courses">
            <Button color="default" variant="contained">
              Cancel
            </Button>
          </Link>
        </Box>
      </Dialog>
    </>
  );
};

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  const props = { header: true, footer: true };
  if (!session) {
    return redirect("/login");
  }
  if (session && session.user.isStudent) {
    return redirect("/");
  }
  return { props: { ...props, session } };
}

export default AddNewCourse;
