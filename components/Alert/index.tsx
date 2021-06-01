import { Color, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ReactNode } from "react";

type Severity = "error" | "info" | "success" | "warning";

interface AlertProps {
  open: boolean;
  onClose: () => any;
  severity?: Severity | undefined;
  children: ReactNode;
}

const Alert = ({ open, onClose, severity, children }: AlertProps) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
