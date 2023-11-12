"use client";

import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AppEmmiter } from "@/helpers/emmiter";
import { SnackbarKeys } from "@/snackbars/snackbarKeys";
import { AppEvents } from "@/types/appEvents";

const AppSnackbar = () => {
  const [activeSnackbar, setActiveSnackbar] = useState<SnackbarKeys | null>(null);
  
  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setActiveSnackbar(null);
  }, []);
  
  const snackbars = useMemo(() => {
    switch (activeSnackbar) {
    case SnackbarKeys.NO_PERMISSIONS:
      return <Alert onClose={handleClose} severity="error">Ви не маєте прав для цієї дії</Alert>;
    case SnackbarKeys.ADD_USER:
      return <Alert onClose={handleClose} severity={"success"}>Ви додали нового кристувача</Alert>;
    case SnackbarKeys.REMOVE_USER:
      return <Alert onClose={handleClose} severity={"warning"}>Ви видалили користувача</Alert>;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSnackbar]);
  
  useEffect(() => {
    AppEmmiter.on(AppEvents.SNACKBAR, (key: SnackbarKeys) => setActiveSnackbar(key));
    return () => {
      AppEmmiter.off(AppEvents.SNACKBAR);
    };
  }, []);
  
  return (
    <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={Boolean(activeSnackbar)} autoHideDuration={3000} onClose={handleClose}>
      {snackbars}
    </Snackbar>
  );
};

export default AppSnackbar;
