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
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import Alert from "components/Alert";
import { useFormik } from "formik";
import { signin } from "next-auth/client";
import { useRouter } from "next/router";
import { registerUser } from "pages/api/queries";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_URL } from "utils/constants";
import { ResponseError } from "utils/types";
import * as yup from "yup";
import { OptionalObjectSchema } from "yup/lib/object";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    input: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

export interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  learningStyle?: string | null;
  isStudent: boolean;
}

export interface StudentDetails extends UserDetails {
  level: string;
  studentNumber: string;
}

export interface TutorDetails extends UserDetails {
  title: "Mr" | "Dr" | "Prof";
  coursesCreated: Array<any>;
}

const studentDefaultValues: StudentDetails = {
  firstname: "",
  lastname: "",
  level: "",
  email: "",
  studentNumber: "",
  password: "",
  learningStyle: "",
  isStudent: false,
};

const tutorDefaultValues: TutorDetails = {
  firstname: "",
  lastname: "",
  title: "Mr",
  email: "",
  password: "",
  coursesCreated: [],
  isStudent: false,
};

const studentValidationSchema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  level: yup.string().required("Level is required"),
  email: yup.string().required("Email is required"),
  studentNumber: yup.string().required("Student number is required"),
  password: yup.string().min(6).required("Password is required"),
  learningStyle: yup.mixed().nullable(),
  isStudent: yup.boolean().required(),
});

const tutorValidationSchema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  title: yup.string().oneOf(["Mr", "Dr", "Prof"]).required("Title is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  isStudent: yup.boolean().required(),
});

interface RegistrationFormForm {
  isStudent?: boolean;
}

const RegistrationForm = ({ isStudent = false }: RegistrationFormForm) => {
  const classes = useStyles();
  const [regError, setRegError] = useState<string | null>(null);
  const router = useRouter();

  const { mutate, data, isLoading, error } = useMutation(registerUser, {
    mutationKey: "register-user",
  });

  const onSubmit = (values) => {
    const loginValues = {
      username: isStudent ? values.studentnumber : values.email,
      password: values.password,
    };
    mutate(values, {
      onError: (error: ResponseError, variables, context) => {
        const { response } = error;
        setRegError(response.data.message);
        console.log(response);
      },
      onSuccess: (data, variables, context) => {
        router.push("/login?reg=success");
      },
    });
  };

  const initialValues = isStudent
    ? { ...studentDefaultValues, isStudent }
    : { ...tutorDefaultValues, isStudent };

  const { handleSubmit, isSubmitting, values, errors, touched, handleChange } =
    useFormik({
      initialValues,
      validationSchema: isStudent
        ? studentValidationSchema
        : tutorValidationSchema,
      onSubmit,
    });

  return (
    <>
      <Alert
        severity="error"
        open={Boolean(regError)}
        onClose={() => setRegError(null)}
      >
        {regError}
      </Alert>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label="Firstname"
          variant="outlined"
          type="text"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          error={touched.firstname && Boolean(errors.firstname)}
          helperText={touched.firstname && errors.firstname}
        />
        <TextField
          className={classes.input}
          label="Lastname"
          name="lastname"
          variant="outlined"
          type="text"
          value={values.lastname}
          onChange={handleChange}
          error={touched.lastname && Boolean(errors.lastname)}
          helperText={touched.lastname && errors.lastname}
        />
        {isStudent && (
          <>
            <FormControl
              variant="outlined"
              className={classes.input}
              error={touched.level && Boolean(errors.level)}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Level"
                name="level"
                value={values.level}
                onChange={handleChange}
              >
                <MenuItem value="100">100</MenuItem>
                <MenuItem value="200">200</MenuItem>
                <MenuItem value="300">300</MenuItem>
                <MenuItem value="400">400</MenuItem>
                <MenuItem value="500">500</MenuItem>
              </Select>
              {touched.level && errors.level && (
                <FormHelperText>{errors.level}</FormHelperText>
              )}
            </FormControl>
            <TextField
              className={classes.input}
              label="Student Number"
              name="studentNumber"
              variant="outlined"
              value={values.studentNumber}
              onChange={handleChange}
              error={touched.studentNumber && Boolean(errors.studentNumber)}
              helperText={touched.studentNumber && errors.studentNumber}
            />
          </>
        )}
        {!isStudent && (
          <>
            <FormControl variant="outlined" className={classes.input}>
              <InputLabel id="demo-simple-select-outlined-label">
                Title
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Dr">Dr.</MenuItem>
                <MenuItem value="Prof">Prof.</MenuItem>
              </Select>
              {touched.title && errors.title && (
                <FormHelperText>{errors.title}</FormHelperText>
              )}
            </FormControl>
          </>
        )}
        <TextField
          className={classes.input}
          label="Email Address"
          variant="outlined"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          className={classes.input}
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </>
  );
};

export default RegistrationForm;
