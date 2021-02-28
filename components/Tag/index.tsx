import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { PropsWithChildren } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "uppercase",
      backgroundColor: theme.palette.grey[200],
      width: "fit-content",
      padding: "0.3rem 1rem",
      fontSize: "0.8rem",
      fontWeight: 600
    }
  })
);

interface TagProps {}

const Tag = (props: PropsWithChildren<TagProps>) => {
  const classes = useStyles();
  return <Typography className={classes.root}>{props.children}</Typography>;
};

export default Tag;
