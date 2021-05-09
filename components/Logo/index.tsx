import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    logo: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: "bold",
      color: theme.palette.primary.light,
      fontStyle: "italic",
    },
  })
);

const Logo = () => {
  const classes = useStyles();
  return (
    <a className={classes.root}>
      <Link href="/">
        <Typography className={classes.logo}>Plearn</Typography>
      </Link>
    </a>
  );
};

export default Logo;
