import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface IToastMessage {
  severity: AlertColor;
  message: string;
  timeOut?: number;
  alertOnClose: () => void;
}

const ToastMessage = ({
  severity,
  message,
  timeOut = 6000,
  alertOnClose,
}: IToastMessage) => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    alertOnClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={timeOut}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
