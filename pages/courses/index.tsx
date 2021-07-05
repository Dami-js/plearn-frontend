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
import Feed, { FeaturedFeedSkeleton } from "components/Feed";
// import Navbar from "components/Navbar";
// import SearchBar from "components/SearchBar";
// import useProfile from "hooks/useProfile";
import { NextPage, NextPageContext } from "next";
// import { AppContext } from "next/app";
// import Head from "next/head";
import {
  getFeeds,
  GetFeedsQuery,
  getRecommendedFeed,
  myProfile,
} from "pages/api/queries";
import { ReactNode, useState } from "react";
import { useQuery } from "react-query";
import * as __ from "lodash";
import { getSession } from "next-auth/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: theme.spacing(10),
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
    headerText: {
      fontSize: theme.spacing(5),
      color: theme.palette.grey[50],
      fontWeight: 700,
      [theme.breakpoints.up("md")]: {
        fontSize: theme.spacing(10),
      },
    },
    header: {
      background:
        "url(https://res.cloudinary.com/sewejed/image/upload/v1622705811/pexels-zen-chung-5537940_1_kym2rn.png)",
      height: "340px",
      width: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      paddingTop: theme.spacing(5),
      marginTop: theme.spacing(-7),
      marginBottom: theme.spacing(5),
      [theme.breakpoints.up("md")]: {
        height: "600px",
      },
    },
    headerInner: {
      display: "flex",
      height: "100%",
      alignItems: "center",
    },
  })
);

const fetchRecommendedCourses = (q) => {
  const data = useQuery(
    [
      "get_recommended_feed",
      {
        q,
      },
    ],
    getRecommendedFeed
  );
  return data;
};

const fetchAllCourses = () => {
  const data = useQuery(["all-feeds", {}], getFeeds);
  return data;
};

const Home: NextPage<any> = ({ session, profile }) => {
  const classes = useStyles();

  const learningStyle = profile?.learningStyle;

  const { isLoading, data, error, isFetching, refetch } =
    fetchRecommendedCourses(learningStyle);

  const {
    isLoading: allIsLoading,
    data: allData,
    error: allError,
    isFetching: allIsFetching,
    refetch: allRefetch,
  } = fetchAllCourses();

  return (
    <div>
      {/* <Navbar /> */}
      <Box className={classes.main}>
        <div className={classes.header}>
          <div className={classes.headerInner}>
            <Container>
              <Typography className={classes.headerText}>Courses</Typography>
            </Container>
          </div>
        </div>
        <Container>
          {isLoading && <FeaturedFeedSkeleton />}
          {error && (
            <Box my={10} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => refetch()}
              >
                Refresh
              </Button>
            </Box>
          )}
          {profile && profile?.learningStyle && (
            <Box mb={4}>
              <Box mb={2}>
                <Typography variant="h4">Recommended Courses</Typography>
              </Box>
              {!isLoading && data && data?.docs.length > 0 && (
                <Grid container spacing={3}>
                  {data.docs.map((feed, index) => (
                    <Grid xs={12} sm={6} md={3} key={index} item>
                      <Feed {...feed} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
          <Box mb={2}>
            <Typography variant="h4">Popular Courses</Typography>
          </Box>
          {allIsLoading && <FeaturedFeedSkeleton />}
          {allError && (
            <Box my={10} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => allRefetch()}
              >
                Refresh
              </Button>
            </Box>
          )}
          {!allIsLoading && allData && allData?.docs.length > 0 && (
            <Grid container spacing={3}>
              {allData.docs.map((feed, index) => (
                <Grid xs={12} sm={6} md={3} key={index} item>
                  <Feed {...feed} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </div>
  );
};

Home.getInitialProps = async (context: NextPageContext) => {
  const session: any = await getSession(context);
  let profile: any = null;
  if (session) {
    profile = await myProfile({
      queryKey: ["getProfile", { token: session?.user?.access_token }],
    });
  }
  const props = { session, profile };
  return { ...props };
};

export default Home;
