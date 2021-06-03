import {
  Box,
  Button,
  CircularProgress,
  Container,
  createStyles,
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
import { useQuery } from "react-query";
import { myProfile } from "pages/api/queries";
import { useEffect } from "react";
import { Skeleton } from "@material-ui/lab";

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
      height: "200px",
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up("lg")]: {
        height: "300px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
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
    detailTitle: {
      fontWeight: 700,
      fontSize: theme.spacing(2.5),
    },
    detailText: {
      fontSize: theme.spacing(2),
    },
    profilePictureCont: {
      marginBottom: theme.spacing(3),
      width: "30%",
    },
    detailsCont: {
      textAlign: "center",
      width: "65%",
    },
    detailsSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        alignItems: "unset",
        width: "60%",
        marginInline: "auto",
      },
    },
  })
);

const Profile = ({ session }) => {
  const classes = useStyles();
  // const [session]: Array<any> = useSession();

  const { data, error, isLoading, refetch } = useQuery(
    ["getProfile", { token: session?.user?.access_token }],
    myProfile,
    { retry: false }
  );

  if (isLoading) {
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

  if (error) {
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
              {data.learningStyle.length > 0 && (
                <Box>
                  <Typography>You are a</Typography>
                </Box>
              )}
              {data.learningStyle.length > 0 &&
                data.learningStyle.map((item, idx) => (
                  <Typography key={idx} className={classes.learningText}>
                    {item}
                  </Typography>
                ))}
              {/* <Box color="#ffffff">
                {!data.isStudent && (
                  <Box component="span" ml={2}>
                    <Link href="/course/add-new">
                      <Button variant="text" color="inherit">
                        Create new course
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box> */}
            </Box>
          </Container>
        </Box>
        <Container>
          <div className={classes.detailsSection}>
            <div className={classes.profilePictureCont}>
              <ProfilePicture user={data} size={15} />
            </div>
            <div className={classes.detailsCont}>
              <Box mb={3}>
                <Typography className={classes.detailTitle}>Name</Typography>
                <Typography className={classes.detailText}>
                  {_.capitalize(`${data.firstname}`)}{" "}
                  {_.capitalize(`${data.lastname}`)}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography className={classes.detailTitle}>Email</Typography>
                <Typography className={classes.detailText}>
                  {data.email}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography className={classes.detailTitle}>
                  Phone Number
                </Typography>
                <Typography className={classes.detailText}>
                  o8o6 943 2293
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography className={classes.detailTitle}>
                  {data.isStudent ? "Level" : "Title"}
                </Typography>
                <Typography className={classes.detailText}>
                  {_.capitalize(`${data.level ?? data.title}`)}
                </Typography>
              </Box>
              {data.isStudent && (
                <Box mb={3}>
                  <Typography className={classes.detailTitle}>
                    Learning Style(s)
                  </Typography>
                  {data.learningStyle.length > 0 &&
                    data.learningStyle.map((item, idx) => (
                      <Typography key={idx} className={classes.detailText}>
                        {item}
                      </Typography>
                    ))}
                </Box>
              )}
              {!data.isStudent && (
                <Box mb={3}>
                  <Typography className={classes.detailTitle}>
                    Courses created
                  </Typography>
                  {data.coursesCreated.length > 0 &&
                    data.coursesCreated.map((item, idx) => (
                      <Typography key={idx} className={classes.detailText}>
                        {item.title}
                      </Typography>
                    ))}
                </Box>
              )}
            </div>
          </div>
        </Container>
      </div>
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
