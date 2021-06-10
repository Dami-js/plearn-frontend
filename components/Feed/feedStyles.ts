import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      cursor: "pointer",
      transition: "all 300ms ease-in-out",
      "&:hover": {
        transform: "scale(1.03)",
      },
    },
    media: {
      height: 0,
      paddingTop: "71.25%", // 16:9
    },
    title: {
      fontWeight: 500,
      lineHeight: 1,
    },
    author: {
      color: theme.palette.grey[600],
      fontSize: 14,
    },
    courseCode: {
      color: theme.palette.grey[600],
      fontSize: 14,
    },
    tag: {
      borderRadius: 0,
    },
    unit: {
      color: theme.palette.grey[600],
      fontWeight: 500,
      fontSize: 14,
      paddingLeft: 5,
    },
  })
);
