import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import AuthGuard from "components/AuthGuard";
import Feed from "components/Feed";
import Jumbotron from "components/Jumbotron";
import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";
import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/client";
import { AppContext } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: theme.spacing(7),
    },
    homeText: {
      textTransform: "capitalize",
    },
    hero: {
      marginTop: theme.spacing(0.5),
      paddingInline: theme.spacing(2),
      marginBottom: theme.spacing(6),
      paddingBlock: theme.spacing(6),
      height: "auto",
      backgroundColor: theme.palette.grey[200],
      display: "flex",
      alignItems: "center",
      backgroundImage: `url('/images/hero1.svg')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      [theme.breakpoints.between("sm", "md")]: {
        paddingBlock: theme.spacing(20),
        paddingInline: theme.spacing(10),
      },
      [theme.breakpoints.up("md")]: {
        height: theme.spacing(70),
        backgroundPosition: "center right",
        backgroundSize: theme.spacing(100),
        paddingInline: theme.spacing(10),
      },
    },
    heroInfo: {
      width: "100%",
      paddingInline: theme.spacing(2),
      paddingBlock: theme.spacing(2),
      [theme.breakpoints.between("sm", "md")]: {
        paddingInline: theme.spacing(5),
        paddingBlock: theme.spacing(5),
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
        padding: theme.spacing(5),
      },
    },
    introTitle: {
      fontWeight: "bold",
      fontSize: theme.spacing(2),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(3),
      },
    },
    introText: {
      fontSize: theme.spacing(2),
      marginBottom: theme.spacing(1),
      fontWeight: 400,
    },
  })
);

const Featured = () => {
  let arr: Array<number> = [];
  for (let i: number = 0; i <= 8; i++) {
    arr.push(i);
  }
  return (
    <Grid container spacing={3}>
      {arr.map((item) => (
        <Grid xs={12} sm={6} md={3} key={item} item>
          <Feed />
        </Grid>
      ))}
    </Grid>
  );
};

const Home: NextPage<any> = ({ ...props }) => {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <div>
      {/* <Navbar /> */}
      <Box className={classes.main}>
        <Jumbotron />
        <Container>
          <Box>
            <Box mb={2}>
              <Typography variant="h4">New Courses</Typography>
            </Box>
            <Featured />
          </Box>
          <Box mt={10}>
            <Box mb={2}>
              <Typography variant="h4">Popular Courses</Typography>
            </Box>
            <Featured />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

{
  /* <Box className={classes.hero}>
            <Paper className={classes.heroInfo}>
              <Box>
                <Typography className={classes.introTitle}>
                  Welcome to your personal e-learning system
                </Typography>
                <Typography className={classes.introText}>
                  The flexibility of learning is our top priority, and that is
                  why we built{" "}
                  <strong>
                    <em>Plearn</em>
                  </strong>{" "}
                  just for you. To begin this journey, click the button below
                </Typography>
              </Box>
              <Box>
                <Link href="/questionnaire">
                  <Button variant="contained" color="primary" size="large">
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box> */
}

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  return { props: { session } };
}

export default Home;
