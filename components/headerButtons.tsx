"use client";

import { Button } from "@mui/material";
import React, { useCallback } from "react";

import { toggleModal } from "@/helpers/toggleModal";
import useLogIn from "@/hooks/useLogIn";
import usePermissions from "@/hooks/usePermissions";
import { ModalKeys } from "@/modals/modalKeys";
import { Permission } from "@/types/permission";

const HeaderButtons = () => {
  const isLoggedIn = useLogIn();
  const checkPermissions = usePermissions();
  
  const handleLoginClick = useCallback(() => {
    if (isLoggedIn) {
      toggleModal(ModalKeys.LOGOUT);
    }
    else toggleModal(ModalKeys.LOGIN);
  }, [isLoggedIn]);
  
  return (
    <nav>
      <Button color="inherit" disabled={!checkPermissions(Permission.EXECUTE)} onClick={() => toggleModal(ModalKeys.LOGS)}>Логи</Button>
      <Button color="inherit" onClick={handleLoginClick}>
        {isLoggedIn ? "Вийти" : "Увійти"}
      </Button>
    </nav>
  );
};

export default HeaderButtons;
