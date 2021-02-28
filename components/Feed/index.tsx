import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import Spacer from "components/Spacer";
import feedStyles from "./feedStyles";
import Tag from "components/Tag";

const Feed = () => {
  const classes = feedStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.media}
        image="/images/undraw_Bibliophile_hwqc 1.png"
        title="Paella dish"
      />
      <CardContent>
        <Typography className={classes.title}>
          Consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidun
        </Typography>
        <Spacer size={0.5} />
        <Typography className={classes.author}>Dr Olatunji</Typography>
        <Spacer size={0.5} />
        <Tag>Activist</Tag>
      </CardContent>
    </Card>
  );
};

export default Feed;
