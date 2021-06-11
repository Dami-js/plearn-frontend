import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import Spacer from "components/Spacer";
import feedStyles from "./feedStyles";
import Tag from "components/Tag";
import * as __ from "lodash";

import Link from "next/link";
import { Skeleton } from "@material-ui/lab";
import { NEXT_PUBLIC_API_URL } from "utils/constants";
export interface Feed {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  course: string;
  learningStyle: string;
  createdBy: {
    firstname: string;
    lastname: string;
    title: string;
  };
  createdAt: string;
  courseCode: string;
  level: string;
  unit: string;
  material: string;
}

export const FeedSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rect" width="100%" height={175} />
      <Box my={1}>
        <Skeleton variant="rect" width="100%" height={10} />
      </Box>
      <Box my={1}>
        <Skeleton variant="rect" width="80%" height={20} />
      </Box>
      <Box my={1}>
        <Skeleton variant="rect" width="100%" height={15} />
      </Box>
      <Skeleton variant="rect" width="100%" height={86} />
    </Box>
  );
};

export const FeaturedFeedSkeleton = () => {
  let arr: Array<number> = [];
  for (let i: number = 0; i <= 3; i++) {
    arr.push(i);
  }
  return (
    <Grid container spacing={3}>
      {arr.map((item) => (
        <Grid xs={12} sm={6} md={3} key={item} item>
          <FeedSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

const Feed = ({
  courseCode,
  createdBy,
  learningStyle,
  unit,
  title,
  thumbnail,
}: Feed) => {
  const classes = feedStyles();

  return (
    <>
      <Link href={`/courses/${__.replace(`${title}`, / /g, "-")}`}>
        <Card className={classes.root} variant="outlined">
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title="Paella dish"
          />
          <CardContent>
            <Typography className={classes.title}>
              {__.capitalize(__.truncate(title, { length: 60 }))}
            </Typography>
            <Spacer size={0.5} />
            <Typography className={classes.courseCode}>
              {courseCode.toUpperCase()} -
              <Typography component="span" className={classes.unit}>
                {unit} unit
              </Typography>
            </Typography>
            <Typography className={classes.author}>
              By {__.capitalize(createdBy.title)}{" "}
              {__.capitalize(createdBy.lastname)}
            </Typography>
            <Spacer size={0.5} />
            <Chip
              size="small"
              label={learningStyle.toUpperCase()}
              className={classes.tag}
            />
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default Feed;
