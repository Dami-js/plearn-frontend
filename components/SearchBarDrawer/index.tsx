import {
  Box,
  Button,
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import SearchResultList from "./SearchResultList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SearchBarDrawer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <SearchResultList />
    </Paper>
  );
};

export default SearchBarDrawer;
