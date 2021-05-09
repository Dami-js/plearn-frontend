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
import SearchIcon from "@material-ui/icons/Search";
import SearchBarDrawer from "components/SearchBarDrawer";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      paddingLeft: 15,
      borderRadius: "25px",
      height: "35px",
      // [theme.breakpoints.up("md")]: {
      // },
    },
    input: {
      flex: 1,
      fontSize: theme.spacing(1.8),
    },
    iconButton: {
      paddingBlock: 5,
      paddingInline: 10,
    },
    searchBarWrapper: {
      position: "relative",
      width: "100%",
    },
    searchDrawerCont: {
      position: "absolute",
      width: "100%",
      top: 40,
      [theme.breakpoints.up("md")]: {
        top: 45,
      },
      zIndex: theme.zIndex.modal,
    },
  })
);

const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string | null>(null);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const drawerRef = useRef<any>();

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleOnFocus = () => {
    if (!query || query.length < 3) {
      setShowDrawer(false);
    } else {
      setShowDrawer(true);
    }
  };

  const handleDocumentClick = (e) => {
    if (drawerRef.current?.contains(e.target)) {
      return;
    }
    setShowDrawer(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => handleDocumentClick(e));

    return () => {
      document.removeEventListener("click", (e) => handleDocumentClick(e));
    };
  }, []);

  useEffect(() => {
    handleOnFocus();
  }, [query]);
  return (
    <div className={classes.searchBarWrapper} ref={drawerRef}>
      <Paper component="form" variant="outlined" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for courses"
          inputProps={{ "aria-label": "search for courses" }}
          onChange={(e) => handleSearch(e)}
          onFocus={handleOnFocus}
        />
        <IconButton className={classes.iconButton} type="submit">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>
      {showDrawer && (
        <Box className={classes.searchDrawerCont}>
          <SearchBarDrawer />
        </Box>
      )}
    </div>
  );
};

export default SearchBar;
