import {
  Box,
  Button,
  CircularProgress,
  Container,
  createStyles,
  Dialog,
  DialogTitle,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ProfilePicture from "components/ProfilePicture";
import { NextPageContext } from "next";
import Link from "next/link";
import CreateIcon from "@material-ui/icons/Create";
import { getSession, useSession } from "next-auth/client";
import * as _ from "lodash";
import { useMutation, useQuery } from "react-query";
import { deleteCourse, myProfile } from "pages/api/queries";
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import Feed from "components/Feed";
import queryClient from "utils/queryClient";
import { ResponseError } from "utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      [theme.breakpoints.between("sm", "md")]: {
        paddingTop: theme.spacing(8),
      },
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(8),
      },
    },
    titleBar: {
      background:
        "url(https://res.cloudinary.com/sewejed/image/upload/v1622724539/pexels-monstera-6281828_1_nu4ckc.png)",
      paddingBlock: theme.spacing(2),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "340px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up("lg")]: {
        height: "600px",
        marginBottom: theme.spacing(10),
      },
    },
    titleBarText: {
      color: grey[50],
      fontSize: theme.spacing(5),
      fontWeight: 700,
    },
    learningText: {
      color: grey[50],
      fontSize: theme.spacing(3),
      fontWeight: 500,
      textTransform: "capitalize",
    },
    detailBox: {},
    detailTitle: {
      fontSize: theme.spacing(2),
    },
    detailText: {
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: theme.spacing(2.5),
    },
    detailsCont: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem",
    },
    detailsSection: {
      marginBottom: theme.spacing(10),
    },
    coursesContainer: {
      marginTop: theme.spacing(10),
    },
  })
);

const Profile = ({ session }) => {
  const classes = useStyles();
  const [deleteError, setDeleteError] = useState<any>();
  const [feedToDelete, setFeedToDelete] = useState<any>(null);
  // const [session]: Array<any> = useSession();
  const queryKey = ["getProfile", { token: session?.user?.access_token }];

  const { data, error, isLoading, refetch } = useQuery(
    ["getProfile", { token: session?.user?.access_token }],
    myProfile,
    { retry: false }
  );

  const { mutate, isLoading: deleteCourseLoading } = useMutation(deleteCourse, {
    mutationKey: "delete-course",
  });

  async function profileCahce() {
    try {
      const data = await queryClient.getQueryData(queryKey);
      return [data, null];
    } catch (error) {
      console.log(error);
      return [null, error];
    }
  }

  const updater = (oldData, id) => {
    const courses = [...oldData.coursesCreated];
    const newCourses = courses.filter((course) => course._id !== id);
    const newData = { ...oldData, coursesCreated: [...newCourses] };
    console.log(newData);
    return newData;
  };

  const handleDelete = async (id) => {
    const [data, error] = await profileCahce();
    const payload = {
      token: session?.user?.access_token,
      id,
    };
    if (error) {
      console.log(error);
      return;
    }

    mutate(payload, {
      onError: (error: ResponseError, variables, context) => {
        const { response } = error;
        setDeleteError(response.data.message);
        console.log(response);
      },
      onSuccess: (data, variables, context) => {
        console.log(data);
        queryClient.setQueryData(queryKey, (oldData) => updater(oldData, id));
        setFeedToDelete(null);
      },
    });
  };

  if (isLoading && !data) {
    return (
      <div className={classes.root}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Container>
            <Skeleton variant="rect" width="100%" height={80} />
            <Box my={2}>
              <Skeleton variant="rect" width="100%" height={400} />
            </Box>
            <Skeleton variant="rect" width="100%" height={300} />
          </Container>
        </Box>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
          flexGrow="1"
          height="90vh"
        >
          <Button variant="contained" color="primary" onClick={() => refetch()}>
            Refresh
          </Button>
        </Box>
      </div>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Box className={classes.titleBar}>
          <Container>
            <Box textAlign="center" color="#ffffff">
              <Typography className={classes.titleBarText}>
                My profile
              </Typography>
              {data?.learningStyle && (
                <Box>
                  <Typography>You are a / an</Typography>
                  <Typography className={classes.learningText}>
                    {data?.learningStyle}
                  </Typography>
                </Box>
              )}
              <Box color="#ffffff">
                {!data.isStudent && (
                  <Box component="span" ml={2}>
                    <Link href="/courses/add-new">
                      <Button variant="contained" color="primary">
                        Create new course
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
        <Container>
          <div className={classes.detailsSection}>
            <div className={classes.detailsCont}>
              <Box className={classes.detailBox}>
                <Typography className={classes.detailTitle}>Name</Typography>
                <Typography className={classes.detailText}>
                  {_.capitalize(`${data.title ? data.title : ""}`)}{" "}
                  {_.capitalize(`${data.firstname}`)}{" "}
                  {_.capitalize(`${data.lastname}`)}
                </Typography>
              </Box>
              <Box className={classes.detailBox}>
                <Typography className={classes.detailTitle}>Email</Typography>
                <Typography className={classes.detailText}>
                  {data.email}
                </Typography>
              </Box>
              {data.isStudent && (
                <>
                  <Box className={classes.detailBox}>
                    <Typography className={classes.detailTitle}>
                      Level
                    </Typography>
                    <Typography className={classes.detailText}>
                      {data.level}
                    </Typography>
                  </Box>
                  <Box className={classes.detailBox}>
                    <Typography className={classes.detailTitle}>
                      Learning Style
                    </Typography>
                    <Typography className={classes.detailText}>
                      {data?.learningStyle}
                    </Typography>
                  </Box>
                </>
              )}
            </div>
            <div className={classes.coursesContainer}>
              {!data.isStudent && (
                <>
                  <Box mb={3}>
                    <Typography
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      Courses created
                    </Typography>
                  </Box>
                  {data.coursesCreated.length > 0 && (
                    <Grid container spacing={3}>
                      {data.coursesCreated.map((feed, index) => (
                        <Grid xs={12} sm={6} md={3} key={index} item>
                          <Feed {...feed} />
                          <Box mt={2}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => setFeedToDelete(feed._id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {data.coursesCreated.length < 1 && (
                    <Box color="#818181">
                      <Typography>No courses created</Typography>
                    </Box>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={Boolean(feedToDelete)}
      >
        <DialogTitle id="simple-dialog-title">
          Are you want to delete?
        </DialogTitle>
        <Box mx={5} mb={5} mt={1} display="flex" justifyContent="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleDelete(feedToDelete)}
            disabled={deleteCourseLoading}
          >
            {deleteCourseLoading ? "Please wait..." : "Delete"}
          </Button>
          <Box mx={1} />
          <Button
            color="default"
            variant="contained"
            onClick={() => setFeedToDelete(null)}
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const props = { header: true, footer: true };
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return { props: { ...props, session } };
}

export default Profile;
