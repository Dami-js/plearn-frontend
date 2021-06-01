import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  MenuItem,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { MouseEvent, useState } from "react";
import Dropdown from "components/Dropdown";
import Link from "next/link";
import { signOut } from "next-auth/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButtonIcon: {
      fontSize: theme.spacing(4),
    },
  })
);

const UserAccountDropdown = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon className={classes.iconButtonIcon} />
      </IconButton>
      <Dropdown
        id="category"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        keepMounted
      >
        <Link href="/profile">
          <MenuItem>
            <Box
              color={
                theme.palette.type !== "dark" ? "default.main" : "default.dark"
              }
              clone
            >
              <Typography>My Account</Typography>
            </Box>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() =>
            signOut({ callbackUrl: `http://localhost:3000/login` })
          }
        >
          <Box component="span" mr={1}>
            <ExitToAppIcon color="secondary" />
          </Box>
          Sign out
        </MenuItem>
      </Dropdown>
    </>
  );
};

export default UserAccountDropdown;
