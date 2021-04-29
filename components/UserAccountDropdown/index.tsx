import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  MenuItem,
  Theme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { MouseEvent, useState } from "react";
import Dropdown from "components/Dropdown";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButtonIcon: {
      fontSize: theme.spacing(4),
    },
  })
);

const UserAccountDropdown = () => {
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
          <MenuItem>My Account</MenuItem>
        </Link>
        <MenuItem>
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
