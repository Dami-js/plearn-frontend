import { Button, MenuItem } from "@material-ui/core";
import { MouseEvent, useState } from "react";
import Dropdown from "components/Dropdown";

const CategoriesDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button color="inherit" onClick={handleClick} fullWidth>
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
    </>
  );
};

export default CategoriesDropdown;
