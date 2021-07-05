import {
  createStyles,
  Container,
  makeStyles,
  Theme,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      paddingBlock: theme.spacing(5),
      marginBottom: theme.spacing(7),

      [theme.breakpoints.up("sm")]: {
        background:
          "url(https://res.cloudinary.com/sewejed/image/upload/v1622705811/pexels-zen-chung-5537940_1_kym2rn.png)",
        height: "50vh",
        backgroundSize: "cover",
        paddingTop: theme.spacing(10),
        marginTop: theme.spacing(-7),
        marginBottom: theme.spacing(10),
      },

      [theme.breakpoints.up("md")]: {
        height: "95vh",
      },
    },

    innerJumbo: {
      height: "auto",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        color: theme.palette.grey[50],
      },
    },
    introTitle: {
      fontWeight: "bold",
      fontSize: theme.spacing(5),
      textAlign: "center",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(6),
        textAlign: "left",
        width: "50%",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(10),
        width: "80%",
      },
    },
    introText: {
      fontSize: theme.spacing(2),
      marginBlock: theme.spacing(2),
      textAlign: "center",
      fontWeight: 400,
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(2),
        textAlign: "left",
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(3),
        width: "80%",
      },
    },
    container: {
      display: "flex",
      flexGrow: 1,
      height: "100%",
    },
  })
);

const Jumbotron = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Container className={classes.container}>
          <Box className={classes.innerJumbo}>
            <Typography className={classes.introTitle}>
              Learn Without Limits
            </Typography>
            <Typography className={classes.introText}>
              The flexibility of learning is our top priority, and that is why
              we built{" "}
              <strong>
                <em>Plearn</em>
              </strong>{" "}
              just for you. To begin this journey, click the button below
            </Typography>
            <Box display={{ xs: "grid", sm: "block" }}>
              <Link href="/questionnaire">
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ textTransform: "capitalize" }}
                >
                Get Started
              </Button>
                </Link>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Jumbotron;
