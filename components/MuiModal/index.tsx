import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import { ReactNode } from "react";
import CloseIcon from "@material-ui/icons/Close";

interface MuiModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title: string;
  actions?: Function;
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const MuiModal = ({
  children,
  open,
  handleClose,
  title,
  actions,
}: MuiModalProps) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        {title}
        {/* <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && (
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default MuiModal;
