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
import Logo from "components/Logo";

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
      <Box mb={3} display="flex" alignItems="center" width="100%">
        <Logo />
        <Box ml="auto">
          <UserAccountDropdown />
        </Box>
      </Box>
      <Box width="100%" mb={2}>
        <SearchBar />
      </Box>
      <CategoriesDropdown />

      <Spacer size={1} />
      <Box display="grid" gridGap={10} flexDirection="column" width="100%">
        <Link href="/login">
          <Button variant="outlined" color="primary" size="large" fullWidth>
            Login
          </Button>
        </Link>

        <Button variant="contained" color="primary" size="large" fullWidth>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default MobileNav;
