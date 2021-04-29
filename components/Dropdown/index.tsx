import { Menu, MenuProps } from "@material-ui/core";
import { PropsWithChildren, ReactNode } from "react";

interface DropdownProps {
  id: string;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose(): any;
  keepMounted?: boolean;
}

const Dropdown = (props: PropsWithChildren<MenuProps>) => {
  const { children, ...otherProps } = props;
  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...otherProps}
    >
      {children}
    </Menu>
  );
};

export default Dropdown;
