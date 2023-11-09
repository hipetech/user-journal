"use client";

import { Button } from "@mui/material";
import React, { useCallback } from "react";

import { toggleModal } from "@/helpers/toggleModal";
import { ModalKeys } from "@/modals/modalKeys";
import { useUserStore } from "@/store/userStore";

const HeaderButtons = () => {
  const {user} = useUserStore();
  
  const handleLoginClick = useCallback(() => {
    if (user) {
      toggleModal(ModalKeys.LOGOUT);
    }
    else toggleModal(ModalKeys.LOGIN);
  }, [user]);
  
  return (
    <nav>
      <Button color="inherit" onClick={() => toggleModal(ModalKeys.LOGS)}>Логи</Button>
      <Button color="inherit" onClick={handleLoginClick}>
        {user ? "Вийти" : "Увійти"}
      </Button>
    </nav>
  );
};

export default HeaderButtons;
