import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "300px"
    },
    media: {
      height: 0,
      paddingTop: "71.25%" // 16:9
    },
    title: {
      fontWeight: "bold",
      lineHeight: 1
    },
    author: {
      color: theme.palette.grey[600]
    }
  })
);
