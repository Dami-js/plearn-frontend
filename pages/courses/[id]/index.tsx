import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { GetStaticPaths, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import * as _ from "lodash";
import Tag from "components/Tag";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useQuery } from "react-query";
import { getFeed } from "pages/api/queries";
import { Skeleton } from "@material-ui/lab";
import { useState } from "react";
import { NEXT_PUBLIC_API_URL } from "utils/constants";

const white = "#ffffff";

export const useCourseStyles = makeStyles((theme: Theme) =>
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
    topHeaderSection: {
      backgroundColor: theme.palette.primary.main,
      paddingBlock: theme.spacing(3),
    },
    breadcrumbItem: {
      color: white,
      fontSize: theme.spacing(2.3),
    },
    courseTitle: {
      fontSize: theme.spacing(3.2),
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(3.5),
      },
      fontWeight: "bold",
      lineHeight: 2,
    },
    courseDesc: {
      fontSize: theme.spacing(2.2),
    },
    fontBold: {
      fontWeight: "bold",
    },
    wylCont: {},
    sectionTitle: {
      fontSize: theme.spacing(2.8),
      fontWeight: "bold",
      lineHeight: 2,
    },
    sectionContent: {
      color: theme.palette.grey[700],
    },
    matCont: {
      padding: 18,
      textAlign: "center",
      "& p": {
        fontSize: theme.spacing(1.7),
        color: theme.palette.grey[700],
        marginBottom: 7,
      },
    },
    requirementCont: {},
    descriptionCont: {},
  })
);

const CourseSkeleton = () => {
  return (
    <>
      <Skeleton variant="rect" width="100%" height={400} />
      <Container>
        <Box my={2}>
          <Skeleton variant="rect" width="100%" height={800} />
        </Box>
      </Container>
    </>
  );
};

function Course() {
  const classes = useCourseStyles();
  const { query } = useRouter();
  const title = _.capitalize(_.replace(`${query.id}`, /-/g, " "));
  const [useQueryResponse, setUseQueryResponse] = useState();

  const load = true;

  const { isLoading, data, error, isFetching, refetch } = useQuery(
    ["single-feed", { title: query.id }],
    getFeed
  );

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

  if (isLoading && !data) {
    return <CourseSkeleton />;
  }

  const makeDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formatted;
  };

  console.log(data);

  return (
    <>
      {data && !isLoading && (
        <div className={classes.root}>
          <div className={classes.topHeaderSection}>
            <Container>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography className={classes.breadcrumbItem}>
                  Courses
                </Typography>
                <Typography className={classes.breadcrumbItem}>
                  <strong>{data?.feed?.course}</strong>
                </Typography>
              </Breadcrumbs>
              <Box color="white" my={2}>
                <Typography className={classes.courseTitle}>{title}</Typography>
                {/* <Typography className={classes.courseDesc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt ullam similique tenetur! Nisi voluptate veritatis qui
                  dolorem.
                </Typography> */}
              </Box>
              <Box>
                <Tag>{data?.feed?.learningStyle}</Tag>
              </Box>
              <Box display="flex" alignItems="center" color="#ffffff" my={2}>
                <Typography>Created by: </Typography>{" "}
                <Link href="#!">
                  <Typography className={classes.fontBold}>
                    {" "}
                    {_.capitalize(data?.feed?.createdBy.title)}{" "}
                    {_.capitalize(data?.feed?.createdBy.firstname)}{" "}
                    {_.capitalize(data?.feed?.createdBy.lastname)}
                  </Typography>
                </Link>
              </Box>
              <Box color="#ffffff">
                <Typography>
                  Created on:{" "}
                  <strong> {makeDate(`${data?.feed?.createdAt}`)} </strong>
                </Typography>
              </Box>
            </Container>
          </div>
          <Container>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.feed?.content,
              }}
            />

            <Box mb={4}>
              <Typography className={classes.sectionTitle}>
                Course materials
              </Typography>
              <Box>
                <Grid container>
                  <Grid item xs={6} sm={3} md={4} lg={3}>
                    <Paper variant="outlined" className={classes.matCont}>
                      <Typography>{data?.feed?.material}</Typography>
                      <Button
                        component="a"
                        href={`${NEXT_PUBLIC_API_URL}/upload/${data?.feed?.material}`}
                        startIcon={<GetAppIcon />}
                        variant="contained"
                        color="primary"
                        size="small"
                        target="__blank"
                        download
                      >
                        Download
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "*" } }],
    fallback: true,
  };
};

export const getStaticProps = async (context: NextPageContext) => {
  const props = { header: true, footer: true };
  return {
    props: { ...props },
  };
};

export default Course;
