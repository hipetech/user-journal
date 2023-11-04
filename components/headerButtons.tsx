"use client";

import React from "react";
import { Button } from "@mui/material";
import { ModalKeys } from "@/modals/modalKeys";
import { openModal } from "@/helpers/openModal";

const HeaderButtons = async () => {
  
  return (
    <nav>
      <Button color="inherit">Додати користувача</Button>
      <Button color="inherit">Логи</Button>
      <Button color="inherit" onClick={() => openModal(ModalKeys.LOGIN)}>Увійти</Button>
    </nav>
  );
};

export default HeaderButtons;
