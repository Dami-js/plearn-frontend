import {
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import Feed from "components/Feed";
import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";
import { NextPage, NextPageContext } from "next";
import { AppContext } from "next/app";
import Head from "next/head";
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
      fontSize: theme.spacing(3),
      color: "#000",
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(5),
      },
    },
    introText: {
      fontSize: theme.spacing(2),
      marginBottom: theme.spacing(1),
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
  return (
    <div>
      {/* <Navbar /> */}
      <Box className={classes.main}>
        <Container>
          <Box className={classes.hero}>
            <Paper className={classes.heroInfo}>
              <Box>
                <Typography className={classes.introTitle}>
                  Lorem Ipsum
                </Typography>
                <Typography className={classes.introText}>
                  tenim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut
                </Typography>
              </Box>
              <Box>
                <SearchBar />
              </Box>
            </Paper>
          </Box>
          <Box>
            <Box mb={2}>
              <Typography variant="h4">New Courses</Typography>
            </Box>
            <Featured />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

Home.getInitialProps = async (context: NextPageContext) => {
  const props = { header: true, footer: true };
  return { ...props };
};

export default Home;