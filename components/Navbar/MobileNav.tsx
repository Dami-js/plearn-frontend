import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Box,
  MenuItem,
  Typography,
  IconButton,
} from "@material-ui/core";
import Dropdown from "components/Dropdown";
import SearchBar from "components/SearchBar";
import { MouseEvent, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Spacer from "components/Spacer";
import Link from "next/link";
import CategoriesDropdown from "components/CategoriesDropdown";
import UserAccountDropdown from "components/UserAccountDropdown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileNavContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: theme.spacing(40),
      padding: theme.spacing(2),
      [theme.breakpoints.between("sm", "md")]: {
        width: theme.breakpoints.width("sm"),
        padding: theme.spacing(5),
      },
    },
  })
);

const MobileNav = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={classes.mobileNavContent}>
      <Box py={3}>
        <Typography variant="h4">Logo</Typography>
      </Box>
      <CategoriesDropdown />
      <UserAccountDropdown />

      <Spacer size={1} />
      <Box width="100%" mb={2}>
        <SearchBar />
      </Box>
      <Box display="flex">
        <Box mr={3}>
          <Link href="/login">
            <Button variant="outlined" color="primary" size="large">
              Login
            </Button>
          </Link>
        </Box>
        <Button variant="contained" color="primary" size="large">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default MobileNav;
