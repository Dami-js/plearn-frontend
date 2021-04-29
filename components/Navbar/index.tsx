import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Theme,
  Box,
  MenuItem,
  SwipeableDrawer,
} from "@material-ui/core";
import Dropdown from "components/Dropdown";
import SearchBar from "components/SearchBar";
import { MouseEvent, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MobileNav from "./MobileNav";
import Link from "next/link";
import UserAccountDropdown from "components/UserAccountDropdown";
import Logo from "components/Logo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#ffffff",
      // paddingBlock: theme.spacing(2),
      color: theme.palette.grey[800],
    },
    searchCont: {
      width: "500px",
      marginInline: theme.spacing(5),
    },
    navMenuItems: {
      display: "none",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    menuIconCont: {
      display: "block",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    menuIcon: {
      fontSize: theme.spacing(4),
      color: theme.palette.primary.main,
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    mobileNavContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: theme.spacing(40),
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.root} elevation={4}>
      <Container>
        <Toolbar disableGutters>
          <Logo />
          <Box className={classes.menuIconCont} ml="auto">
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Box>
          <SwipeableDrawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
          >
            <MobileNav />
          </SwipeableDrawer>
          <Box className={classes.navMenuItems}>
            <Box width="500px" ml={5} mr={5}>
              <SearchBar />
            </Box>

            <Button color="inherit" size="small" onClick={handleClick}>
              Categories
            </Button>
            <Dropdown
              id="category"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorEl={anchorEl}
              keepMounted
            >
              <MenuItem>Pragmatist</MenuItem>
              <MenuItem>Activist</MenuItem>
              <MenuItem>Theorist</MenuItem>
              <MenuItem>Reflector</MenuItem>
            </Dropdown>
            <Box ml="auto">
              <UserAccountDropdown />
              <Link href="/login">
                <Box mx={3} clone>
                  <Button variant="outlined" color="primary" size="small">
                    Login
                  </Button>
                </Box>
              </Link>
              <Button variant="contained" color="primary" size="small">
                Sign Up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;