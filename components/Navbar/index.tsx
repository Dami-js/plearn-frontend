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
  useTheme,
} from "@material-ui/core";
import Dropdown from "components/Dropdown";
import SearchBar from "components/SearchBar";
import { MouseEvent, useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MobileNav from "./MobileNav";
import Link from "next/link";
import UserAccountDropdown from "components/UserAccountDropdown";
import Logo from "components/Logo";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

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
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    menuIconCont: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    menuIcon: {
      fontSize: theme.spacing(4),
      color: theme.palette.primary.main,
      [theme.breakpoints.up("sm")]: {
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

const Navbar = ({ session }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    setOpenDrawer(false);
  }, [router.pathname]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.root} elevation={0}>
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
            <MobileNav session={session} />
          </SwipeableDrawer>
          <Box className={classes.navMenuItems}>
            {/* <SearchBar /> */}
            <Box mx={3}></Box>

            {/* <Button color="inherit" size="small" onClick={handleClick}>
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
            </Dropdown> */}
            <Box ml="auto">
              <Link href="/courses">
                <Button variant="text" color="default" size="small">
                  Courses
                </Button>
              </Link>
            </Box>
            {/* <Box ml={2}>
              <Link href="/#!">
                <Button variant="text" color="default" size="small">
                  My Learning Style
                </Button>
              </Link>
            </Box> */}
            {session && session.user.user.isStudent && (
              <Box ml={2}>
                <Link href="/questionnaire">
                  <Button variant="text" color="primary" size="small">
                    Take Test
                  </Button>
                </Link>
              </Box>
            )}
            {session && !session.user.user.isStudent && (
              <Box ml={2}>
                <Link href="/courses/add-new">
                  <Button variant="outlined" color="primary" size="small">
                    Create new course
                  </Button>
                </Link>
              </Box>
            )}
            <Box ml={2} display="flex" alignItems="center">
              {session && <UserAccountDropdown />}
              {!session && (
                <>
                  <Box mx={3}>
                    <Link href="/login">
                      <Button variant="text" color="primary" size="small">
                        Login
                      </Button>
                    </Link>
                  </Box>
                  <Link href="/register">
                    <Button variant="contained" color="primary" size="small">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
