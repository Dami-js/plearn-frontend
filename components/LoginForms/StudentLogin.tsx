import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { FormEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/client";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    input: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

export interface LoginFormValues {
  username: string;
  password: string;
}

interface StudentLoginProps {}

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const StudentLogin = () => {
  const classes = useStyles();

  const onSubmit = (values: LoginFormValues) => {
    signIn("credentials", {
      ...values,
      callbackUrl: `http://localhost:3000`,
    });
    console.log(values);
  };
  const { handleSubmit, handleChange, touched, errors, values, isSubmitting } =
    useFormik({
      validationSchema,
      initialValues,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.input}
        label="Student number"
        variant="outlined"
        name="username"
        onChange={handleChange}
        value={values.username}
        error={touched.username && Boolean(errors.username)}
        helperText={touched.username && errors.username}
      />
      <TextField
        className={classes.input}
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        onChange={handleChange}
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default StudentLogin;
