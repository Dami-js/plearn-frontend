import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Questions from "components/Questions";
import { NextPage, NextPageContext } from "next";
import { Fragment } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(15),
    },
    title: {
      fontSize: theme.spacing(4),
      fontWeight: 700,
    },
    intro: {
      fontSize: theme.spacing(2.4),
    },
  })
);

const Questionnaire: NextPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box textAlign="center" paddingY={4}>
          <Typography className={classes.title}>
            Learning Style Questionnaire
          </Typography>
        </Box>
        <Box textAlign="center" mb={2} width={{ lg: "50%" }} marginX="auto">
          <Typography className={classes.intro}>
            Thank you for taking the time to answer these questions. The
            following questions help us determine your prefered learning style.
          </Typography>
        </Box>
        <Box>
          <Questions />
        </Box>
      </Container>
    </Box>
  );
};

Questionnaire.getInitialProps = (ctx: NextPageContext) => {
  const props = { header: true, footer: true };
  return { ...props };
};

export default Questionnaire;
