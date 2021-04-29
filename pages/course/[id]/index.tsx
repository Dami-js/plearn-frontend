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
import { GetStaticPaths, NextPage, NextPageContext } from "next";
import { NextRouter, useRouter } from "next/dist/client/router";
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import { Component } from "react";
import useCourseStyles from "../useStyles";
import * as _ from "lodash";
import Tag from "components/Tag";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GetAppIcon from "@material-ui/icons/GetApp";

function Course() {
  const classes = useCourseStyles();
  const { query } = useRouter();
  const title = _.capitalize(_.replace(`${query.id}`, /-/g, " "));
  return (
    <>
      <div className={classes.root}>
        <div className={classes.topHeaderSection}>
          <Container>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography className={classes.breadcrumbItem}>
                Courses
              </Typography>
              <Typography className={classes.breadcrumbItem}>
                <strong>Mathematics</strong>
              </Typography>
            </Breadcrumbs>
            <Box color="white" my={2}>
              <Typography className={classes.courseTitle}>{title}</Typography>
              <Typography className={classes.courseDesc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt ullam similique tenetur! Nisi voluptate veritatis qui
                dolorem.
              </Typography>
            </Box>
            <Box>
              <Tag>Pragmatist</Tag>
            </Box>
            <Box display="flex" alignItems="center" color="#ffffff" my={2}>
              <Typography>Created by: </Typography>
              <Link href="#!">
                <Typography className={classes.fontBold}>
                  {" "}
                  Dr Olatunji
                </Typography>
              </Link>
            </Box>
            <Box color="#ffffff">
              <Typography>
                Created on: <strong> 12/04/2021 </strong>
              </Typography>
            </Box>
          </Container>
        </div>
        <Container>
          {/* what you will learn section */}
          <Box className={classes.wylCont} my={4}>
            <Paper variant="outlined">
              <CardContent>
                <Typography className={classes.sectionTitle}>
                  What you will learn
                </Typography>
                <Box>
                  <Typography className={classes.sectionContent}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Debitis rem excepturi non culpa voluptatem vitae quaerat
                    similique repellendus ratione veritatis iste nihil corrupti
                    repudiandae facere dolores maiores, quia perferendis id
                    magni neque velit qui corporis? Ipsa vel deleniti animi
                    cumque.
                  </Typography>
                </Box>
              </CardContent>
            </Paper>
          </Box>
          {/* requirement / pre-equsite */}
          <Box className={classes.requirementCont} mb={2}>
            <Typography className={classes.sectionTitle}>
              Requirement
            </Typography>
            <List className={classes.sectionContent}>
              <ListItem disableGutters>
                <ChevronRightIcon />
                Lorem ipsum dolor sit.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum dolor sit amet.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum dolor sit.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum dolor sit amet consectetur.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </ListItem>
              <ListItem disableGutters>
                {" "}
                <ChevronRightIcon />
                Lorem ipsum dolor sit.
              </ListItem>
            </List>
          </Box>
          {/* Description section */}
          <Box className={classes.descriptionCont} mb={2}>
            <Box>
              <Typography className={classes.sectionTitle}>
                Description
              </Typography>
            </Box>
            <Box className={classes.sectionContent}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                ipsa enim ratione mollitia id quod. Vel alias aperiam libero
                rerum mollitia tempore atque, doloribus quae hic repellat
                reiciendis molestiae minima.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                ipsa enim ratione mollitia id quod. Vel alias aperiam libero
                rerum mollitia tempore atque, doloribus quae hic repellat
                reiciendis molestiae minima.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                ipsa enim ratione mollitia id quod. Vel alias aperiam libero
                rerum mollitia tempore atque, doloribus quae hic repellat
                reiciendis molestiae minima.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                ipsa enim ratione mollitia id quod. Vel alias aperiam libero
                rerum mollitia tempore atque, doloribus quae hic repellat
                reiciendis molestiae minima.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                ipsa enim ratione mollitia id quod. Vel alias aperiam libero
                rerum mollitia tempore atque, doloribus quae hic repellat
                reiciendis molestiae minima.
              </Typography>
            </Box>
          </Box>

          <Box mb={4}>
            <Typography className={classes.sectionTitle}>
              Course materials
            </Typography>
            <Box>
              <Grid container>
                <Grid item xs={6} sm={3} md={4} lg={3}>
                  <Paper variant="outlined" className={classes.matCont}>
                    <Typography>
                      rerum facilis est et mnis voluptas assumenda est, o
                    </Typography>
                    <Button
                      startIcon={<GetAppIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
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
