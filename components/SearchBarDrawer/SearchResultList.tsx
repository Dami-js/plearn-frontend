import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import SearchResultItem from "./SearchResultItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "20px 0",
    },
  })
);

const SearchResultList = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SearchResultItem />
      <SearchResultItem />
      <SearchResultItem />
    </Box>
  );
};

export default SearchResultList;
