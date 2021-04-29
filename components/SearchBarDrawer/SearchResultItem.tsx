import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "left",
      display: "block",
      textTransform: "unset",
      color: theme.palette.grey[700],
      "&:not(:last-child)": {
        marginBottom: 10,
      },
    },
    title: {
      display: "block",
      fontWeight: 500,
    },
    desc: {
      display: "block",
      fontWeight: "normal",
    },
  })
);

const SearchResultItem = () => {
  const classes = useStyles();

  return (
    <Button size="large" className={classes.root} fullWidth>
      <Typography className={classes.title}>
        Lorem ipsum, dolor sit amet co...
      </Typography>
      <Typography className={classes.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nulla ex
        incidunt?
      </Typography>
    </Button>
  );
};

export default SearchResultItem;
